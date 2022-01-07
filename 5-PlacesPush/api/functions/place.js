const admin = require("firebase-admin");

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

const place = (request, response) => {
  const placeId = request.query.placeId;
  if (!placeId) response.send("PlaceId is missing");
  else {
    switch (request.method) {
      case "POST":
        // Create Place
        createOrUpdatePlace(placeId, request.body, response);
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
