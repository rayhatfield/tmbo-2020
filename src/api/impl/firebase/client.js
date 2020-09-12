import Emitter from 'events';

import mime from 'mime/lite';
import slugify from 'slugify';
import * as firebase from 'firebase';

import { EVENTS } from '../../';

const pad = v => `${v}`.padStart(2, '0');

const extReg = /\.(jpg|gif|png)$/; // mime returns '.jpeg'; allow/prefer '.jpg'
const withExtension = (name, ext) => (
    name.endsWith(ext) || extReg.test(name)
        ? name
        : `${name}.${ext}`
);

const BASE_IMAGE_STORAGE_PATH = 'uploads/images';
const UPLOADS_COLLECTION = 'discussions';

const getImagePath = () => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = pad(today.getUTCMonth() + 1);
    const date = pad(today.getUTCDate());
    return [BASE_IMAGE_STORAGE_PATH, year, month, date].join('/');
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

    async upload (file, title = file.name) {
        const extension = mime.getExtension(file.type);
        const storageRef = this.app.storage().ref();

        const filename = slugify(`${Date.now()}-${withExtension(title, extension)}`, '-');
        const uploadRef = storageRef.child(getImagePath()).child(filename);
        const uid = this.app.auth().getUid();
        const metadata = {
            customMetadata: {
                uid,
                title
            }
        }
        try {
            const uploadTask = uploadRef.put(file, metadata);
            uploadTask.on('state_changed',
                // next
                snapshot => {
                    const { state, bytesTransferred, totalBytes } = snapshot;
                    console.log(state, bytesTransferred, totalBytes, (bytesTransferred / totalBytes * 100) + '%')
                },
                // error
                error => console.log(error),
                // complete
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('File available at', downloadURL);
                    const result = await this.createImageDiscussion({
                        id: filename,
                        path: uploadRef.fullPath,
                        title,
                    });
                    console.log(result);
                },
            )
        }
        catch (e) {
            console.log(e);
            throw e;
        }

    }

    async createImageDiscussion ({ id, path, title }) {
        return this.db.collection(UPLOADS_COLLECTION).doc(id).set({
            ...this.commonFields(),
            path,
            title,
        });
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

    async imageList (limit = 100) {
        return this.db.collection(UPLOADS_COLLECTION)
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
    }

    async posts (type, start = 0, limit = 10) {
        console.log(type);
        return type === 'image'
            ? this.imageList()
            : this.db.collection('posts')
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
