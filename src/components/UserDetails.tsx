import React, { useEffect } from 'react'
import type { User } from '../types/UserProps.type'
type userDetailsProps = {
    user: User
}

const UserDetails = ({ user }: userDetailsProps) => {
    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <>
            {
                user ? (
                    <div className='userDetailLayout'>
                        <h3> Id:{user.id}</h3>
                        <h4>Name:{user.name}</h4>
                        <h4> UserName:{user.username}</h4>
                        <h4>     EmailId:{user.email}</h4>
                        <h4> City:{user.address.city}</h4>

                    </div>
                ) : (
                    <h3>No User Selected</h3>
                )
            }
        </>

    )
}

export default UserDetails