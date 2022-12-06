import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Card = ({ title, description, status }) => {

  const [edit, setEdit] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);

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
        Swal.fire(
          'Nota eliminada!',
          'Su nota se eliminó correctamente.',
          'success'
        )
      }
    })
  }

  const editNote = () => {
    setEdit(true);
  }

  const saveEditNote = () => {
    setEdit(false);
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
    } else {
      setDescriptionInput(value);
    }
  }

  return (
    <div className={`cardElement cardElement__status--${status}`}>
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
      <p>{status === 'completed' ? 'Completado' : 'No completado'}</p>
      {edit === true ? <button onClick={() => saveEditNote()} className="btn-info">Guardar</button> : null}
    </div>
  )
}

export default Card;