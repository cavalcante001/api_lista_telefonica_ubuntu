import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface ContatoInstance extends Model {
  id_contatos: number;
  nome: string;
  telefone: string;
  data: Date;
  id_operadora: number;
  serial: string;
}

export const Contato = sequelize.define<ContatoInstance>(
  "Contatos",
  {
    id_contatos: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nome: { type: DataTypes.STRING },
    telefone: { type: DataTypes.STRING },
    id_operadora: { type: DataTypes.NUMBER },
    data: { type: DataTypes.DATE },
    serial: { type: DataTypes.STRING },
  },
  {
    tableName: "contatos",
    timestamps: false,
  }
);
