const crud = require('../../db/crud');
const {{model}} = require('../../models/{{modelFile}}');

let select;
let populate = '';
let populateParams = '';
let sort = {};

exports.list = function (req, res) {
    crud.list(res, {{model}}, select, sort, populate, populateParams);
};

exports.one = function (req, res) {
    crud.oneById(req, res, {{model}}, sort, select, populate, populateParams);
};

exports.create = function (req, res) {
    crud.create(req, res, {{model}});
};

exports.update = function (req, res) {
    crud.updateOneById(req, res, {{model}});
};

exports.delete = function (req, res) {
    crud.deleteOneById(req, res, {{model}});
};