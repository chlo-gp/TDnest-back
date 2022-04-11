import { Role } from "src/role.enum";

export type createUserDto = {
    username:string;
    password:string;
    role:Role;
    avatar:string
}

