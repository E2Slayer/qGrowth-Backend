const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const treeSchema = new Schema({
    name: String,
    type: Number,
    level: Number,
    points: Number,
    x: Number,
    y: Number

});

treeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
treeSchema.set('toJSON', {
    virtuals: true
});

treeSchema.findById = function (cb) {
    return this.model('Tree').find({id: this.id}, cb);
};

const Tree = mongoose.model('Trees', treeSchema);


exports.findByName = (name) => {
    return Tree.find({name: name});
};
exports.findById = (id) => {
    return Tree.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createTree = (treeData) => {
    const tree = new Tree(treeData);
    return tree.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Tree.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, trees) {
                if (err) {
                    reject(err);
                } else {
                    resolve(trees);
                }
            })
    });
};



exports.patchTree = (id, userData) => {
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

