import sequelize from "sequelize";
import db from "../repositories/db.js";
import Tarefa from './Tarefa.model.js';

const Projeto = db.define( 'projeto', {
    projetoId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
} )

export default Projeto