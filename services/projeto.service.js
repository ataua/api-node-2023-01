import projetoRepository from '../repositories/projeto.repository.js'

const createProjetoService = async (projeto) => {
    const nameExists = await projetoRepository.getProjetoByNome(projeto.nome)
    if (nameExists) {
        throw ({ statusCode: 400, message: `There is already a project with the name '${ projeto.nome }'` })
    }
    return await projetoRepository.createProjeto(projeto)
}

const getProjetoService = async (id) => {
    const projeto = await projetoRepository.getProjeto(id)
    if (!projeto) {
        throw ({ statusCode: 404, message: `There is no projeto whith the id ${ id }` })
    }
    return projeto
}

const getProjetosService = async () => {
    return await projetoRepository.getProjetos()
}

const updateProjetoService = async (projeto) => {
    if (!projeto.projetoId) {
        throw ({ statusCode: 400, message: "Parameter 'projetoId' is mandatory." })
    }
    if (!projeto.nome && !projeto.descricao) {
        throw ({ statusCode: 400, message: "No data was provided for update. The accepted parameters are: 'nome' or 'descricao'. Both are optional, but you must provide at least one of them." })
    }
    return await projetoRepository.updateProjeto(projeto)
}

const deleteProjetoService = async (id) => {
    await projetoRepository.deleteProjeto(id)
}

export default {
    updateProjetoService,
    deleteProjetoService,
    createProjetoService,
    getProjetoService,
    getProjetosService,
}