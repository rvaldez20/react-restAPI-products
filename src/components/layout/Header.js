import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';

import {CRMContext} from '../../context/CRMContext';

const Header = (props) => {

	// state context
	const [auth, guardarAuth] = useContext(CRMContext);
	// console.log(auth);

	// metodo para cerrar sesion
	const cerrarSesion = () => {
		// auth.auth = false y remover el token
		guardarAuth({
			token: '',
			auth: false
		});

		// y tambien eliminamos el token de localstorage
		localStorage.setItem('token', '');

		// y Finalmente redireccionamos
		props.history.push('/iniciar-sesion');
	}

	return(
		<header className="barra">
			<div className="contenedor">

				<div className="contenido-barra">
					<h1>CRM - Administrador de Clientes</h1>

					{ auth.auth ? (
						<button 	type="button"
									className="btn btn-rojo"
									onClick={cerrarSesion}
						>
							<i className="far fa-times-circle"></i>
							Cerrar Sesión
						</button>
					) : null }

				</div>

			</div>
		</header>
	)
}

export default withRouter(Header);