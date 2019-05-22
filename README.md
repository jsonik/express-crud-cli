# express-crud-cli

Simple CRUD generator for express. At moment support only MongoDB with [Mongoose](https://github.com/Automattic/mongoose) object modeling tool.

## Installation

    $ npm install -g express-crud-cli
    
## Usage

In index.js you need connect api file for express
       
    // APIs
    require('./api/v1')(app);   Where 'v1' version you api

    ecc [options] [command]
    
    Options:
    -V, --version        Output the version number
    -f, --file <name>    Model file name. Only needed if model name and file name is different, and file name include symbols like _ or -
    -a, --api <version>  Api version (default v1)
    -h, --help           Output usage information

    Commands:
    generate|g <model>   Model - Model name

express-crud-cli generate next folder structure
    
    Structure:
    <version> - api version, default value 'v1', but you can change with -a options
    
    - api
    -- <version>
    --- index.js
    - controllers
    -- <version>
    --- <model_controller>.js
    - routes
    -- <version>
    --- <model_router>.js
    - db
    -- crud.js                  Short crud function with response                 
    -- mongo-crud.js            Promisified Mongoose api
  
## Example

In project you have next structure
    
    -models
    -- user.js
    -index.js
    
    Use ecc g User to create route, controller, and api for this model
    

