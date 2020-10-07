const { Router } = require('express');
const router = Router();
const ReviewController = require('../controllers/review')

const { authentication, authorization } = require('../middlewares/authReview')

router.get('/', ReviewController.getReview)
router.post('/movie/:id', authentication, ReviewController.addReview)
router.delete('/movie/:id',authentication, authorization, ReviewController.deleteReview)
router.put('/movie/:id',ReviewController.editReview)

module.exports = router;