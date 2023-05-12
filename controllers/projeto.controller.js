import projetoService from "../services/projeto.service.js"

const createProjetoController = async ( req, res, next ) => {
    try {
        const { nome, descricao } = req.body
        if ( !nome || !descricao ) {
            throw new Error( "Please provide all parameters: 'nome' and 'descricao'." );
        }
        const data = await projetoService.createProjetoService( { nome, descricao } );
        res.status( 201 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const getProjetoController = async ( req, res, next ) => {
    try {
        const { id } = req.params
        const data = await projetoService.getProjetoService( id )
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const getProjetosController = async ( req, res, next ) => {
    try {
        const data = await projetoService.getProjetosService()
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const updateProjetoController = async ( req, res, next ) => {
    try {
        const { projetoId, nome, descricao } = req.body
        const projeto = {
            projetoId,
            ...( !!nome && { nome } ),
            ...( !!descricao && { descricao } )
        }
        const data = await projetoService.updateProjetoService( projeto )
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

const deleteProjetoController = async ( req, res, next ) => {
    try {
        const { id } = req.params
        const data = await projetoService.deleteProjetoService( id )
        res.status( 200 ).json( { data } );
    } catch ( error ) {
        next( error );
    }
}

export default {
    createProjetoController,
    getProjetoController,
    getProjetosController,
    updateProjetoController,
    deleteProjetoController
}