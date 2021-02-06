import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';

// importamos clienteAxios
import clienteAxios from '../../config/axios';

import Producto from './Producto';
import Spinner from '../layout/Spinner';


function Productos() {

	/************ Definimos el state ************/
	// productos = state - guardarProductos = funcion para guadar el state
	const [productos, guardarProductos] = useState([]);


	/************ Definimos useEfectt para consultar la API ************/
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			const productosConsulta = await clienteAxios.get('/productos');
			// console.log(productosConsulta.data);

			// guardamos los productos en el state
			guardarProductos(productosConsulta.data);
		}

		// llamado a la API
		consultarAPI();		
	}, [productos])

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

export default Productos;