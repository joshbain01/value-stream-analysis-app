const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.monitorValueStreamMaps = functions.firestore
  .document('valueStreamMaps/{mapId}')
  .onWrite((change, context) => {
    const mapId = context.params.mapId;

    if (change.before.exists && change.after.exists) {
      // Document updated
      console.log(`Value Stream Map ${mapId} updated.`);
    } else if (!change.before.exists && change.after.exists) {
      // Document created
      console.log(`Value Stream Map ${mapId} created.`);
    } else if (change.before.exists && !change.after.exists) {
      // Document deleted
      console.log(`Value Stream Map ${mapId} deleted.`);
    }

    return null;
  });
