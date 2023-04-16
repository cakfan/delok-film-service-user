const { RefreshToken } = require('../../../models')
const Hashids = require('hashids')
const { ID_SALT } = process.env
const hashids = new Hashids(ID_SALT)

module.exports = async (req, res) => {
    const refreshToken = req.query.refresh_token

    if (!refreshToken) {
        return res.status(400).json({
            status: 'error',
            message: 'You must provide a refresh_token parameter'
        })
    }

    const token = await RefreshToken.findOne({
        attributes: ['id', 'token', 'user_id'],
        where: { token: refreshToken }
    })

    if (!token) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid token not found'
        })
    }

    token.user_id = hashids.encode(token.user_id)

    return res.json({
        status: 'success',
        token
    })

}