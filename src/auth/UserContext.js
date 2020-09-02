import React, { createContext, useContext, useEffect, useState } from 'react';

import { useClient, EVENTS } from '../api';

const Context = createContext();

export const useUser = () => useContext(Context);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const client = useClient();

    useEffect(() => {
        client.on(EVENTS.AUTH_STATE_CHANGED, setUser);
        return () => client.off(EVENTS.AUTH_STATE_CHANGED, setUser);
    }, [client]);

    return (
        <Context.Provider value={user}>
            { children }
        </Context.Provider>
    );
}
