/**
 * Get all entity
 * @param {*} entity 
 * @param {*} select 
 * @param {*} sort 
 * @param {*} populate 
 * @param {*} populateParams 
 */
exports.findAll = function (entity, select, sort, populate = '', populateParams = '') {
    return new Promise((resolve, reject) => {
        entity.find()
            .sort(sort)
            .select(select)
            .populate(populate, populateParams)
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
    });
};

/**
 * Get all entity use query
 * @param {*} entity 
 * @param {*} query 
 * @param {*} sort 
 * @param {*} select 
 * @param {*} populate 
 * @param {*} populateParams 
 */
exports.findAllQuery = function (entity, query, sort, select, populate = '', populateParams = '') {
    return new Promise((resolve, reject) => {
        entity.find(query)
            .sort(sort)
            .select(select)
            .populate(populate, populateParams)
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
    });
};

/**
 *  Get entity by id 
 * @param {*} entity 
 * @param {*} id 
 * @param {*} sort 
 * @param {*} select 
 * @param {*} populate 
 * @param {*} populateParams 
 */
exports.findById = function (entity, id, sort, select, populate = '', populateParams = '') {
    return new Promise((resolve, reject) => {
        entity.findById(id)
            .sort(sort)
            .select(select)
            .populate(populate, populateParams)
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
    });
};

/**
 * Get one entity use query
 * @param {*} entity 
 * @param {*} query 
 * @param {*} sort 
 * @param {*} select 
 * @param {*} populate 
 * @param {*} populateParams 
 */
exports.findOne = function (entity, query, sort, select, populate = '', populateParams = '') {
    return new Promise((resolve, reject) => {
        entity.findOne(query)
            .sort(sort)
            .select(select)
            .populate(populate, populateParams)
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
    });
};

/**
 * Create new entity
 * @param {*} entity 
 * @param {*} data 
 */
exports.create = function (entity, data) {
    return new entity(data);
};

/**
 * Update entity, use query to find
 * @param {*} entity 
 * @param {*} query 
 * @param {*} data 
 */
exports.updateOne = function (entity, query, data) {
    return new Promise((resolve, reject) => {
        delete data.updatedAt;
        entity.findOneAndUpdate(query, data, {
                new: true
            })
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
    });
};

/**
 * Delete one entity
 * @param {*} entity 
 * @param {*} query 
 */
exports.deleteOne = function (entity, query) {
    return new Promise((resolve, reject) => {
        entity.deleteOne(query)
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                if (result.n == 0) {
                    return resolve({
                        message: 'No data found'
                    });
                }

                return resolve(result);
            });
    });
};

/**
 * Delete many entity, use query
 * @param {*} entity 
 * @param {*} query 
 */
exports.deleteMany = function (entity, query) {
    return new Promise((resolve, reject) => {
        entity.deleteMany(query)
            .exec(function (err, result) {
                if (err) {
                    return reject(err);
                }

                if (result.n == 0) {
                    return resolve({
                        message: 'No data found'
                    });
                }

                return resolve(result);
            });
    });
};


/**
 * Save entity
 * @param {*} entity 
 * @param {*} populate 
 * @param {*} populateParams 
 */
exports.save = function (entity, populate = '' , populateParams = '') {
    return new Promise((resolve, reject) => {
        entity.save(async function (err, result) {
            if (err) {
                return reject(err);
            }
            let res = await result.populate(populate, populateParams).execPopulate();

            return resolve(res);
        });
    });
};