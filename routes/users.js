var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(process.env.APP_NAME);
});

router.get('/fajar', (req, res, next)=> {
  res.send('Hai , my name is fajar anugrah')
});

module.exports = router;
