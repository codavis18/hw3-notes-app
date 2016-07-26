import firebase from 'firebase';
// to get firebasedb.fetchNotes etc...

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCtdY-38zKjRc46vm1dzOTqDqpQHaRXWUw',
  authDomain: 'postit-1e1ee.firebaseapp.com',
  databaseURL: 'https://postit-1e1ee.firebaseio.com',
  storageBucket: 'postit-1e1ee.appspot.com',
};

firebase.initializeApp(config);

const db = firebase.database();

export function add(note) {
  db.ref('notes').push(note);
}

export function destroy(id) {
  db.ref('notes').child(id).remove();
}

export function update(id, fields) {
  db.ref('notes').child(id).update(fields);
}

export function fetchNotes(fetchState) {
  db.ref('notes').on('value', (snapshot) => {
    fetchState(snapshot.val());
  });
}
