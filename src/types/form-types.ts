type Pet = {
    type: 'dog' | 'cat' | 'bird' | 'fish' | null
    name: string
}

export interface UserForm {
    username: string
    email: string
    website: string
    // field value gets updated to mirror shape needed for form
    company: string
    // field value gets updated to mirror shape needed for form
    flavor: UserFlavorOption
    pets: Pet[]
}

export type UserFlavorOption = {
    label: string
    value: string
}
