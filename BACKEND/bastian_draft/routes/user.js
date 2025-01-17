const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/user')
const uploadImage = require('../middlewares/multer')
const { authentication, authorization } = require('../middlewares/authAdmin')

router.get('/', authentication, authorization, UserController.list)
router.post('/login', UserController.login)
router.post('/register', uploadImage, UserController.register)
router.get('/profile/:id', UserController.profile)
router.put('/editprofile/:id', authentication, uploadImage, UserController.editUser)
router.delete('/delete/:id', authentication, UserController.deleteUser)

module.exports = router;