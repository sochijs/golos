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
    let userAnswerId = null;

    if (candidate) {
      const idx = candidate.votes.findIndex(v => v.voteId.toString() === voteId.toString());

      if (idx >= 0) {
        userAnswerId = candidate.votes[idx].answerId;
        isVoted = true;
      }
    }
    res.status(200).json({vote, isVoted, userAnswerId});
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте еще раз.', error: e.message});
  }
});

router.post('/create', async (req, res) => {
  try {
    const {title, answers} = req.body;
    const expired = Date.now() + 60 * 60 * 24 * 1000; // + 1 day

    const vote = new Vote({
      title,
      answers,
      expired
    });

    await vote.save();

    res.status(201).json({vote});
  } catch (e) {
    res.status(500).json({message: `Что-то пошло не так, попробуйте еще раз.`, error: e.message});
  }
});

router.post('/choice', async (req, res) => {
  try {
    const {voteId, answerId} = req.body;
    const candidate = await User.findOne({userId: req.session.user.sessionId});
    const vote = await Vote.findById(voteId);

    // Человек голосует первый раз
    if (!candidate) {
      const user = new User({
        userId: req.session.user.sessionId,
        votes: [{
          voteId,
          answerId
        }]
      });
      await user.save();

      const voteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === answerId.toString());
      vote.answers[voteAnswerIdx].count += 1;
      vote.votes += 1;
      await vote.save();
    } else {

      const candidateVoteIdx = candidate.votes.findIndex(v => v.voteId.toString() === voteId.toString());
      if (candidateVoteIdx >= 0) {
        // Голосовал в этом опросе

        // Обновляем данные в опросе
        // Уменьшаем кол-во у старого ответа
        const oldVoteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === candidate.votes[candidateVoteIdx].answerId.toString());
        vote.answers[oldVoteAnswerIdx].count -= 1;
        // Увеличиваем кол-во у нового ответа
        const voteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === answerId.toString());
        vote.answers[voteAnswerIdx].count += 1;

        // Обновляем данные у пользователя
        candidate.votes[candidateVoteIdx].answerId = answerId;

        await vote.save();
        await candidate.save();

      } else {
        // Голосует первый раз в опросе
        candidate.votes.push({
          voteId,
          answerId
        });

        const voteAnswerIdx = vote.answers.findIndex(a => a._id.toString() === answerId.toString());
        vote.answers[voteAnswerIdx].count += 1;
        vote.votes += 1;
        await vote.save();
        await candidate.save();
      }
    }

    res.status(201).json({vote, userAnswerId: answerId});
  } catch (e) {
    res.status(500).json({message: `Что-то пошло не так, попробуйте еще раз.`, error: e.message});
  }
});

module.exports = router;