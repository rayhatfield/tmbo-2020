export default class TmboFirebaseClient {
    constructor (firebase) {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    async posts () {
        return this.db.collection('posts').get();
    }

    async post (title) {
        const p = await this.db.collection('posts').add({
            title: 'what',
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
