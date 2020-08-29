var express = require('express');
var router = express.Router();
const middlewares = require('../middlewares/apiMiddlewares');
const db = require('../db/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:uid/restaurants/:rid/favorite', [middlewares.keyAuth], async function(req, res, next) {
  const alreadyFav = await db.queryPromise("SELECT * FROM favorite_restaurants WHERE user_id = $1 AND restaurant_id = $2",
    [req.params.uid, req.params.rid]);
  console.log('--> FILE: users.js -- LINE: 14 -- \x1b[35m%s\x1b[0m', JSON.stringify(alreadyFav));
  if(alreadyFav && alreadyFav.length !== 0) {
    return res.status(400).json({success: false, message: "You already marked this restaurant as favorite!"})
  } else {
    await db.queryPromise("INSERT INTO favorite_restaurants(user_id, restaurant_id) VALUES($1, $2)",
      [req.params.uid, req.params.rid]);
    return res.json({success: true});
  }
});

router.get('/:uid/restaurants/favorites', [middlewares.keyAuth], async function(req, res, next) {
  const rests = await db.queryPromise("SELECT restaurant_id \"restaurantId\" FROM favorite_restaurants WHERE user_id = $1",
    [req.params.uid]);
    return res.json({success: true, favorites: rests});
});


module.exports = router;
