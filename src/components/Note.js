import React, { useState } from 'react';

function Note({ note, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleUpdate = (e) => {
        e.preventDefault();
        onUpdate(note.id, { title, content });
        setEditing(false);
    };

    const handleDelete = () => {
        onDelete(note.id);
    };

    return (
        <div className='notItem'>
            {editing ? (
                <form onSubmit={handleUpdate} className='notDuzenle'>
                    <div className='notDuzenleText'>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='notDuzenleBaslik' />
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className='notDuzenleIcerik' />
                    </div>
                    <div className='notDuzenleButton'>
                        <button type="submit" className='kaydetButonu'>Kaydet</button>
                        <button onClick={() => setEditing(false)} className='vazgecButonu'>Vazgeç</button>
                    </div>
                </form>
            ) : (
                <div className='notItemDetail'>
                    <div className='notItemDetailText'>
                        <h2 className='notItemDetailTextTitle'>{note.title}</h2>
                        <p className='notItemDetailTextContent'>{note.content}</p>
                    </div>
                    <div className='notItemDetailButton'>
                        <button onClick={() => setEditing(true)} className='duzenleButonu'>Düzenle</button>
                        <button onClick={handleDelete} className='silButonu'>Sil</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Note;