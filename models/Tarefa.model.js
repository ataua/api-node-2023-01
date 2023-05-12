import sequelize from 'sequelize'
import db from '../repositories/db.js'

const Tarefa = db.define( 'tarefa', {
    tarefaId: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: sequelize.STRING,
        allowNull: false
    },
    dataLimite: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: sequelize.ENUM( 'aguardando', 'executando', 'concluída', 'cancelada' ),
        allowNull: false
    },
    projetoId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
} )

export default Tarefa