const controller = require('../controller/homeController');

const express = require('express');

const router = express.Router();

router.get('/', controller.homeGet);

router.post('/share', controller.sharePost);

router.get('/delete/:postId', controller.deletePost);

router.get('/like/:postId', controller.like);
router.get('/unlike/:postId', controller.unLike);

router.get('/:postId', controller.showPostDetail);

router.post('/search', controller.searchPost);

module.exports = router;
