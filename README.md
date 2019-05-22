# express-crud-cli

Simple CRUD generator for express. At moment support only MongoDB with [Mongoose](https://github.com/Automattic/mongoose) object modeling tool.

## Installation

    $ npm install -g express-crud-cli
    
## Usage

    ecc [options] [command]
    
    Options:
    -V, --version        output the version number
    -f, --file <name>    Model file name. Only needed if model name and file name is different, and file name include symbols like _ or -
    -a, --api <version>  Api version (default v1)
    -h, --help           output usage information

    Commands:
    generate|g <model>   model - Model name

express-crud-cli generate next folder structure
    
    Structure:
    - api
    -- version
    --- index.js
    - controllers
    -- <version>
    --- <model_controller>
    - routes
    -- <version>
    --- <model_router>
    - db
    -- crud.js
    -- mongo-crud.js
