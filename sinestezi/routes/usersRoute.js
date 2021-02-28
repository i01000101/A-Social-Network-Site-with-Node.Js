const controller = require('../controller/usersController');

const express = require('express');

const router = express.Router();

router.get('/login', controller.loginGet);
router.post('/login', controller.loginPost)

router.get('/signUp', controller.signUpGet);
router.post('/signUp', controller.signUpPost);

router.get('/:nick', controller.profileGet);
router.post('/bioupdate', controller.bioUpdate);

router.get('/follow/:newFollowing', controller.follow);
router.get('/unfollow/:exFollowing', controller.unFollow);

module.exports = router;