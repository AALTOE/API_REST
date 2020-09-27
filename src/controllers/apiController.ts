import { Request, Response } from 'express'; //Importando Request y Response desde express
import pool from '../database';              //Importando la conexión a la BD desde el archivo 

class ApiController {
    
    /**
     * Método para obetener los datos de la tabla GAMES
     * @param req 
     * @param res 
     */
    public async list(req: Request, res: Response): Promise<void> {
        const result = await pool.query('SELECT * FROM GAMES');
        res.json(result);
    }
    
    /**
     * Método para obtener un registro por el ID
     * @param req 
     * @param res 
     */
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM GAMES WHERE ID_GAME = ?', [id]);
        console.log(result.length);
        if (result.length > 0) {
            return res.json(result[0]);
        }
        res.status(404).json({ text: "Este juego no existe en la BD" });
    }

    /**
     * Método para insertar un nuevo registro en la tabla GAMES
     * @param req 
     * @param res 
     */
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO GAMES set ?', [req.body]);
        res.json({ message: 'Juego guardado en la BD' });
    }

    /**
     * Método para actualizar un registro por ID
     * @param req 
     * @param res 
     */
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE GAMES set ? WHERE ID_GAME = ?', [req.body, id]);
        res.json({ message: "El juego ha sido actualizado en la BD" });
    }

    /**
     * Método para eliminar un registro de la tabla GAMES
     * @param req 
     * @param res 
     */
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM GAMES WHERE ID_GAME = ?', [id]);
        res.json({ message: "El juego ha sido eliminado de la BD" });
    }
}

const apiController = new ApiController;
export default apiController;