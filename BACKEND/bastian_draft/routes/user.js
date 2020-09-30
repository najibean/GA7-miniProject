const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/User')

router.get('/', UserController.list)
router.post('/login', UserController.login)
router.post('/register', UserController.register)

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