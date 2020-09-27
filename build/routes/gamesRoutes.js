"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amolliController_1 = __importDefault(require("../controllers/amolliController"));
class GameRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', amolliController_1.default.list);
        this.router.get('/:id', amolliController_1.default.getOne);
        this.router.post('/', amolliController_1.default.create);
        this.router.put('/:id', amolliController_1.default.update);
        this.router.delete('/:id', amolliController_1.default.delete);
    }
}
exports.default = new GameRoutes().router;
