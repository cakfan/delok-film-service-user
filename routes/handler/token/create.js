const {
    User,
    RefreshToken
} = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
    const userId = req.body.uuid
    const refreshToken = req.body.refresh_token

    const schema = {
        refresh_token: 'string|empty:false',
        uuid: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({
        where: { uuid: userId }
    })
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    const createRefreshToken = await RefreshToken.create({
        token: refreshToken,
        user_id: user.id
    })

    return res.json({
        status: 'success',
        data: {
            id: createRefreshToken.id
        }
    })

}