import React, {useEffect, useState, Fragment, useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// importamos clienteAxios
import clienteAxios from '../../config/axios';

// importamos componentes para cliente
import Cliente from './Cliente';

// importar el Context
import { CRMContext } from '../../context/CRMContext';

function Clientes(props) {

	/**  Definimos el state */
	// clientes es el state
	// guardarClientes es la funcion que modifica el state
	const [clientes, guardarClientes] = useState([]);

	// utilizar valores del context
	const [auth, guardarAuth] = useContext(CRMContext);
	

	/******************** USEEFFECT *******************/

	// se le pasa el cliente para que en dado caso que el state cambie se ejecute el useEfect
	useEffect( () => {

		if(!auth.token !== '') {
			// Query a la API
			const consultarAPI = async () => {
				
				try {
					// console.log('Consultando...');
					const clientesConsulta = await clienteAxios.get('/clientes', {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					});

					// para testear lo que retora la API
					// console.log(clientesConsulta.data);

					// almacenmos la data en el state
					guardarClientes(clientesConsulta.data);					
				} catch (error) {
					// Error con autorizacion (token expiro o no es valido) y redireccionamos
					//  a iniciar sesion
					if(error.response.status = 500) {
						props.history.push('/iniciar-sesion');
					}
				}
			}		
				consultarAPI();	
		} else {

			//lo redireccionamos a iniciar-sesio
			props.history.push('/iniciar-sesion');
			
		}
	
	}, [clientes]);

	// si el state esta como false es para que ni siquiera entre al componente si no esta autorizado
	if(!auth.auth) props.history.push('/iniciar-sesion');

	// spinner de carga
	if(!clientes.length) return <Spinner />

   return (
		<Fragment>
			<h2>Clientes</h2>

			<Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
				<i className="fas fa-plus-circle"></i>
            Nuevo Cliente
         </Link>
			
			<ul className="listado-clientes">
				{/* Se cambia en la arrowfunction las llave por parentesis para hacer el return */}
				{clientes.map(cliente => (
					//console.log(cliente);
					<Cliente
						key={cliente._id}
						cliente={cliente}
					/>
				))}
			</ul>
		</Fragment>
	)
}

export default withRouter(Clientes);