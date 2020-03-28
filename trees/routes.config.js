const TreeController = require('./controllers/trees.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/trees', [
        TreeController.insert
    ]);
    app.get('/trees', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       TreeController.list
    ]);
    app.get('/trees/:Id', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
       TreeController.getById
    ]);

    
    app.patch('/trees/:Id', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
       TreeController.patchById
    ]);
    app.delete('/trees/:Id', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
       TreeController.removeById
    ]);
    
};
