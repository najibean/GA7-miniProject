const { Router } = require('express');
const router = Router();
const ReviewController = require('../controllers/review')

const { authentication, authorization } = require('../middlewares/authReview')

router.get('/list', authentication, ReviewController.getReview)
router.post('/movie/:MovieId', authentication, ReviewController.addReview)
router.get('/movie=:MovieId/:page', ReviewController.listReviewByMovie);
router.get('/user', authentication, ReviewController.listReviewByUser);
router.delete('/movie/:id',authentication, authorization, ReviewController.deleteReview)
router.put('/movie/:id',authentication, authorization, ReviewController.editReview)
module.exports = router;