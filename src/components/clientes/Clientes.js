import React, {useEffect, useState, Fragment} from 'react';

// importamos clienteAxios
import clienteAxios from '../../config/axios';

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
	useEffect( () => {
		consultarAPI();
	}, []);

   return (
		<Fragment>
			<h2>Clientes</h2>

			<ul className="listado-clientes">
				{clientes.map(cliente => {
					console.log(cliente);
				})}
			</ul>
		</Fragment>
	)
}

export default Clientes;