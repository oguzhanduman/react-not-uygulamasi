import React, { useState, useEffect } from 'react';
import firebase, { auth, db } from "./firebase";
import "./App.css";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";


function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const notesRef = db.collection('notes').where('userId', '==', user.uid);
        const unsubscribe = notesRef.onSnapshot((snapshot) => {
          const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setNotes(notes);
        });
        return unsubscribe;
      } else {
        setNotes([]);
      }
    });
    return unsubscribe;
  }, []);


  const addNote = async (note) => {
    await db.collection('notes').add({
      userId: user.uid,
      ...note
    });
  };

  const updateNote = async (id, note) => {
    await db.collection('notes').doc(id).update(note);
  };

  const deleteNote = async (id) => {
    await db.collection('notes').doc(id).delete();
  };

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className='container'>
      {user ? (
        <div className='notlarim'>
          <div className='notlarimHeader'>
            <p className='notlarimBaslik'>Notlarım</p>
            <button onClick={handleLogout} className='cikisButonu'>Çıkış</button>
          </div>
          <NoteForm onSubmit={addNote} />
          <div className='notGrid'>
            {notes.map((note) => (
              <Note key={note.id} note={note} onUpdate={updateNote} onDelete={deleteNote} />
            ))}
          </div>

        </div>
      ) : (
        <div className='girisContainer'>
          <button onClick={handleLogin} className='girisButonu'>Google ile Giriş</button>
        </div>
      )}
    </div>
  );
}

export default App;
