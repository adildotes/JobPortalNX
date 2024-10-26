import { UserRole } from "./user-role-type"




export type jobSeekerType = {
    name?: string,
    pic?: string,
    description?: string,
    address?: string,
    phone?: string,
    resume?: string
    email: string,
    uid: string,
    role: UserRole,
}