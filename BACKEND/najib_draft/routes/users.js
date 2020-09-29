const { Router } = require('express');
const router = Router();

// biasanya terhubung dengan controllers, atau langsung aja juga bisa

router.get('/login', (req, res) => {   //login menggunakan username dan password
   res.status(200).json({
      msg : 'Login user!'
   })
})

router.get('/register', (req, res) => {   //register menggunakan username, password, email, foto/image
   res.status(200).json({
      msg : 'Register user!'
   })
})

module.exports = router;