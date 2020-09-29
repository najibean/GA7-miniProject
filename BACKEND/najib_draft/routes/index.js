const { Router } = require('express');
const router = Router();
const adminRouter = require('./admins');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.get('/', (req, res) => {  // tampilan awal list movie
   res.status(200).json({
      msg : 'This is home page, the movie list'
   })
})

// router.use('/admins', adminRouter);  // mengambil dari users.js untuk <admin>
router.use('/users', userRouter);   // mengambil dari users.js untuk <user>
router.use('/movies', movieRouter); // mengambil dari users.js untuk <movie>


module.exports = router;