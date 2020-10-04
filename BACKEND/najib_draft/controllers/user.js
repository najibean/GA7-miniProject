const { User } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

class UserController {
    static async list(req, res) {
        try {
            const users = await User.findAll()

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async profile(req, res) {
        const id = req.params.id
        try {
            const found = await User.findOne({
                where: {
                    id
                }
            })
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json(
                    { msg: "User not Found" }
                )
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const userFound = await User.findOne({
                where: {
                    username
                }
            })
            if (userFound) {
                // const pwdDecrypt = bcrypt.compareSync(password, userFound.password);
                // res.json(userFound)
                if (decryptPwd(password, userFound.password)) {
                    const access_token = tokenGenerator(userFound)
                    res.status(200).json({ access_token })
                } else {
                    throw {
                        status: 400,
                        msg: "Password is not the same."
                    }
                }
            } else {
                // res.status(404).json({
                //     msg : "User is not found."
                // })
                throw {
                    status: 404,
                    msg: "User is not found."
                }
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async register(req, res) {
        const { username, password, name, role } = req.body;

        if (req.file) {
            req.body.image = '/' + req.file.destination + req.file.filename
        }
        try {
            // const pwdEncrypt = encryptPwd(password);
            const user = await User.create({
                username,
                password,
                name,
                image: req.body.image,
                role,
            })
            res.status(201).json(user)
            // console.log(pwdEncrypt);

        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async editUser(req, res) {
        const id = req.params.id;
        const { name } = req.body;
        const image = req.file.path;
        try {
            const edit = await User.update({
                name,
                image
            }, {
                where: { id }
            });
            res.status(203).json(edit);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id

        try {
            const result = await User.destroy({
                where: { id }
            });
            res.status(202).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async logout(req, res, next) {
        const exit = req.user.deleteToken(req.token, (err, user) => {
            if (err)
                return res.status(400).send(err);
            res.sendStatus(200);
        });
    }


}

module.exports = UserController;