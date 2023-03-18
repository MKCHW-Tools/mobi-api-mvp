const User = require("../models/user")

module.exports = {
    getAllUsers: (criteria) => {
        return new Promise((resolve, reject) => {
            User.find(criteria, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
        });
    },

    setUserStatus: (userId, userStatus) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(
                userId,
                { $set: { status: `${userStatus}` } },
                (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                }
            );
        });
    }

}