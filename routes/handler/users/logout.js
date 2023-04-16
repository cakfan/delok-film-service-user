const {
    User,
    RefreshToken
} = require('../../../models')

module.exports = async (req, res) => {

    const uuid = req.body.uuid
    if (!uuid) {
        return res.status(400).json({
            status: 'error',
            message: 'uuid is required'
        })
    }
    const user = await User.findOne({
        where: { uuid }
    })

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    const token = RefreshToken.findOne({
        where: { user_id: user.id }
    })

    if (!token) {
        return res.status(404).json({
            status: 'error',
            message: 'Token not found'
        })
    }

    await RefreshToken.destroy({
        where: { user_id: user.id }
    })

    return res.json({
        status: 'success',
        message: 'Refresh token has been deleted'
    })

}