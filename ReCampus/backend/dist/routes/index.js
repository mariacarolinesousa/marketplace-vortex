"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ad_routes_1 = __importDefault(require("./ad.routes"));
const favorite_routes_1 = __importDefault(require("./favorite.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes = (0, express_1.Router)();
routes.use("/ads", ad_routes_1.default);
routes.use("/favorites", favorite_routes_1.default);
routes.use("/users", user_routes_1.default);
routes.use("/auth", auth_routes_1.default);
exports.default = routes;
