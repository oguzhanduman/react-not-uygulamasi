import React, { useState } from 'react';

function NoteForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className='notEkle'>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" className='notEkleBaslik' />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Not" className='notEkleIcerik' />
            <button type="submit" className='notEkleButonu'>Not Ekle</button>
        </form>
    );
}

export default NoteForm;