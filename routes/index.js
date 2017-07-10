var express = require('express');
var path = require('path');
var debug = require('debug')('passport-demo:'+path.basename(__filename));
let Room = require('../models/Room');
var router = express.Router();
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    debug(req.user);
  }else{
    debug("User is not logged in");
  }
  res.render('index', { title: 'Express', user:req.user });
});


function compruebaLogin(redirectURL){
  return function(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }else{
        return res.redirect(redirectURL);
      }
  };
}

//router.use(compruebaLogin('/auth/login'));

//ensureLogin.ensureLoggedIn('/auth/login')
router.get('/private', (req, res, next) => {
  res.render('private', { title: 'pagina privada'});
});

//ensureLogin.ensureLoggedIn('/auth/login')
router.get('/room/:id_room', (req, res, next) => {
  const {id_room} = req.params;
  Room.findById(id_room).populate('owner').exec().then(r => {
    console.log(r);
    return res.render('room', {
      title: `Room ${r.title}`,
      room:r
    });
  });
});


module.exports = router;
