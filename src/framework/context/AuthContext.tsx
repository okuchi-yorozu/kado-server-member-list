import React from 'react';
import {createContext, useContext, useEffect, useState} from "react";
import {User} from "../common/User";
import {onAuthStateChanged} from "../firebase/auth";

type AuthContextProps = {
    currentUser: User | null | undefined;
}

const AuthContext = createContext<AuthContextProps>({currentUser: undefined});

export const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
        onAuthStateChanged((user) => {
            setCurrentUser(user);
        })
    }, [])

    return (
        <AuthContext.Provider value={{currentUser: currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext)