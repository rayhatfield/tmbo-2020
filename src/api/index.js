import { createContext, useContext } from 'react';

import firebaseConfig from '../config/firebase';

import firebaseClient from './impl/firebase';
import * as EVENTS from './events';

const welcome = () => {
    if (!welcome.called) {
        console.log('%c[+] tmbo client is exposed here for testing/debugging purposes. don’t do anything dumb.', 'color:#669;font-weight:bold');
        welcome.called = true;
    }
}

const client = firebaseClient(firebaseConfig);
Object.defineProperty(window, 'tmbo', {
    get: () => {
        welcome();
        return client;
    }
})

export const ClientContext = createContext(client);
export const useClient = () => useContext(ClientContext);

export { EVENTS };
