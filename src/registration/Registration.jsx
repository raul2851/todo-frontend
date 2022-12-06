import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { history } from '_helpers';
import { authActions } from '_store';

export { Registration };

function Registration() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        if (authUser) history.navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('El usuario es requerido'),
        name: Yup.string().required('El nombre es requerido'),
        surname: Yup.string().required('El apellido es requerido'),
        email: Yup.string().required('El correo electronico es requerido'),
        password: Yup.string().required('La contraseña es requerida'),
        repassword: Yup.string().required('La contraseña es requerida'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password, name, surname, email, repassword }) {
        dispatch(authActions.register({ username, password, name, surname, email, repassword }));
        Swal.fire(
            'Registrado con exito!',
            'Se ha registrado con exito.',
            'success'
        )
        history.navigate('/login');
    }

    return (
        <div className="col-md-6 w-6 offset-md-3 mt-5 w-100" id="template__page">
            <div className="card">
                <h4 className="card-header">Registrate en NotasApp</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Nombre de usuario * </label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Nombre * </label>
                            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Apellidos * </label>
                            <input name="surname" type="text" {...register('surname')} className={`form-control ${errors.surname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.surname?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Correo electronico * </label>
                            <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Contraseña * </label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Repite contraseña * </label>
                            <input name="repassword" type="password" {...register('repassword')} className={`form-control ${errors.repassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.repassword?.message}</div>
                        </div>

                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Registrarse
                        </button>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
