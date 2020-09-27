import express, { Application } from 'express'; //Inportando express
import morgan from 'morgan';                    //Importando morgan
import cors from 'cors';                        //Importando cors
import indexRoutes from './routes/indexRoutes'; //Importando archivo indexRoutes.js
import gamesRoutes from './routes/apiRoutes';   //Importando archivo apiRoutes.js

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
        this.app.set('port', process.env.PORT || 5000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    /**
     * Método que declara las rutas
     */
    routes(): void {
        this.app.use('/', indexRoutes);//Ruta principal
        this.app.use('/api/sps/helloworld/v1', gamesRoutes);//Ruta API-REST
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