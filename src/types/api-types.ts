export interface UserCompany {
    name: string
    catchPhrase: string
    bs: string
}

export interface Pet {
    type: 'dog' | 'cat' | 'bird' | 'fish'
    name: string
    id: string
}

export type User = {
    id: number | null
    username: string
    email: string
    website: string
    // field value gets updated to mirror shape needed for payload in order to be saved correctly to db
    company: UserCompany
    flavor: string
    petIds: string[]
}
