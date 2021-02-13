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

				try {
					// obtener los pedidos
					const resultado = await clienteAxios.get('/pedidos', {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					});

					// console.log(resultado.data)
					guardarPedidos(resultado.data);					
				} catch (error) {
					// Error con autorizacion (token expiro o no es valido) y redireccionamos
					//  a iniciar sesion
					if(error.response.status = 500) {
						props.history.push('/iniciar-sesion');
					}
				}				
			}

			// llamamos la funcion
			consultarAPI();
		} else {

			//lo redireccionamos a iniciar-sesio
			props.history.push('/iniciar-sesion');
			
		}
	}, [])

	// si auth esta como false se redirecciona a inciciar sesion
	if(!auth.auth) props.history.push('/iniciar-sesion');

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