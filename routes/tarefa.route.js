import { Router } from 'express'
import tarefaController from '../controllers/tarefa.controller.js';
const tarefaRoute = new Router()

tarefaRoute.post( '/', tarefaController.createTarefaController )
tarefaRoute.get( '/', tarefaController.getTarefasController )
tarefaRoute.get( '/:id', tarefaController.getTarefaController )
tarefaRoute.patch( '/', tarefaController.updateTarefaController )
tarefaRoute.delete( '/:id', tarefaController.deleteTarefaController )

export default tarefaRoute