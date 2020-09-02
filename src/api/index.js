import { createContext, useContext } from 'react';

import firebaseConfig from '../config/firebase';

import firebaseClient from './impl/firebase';
import * as EVENTS from './events';

const client = firebaseClient(firebaseConfig);

export const ClientContext = createContext(client);
export const useClient = () => useContext(ClientContext);

export { EVENTS };
