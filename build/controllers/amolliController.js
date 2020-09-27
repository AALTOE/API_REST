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
class AmolliController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT * FROM ad_ip_camera');
            res.json(result);
        });
    }
    /*
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM ad_ip_camera WHERE id = ?', [id]);
        console.log(result.length);
        if (result.length > 0) {
            return res.json(result[0]);
        }
        res.status(404).json({ text: "The game doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO ad_ip_camera set ?', [req.body]);
        res.json({ message: 'Game Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE ad_ip_camera set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The game was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM ad_ip_camera WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
    */
    /******************************************************************************** */
    procedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.NAME_SP; //Nombre del store procedure
            const data = req.body; //Datos recividos del cliente
            var params = []; //Arreglo de los parametros
            //Elimina el ultimo valor
            Object.keys(data).forEach(function (key) {
                if (data[key] == req.body.NAME_SP)
                    delete data[key];
            });
            //Recorre los datos para agregar comillas simples
            for (var value in data) {
                var keys;
                //Para el valor '@V_RESULT', no le agregues comillas
                if (data[value] == '@V_RESULT') {
                    keys = data[value];
                    params.push(keys);
                }
                //Si los parametros vienen vacios
                if (data[value] == '') {
                    //Asignales el dato null
                    params.push("null");
                }
                else {
                    keys = "'" + data[value] + "'";
                    params.push(keys);
                }
            }
            //Si exciste @V_RESULT en el arreglo
            if (params.indexOf('@V_RESULT') !== -1) {
                //Elimina el ultimo parametro
                params.pop();
            }
            console.log("CALL " + name + " (" + params + ")");
            const request = yield database_1.default.query("CALL " + name + " (" + params + ")");
            res.json(request[0]);
        });
    }
}
const amolliController = new AmolliController;
exports.default = amolliController;
