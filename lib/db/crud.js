const mongoCrud = require('./mongo-crud');
const errors = require('../controllers/errors');

exports.list = async function (res, entity, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findAll(entity, select, populate, populateParams);
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

exports.listQuery = async function (res, entity, query, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findAllQuery(entity, query, select, populate, populateParams);
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

exports.oneById = async function (req, res, entity, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findById(entity, req.params.id, select, populate, populateParams);
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

exports.one = async function (req, res, entity, query, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findOne(entity, query, select, populate, populateParams);
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

exports.create = async function (req, res, entity, populate, populateParams) {
    try {
        let newObj = mongoCrud.create(entity, req.body);
        let result = await mongoCrud.save(newObj, populate, populateParams);
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

exports.updateOneById = async function (req, res, entity, populate, populateParams) {
    try {
        let obj = await mongoCrud.updateOne(entity, {
            _id: req.params.id
        }, req.body);
        let result = await mongoCrud.save(obj, populate, populateParams);
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

exports.deleteOneById = async function (req, res, entity) {
    try {
        let result = await mongoCrud.deleteOne(entity, {
            _id: req.params.id
        });
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

// exports.deleteMany = async function (req, res, entity) {
//     try {
//         let result = await mongoCrud.deleteMany(entity, {
//             _id: req.params.id
//         });
//         return errors.ans_ok(result, res);
//     } catch (error) {
//         return errors.ans_err(error.message, res);
//     }
// };
