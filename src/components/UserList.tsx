import React, { useEffect, useState } from 'react'
import type { User } from '../types/UserProps.type'
type UserListProps = {
    users: User[];
    onSelectUser: (user:User) => void
}

const UserList = ({ users, onSelectUser }:UserListProps) => {
   
    return (
        <>
            {/* <div><h1>User Details</h1></div> */}
            <div className='Users'>
                {
                    users.map((user: User, id: number) => (
                        <div key={id} className='UsersData'>
                            <p>Name: {user.name}</p>
                            <p>Mail:{user.email}</p>
                            <button onClick={()=>onSelectUser(user)}>More Details</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default UserList