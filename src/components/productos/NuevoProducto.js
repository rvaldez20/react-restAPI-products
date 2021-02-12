import React, {Fragment, useState, useContext} from 'react';
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';


function NuevoProducto(props) {

	/******************** STATES *******************/

	// state: producto=state | guardarProducto=setState
	const [producto, guardarProducto] = useState({
		nombre: '',
		precio: ''
	});
	
	// otro state: archivo=state | guardaraArchivo=setState
	const [archivo, guardarArchivo] = useState('');


	// Definicmos el context
	const [auth, guardarAuth] = useContext(CRMContext);

	/******************** METODOS *******************/
	// almacena un nuevo producto en la DB
	const agregarProducto = async e => {
		e.preventDefault();
		
		// crear un formulario formdata
		const formData = new FormData();
		formData.append('nombre', producto.nombre);
		formData.append('precio', producto.precio);
		formData.append('imagen', archivo);

		// almacenarlo en la DB
		try {
			const res = await clienteAxios.post('/productos', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${auth.token}`
				}
			});

			// para test de las respuesta (res)
			// console.log(res);

			// lanzar exito
			if (res.status === 200) {
				Swal.fire(				
					'Se Guardo Correctamente',
					res.data.mensaje,
					'success'
				);
			}
			
			// redireccionamos al listado de productos
			props.history.push('/productos');

		} catch (error) {
			console.log(error);

			// lanzar alerta de error
			Swal.fire({
				type: 'error',
				title: 'Hubo un Error',
				text: 'Vuelva a intentarlo'
			});
		}
	}

	// leer los datos del formulario
	const leerInformacionProducto = e => {
		guardarProducto({
			// obtener una copia del state actual y agregar de nuevo
			...producto,
			[e.target.name] : e.target.value
		})
	}

	// Coloca la imagen en el state
	const leerArchivo = e => {
		// para testear e.target.files - se selecciona el elemento [0] ya que es una imagen
		// console.log(e.target.files[0]);

		guardarArchivo(e.target.files[0]);
	}

	/******************** METODOS *******************/

   return (
		<Fragment>
			<h2>Nuevo Producto</h2>

			<form
				onSubmit={agregarProducto}
			>
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input 	type="text" 
								placeholder="Nombre Producto" 
								name="nombre" 
								onChange={leerInformacionProducto}
					/>
				</div>

				<div className="campo">
					<label>Precio:</label>
					<input 	type="number" 
								name="precio" 
								min="0.00" 
								step="0.01" 
								placeholder="Precio"
								onChange={leerInformacionProducto}
					/>
				</div>

				<div className="campo">
					<label>Imagen:</label>
					<input 	type="file"  
								name="imagen"
								onChange={leerArchivo}
					/>
				</div>

				<div className="enviar">
						<input 	type="submit" 
									class="btn btn-azul" 
									value="Agregar Producto"
						/>
				</div>
			</form>
		</Fragment>
	)
}

export default withRouter(NuevoProducto);