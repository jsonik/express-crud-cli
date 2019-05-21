// ./lib/index.js

const mustache = require('mustache');
const pluralize = require('pluralize');
const fs = require('fs-extra');
const path = require('path');

const routeTemplate = fs.readFileSync(path.join(__dirname, 'templates/route.tpl')).toString();
const controllerTemplate = fs.readFileSync(path.join(__dirname, 'templates/controller.tpl')).toString();
const apiTemplate = fs.readFileSync(path.join(__dirname, 'templates/api.tpl')).toString();

let modelFileName;

function toLower(v) {
    return v.toLowerCase();
}

function toPlural(v) {
    return pluralize(v);
}

function writeFile(url, data){
    fs.writeFileSync(path.resolve(__dirname, url), data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function createFolder(folder) {
    if(!fs.existsSync(folder)) {
        fs.mkdirSync(folder, {recursive: true});
    }
}


function createController(api) {
    console.log('generate new controller (version: ' + api.version + '; name: ' + api.model + ')...');

    let controller = mustache.render(controllerTemplate, {
        model: api.model,
        modelFile: modelFileName
    });

    let folder = path.resolve(api.runDir, 'controllers', api.version);
    let url = folder + '/' + modelFileName + '.js';

    createFolder(folder)
    writeFile(url, controller);

    console.log('controller generated successfully');
}


function createRoute(api) {
    console.log('generate new route (version: ' + api.version + '; name: ' + api.model + ')...');

    let route = mustache.render(routeTemplate, {
        name: modelFileName,
        version: api.version
    });

    let folder = path.resolve(api.runDir, 'routes', api.version);
    let url = folder + '/' + modelFileName + '.js';

    createFolder(folder)
    writeFile(url, route);

    console.log('route generated successfully');
}


function createApiLink(api){
    let folder = path.resolve(api.runDir, 'api', api.version);
    let url = folder + '/index.js';
    createFolder(folder);

    if(!fs.existsSync(url)){
        writeFile(url, 'module.exports = function (app) {};');
    }

    let apiFile = fs.readFileSync(path.resolve(__dirname, url)).toString();
    let apiTpl = mustache.render(apiTemplate, {
        version: api.version,
        fileName: modelFileName
    });

    apiFile = apiFile.substr(0, apiFile.length-2) + apiTpl + apiFile.substr(apiFile.length-2);
    writeFile(url, apiFile);
}

// ToDo: fix this
function createMongoCrud(api) {
    let folder = path.resolve(api.runDir, 'db');
    
    fs.copySync(path.resolve(__dirname, 'db'), folder);
}


const generate = (api) => {
    if (api.fileName) {
        modelFileName = api.fileName;
    } else {
        modelFileName = toLower(api.model);
    }

    createController(api);
    createRoute(api);
    createApiLink(api);

    createMongoCrud(api);

    return 0;
}

exports.generate = generate;