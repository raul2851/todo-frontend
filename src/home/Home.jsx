import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '_components/Card';
import axios from 'axios';

import { authActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    // const { notes: notes } = useSelector(x => x.notes);

    useEffect(() => {
        /*axios.get(process.env.REACT_APP_API_URL + '/api/notes/allnotes', {id_user: authUser.id_user}).then((response) => {
            console.log(response.data);
        });*/

        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/api/notes/allnotes',
            data: {
                id_user: authUser.id_user,
                user: '11',
            }
          });
    }, []);

    return (
        <div id="template__page">
            <h1>Bienvenido {authUser?.name}!</h1>
            <p>Estas son tus notas pendientes:</p>
            <div className='template__card'>
                <Card title="titulo 1" description="Descripcion de la card 1" status="noCompleted" />
                <Card title="titulo 2" description="Descripcion de la card 2" status="noCompleted" />
                <Card title="titulo 3" description="Descripcion de la card 3" status="completed" />
                <Card title="titulo 4" description="Descripcion de la card 4" status="noCompleted" />
                <Card title="titulo 5" description="Descripcion de la card 5" status="completed" />
                <Card title="titulo 6" description="Descripcion de la card 6" status="completed" />
            </div>
        </div>
    );
}
