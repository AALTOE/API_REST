import express, { Application } from 'express'; //Inportando express
import morgan from 'morgan';                    //Importando morgan
import cors from 'cors';                        //Importando cors
import indexRoutes from './routes/indexRoutes'; //Importando archivo indexRoutes.js
import apiRoutes from './routes/apiRoutes';     //Importando archivo apiRoutes.js

class Server {

    public app: Application;
    
    /**
     * Contructor de inicialización
     */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    /**
     * Método de configuración
     */
    config(): void {
        this.app.set('port', process.env.PORT || 5000);         //Definiendo un puerto, tomando un puerto en el sistema ó utiliza el puerto establecido

        this.app.use(morgan('dev'));                            //Muetras los mensajes en consola
        this.app.use(cors());                                   
        this.app.use(express.json());                           //Trabajando con Json
        this.app.use(express.urlencoded({extended: false}));    //Los formularios sólo aceptán strings (No imagenes)
    }

    /**
     * Método que declara las rutas
     */
    routes(): void {
        this.app.use('/', indexRoutes);//Ruta principal
        this.app.use('/api/sps/helloworld/v1', apiRoutes);//Ruta API-REST
    }

    /**
     * Método que inicia el servidor
     */
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();