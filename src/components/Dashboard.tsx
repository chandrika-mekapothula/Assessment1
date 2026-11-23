import React, { useEffect, useState } from 'react'
import UserList from './UserList'
import UserDetails from './UserDetails'
import type { User } from '../types/UserProps.type'

const Dashboard = () => {
    const [userData, setUserData] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [selectedUser, setselectedUser] = useState<User | null>(null)
    const fetchUsers = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json();
            setUserData(data)
        } catch (err) {
            setError(`something went wrong..!!!${err}`);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <>
            {
                loading ? (
                    <div><h1>Loading Details</h1></div>
                ) : (
                    <>
                        <h1>Users Data</h1>
                        <div className='UserDetails'>
                            <UserList users={userData} onSelectUser={setselectedUser} />
                            {
                                selectedUser && <UserDetails user={selectedUser} />
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Dashboard