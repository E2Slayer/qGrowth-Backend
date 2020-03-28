const GardenController = require('./controllers/gardens.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/gardens', [

        GardenController.insert
    ]);
    app.get('/gardens', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       GardenController.list
    ]);
    app.get('/gardens/:Id', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
       GardenController.getById
    ]);

    
    app.patch('/gardens/:Id', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
      //  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      GardenController.patchById
    ]);
    app.delete('/gardens/:Id', [
      //  ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
       GardenController.removeById
    ]);
    
};
