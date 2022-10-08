# Nodejs_Expressjs_HMVC_Kit

Build Nodejs Expressjs backend with **HMVC** architecture...

#### Tech stack:
- Nodejs
- Expressjs
- Sequelize (ORM)
- MySQL/MariaDB


#### Structure:
- /
  - **app/** : 
    - **modules/** : app modules
      - **config/** : module configuration
      - **controllers/** : module controller
      - **middleware/** : module middleware
      - **entities/** : module entity
      - **repositories/** : module repository
      - **routes/** : module routing
      - **services/** : module service
      - **utils/** : module util
      - **index.js** : module declaration
    - **shared/** : general service/utils,...
    - **index.js** : load app modules, middlewares, create App/Express instance
  - **config/** : configurations
  - **index.js** : load App instance, start http server

  
  

