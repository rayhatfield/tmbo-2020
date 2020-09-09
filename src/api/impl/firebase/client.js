import Emitter from 'events';

import * as firebase from 'firebase';

import { EVENTS } from '../../';

const pad = v => `${v}`.padStart(2, '0');

const BASE_IMAGE_PATH = 'uploads/images'

const getImagePath = () => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = pad(today.getUTCMonth() + 1);
    const date = pad(today.getUTCDate());
    return [BASE_IMAGE_PATH, year, month, date].join('/');
}

export default class TmboFirebaseClient extends Emitter {
    constructor (app) {
        super();
        this.app = app;
        this.db = app.firestore();
        this.app.auth().onAuthStateChanged(user => this.emit(EVENTS.AUTH_STATE_CHANGED, user));
    }

    commonFields = () => ({
        uid: this.app.auth().getUid(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    async upload (file) {
        const storageRef = this.app.storage().ref();
        const filename = `${Date.now()}-${this.app.auth().getUid()}`;
        const uploadRef = storageRef.child(getImagePath()).child(filename);
        try {
            const uploadTask = uploadRef.put(file);
            uploadTask.on('state_changed',
                snapshot => console.log(snapshot.state), // progress, etc
                error => console.log(error), // error
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('File available at', downloadURL);
                },
            )
        }
        catch (e) {
            console.log(e);
            throw e;
        }

    }

    async logIn (email, password) {
        try {
            this.app.auth().signInWithEmailAndPassword(email, password);
        }
        catch (e) {
            console.log('nope');
            console.log(e.message);
            throw e;
        }
    }

    logOut () {
        this.app.auth().signOut();
    }

    async posts (start = 0, limit = 10) {
        return this.db.collection('posts')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
    }

    async comments (postId, start = 0, limit = 200) {
        return this.db.doc(`/posts/${postId}`)
            .collection('comments')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
    }

    async post (title = 'what') {
        const p = await this.db.collection('posts').add({
            ...this.commonFields(),
            title,
        });
        return p.get();
    }

    async comment (postId, comment) {
        const c = await this.db.collection('posts').doc(postId).collection('comments').add({
            ...this.commonFields(),
            comment
        });
        return c.get();
        // this.db.runTransaction(async (transaction) => {
        //     const doc = await transaction
        //         .get(post)
        //         .collection('comments')
        //         .add({
        //             date: Date.now(),
        //             comment
        //         })
        //     console.log(doc.data());
        //     return doc.data();
        // });
    }
}
