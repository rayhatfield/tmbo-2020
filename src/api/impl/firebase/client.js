import Emitter from 'events';

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
    constructor (firebase) {
        super();
        this.firebase = firebase;
        this.db = firebase.firestore();
        this.firebase.auth().onAuthStateChanged(user => this.emit(EVENTS.AUTH_STATE_CHANGED, user))
    }

    async upload (file) {
        const storageRef = this.firebase.storage().ref();
        const uploadRef = storageRef.child(getImagePath()).child(`${Date.now()}.jpg`);
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
            this.firebase.auth().signInWithEmailAndPassword(email, password);
        }
        catch (e) {
            console.log('nope');
            console.log(e.message);
            throw e;
        }
    }

    logOut () {
        this.firebase.auth().signOut();
    }

    async posts (start = 0, limit = 10) {
        return this.db.collection('posts')
            .orderBy('date', 'desc')
            .limit(limit)
            .get();
    }

    async comments (postId, start = 0, limit = 200) {
        return this.db.doc(`/posts/${postId}`)
            .collection('comments')
            .orderBy('date', 'asc')
            .limit(limit)
            .get();
    }

    async post (title = 'what') {
        const p = await this.db.collection('posts').add({
            title,
            date: Date.now()
        });
        return p.get();
    }

    async comment (postId, comment) {
        const c = await this.db.collection('posts').doc(postId).collection('comments').add({
            date: Date.now(),
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
