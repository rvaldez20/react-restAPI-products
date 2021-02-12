import React, {useEffect, useState, useContext, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import { CRMContext } from '../../context/CRMContext';

function Pedidos(props){

	/******************** USESTATE *******************/
	const [pedidos, guardarPedidos] = useState([]);


	// Definicmos el context
	const [auth, guardarAuth] = useContext(CRMContext);

	/******************** USEEFFECT *******************/
	// llamada a la API
	useEffect(() => {
		if(!auth.token !== '') {
			const consultarAPI = async () => {
				// obtener los pedidos
				const resultado = await clienteAxios.get('/pedidos', {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				});

				// console.log(resultado.data)
				guardarPedidos(resultado.data);
			}

			// llamamos la funcion
			consultarAPI();
		} else {

			//lo redireccionamos a iniciar-sesio
			props.history.push('/iniciar-sesion');
			
		}
	}, [])

   return (
		<Fragment>
			<h2>Pedidos</h2>

			<ul className="listado-pedidos">
				
				{pedidos.map( pedido => (
					<DetallesPedido
						key={pedido._id}
						pedido={pedido}
					/>
				))}

				<hr />			
			</ul>		
		</Fragment>
	)
}

export default withRouter(Pedidos);