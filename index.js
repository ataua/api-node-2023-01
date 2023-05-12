import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import projetoRoute from './routes/projeto.route.js'
import tarefaRoute from './routes/tarefa.route.js'
import Projeto from './models/Projeto.model.js'
import Tarefa from './models/Tarefa.model.js'
import db from './repositories/db.js'

const { APP_PORT, APP_HOST } = process.env

Tarefa.belongsTo( Projeto, { foreignKey: 'projetoId', onDelete: 'CASCADE' } )
await db.sync()

const app = express()
app.use( express.json() )
app.use( cors() )


app.get( '/', ( req, res ) => {
    res.json( {
        message: `${ req.method } ${ req.originalUrl } - OK`
    } )
} )

app.use( '/api/v1/projetos', projetoRoute )
app.use( '/api/v1/tarefas', tarefaRoute )

app.use( ( error, req, res, next ) => {
    res.status( 400 ).json( { error: error.message } )
} )

app.listen( APP_PORT, APP_HOST, () => {
    console.log( `App started on ${ APP_HOST }:${ APP_PORT }` )
} )