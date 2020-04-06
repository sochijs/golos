const {Router} = require('express');
const Vote = require('../model/Vote');
const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id);
    res.status(200).json(vote);
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

module.exports = router;