import Tarefa from '../models/Tarefa.model.js';

const createTarefa = async (tarefa) => {
    try {
        return await Tarefa.create(tarefa)
    } catch (error) {
        throw error
    }
}

const getTarefas = async () => {
    try {
        return await Tarefa.findAll()
    } catch (error) {
        throw error
    }
}

const getTarefa = async (id) => {
    try {
        return await Tarefa.findOne({
            where: {
                tarefaId: id
            }
        })
    } catch (error) {
        throw error
    }
}

const deleteTarefa = async (id) => {
    try {
        const current = await getTarefa(id)
        if (!current) {
            throw ({ statusCode: 404, message: `There is no tarefa with id ${ id }` })
        }
        await Tarefa.destroy({
            where: {
                tarefaId: id
            }
        })
        return current
    } catch (error) {
        throw error
    }
}

const updateTarefa = async (tarefa) => {
    try {
        const current = await getTarefa(tarefa.tarefaId)
        if (!current) {
            throw ({ statusCode: 404, message: `There is no tarefa with id ${ tarefa.tarefaId }` })
        }
        const updated = {
            ...current.dataValues,
            ...(!!tarefa.descricao && { descricao: tarefa.descricao }),
            ...(!!tarefa.dataLimite && { dataLimite: tarefa.dataLimite }),
            ...(!!tarefa.status && { status: tarefa.status }),
        }
        delete updated.createdAt
        delete updated.updatedAt
        await Tarefa.update(
            updated,
            {
                where: {
                    tarefaId: tarefa.tarefaId,
                }
            }
        )
        return await getTarefa(tarefa.tarefaId)
    } catch (error) {
        throw error
    }
}

const getTarefasFromProjeto = async (id) => {
    return await Tarefa.findAll({
        where: {
            projetoId: id
        }
    })
}

export default {
    createTarefa,
    getTarefas,
    getTarefa,
    deleteTarefa,
    updateTarefa,
    getTarefasFromProjeto
}