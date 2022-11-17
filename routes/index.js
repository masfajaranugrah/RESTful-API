var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/respon', (req, res) => {
  res.json({
    message : 'hai with home page fajar '
  })
})


module.exports = router;
