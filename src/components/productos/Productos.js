import React, {useEffect, useState, useContext, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';

// importamos clienteAxios
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';


function Productos(props) {

	/************ Definimos el state ************/
	// productos = state - guardarProductos = funcion para guadar el state
	const [productos, guardarProductos] = useState([]);


	// Definicmos el context
	const [auth, guardarAuth] = useContext(CRMContext);
	console.log(auth)

	/************ Definimos useEfectt para consultar la API ************/
	useEffect( () => {
		if(!auth.token !== '') {
			// Query a la API
			const consultarAPI = async () => {
				const productosConsulta = await clienteAxios.get('/productos', {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				});
				// console.log(productosConsulta.data);

				// guardamos los productos en el state
				guardarProductos(productosConsulta.data);
			}

			// llamado a la API
			consultarAPI();
		} else {

			//lo redireccionamos a iniciar-sesio
			props.history.push('/iniciar-sesion');
			
		}			
	}, [productos])

	// si el state esta como false es para que ni siquiera entre al componente si no esta
	if(!auth.auth) props.history.push('/iniciar-sesion');

	// spinner de carga
	if(!productos.length) return <Spinner />
	

   return (
		<Fragment>
			<h2>Productos</h2>

			<Link to={"/Productos/nuevo"} className="btn btn-verde nvo-cliente"> 
					<i className="fas fa-plus-circle"></i>
            Nuevo Producto
         </Link>

			<ul className="listado-productos">
				{productos.map( producto => (
					<Producto 
						key={producto._id}
						producto={producto}
					/>
			))}
			</ul>

		</Fragment> 
	)
}

export default withRouter(Productos);