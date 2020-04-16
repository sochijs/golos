const {Router} = require('express');

const Vote = require('../model/Vote');
const User = require('../model/User');
const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findById(voteId);
    const candidate = await User.findOne({userId: req.session.user.sessionId});

    let isVoted = false;
    let answerId = null;
    let isAbstained = false;

    if (candidate) {
      const idx = candidate.votes.findIndex(v => v.voteId.toString() === voteId.toString());

      if (idx >= 0) {
        answerId = candidate.votes[idx].answerId;
        isAbstained = candidate.votes[idx].abstained;
        isVoted = true;
      }
    }
    res.status(200).json({vote, isVoted, answerId, isAbstained});
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте еще раз.', error: e.message});
  }
});

router.post('/create', async (req, res) => {
  try {
    const {title, answers, isPublic} = req.body;
    const expired = Date.now() + 60 * 60 * 24 * 1000; // + 1 day

    const vote = new Vote({
      title,
      answers,
      expired,
      public: isPublic
    });

    await vote.save();

    res.status(201).json({vote});
  } catch (e) {
    res.status(500).json({message: `Что-то пошло не так, попробуйте еще раз.`, error: e.message});
  }
});

router.post('/choice', async (req, res) => {
  try {
    const {voteId, answerId, isAbstained} = req.body;

    let candidate = await User.findOne({userId: req.session.user.sessionId});
    let vote = await Vote.findById(voteId);

    // Человек голосует первый раз
    if (!candidate) {

      const user = new User({
        userId: req.session.user.sessionId,
        votes: [{
          voteId,
          answerId,
          isAbstained
        }]
      });

      await user.save();

      if (!isAbstained) {
        const voteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === answerId.toString());
        vote.answers[voteAnswerIdx].count += 1;
        vote.votes += 1;
      } else {
        vote.abstained += 1;
      }

      await vote.save();
    } else {

      const candidateVoteIdx = candidate.votes.findIndex(v => v.voteId.toString() === voteId.toString());
      if (candidateVoteIdx >= 0) {
        // Голосовал в этом опросе

        // Обновляем данные в опросе

        // За что он голосовал уже
        if (!candidate.votes[candidateVoteIdx].answerId) { // null = Воздерживался
          vote.abstained -= 1;
        } else { // выбирал вариант ответа
          // Уменьшаем кол-во у старого ответа
          const oldVoteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === candidate.votes[candidateVoteIdx].answerId.toString());
          vote.answers[oldVoteAnswerIdx].count -= 1;
          vote.votes -= 1;
        }

        if (!isAbstained) { // Новый голос - вариант ответа

          const voteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === answerId.toString());
          // Увеличиваем кол-во у нового ответа
          vote.answers[voteAnswerIdx].count += 1;

          // Обновляем данные у пользователя
          candidate.votes[candidateVoteIdx].answerId = answerId;
          candidate.votes[candidateVoteIdx].abstained = false;
          vote.votes += 1;

        } else { // Новый голос - воздерживаюсь
          vote.abstained += 1;
          candidate.votes[candidateVoteIdx].answerId = null;
          candidate.votes[candidateVoteIdx].abstained = true;

        }

        await vote.save();
        await candidate.save();

      } else {
        // Голосует первый раз в опросе
        candidate.votes.push({
          voteId,
          answerId,
          isAbstained
        });

        if (!isAbstained) {
          const voteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === answerId.toString());
          vote.answers[voteAnswerIdx].count += 1;
          vote.votes += 1;
        } else {
          vote.abstained += 1;
        }

        await vote.save();
        await candidate.save();
      }
    }

    res.status(201).json({vote});
  } catch (e) {
    res.status(500).json({message: `Что-то пошло не так, попробуйте еще раз.`, error: e.message});
  }
});

module.exports = router;