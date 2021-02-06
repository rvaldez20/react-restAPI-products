import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// importamos clienteAxios
import clienteAxios from '../../config/axios';

// importamos componentes para cliente
import Cliente from './Cliente';

function Clientes() {

	/**  Definimos el state */
	// clientes es el state
	// guardarClientes es la funcion que modifica el state
	const [clientes, guardarClientes] = useState([])

	// Query a la API
	const consultarAPI = async () => {
		// console.log('Consultando...');
		const clientesConsulta = await clienteAxios.get('/clientes');

		// para testear lo que retora la API
		// console.log(clientesConsulta.data);

		// almacenmos la data en el state
		guardarClientes(clientesConsulta.data);
	}

	//usamos el hook useEffect
	// se le pasa el cliente para que en dado caso que el state cambie se ejecute el useEfect
	useEffect( () => {
		consultarAPI();		
	}, [clientes]);

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

export default Clientes;