import {__PermissionHandler__} from "./exec";
/** Import Permission Utilities !*/
import {FilePermission} from "./core";

export const exec = () => {

    /** Project [Algorithms] Sub-Modules !*/
    __PermissionHandler__("algorithms/**/*.ts", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [Utils & Helpers] Interfaces !*/
    __PermissionHandler__("algorithms/utils/**/*.ts", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [Types & Classes] Interfaces !*/
    __PermissionHandler__("algorithms/extend/**/*.ts", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [Global Injection & Plugins] Interfaces !*/
    __PermissionHandler__("algorithms/plugin/**/*.ts", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [Application Middlewares] Interfaces !*/
    __PermissionHandler__("algorithms/middleware/**/*.ts", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [Configurations] Interfaces !*/
    __PermissionHandler__("*config{.json,.js,.ts}", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [Configurations] Interfaces !*/
    __PermissionHandler__("config/**/*(*.js|*.ts)", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

    /** Project [ESLint Setting] Interfaces !*/
    __PermissionHandler__(".eslint*", {
        OWNER: FilePermission.EXEC_READ,
        GROUP: FilePermission.READ_ONLY,
        OTHERS: FilePermission.READ_ONLY,
    });

};

/** For ES6 Default Import Statement !*/
export default exec;

/** For ES5 Import Statement !*/
module.exports = {exec};
