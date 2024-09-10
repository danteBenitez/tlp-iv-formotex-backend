import { Optional } from "sequelize";
import { AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IUser } from "../interfaces/user.interface.js";
import Role from "./role.model.js";
import UserRole from "./user-roles.model.js";

interface UserCreationAttributes extends Optional<IUser, 'userId'> { }

@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'users',
    underscored: true
})
export default class User extends Model<IUser, UserCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        field: "user_id"
    })
    declare userId: number;

    @Column
    declare username: string;

    @Column
    declare password: string;

    @Column
    declare email: string;

    @BelongsToMany(() => Role, () => UserRole)
    declare roles: Role[]
}