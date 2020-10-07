const { Movie, User, Review } = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize')
const { paginate } = require('../helpers/paginate');

class MovieController {
    static async getMovie(req, res) {
        const page = Number(req.params.page);
        const limit = 10;
        try {
            const movies = await Movie.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            const result = paginate(page, limit, movies);

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }


    static async movieDetails (req, res) {
        const id = req.params.id
        try {
            const found = await Movie.findOne({
                where : {
                    id
                }, 
                include : [
                    Review
                ]
            })
            if (found) {
                res.status(200).json(found)
            }else{
            res.status(404).json(
                { msg : "Movie not Found" }
            )}
        }catch (err){
            res.status(500).json(err);
        }
    }

    static async addMovie(req, res) {
        const { title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language } = req.body;
        try {
            const found = await Movie.findOne({
                where: {
                    title
                }
            })
            // console.log(found)
            if (found) {
                res.status(409).json({
                    msg : "This Movie already exists"
                })
            } else {
                const movie = await Movie.create({
                    title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language
                })
                res.status(201).json(movie);
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    
    static async deleteMovie(req, res,next) {
        const id = req.params.id;
        try {
            const result = await Movie.destroy({
                where: { id }
            })
            res.status(200).json({
                msg: "Movie deleted"
            })
        }
        catch(err) {
            next();
        }
    }
    
    static async editMovie(req,res,next) {
        const id = req.params.id;
        const { title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language } = req.body;
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

    static async searchMovie(req, res){
        const { title } = req.body;
        try {
            const found = await Movie.findOne({
                where: {
                    title: {
                        [Op.iLike]: '%' + title + '%'
                    }
                }
            });
            if (!found) {
                res.status(404).json(`'${title}' not found!`)
            } else {
                const movies = await Movie.findAll({
                    where: {
                        title: {
                            [Op.iLike]: '%' + title + '%'
                        }
                    }
                });
                res.status(200).json(movies);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }


}
module.exports = MovieController;


// title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language