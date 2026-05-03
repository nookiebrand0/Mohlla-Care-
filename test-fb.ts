import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function test() {
  try {
    await getDocFromServer(doc(db, 'test', 'test'));
    console.log("Success");
    process.exit(0);
  } catch (e) {
    console.error("Error connecting:");
    console.error(e);
    process.exit(1);
  }
}
test();
