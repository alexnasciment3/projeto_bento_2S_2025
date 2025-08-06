import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import TutorModel from './Tutor.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// Associações
Tutor.hasOne(Questionario, { foreignKey: 'tutorId', as: 'questionario' });
Questionario.belongsTo(Tutor, { foreignKey: 'tutorId' });

Tutor.hasMany(PedidoAdocao, { foreignKey: 'tutorId', as: 'pedidos_adocao' });
PedidoAdocao.belongsTo(Tutor, { foreignKey: 'tutorId' });

Animal.hasMany(PedidoAdocao, { foreignKey: 'animalId', as: 'pedidos_adocao' });
PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId' });

await sequelize.sync();

export default { sequelize, Animal, Tutor, Questionario, PedidoAdocao, Doacao };