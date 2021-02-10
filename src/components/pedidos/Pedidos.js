import React, {useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';

import Pedido from './Pedido';

function Pedidos(){

	/******************** USESTATE *******************/
	const [pedidos, guardarPedidos] = useState([]);


	/******************** USEEFFECT *******************/
	// llamada a la API
	useEffect(() => {

		const consultarAPI = async () => {
			// obtener los pedidos
			const resultado = await clienteAxios.get('/pedidos');
			// console.log(resultado.data)
			guardarPedidos(resultado.data);
		}

		// llamamos la funcion
		consultarAPI();

	}, [])




   return (
		<Fragment>
			<h2>Pedidos</h2>

			<ul class="listado-pedidos">
				
				<Pedido />

				<hr />			
			</ul>		
		</Fragment>
	)
}

export default Pedidos;