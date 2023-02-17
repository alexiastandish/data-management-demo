import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { useFieldArray, useFormContext, Controller } from 'react-hook-form'

export default function Pets({ control, register, setValue }) {
    const { getValues } = useFormContext()
    const prependKey = 'pets'
    const { fields, append } = useFieldArray({
        control,
        name: prependKey,
    })

    const options = [
        { label: 'dog', value: 'dog' },
        { label: 'cat', value: 'cat' },
        { label: 'bird', value: 'bird' },
        { label: 'fish', value: 'fish' },
    ]
    return (
        <Grid item xs={12}>
            {fields.length > 0 &&
                fields.map((field, index) => {
                    // useFieldArray automatically appends an id onto field items
                    // omits need for mapping over data to append and remove ids when interacting with incoming and outgoing data
                    return (
                        <Stack
                            direction="row"
                            spacing={2}
                            key={field.id}
                            className="form-field"
                        >
                            <TextField
                                select
                                fullWidth
                                label="Select"
                                value={
                                    getValues(`${prependKey}.${index}.type`) ||
                                    ''
                                }
                                {...register(`pets.${index}.type`, {
                                    onChange: (e) =>
                                        setValue(
                                            `pets.${index}.type`,
                                            e.target.value,
                                            {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            }
                                        ),
                                })}
                            >
                                {options.map((option) => {
                                    return (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    )
                                })}
                            </TextField>

                            <TextField
                                name={`pets.${index}.name`}
                                label="Pet Name"
                                placeholder="Name"
                                {...register(`pets.${index}.name`)}
                            />
                        </Stack>
                    )
                })}
            <Button onClick={() => append({ type: '', name: '' })}>
                Add Pet
            </Button>
        </Grid>
    )
}
