const functions = require("firebase-functions");
const admin = require("firebase-admin");
const place = require("./place");

admin.initializeApp();

exports.places = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    try {
      const userId = request.query.userId;
      admin
        .firestore()
        .collection("places")
        .get()
        .then((snapshot) => {
          const result = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userId === userId) {
              result.push(data);
            }
          });
          response.send(result);
        });
    } catch (err) {
      functions.logger.error("/places failed", err);
      response.send(err.message);
    }
  });

exports.place = functions
  .region("europe-west1")
  .https.onRequest(place);

exports.user = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    const userId = request.query.userId;
    const body = request.body;

    const usersCollection = admin.firestore().collection("users");

    usersCollection
      .doc(userId)
      .set(body, { merge: true })
      .then(() =>
        usersCollection
          .doc(userId)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              response.status(404).send("User not found");
            } else {
              response.send(doc.data());
            }
          })
      )
      .catch((err) => {
        functions.logger.error("/user failed", err);
        response.send(err.message);
      });
  });
