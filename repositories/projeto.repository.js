import Projeto from '../models/Projeto.model.js';

const getProjetoByNome = async ( nome ) => {
    try {
        return Projeto.findOne( {
            where: {
                nome
            }
        } )
    } catch ( error ) {
        throw error
    }
}

const createProjeto = async ( projeto ) => {
    try {
        return await Projeto.create( projeto )
    } catch ( error ) {
        throw error
    }
}

const getProjetos = async () => {
    try {
        return await Projeto.findAll()
    } catch ( error ) {
        throw error
    }
}

const getProjeto = async ( id ) => {
    try {
        return await Projeto.findOne( {
            where: {
                projetoId: id
            }
        } )
    } catch ( error ) {
        throw error
    }
}

const deleteProjeto = async ( id ) => {
    try {
        const current = await getProjeto( id )
        if ( !current ) {
            throw new Error( `There is no projeto with id ${ id }` )
        }
        await Projeto.destroy( {
            where: {
                projetoId: id
            }
        } )
        return current
    } catch ( error ) {
        throw error
    }
}

const updateProjeto = async ( projeto ) => {
    try {
        const current = await getProjeto( projeto.projetoId )
        if ( !current ) {
            throw new Error( `There is no projeto with id ${ projeto.projetoId }` )
        }
        const updated = {
            ...current.dataValues,
            ...( !!projeto.nome && { nome: projeto.nome } ),
            ...( !!projeto.descricao && { descricao: projeto.descricao } ),
        }
        delete updated.createdAt
        delete updated.updatedAt
        await Projeto.update(
            updated,
            {
                where: {
                    projetoId: projeto.projetoId,
                }
            }
        )
        return await getProjeto( projeto.projetoId )
    } catch ( error ) {
        throw error
    }
}

export default {
    getProjetoByNome,
    createProjeto,
    getProjetos,
    getProjeto,
    deleteProjeto,
    updateProjeto,
}