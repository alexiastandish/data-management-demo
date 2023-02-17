import React from 'react'
import styles from './SaveBar.module.css'
import Button from '@mui/material/Button'
import { UserForm } from '../../types/form-types'

export default function SaveBar({
    isDirty,
    reset,
    onSubmit,
    defaultValues,
}: {
    isDirty: boolean
    reset: any
    onSubmit: React.MouseEventHandler<HTMLButtonElement>
    defaultValues: UserForm
}) {
    return (
        <div className={styles.saveBar}>
            <Button
                variant="contained"
                disabled={!isDirty}
                type="button"
                onClick={onSubmit}
            >
                Save
            </Button>
            <Button
                variant="outlined"
                disabled={!isDirty}
                type="button"
                onClick={() => {
                    reset(defaultValues)
                }}
            >
                Discard
            </Button>
        </div>
    )
}
