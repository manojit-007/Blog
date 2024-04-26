/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import UserContextApi from "./UserContextApi";

const UserContextApiProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return <UserContextApi.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContextApi.Provider>;
};

export default UserContextApiProvider;
