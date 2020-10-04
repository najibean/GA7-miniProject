const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY


const tokenGenerator = (user) => {
    const { id, username, name, password, email, image, role } = user
    return jwt.sign({
        id,
        username, 
        name, 
        email,
        role
    }, secretKey)
}

const tokenVerifier = (access_token) => {
    return jwt.verify(access_token,secretKey)
}

module.exports = {
    tokenGenerator, tokenVerifier
}