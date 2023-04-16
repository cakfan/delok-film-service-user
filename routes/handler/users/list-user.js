const { User } = require('../../../models');

module.exports = async (req, res) => {
    const userIds = req.query.user_ids || [];
    const sqlOptions = {
        attributes: ['uuid', 'username', 'name', 'bio', 'avatar', 'role'],
        where: { role: 'member' }
    }

    if (userIds.length) {
        sqlOptions.where = {
            username: userIds
        }
    }

    const users = await User.findAll(sqlOptions);
    if (!users.length) {
        return res.status(404).json({
            status: 'error',
            message: 'No user'
        });
    }

    return res.json({
        status: 'success',
        data: users
    })

}