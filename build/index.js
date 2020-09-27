"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Inportando express
const morgan_1 = __importDefault(require("morgan")); //Importando morgan
const cors_1 = __importDefault(require("cors")); //Importando cors
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes")); //Importando archivo indexRoutes.js
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes")); //Importando archivo apiRoutes.js
class Server {
    /**
     * Contructor de inicialización
     */
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    /**
     * Método de configuración
     */
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    /**
     * Método que declara las rutas
     */
    routes() {
        this.app.use('/', indexRoutes_1.default); //Ruta principal
        this.app.use('/api/sps/helloworld/v1', apiRoutes_1.default); //Ruta API-REST
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
