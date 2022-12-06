import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Card = ({ title, idNote, description, status, onClickDelete, onClickUpdate }) => {

  const [edit, setEdit] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [statusInput, setStatusInput] = useState(status);

  const deleteNote = () => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta nota?',
      text: "Si la eliminas, no se recuperará",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        onClickDelete(idNote);
      }
    })
  }

  const editNote = () => {
    setEdit(true);
  }

  const saveEditNote = () => {
    setEdit(false);
    let statusFinal = true;
    if (statusInput === 'Completado') {
      statusFinal = true;
      setStatusInput(true);
    } else {
      statusFinal = false;
      setStatusInput(false);
    }
    onClickUpdate(titleInput, descriptionInput, statusFinal, idNote);
    Swal.fire(
      'Nota Editada!',
      'Su nota se editó correctamente.',
      'success'
    )
  }

  const changeInput = (e, input) => {
    const value = e.target.value;

    if (input === 'title') {
      setTitleInput(value);
    } else if (input === 'description') {
      setDescriptionInput(value);
    } else {
      setStatusInput(value);
    }
  }

  return (
    <div className={status === false ? `cardElement cardElement__status--noCompleted` : `cardElement cardElement__status--completed`}>
      <div className='cardElement__title'>

        {edit === true ? (
          <input type="text" onChange={(e) => changeInput(e, 'title')} value={titleInput}></input>
        ) : <h3>{titleInput}</h3>}
        <div className='cardElement__buttons'>
          <i className="bi bi-pencil-fill" onClick={() => editNote()}></i>
          <i className="bi bi-trash-fill" onClick={() => deleteNote()}></i>
        </div>
      </div>
      <hr></hr>
      {edit === true ? (
        <textarea onChange={(e) => changeInput(e, 'description')} value={descriptionInput}></textarea>
      ) : <p>{descriptionInput}</p>}

      {edit === true ? (
        <select onChange={(e) => changeInput(e, 'status')} value={statusInput}>
          <option name="completed">Completado</option>
          <option name="noCompleted">No Completado</option>
        </select>
      ) : <p>{statusInput === true ? 'Completado' : 'No completado'}</p>}
      <div className="cardElement__saveButton">
        {edit === true ? <button onClick={() => saveEditNote()} className="btn btn-info">Guardar</button> : null}
      </div>
      
    </div>
  )
}

export default Card;