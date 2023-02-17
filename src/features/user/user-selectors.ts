import { RootState } from '../../app/store'

const selectUserFormData = (state: RootState) => {
    return {
        username: state.user.data.username,
        email: state.user.data.email,
        website: state.user.data.website,
        company: state.user.data.company.name,
        flavor: {
            label: state.user.data.flavor || '',
            value: state.user.data.flavor || '',
        },
        pets: state.user.data.pets || [],
    }
}

const selectUserLoaded = (state: RootState) => state?.user.status === 'idle'

export { selectUserFormData, selectUserLoaded }
