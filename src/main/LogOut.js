import React from 'react';

import { useClient } from '../api';
import { useUser } from '../auth';

export default function LogOut (props) {
    const client = useClient();
    const user = useUser();

    return !user ? null : (
        <button onClick={() => client.logOut()}>Log Out</button>
    );
}
