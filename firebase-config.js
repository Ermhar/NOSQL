// firebase-config.js 
const admin = require('firebase-admin'); 
const serviceAccount = require('./dbms-nosql-firebase-adminsdk-fbsvc-e7a16e8069.json'); // Make sure this matches your downloaded filename 
// Initialize the Firebase Admin SDK with your service account credentials. 
// This allows your Node.js server to securely interact with Firebase services. 
admin.initializeApp({ 
credential: admin.credential.cert(serviceAccount) 
}); 
// Get a reference to the Firestore database. 
const db = admin.firestore(); 
// Export the Firestore database instance so it can be used in other files (e.g., index.js). 
module.exports = db; 