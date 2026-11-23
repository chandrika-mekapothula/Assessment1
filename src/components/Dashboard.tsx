import React, { useEffect, useState } from 'react'
import UserList from './UserList'
import UserDetails from './UserDetails'
import type { User } from '../types/UserProps.type'

const Dashboard = () => {
    const [userData, setUserData] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [selectedUser, setselectedUser] = useState<User | null>(null)
    const [inputUser, setInputUser] = useState<string>("")
    const [selectedCity, setSelectedCity] = useState<string>("All");
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
    const cities = [
        "ALL", ...new Set(userData.map((user) => user.address.city)),
        //set is used to remove the duplicates /repetitive city from the city list
    ]

    //Search and Filter
    const filteredUsers = userData.filter((user) => {
        const searchvalue = inputUser.toLowerCase().trim()
        const filterinput = user.name.toLowerCase().includes(searchvalue) ||
            user.username.toLowerCase().includes(searchvalue) ||
            user.email.toLowerCase().includes(searchvalue)
        const filterCity = user.address.city.toLowerCase().includes(selectedCity.toLowerCase())
        return filterinput && filterCity
    })
    useEffect(() => {
        fetchUsers();
    }, [])
    if (loading) {
        return <h1>Loading Details...</h1>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }
    const resetButton = () => {
        setInputUser("")
        setSelectedCity("All")
        setselectedUser(null)
    }
    return (
        <>

            <h1>Users Data</h1>
            <div>
                <input
                    type='user'
                    placeholder='Search by User, UserName or Email'
                    value={inputUser}
                    onChange={(e) => setInputUser(e.target.value)}
                />
                <select value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}>
                    {
                        cities.map((city) => (
                            <option>
                                {city}
                            </option>
                        ))
                    }
                </select>
                <button onClick={resetButton}>Reset</button>

            </div>

            <div className='UserDetails'>
                <UserList users={filteredUsers} onSelectUser={setselectedUser} />
                {
                    selectedUser && <UserDetails user={selectedUser} />
                }
            </div>
        </>

    )
}

export default Dashboard