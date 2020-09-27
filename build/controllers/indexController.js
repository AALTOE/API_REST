"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    /**
     * Método index público
     * @param req //Solicutid
     * @param res //Respuesta
     */
    index(req, res) {
        res.json({ text: 'El API-Rest está funcionando en /api/sps/helloworld/v1' });
    }
}
exports.indexController = new IndexController;
