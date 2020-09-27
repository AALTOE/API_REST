import { Router } from 'express';                         //Importando Routes desde express
import   api   from '../controllers/apiController'; //Instanciando desde el archivo amolliController.js

class GameRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    /**
     * Método de configuración de la rutas,
     * llamando los metodos creados para obtener
     * los datos.
     */
    config() {
        this.router.get('/'      , api.list);  //Ruta principal que muestra una lista
        this.router.get('/:id'   , api.getOne);//Ruta que muestra un registro por ID
        this.router.post('/'     , api.create);//Ruta que crear un nuevo registro
        this.router.put('/:id'   , api.update);//Ruta que modifica unr registro por ID
        this.router.delete('/:id', api.delete);//Ruta que elimina un registro por ID
    }

}

export default new GameRoutes().router;

