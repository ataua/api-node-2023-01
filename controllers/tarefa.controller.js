import tarefaService from "../services/tarefa.service.js"

const createTarefaController = async ( req, res, next ) => {
    try {
        const { projetoId, descricao, dataLimite, status } = req.body
        if ( !projetoId || !descricao || !dataLimite || !status ) {
            throw new Error( "Please provide all parameters: 'projetoId', 'descricao', 'dataLimite' and 'status'" );
        }
        const data = await tarefaService.createTarefaService( { projetoId, descricao, dataLimite, status } );
        res.status( 201 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const getTarefaController = async ( req, res, next ) => {
    try {
        const { id } = req.params
        const data = await tarefaService.getTarefaService( id )
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const getTarefasController = async ( req, res, next ) => {
    try {
        const data = await tarefaService.getTarefasService()
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const updateTarefaController = async ( req, res, next ) => {
    try {
        const {
            tarefaId,
            descricao,
            dataLimite,
            status,
            projetoId
        } = req.body
        const tarefa = {
            tarefaId,
            ...( !!descricao && { descricao } ),
            ...( !!dataLimite && { dataLimite } ),
            ...( !!status && { status } ),
            ...( !!projetoId && { projetoId } )
        }
        const data = await tarefaService.updateTarefaService( tarefa )
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const deleteTarefaController = async ( req, res, next ) => {
    try {
        const { id } = req.params
        const data = await tarefaService.deleteTarefaService( id )
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const getTarefasFromProjetoController = async ( req, res, next ) => {
    try {
        const { id } = req.params
        const data = await tarefaService.getTarefasFromProjetoService( id )
        res.status( 200 ).json( { data } )
    } catch ( error ) {
        next( error )
    }
}

export default {
    createTarefaController,
    getTarefaController,
    getTarefasController,
    updateTarefaController,
    deleteTarefaController,
    getTarefasFromProjetoController
}