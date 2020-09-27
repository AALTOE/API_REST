"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //Importando Routes desde express
const apiController_1 = __importDefault(require("../controllers/apiController")); //Instanciando desde el archivo amolliController.js
class GameRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    /**
     * Método de configuración de la rutas,
     * llamando los metodos creados para obtener
     * los datos.
     */
    config() {
        this.router.get('/', apiController_1.default.list); //Ruta principal que muestra una lista
        this.router.get('/:id', apiController_1.default.getOne); //Ruta que muestra un registro por ID
        this.router.post('/', apiController_1.default.create); //Ruta que crear un nuevo registro
        this.router.put('/:id', apiController_1.default.update); //Ruta que modifica unr registro por ID
        this.router.delete('/:id', apiController_1.default.delete); //Ruta que elimina un registro por ID
    }
}
exports.default = new GameRoutes().router;
