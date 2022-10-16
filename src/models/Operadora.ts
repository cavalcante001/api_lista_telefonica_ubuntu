import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface OperadoraInstance extends Model {
  id_operadora: number;
  nome: string;
  codigo: number;
  categoria: string;
  preco: number;
}

export const Operadora = sequelize.define<OperadoraInstance>(
  "Operadoras",
  {
    id_operadora: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nome: { type: DataTypes.STRING },
    categoria: { type: DataTypes.STRING },
    codigo: { type: DataTypes.NUMBER },
    preco: { type: DataTypes.NUMBER },
  },
  {
    tableName: "operadora",
    timestamps: false,
  }
);
