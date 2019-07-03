const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const createdAt = functions.firestore
  .document("rooms/{userId}/messages/{messageId}")
  .onCreate(snapshot => {
    return snapshot.ref.set(
      {
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });

module.exports = createdAt;
