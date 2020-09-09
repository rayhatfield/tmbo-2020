const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// const {api} = require('./api');

// exports.api = functions.https.onRequest(api);

// exports.addComment = functions.https.onRequest(async (req, res) => {
//     const { postId, comment } = req.query;
//     const result = await admin.firestore()
//         .collection('posts')
//         .doc(postId)
//         .collection('comments')
//         .add({
//             date: Date.now(),
//             comment
//         });
//     res.json({ result: JSON.stringify(result) });
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export const addMessage = functions.https.onRequest(async (req, res) => {
//     const original = req.query.text;
// })

// exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
//     console.log(`  Event: ${context.eventId}`);
//     console.log(`  Event Type: ${context.eventType}`);
//     console.log(`  Bucket: ${file.bucket}`);
//     console.log(`  File: ${file.name}`);
//     console.log(`  Metageneration: ${file.metageneration}`);
//     console.log(`  Created: ${file.timeCreated}`);
//     console.log(`  Updated: ${file.updated}`);
// });
