import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { UserForm } from '../../types/form-types'
import { User } from '../../types/api-types'
import { fetchUser } from './user-api'
import axios from 'axios'

export interface UserState {
    // or api types in dashboard
    data: User
    status: 'idle' | 'loading' | 'failed'
}

const initialState: UserState = {
    data: {
        id: null,
        username: '',
        email: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: '',
        },
        flavor: '',
        petIds: [],
    },
    status: 'loading',
}

export const fetchUserAsync = createAsyncThunk(
    'user/fetchUser',
    async (id: number) => {
        const response = await fetchUser(id)
        return response.data
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (values: UserForm, { getState }) => {
        const state = getState() as RootState

        const petIds = values.pets.map((pet) => pet.id)

        const userResponse: User = {
            ...state.user.data,
            flavor: values.flavor.value,
            id: state.user.data.id,
            website: values.website,
            company: { ...state.user.data.company, name: values.company },
            petIds: petIds,
        }

        const res = await axios.put(
            `http://localhost:4000/users/${state.user.data.id}`,
            userResponse
        )

        return res.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserAsync.fulfilled, (state, { payload }) => {
                state.status = 'idle'
                state.data = {
                    id: payload.id,
                    username: payload.username,
                    email: payload.email,
                    website: payload.website,
                    company: payload.company,
                    flavor: payload?.flavor || '',
                    petIds: payload.petIds || [],
                }
            })
            .addCase(fetchUserAsync.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.status = 'idle'
                state.data = {
                    id: payload.id,
                    username: payload.username,
                    email: payload.email,
                    website: payload.website,
                    company: payload.company,
                    flavor: payload?.flavor || '',
                    petIds: payload.petIds || [],
                }
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export default userSlice.reducer
