"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Rider"] = "rider";
    UserRole["Hospital"] = "hospital";
    UserRole["Police"] = "police";
    UserRole["Admin"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.google = user.google;
        this.password = user.password;
        this.meta = user.meta;
        this.role = user.role ? user.role : UserRole.Rider;
        this.createdAt = user.createdAt ? user.createdAt : new Date();
    }
    toString() {
        return `{
        id: ${this.id},
        name: ${this.name},
        username: ${this.username},
        email: ${this.email},
        role: ${this.role},
        id: ${this.id},
    }`;
    }
}
exports.default = User;
