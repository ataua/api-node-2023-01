import tarefaRepository from '../repositories/tarefa.repository.js'

const createTarefaService = async ( tarefa ) => {
    return await tarefaRepository.createTarefa( tarefa )
}

const getTarefaService = async ( id ) => {
    const tarefa = await tarefaRepository.getTarefa( id )
    if ( !tarefa ) {
        throw new Error( `There is no tarefa whith the id ${ id }` )
    }
    return tarefa
}

const getTarefasService = async () => {
    return await tarefaRepository.getTarefas()
}

const getTarefasFromProjetoService = async ( id ) => {
    return await tarefaRepository.getTarefasFromProjeto( id )
}

const updateTarefaService = async ( tarefa ) => {
    if ( !tarefa.tarefaId ) {
        throw new Error( "Parameter 'tarefaId' is mandatory." )
    }
    if (
        !tarefa.descricao &&
        !tarefa.dataLimite &&
        !tarefa.status &&
        !tarefa.projetoId
    ) {
        throw new Error( "No data was provided for update. The accepted parameters are: 'descricao', 'dataLimite', 'status' or 'projetoId'. All are optional, but you must provide at least one of them." )
    }
    return await tarefaRepository.updateTarefa( tarefa )
}

const deleteTarefaService = async ( id ) => {
    return await tarefaRepository.deleteTarefa( id )
}

export default {
    updateTarefaService,
    deleteTarefaService,
    createTarefaService,
    getTarefaService,
    getTarefasService,
    getTarefasFromProjetoService
}