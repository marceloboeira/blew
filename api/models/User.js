module.exports = {
	attributes: {
		username: {
			type: 'string',
			required: false,
			unique: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		first_name: {
			type: 'string',
			required: false
		},
        role: {
            type: 'INTEGER',
            required: false
        },

		message_count: {
			type: 'number'
		},
		passports : { collection: 'Passport', via: 'user' }

	},

	getAll: function() {
		return User.find()
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.then(function (model) {
			return [model];
		});
	},
    insert: function (userObject) {

        User.create(userObject)
            .exec(function(err, newUser) {
                if (err) {

                    return err;
                }
                else {
                    console.log(newUser);
                    return newUser;
                }
            });
    }


};