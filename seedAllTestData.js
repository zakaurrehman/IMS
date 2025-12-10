const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK (uses your local credentials)
initializeApp({ credential: applicationDefault() });
const db = getFirestore();

// CHANGE THIS to your test user's uidCollection (e.g., 'testCompany123')
const uidCollection = 'your_uidCollection_here';

async function seed() {
  // Company info
  await db.collection(uidCollection).doc('cmpnyData').set({
    name: 'Test Company',
    lng: 'English',
    logolink: '/logo/imsLogo.png'
  });

  // Settings (all dropdowns)
  await db.collection(uidCollection).doc('settings').set({
    Supplier: { Supplier: [{ id: 'sup1', nname: 'Supplier 1' }] },
    Client: { Client: [{ id: 'cli1', nname: 'Client 1' }] },
    'Bank Account': { 'Bank Account': [{ id: 'bank1', bankNname: 'Bank 1' }] },
    Currency: { Currency: [{ id: 'usd', cur: 'USD' }] },
    'Container Type': { 'Container Type': [{ id: 'cont1', containerType: '20ft' }] },
    // Add more dropdowns as needed for your app
  });

  // Example contract
  await db.collection(uidCollection)
    .doc('data')
    .collection('contracts_2025')
    .doc('contract1')
    .set({
      id: 'contract1',
      order: 'PO123',
      supplier: 'sup1',
      date: '2025-12-09',
      productsData: [],
      // ...other contract fields as needed
    });

  // Example invoice
  await db.collection(uidCollection)
    .doc('data')
    .collection('invoices_2025')
    .doc('invoice1')
    .set({
      id: 'invoice1',
      client: 'cli1',
      date: '2025-12-09',
      // ...other invoice fields as needed
    });

  console.log('All test data seeded!');
}

seed();
