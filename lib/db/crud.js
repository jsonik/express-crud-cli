const mongoCrud = require('./mongo-crud');

exports.list = async function (res, entity, sort, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findAll(entity, select, sort, populate, populateParams);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.listQuery = async function (res, entity, query, sort, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findAllQuery(entity, query, sort, select, populate, populateParams);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.oneById = async function (req, res, entity, sort, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findById(entity, req.params.id, sort, select, populate, populateParams);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.one = async function (res, entity, query, sort, select, populate, populateParams) {
    try {
        let result = await mongoCrud.findOne(entity, query, sort, select, populate, populateParams);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.create = async function (req, res, entity, populate, populateParams) {
    try {
        let newObj = mongoCrud.create(entity, req.body);
        let result = await mongoCrud.save(newObj, populate, populateParams);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateOneById = async function (req, res, entity, populate, populateParams) {
    try {
        let obj = await mongoCrud.updateOne(entity, {
            _id: req.params.id
        }, req.body);
        let result = await mongoCrud.save(obj, populate, populateParams);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.deleteOneById = async function (req, res, entity) {
    try {
        let result = await mongoCrud.deleteOne(entity, {
            _id: req.params.id
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.deleteMany = async function (req, res, entity) {
    try {
        let result = await mongoCrud.deleteMany(entity, {
            _id: req.params.id
        });
        return errors.ans_ok(result, res);
    } catch (error) {
        return errors.ans_err(error.message, res);
    }
};

