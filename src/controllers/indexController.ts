import { Request, Response } from 'express'; //Importando Request y Response desde express

class IndexController {
    
    /**
     * Método index público
     * @param req //Solicutid
     * @param res //Respuesta
     */
    public index(req: Request, res: Response) {
        res.json({text: 'El API-Rest está funcionando en /api/sps/helloworld/v1'});
    }
}

export const indexController = new IndexController;