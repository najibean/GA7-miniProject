const { Movie } = require('../models');

class MovieController {
    static async getMovie(req,res,next) {
        try {
            const result = await Movie.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            res.status(200).json(result);
        }
        catch (err) {
            next();
        }
    }

    static async addMovie(req, res,next) {
        const { title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language } = req.body;
        try {
            const found = await Movie.findOne({
                where: {
                    title
                }
            })
            if (found) {
                res.status(409).json({
                    msg : "This Movie already exists"
                })
            }
            else {
                const movie = await Movie.create({
                    title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language
                })
                res.status(201).json(movie);
            }
        }
        catch(err) {
            next();
        }
    }
    
    static async deleteMovie(req, res,next) {
        const id = req.params.id;
        try {
            const deletedMovie = await Movie.destroy({
                where: { id }
            })
            res.status(200).json({
                deletedMovie,
                msg: "Movie deleted"
            })
        }
        catch(err) {
            next();
        }
    }
    
    static async editMovie(req,res,next) {
        const id = req.params.id;
        const { title, synopsis, genre, trailer, poster } = req.body;
        try{
            const update = await Movie.update({ title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language },
                { where : { id }
        })
        res.status(200).json({
            update,
            msg : "This Movie Updated"
        })
    } catch(err){
        next();
        }
    }

    // static async movieSearch(req, res) {
    //     let lookupValue = request.body.query.toLowerCase();

    //     Movie.findAll({
    //         limit: 10,
    //         where: {
    //         title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 
    //         'LIKE', 
    //         '%' + lookupValue + '%')
    //             }
    //     }).then(function(title){
    //         return response.json({
    //             msg: 'message',
    //             assets: assets
    //         });
    //     }).catch(function(error){
    //         console.log(error);
    //         });
    //     }

    static async movieSearch(req,res,next) {
        let lookupValue = req.body.query.toLowerCase();
        try {
            const result = await Movie.findAll({
                limit: 10,
                where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 
                'LIKE', 
                '%' + lookupValue + '%')
                    }
                })
                res.status(200).json(result);
            } catch (err) {
                next();
            }
        }
}
module.exports = MovieController;
