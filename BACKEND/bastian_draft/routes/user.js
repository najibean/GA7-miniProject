const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/User')
const uploadImage = require('../middlewares/multer')

router.get('/', UserController.list)
router.post('/login', UserController.login)
router.post('/register', uploadImage, UserController.register)
router.get('/profile/:id', UserController.profile)
router.put('/editprofile/:id', uploadImage, UserController.editUser)
router.delete('/delete/:id', UserController.deleteUser)

module.exports = router;