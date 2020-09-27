"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database")); //Importando la conexión a la BD desde el archivo 
class ApiController {
    /**
     * Método para obetener los datos de la tabla GAMES
     * @param req
     * @param res
     */
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT * FROM GAMES');
            res.json(result);
        });
    }
    /**
     * Método para obtener un registro por el ID
     * @param req
     * @param res
     */
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield database_1.default.query('SELECT * FROM GAMES WHERE ID_GAME = ?', [id]);
            console.log(result.length);
            if (result.length > 0) {
                return res.json(result[0]);
            }
            res.status(404).json({ text: "Este juego no existe en la BD" });
        });
    }
    /**
     * Método para insertar un nuevo registro en la tabla GAMES
     * @param req
     * @param res
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO GAMES set ?', [req.body]);
            res.json({ message: 'Juego guardado en la BD' });
        });
    }
    /**
     * Método para actualizar un registro por ID
     * @param req
     * @param res
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            yield database_1.default.query('UPDATE GAMES set ? WHERE ID_GAME = ?', [req.body, id]);
            res.json({ message: "El juego ha sido actualizado en la BD" });
        });
    }
    /**
     * Método para eliminar un registro de la tabla GAMES
     * @param req
     * @param res
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM GAMES WHERE ID_GAME = ?', [id]);
            res.json({ message: "El juego ha sido eliminado de la BD" });
        });
    }
}
const apiController = new ApiController;
exports.default = apiController;
