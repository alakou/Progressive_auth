interface userProps {
    id: string
    email: string
    role: string
    profile?: UserProfile

}

interface UserProfile {
    firstname?: string
    lastname?: string
    profession?: string
}


export class UserEntity {
    public readonly id: string
    public readonly email: string
    public readonly role: string

    public readonly profile?: UserProfile

    constructor(user: userProps) {
        this.id = user.id
        this.email = user.email
        this.role = user.role
        this.profile = user.profile
    }
}
