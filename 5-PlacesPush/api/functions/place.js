const admin = require("firebase-admin");
const axios = require("axios");

const printError = (response, err) => {
  functions.logger.error("/place failed", err);
  response.send(err.message);
};

const createOrUpdatePlace = (placeId, body, response) => {
  const placesCollection = admin.firestore().collection("places");

  placesCollection
    .doc(placeId)
    .set(body, { merge: true })
    .then(() =>
      placesCollection
        .doc(placeId)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            response.status(404).send("Place not found");
          } else {
            response.send(doc.data());
          }
        })
    )
    .catch((err) => printError(response, err));
};

const deletePlace = (placeId, response) => {
  const placesCollection = admin.firestore().collection("places");

  placesCollection
    .doc(placeId)
    .delete()
    .then(() => response.send("Place successfully deleted"))
    .catch((err) => printError(response, err));
};

const sendPushToOthers = (place) => {
  const usersCollection = admin.firestore().collection("users");
  usersCollection.get().then((snapshot) => {
    const users = [];
    snapshot.forEach((userDoc) => {
      const user = userDoc.data();
      users.push(user);
    });
    const creator = users.find((u) => u.id === place.userId);
    const others = users.filter((u) => u.id !== place.userId);
    others.forEach((user) => {
      if (!user.token) return;
      const pushTitle = `Nouveau lieu par ${
        creator.name || `Utilisateur${creator.id}`
      }`;
      const pushBody = `Le lieu concerné est : ${place.place.name}`;
      const { token } = user;
      const message = {
        to: token,
        title: pushTitle,
        body: pushBody,
        data: { place },
      };
      console.log("Sending a push!", message);
      axios.post("https://exp.host/--/api/v2/push/send", message, {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      });
    });
  });
};

const place = (request, response) => {
  const placeId = request.query.placeId;
  if (!placeId) response.send("PlaceId is missing");
  else {
    switch (request.method) {
      case "POST":
        console.log("Creating place...");
        // Create Place
        createOrUpdatePlace(placeId, request.body, response);
        // Send push to all users except the creator
        sendPushToOthers(request.body);
        break;
      case "PATCH":
        // Update Place
        createOrUpdatePlace(placeId, request.body, response);
        break;
      case "DELETE":
        // Delete Place
        deletePlace(placeId, response);
        break;
      default:
        response.send("Unsupported method");
    }
  }
};

module.exports = place;
