const { User } = require('../../../models')

module.exports = async (req, res) => {
    const id = req.params.id
    const sqlOptions = {
        attributes: ['uuid', 'username', 'name', 'bio', 'avatar', 'role'],
        where: { username: id }
    }
    const user = await User.findOne(sqlOptions)
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    return res.json({
        status: 'success',
        data: user
    })

}