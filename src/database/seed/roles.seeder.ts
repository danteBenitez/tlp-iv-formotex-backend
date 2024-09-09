import { ROLES } from "../../consts/roles.js";
import Role from "../../models/role.model.js";

const ROLES_TO_INSERT = [
    {
        roleId: 1,
        name: ROLES.ADMIN,
    },
    {
        roleId: 2,
        name: ROLES.USER,
    }
];

export async function seedRoles() {
    return Promise.all(
        ROLES_TO_INSERT.map((role) => {
            return Role.findOrCreate({
                where: role,
                defaults: role,
            });
        })
    );
}