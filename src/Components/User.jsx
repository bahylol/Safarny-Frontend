import React from 'react'

const User = ({ avatar, userName }) => {
    return (
        <div className="flex items-center space-x-4 shadow-lg">
            <img src={avatar} alt={`${userName}'s avatar`} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold">{userName}</p>
            </div>
        </div>
    )
}

export default User