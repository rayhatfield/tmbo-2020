import * as firebase from 'firebase';

import Client from './client';

export default (config) => {
    const app = firebase.initializeApp(config);
    const client = new Client(app);
    window.tmbo = client;
    return new Client(app);
}
