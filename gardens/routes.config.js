const UsersController = require('./controllers/gardens.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/gardens', [
        UsersController.insert
    ]);
    app.get('/gardens', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.list
    ]);
    app.get('/gardens/:userId', [
       // ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);

    /*
    app.patch('/gardens/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/gardens/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
    */
};
