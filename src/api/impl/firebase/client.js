import Emitter from 'events';

import { EVENTS } from '../../';

export default class TmboFirebaseClient extends Emitter {
    constructor (firebase) {
        super();
        this.firebase = firebase;
        this.db = firebase.firestore();
        this.firebase.auth().onAuthStateChanged(user => this.emit(EVENTS.AUTH_STATE_CHANGED, user))
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
