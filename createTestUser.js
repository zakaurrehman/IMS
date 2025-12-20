// createTestUser.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // make sure path is correct

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Test user info
const email = "testuser@example.com"; // your test email
const password = "Test1234"; // test password

// Create user
admin.auth().createUser({
  email: email,
  password: password,
})
.then(userRecord => {
  console.log("✅ Successfully created new user:", userRecord.uid);
})
.catch(error => {
  console.error("❌ Error creating new user:", error);
});
