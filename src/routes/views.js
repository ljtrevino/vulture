// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'src/views' });
});

router.get('/loggout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/u/profile', function(req, res) {
  res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/postfood', function(req, res) {
  res.sendFile('postFood.html', { root: 'src/views' });
});

router.get('/about', function(req, res) {
  res.sendFile('about.html', { root: 'src/views' });
});

router.get('/settings', function(req, res) {
  res.sendFile('settings.html', { root: 'src/views' });
});

router.get('/404', function(req, res) {
  res.sendFile('404.html', { root: 'src/views' });
});

router.get('/profile', function(req, res) {
  res.sendFile('profile.html', { root: 'src/views' });
});


//Food.remove({_id: id}, ...)

//const MapModel = require('/marker');
// router.get('/markers', function(req, res) {
//     MapModel.find({}, function(err, markers) {
//         res.send(markers);
//     });
// });

module.exports = router;
