import React, { createContext, useState, useContext } from 'react';

/**
 * Estados:
 * UserCredentials
 * isAuthenticated
 */

export const ChoresAuthContext = createContext();
export const ChoresAuthUpdateContext = createContext();
export const ChoresUserContext = createContext();

export const useChoresAuth = () => {
    return useContext(ChoresAuthContext);
}

export const useChoresAuthUpdateContext = () => {
    return useContext(ChoresAuthUpdateContext);
}

export const useChoresUserContext = () => useContext(ChoresUserContext);

export const ChoresAuthProvider = ({ children }) => {

    const initialProfileInfo = {
        displayName: "",
        profilePhotoPath: "",
        photoUrl: ""
    }

    const [userStatus, setUserStatus] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileInfo, setProfileInfo] = useState(initialProfileInfo);

    return (
        <ChoresAuthContext.Provider value={[userStatus, setUserStatus]}>
            <ChoresAuthUpdateContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
                <ChoresUserContext.Provider value={[profileInfo, setProfileInfo]}>
                    {children}
                </ChoresUserContext.Provider>
            </ChoresAuthUpdateContext.Provider>
        </ChoresAuthContext.Provider>
    )
};