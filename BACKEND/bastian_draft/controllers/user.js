const { User } = require('../models')
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

class UserController {
    static async list(req, res) {
        try {
            const users = await User.findAll()

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const userFound = await User.findOne({
                where : {
                    username
                }
            })
            if(userFound){
                // const pwdDecrypt = bcrypt.compareSync(password, userFound.password);
                if(decryptPwd(password, userFound.password)){
                    
                    const access_token = tokenGenerator(userFound)
                    res.status(200).json({access_token})
                }else {
                    throw {
                        status : 400,
                        msg : "Password is not the same."
                    }    
                }
            }else{
                // res.status(404).json({
                //     msg : "User is not found."
                // })
                throw {
                    status : 404,
                    msg : "User is not found."
                }
            }

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async register(req, res) {
        const { username, password, name, email, image, role } = req.body;

        try {
            // const pwdEncrypt = encryptPwd(password);
            const user = await User.create({
                username, password, name, email, image, role
            })
            res.status(201).json(user)
            // console.log(pwdEncrypt);

        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController;