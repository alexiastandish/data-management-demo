import React, { useEffect } from 'react'
import './App.css'
import { fetchUserAsync } from './features/user/user-slice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useSelector } from 'react-redux'
import { selectUserLoaded } from './features/user/user-selectors'
import UserForm from './features/user/UserForm'

function App() {
    const dispatch = useAppDispatch()
    const userInitialized = useAppSelector(selectUserLoaded)

    useEffect(() => {
        dispatch(fetchUserAsync(11))
    }, [])
    return (
        <div className="App">
            {userInitialized ? <UserForm /> : <>Loading</>}
        </div>
    )
}

export default App
