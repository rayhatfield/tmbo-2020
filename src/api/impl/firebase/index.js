import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import Client from './client';

export default (config) => {
    const app = firebase.initializeApp(config);
    // if (global.location.hostname === "localhost") {
    //     firebase.firestore().settings({
    //         host: "localhost:8080",
    //         ssl: false
    //     });
    // }
    return new Client(app);
}
