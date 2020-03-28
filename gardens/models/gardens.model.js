const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    name: String,
    owner: { type: Schema.ObjectId, ref: "Users", required: true },
    //ownedTrees: [{ type: Schema.ObjectId, ref: "Trees" }],
    points: Number
});

gardenSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
gardenSchema.set('toJSON', {
    virtuals: true
});

gardenSchema.findById = function (cb) {
    return this.model('Gardens').find({id: this.id}, cb);
};

const Garden = mongoose.model('Gardens', gardenSchema);


exports.findByName = (name) => {
    return Garden.find({name: name});
};
exports.findById = (id) => {
    return Garden.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createUser = (gardenData) => {
    const garden = new Garden(gardenData);
    return garden.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, gardens) {
                if (err) {
                    reject(err);
                } else {
                    resolve(gardens);
                }
            })
    });
};


/*
exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })

};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

*/