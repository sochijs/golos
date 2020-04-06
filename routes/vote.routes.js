const {Router} = require('express');
const router = Router();

router.get('/:id', async (req, res) => {
  try {

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте еще раз.'});
  }
});

router.post('/', async (req, res) => {
  try {

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте еще раз.'});
  }
});

module.exports = router;