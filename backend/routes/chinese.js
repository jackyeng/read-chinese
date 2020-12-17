const router = require('express').Router();
let Chinese = require('../models/chinese.model');

router.route('/').get((req, res) => { //first endpoint that handle incoming http get request on /users path
  Chinese.find()
    .then(chineses => res.json(chineses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const character = req.body.character;
  const pinyin = req.body.pinyin;
  const meaning = req.body.meaning;
  const rank = Number(req.body.rank);

  const newChinese = new Chinese({
    character,
    pinyin,
    meaning,
    rank,
  });

  newChinese.save()
  .then(() => res.json('Chinese added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Chinese.findById(req.params.id)
    .then(chinese => res.json(chinese))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Chinese.findByIdAndDelete(req.params.id)
    .then(() => res.json('Chinese deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Chinese.findById(req.params.id)
    .then(chinese => {
      chinese.character = req.body.character;
      chinese.pinyin = req.body.pinyin;
      chinese.meaning = req.body.meaning;
      chinese.rank = Number(req.body.rank);

      chinese.save()
        .then(() => res.json('Chinese updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;