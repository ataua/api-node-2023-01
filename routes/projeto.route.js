import { Router } from 'express'
import projetoController from '../controllers/projeto.controller.js';
import tarefaController from '../controllers/tarefa.controller.js';
const projetoRoute = new Router()

projetoRoute.post( '/', projetoController.createProjetoController )
projetoRoute.get( '/', projetoController.getProjetosController )
projetoRoute.get( '/:id', projetoController.getProjetoController )
projetoRoute.patch( '/', projetoController.updateProjetoController )
projetoRoute.delete( '/:id', projetoController.deleteProjetoController )
projetoRoute.get( '/:id/tarefas', tarefaController.getTarefasFromProjetoController )

export default projetoRoute