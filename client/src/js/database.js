import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () => {
  // Check if the 'jate' database already exists
  const dbExists = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        // If it doesn't exist, create the 'jate' object store
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
};

// Function to update data in the database
export const putDb = async (content) => {
  console.log('Put to the database');

  // Create a connection to the 'jate' database with version 1
  const jateDb = await openDB('jate', 1);

  // Start a read-write transaction
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the 'jate' object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update data with the provided content
  const request = store.put({ content });

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('🚀 - Data saved to the database', result);
};

// Function to retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the 'jate' database with version 1
  const jateDb = await openDB('jate', 1);

  // Start a read-only transaction
  const tx = jateDb.transaction('jate', 'readonly');

  // Open the 'jate' object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to retrieve all data in the database
  const request = store.getAll();

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('Retrieved data from the database', result);
  return result;
};

// Initialize the database
initdb();
