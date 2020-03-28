const GardenModel = require('../models/gardens.model');
//const UserModel = require('../models/users.model');
const crypto = require('crypto');

const User = require('../../users/models/users.model');





exports.insert = (req, res) => {
    //return res.status(400).send({errors: 'Missing email and password fields'});
    GardenModel.createGarden(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};


exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    GardenModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    GardenModel.findById(req.params.Id)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.patchById = (req, res) => {

    GardenModel.patchGarden(req.params.Id, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    GardenModel.removeById(req.params.Id)
        .then((result)=>{
            res.status(204).send({});
        });
};
