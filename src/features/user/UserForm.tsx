import React from 'react'
import SaveBar from '../../components/SaveBar'
import Pets from '../../components/Pets'
import { selectUserFormData } from './user-selectors'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import {
    UserFlavorOption,
    UserForm as UserFormValues,
} from '../../types/form-types'
import { DevTool } from '@hookform/devtools'
import options from '../../constants/flavor-options.json'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { updateUser } from './user-slice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export default function UserForm() {
    const userData = useAppSelector(selectUserFormData)
    const dispatch = useAppDispatch()
    const methods = useForm<UserFormValues>({
        mode: 'onSubmit',
        defaultValues: { ...userData },
    })

    const { reset, formState, handleSubmit, register, control, setValue } =
        methods

    const onSubmit = async (data) => {
        await dispatch(updateUser(data))
    }
    const onError = (errors) => {
        console.log('errors', errors)
    }

    return (
        <Container maxWidth="sm">
            <FormProvider {...methods}>
                <form>
                    <TextField
                        {...register('username')}
                        label="username"
                        className="form-field"
                    />
                    <TextField
                        {...register('email')}
                        label="email"
                        className="form-field"
                    />
                    <TextField
                        {...register('website')}
                        label="website"
                        className="form-field"
                    />
                    <TextField
                        {...register('company')}
                        label="company"
                        className="form-field"
                    />
                    <Controller
                        control={control}
                        name="flavor"
                        render={({ field }) => {
                            return (
                                <Autocomplete
                                    className="form-field"
                                    options={options}
                                    getOptionLabel={(
                                        option: UserFlavorOption
                                    ) => option.label || 'pick flavor'}
                                    onChange={(e, option) => {
                                        console.log('option', option)
                                        if (!option) {
                                            return setValue(
                                                'flavor',
                                                { label: '', value: '' },
                                                {
                                                    shouldValidate: true,
                                                    shouldDirty: true,
                                                }
                                            )
                                        }
                                        return setValue('flavor', option, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        })
                                    }}
                                    value={field.value}
                                    renderInput={(params) => (
                                        <TextField
                                            label="flavor"
                                            {...params}
                                            error={Boolean(
                                                formState.errors?.flavor
                                            )}
                                            helperText={
                                                formState.errors?.flavor
                                                    ?.message
                                            }
                                        />
                                    )}
                                />
                            )
                        }}
                    />
                    <Pets
                        control={control}
                        register={register}
                        setValue={setValue}
                    />
                </form>
                <SaveBar
                    defaultValues={userData}
                    reset={reset}
                    isDirty={formState.isDirty}
                    onSubmit={handleSubmit(onSubmit, onError)}
                />
                <DevTool placement="bottom-left" control={control} />
            </FormProvider>
        </Container>
    )
}
