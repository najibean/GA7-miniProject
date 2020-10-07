const { Router } = require('express');
const router = Router();
const MovieController = require('../controllers/movie')

const { authentication, authorization } = require('../middlewares/authAdmin')

router.get('/:page',MovieController.getMovie)
router.post('/search', MovieController.searchMovie)
router.get('/details/:id', MovieController.movieDetails)
router.post('/add', authentication, authorization, MovieController.addMovie)
router.delete('/delete/:id', authentication, authorization, MovieController.deleteMovie)
router.put('/edit/:id',authentication, authorization, MovieController.editMovie)
// router.get('/search', MovieController.searchMovie)
// router.get('/search', MovieController.findById)

module.exports = router;