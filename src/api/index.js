import { createContext, useContext } from 'react';

import firebaseConfig from '../config/firebase';

import firebaseClient from './impl/firebase';

const client = firebaseClient(firebaseConfig);

export const ClientContext = createContext(client);
export const useClient = () => useContext(ClientContext);
