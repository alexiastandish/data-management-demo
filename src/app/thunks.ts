import { User } from '../features/user/types'
import { updateUser } from '../features/user/user-slice'
import { UserForm } from '../types/form-types'

export const submitUserUpdates =
    (values: UserForm) => async (dispatch, getState) => {
        const userFormValues = {
            username: values.username,
            email: values.email,
            website: values.website,
            company: values.company,
            flavor: values.flavor,
            pets: values.pets,
        }

        await dispatch(updateUser(userFormValues))
    }
