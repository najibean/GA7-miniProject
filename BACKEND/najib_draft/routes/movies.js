const { Router } = require('express');
const router = Router();

// biasanya terhubung dengan controllers, atau langsung aja juga bisa

router.get('/', (req, res) => {
   res.status(200).json({
      msg : 'Halaman awal film'
   })
})

module.exports = router;