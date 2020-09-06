import * as firebase from 'firebase';

import Client from './client';

export default (config) => {
    const app = firebase.initializeApp(config);
    return new Client(app);
}
