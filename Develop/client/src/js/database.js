import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Add the content to the database
  await store.add({ content });

  await tx.done;
};

const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve all content from the database
  const allContent = await store.getAll();

  await tx.done;

  return allContent;
};

(async () => {
  // Initialize the database
  await initdb();

  // Example of adding content to the database
  await putDb('Example Content 1');
  await putDb('Example Content 2');

  // Example of retrieving all content from the database
  const contentList = await getDb();
  console.log('Content from the database:', contentList);
})();
