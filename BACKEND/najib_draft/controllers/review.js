const { Review, User, Movie } = require('../models')

class ReviewController {
    static async getReview(req, res) {
        try {
            const result = await Review.findAll({
                order: [
                    ['id', 'ASC']
                ],
                include : [
                    User,Movie
                ]
            })
            res.status(200).json(result);
            // res.render('libraries.ejs', { libraries: result });

        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    static addFormReview(req, res) {
        // res.render('addReview.ejs');
    }

    static async addReview(req, res) {
        const { userId, movieId, rating, comment } = req.body;
        try {
            const found = await Review.findOne({
                where: {
                    userId, movieId
                }
            })
            if (found) {
                res.status(409).json({
                    msg: "Your review for this movie is already exist! Try another movie."
                })
            } else {
                const review = await Review.create({
                    userId, movieId, rating, comment
                })

                res.status(201).json(review)
            }
        } catch (err) {
            res.status(500).json(err)
        }
        // try {
        //     const review = await Review.create({
        //         userId, movieId, rating, comment
        //     })
        //     res.status(201).json(review)
        //     // res.redirect('/libraries')

        // } catch (err) {
        //     res.status(500).json(err)
        // }
    }

    static async deleteReview(req, res) {
        const id = req.params.id;
        try {
            const found = await Review.findOne({
                where: {
                    id
                }
            })
            if (found) {
                Review.destroy({
                    where: { id }
                })
                // .then(() => {
                //     // res.redirect('/libraries')
                //     })
                } 
        } catch (err) {
                res.status(500).json(err)
        }
    }

    static editFormReview(req, res) {
        const id = req.params.id;
        Review.findOne({
            where: { id }
        })
            .then(result => {
                console.log(result)
                // res.render('editReview.ejs', { review : result });
            })
            .catch(err => {
                res.send(err);
            })
    }

    static editReview(req, res) {
        const id = req.params.id;
        const { userId, movieId, rating, comment } = req.body;
        Review.update({
            userId, movieId, rating, comment
        }, {
            where: { id }
        })
            .then(result => {
                if (result[0] === 1) {
                    // res.redirect('/libraries')
                    res.send('Update done!')
                } else {
                    res.send('Update not done!')
                }
            })
            .catch(err => {
                res.send(err)
            })
        }

    }

    


module.exports = ReviewController; 