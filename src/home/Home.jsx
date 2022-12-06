import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '_components/Card';
import axios from 'axios';
export { Home };

function Home() {
    const { user: authUser } = useSelector(x => x.auth);
    const [notes, setNotes] = useState([]);

    const onClickDeleteNote = (idNote) => {
        axios.post(process.env.REACT_APP_API_URL + '/api/notes/deletenote', { id_note: idNote }).then((response) => {
            getAllNotes();
        });
    }

    const getAllNotes = () => {
        axios.post(process.env.REACT_APP_API_URL + '/api/notes/allnotes', { id_user: authUser.id }).then((response) => {
            setNotes(response.data);
        });
    }

    const updateNote = (title, description, status, idNote) => {
        axios.post(process.env.REACT_APP_API_URL + '/api/notes/updatenote', { id_note: idNote, title: title, description: description, completed: status }).then((response) => {
            getAllNotes();
        });
    }

    useEffect(() => {
        getAllNotes()
    }, []);

    return (
        <div id="template__page">
            <h1>Bienvenido {authUser?.name}!</h1>
            <p>Estas son tus notas pendientes:</p>
            {notes.length === 0 ? <p>No hay notas disponibles, crea una</p> : (
                <div className='template__card'>
                    {notes.map((note) => (
                        <Card key={note._id} title={note.title} onClickUpdate={updateNote} idNote={note._id} onClickDelete={onClickDeleteNote} description={note.description} status={note.completed} />
                    ))}
                </div>
            )}

        </div>
    );
}
