const { Router } = require('express');
const multer = require('multer');
const router = Router();
const UserController = require('../controllers/user')
const multerUpload = require('../middlewares/multer')

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 5)
//     cb(null, uniqueSuffix + file.originalname)
//   }
// })

// const upload = multer({
//   storage: storage
// })


router.get('/', UserController.list)
router.post('/login', UserController.login)
router.post('/register', multerUpload, UserController.register)
router.get('/profile/:id', UserController.profile)
router.put('/editprofile/:id', multerUpload, UserController.editUser)
router.delete('/delete/:id', UserController.deleteUser)


// router.get('/login', (req, res)=>{
//     res.status(200).json({
//         message: 'Login'
//     })
// })

// router.get('/register', (req, res)=>{
//     res.status(200).json({
//         message: 'Register'
//     })
// })

module.exports = router;