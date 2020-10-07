const { Review, User, Movie } = require('../models')
const { paginate } = require('../helpers/paginate');

class ReviewController {
    static async getReview(req, res) {
        try {
            const result = await Review.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    // static addFormReview(req, res) {
    //     res.render('addReview.ejs');
    // }

    static async listReviewByUser(req, res) {
        const UserId = req.userData.id;
        try {
            const user = await User.findOne({
                where: { id: UserId },
                attributes: ['name', 'image']
            });
            const reviews = await Review.findAll({
                where: { UserId },
                order: [
                    ['id', 'ASC']
                ],
                include: [{
                    model: Movie,
                    attributes: ['title']
                }],
                attributes: ['id', 'rating', 'comment']
            });
            res.status(200).json({
                "user": user,
                reviews
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async listReviewByMovie(req, res) {
        const MovieId = req.params.MovieId
        const page = req.query.page;
        const limit = 10;

        try {
            const movie = await Movie.findOne({
                where: { id: MovieId },
            });
            const reviews = await Review.findAll({
                where: { MovieId },
                order: [
                    ['id', 'ASC']
                ],
                attributes: ['rating', 'comment'],
                include: {
                    model: User,
                    attributes: ['name', 'image']
                }
            });
            let users = [];
            reviews.forEach(review => {
                users.push(review.User)
            });

            // Count Average Rating
            let sum = 0;
            sum = reviews.reduce((a, b) => a.rating + b.rating);
            let rating = sum / reviews.length;

            const result = paginate(page, limit, reviews);
            res.status(200).json({
                "Movie": movie.title,
                "Rating": rating,
                "Comment": result
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async addReview(req, res) {
        const { rating, comment } = req.body;
        const MovieId = req.params.MovieId;
        const UserId = req.userData.id;

        try {
            const found = await Review.findOne({
                where: {
                    MovieId,
                    UserId
                }
            })
            if (found) {
                res.status(409).json("Can't review this movie again!")
            } else {
                const result = await Review.create({
                    UserId,
                    MovieId,
                    rating,
                    comment
                })
                res.status(201).json(result)
            }
        } catch (err) {
            res.status(500).json(err)
        }

        // const { rating, comment } = req.body;
        // const UserId = req.userData.id;
        // const MovieId = req.params.id;
        // try {
        //     const review = await Review.create({
        //         // userId : req.userData.id, 
        //         // movieId : req.params.id, 
        //         UserId, 
        //         MovieId, 
        //         rating, 
        //         comment
        //     })

        //     res.status(201).json(review)
        // } catch (err) {
        //     res.status(500).json(err);
        // }
    }
    // static async addReview(req, res) {
    //     const { rating, comment } = req.body;
    //     const movieId = req.params.id;
    //     const userId = req.userData.id;

    //     try {
    //         const found = await Review.findOne({
    //             where: {
    //                 userId, movieId
    //             }
    //         })
    //         if (found) {
    //             // console.log(found)
    //             res.status(409).json("Can't review this movie again!")
    //         } else {
    //             const result = await Review.create({
    //                 userId,
    //                 movieId,
    //                 rating,
    //                 comment
    //             })
    //             res.status(201).json(result)
    //         }
    //     } catch (err) {
    //         res.status(500).json(err)
    //     }
    // }



    static async deleteReview(req, res,next) {
        const id = req.params.id;
        try {
            const result = await Review.destroy({
                where: { id }
            })
            res.status(200).json({
                msg: "Review deleted"
            })
        }
        catch(err) {
            next();
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
        const { UserId, MovieId, rating, comment } = req.body;
        Review.update({
            UserId, MovieId, rating, comment
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