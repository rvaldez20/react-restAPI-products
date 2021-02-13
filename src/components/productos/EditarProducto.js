import React, {Fragment, useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import {withRouter} from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';


function EditarProductos(props) {

	// Obtener el ID del producto usando los props (props.match.params)
	const {id} = props.match.params;
	// console.log(id);

	/******************** STATES *******************/
	// producto=state | guardarProducto=setState
	const [producto, guardarProducto] = useState({
		nombre: '',
		precio: '',
		imagen: ''
	});

	// otro state: archivo=state | guardaraArchivo=setState
	const [archivo, guardarArchivo] = useState('');

	// Definicmos el context
	const [auth, guardarAuth] = useContext(CRMContext);


	/******************** USEEFECTT *******************/
	useEffect( () => {
		if(!auth.token !== '') {
			// consulta a la API para obtener el producto a editar
			const consultarAPI = async () => {

				try {
					const productoConsulta = await clienteAxios.get(`/productos/${id}`, {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					});
					// console.log(productoConsulta.data);
					guardarProducto(productoConsulta.data);
				} catch (error) {
					// Error con autorizacion (token expiro o no es valido) y redireccionamos
					//  a iniciar sesion
					if(error.response.status = 500) {
						props.history.push('/iniciar-sesion');
					}
				}				
			}

			// ejecutamos la consulta a la API
			consultarAPI();
		} else {

			//lo redireccionamos a iniciar-sesio
			props.history.push('/iniciar-sesion');
			
		}
	}, []);


	/******************** METODOS *******************/
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

	// edita un product en la DB
	const editarProducto = async e => {
		e.preventDefault();
		
		// crear un formulario formdata
		const formData = new FormData();
		formData.append('nombre', producto.nombre);
		formData.append('precio', producto.precio);
		formData.append('imagen', archivo);

		// almacenarlo en la DB
		try {
			const res = await clienteAxios.put(`/productos/${id}`, formData, {
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
					'Guardado!',
					'El Producto se actualizo Correctamente',
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

	// Extraer los valores del State
	const { nombre, imagen, precio } = producto;

	// si el state esta como false es para que ni siquiera entre al componente si no esta
	if(!auth.auth) props.history.push('/iniciar-sesion');

	if(!nombre) return <Spinner />

   return (
		<Fragment>
			<h2>Editar Producto</h2>

			<form
				onSubmit={editarProducto}
			>
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input 	type="text" 
								placeholder="Nombre Producto" 
								name="nombre" 
								onChange={leerInformacionProducto}
								defaultValue={nombre}
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
								defaultValue={precio}
					/>
				</div>

				<div className="campo">
					<label>Imagen:</label>
					{imagen ? (
						<img width="200px" alt={`img_${nombre}`} src={`http://localhost:5000/${imagen}`} />
					) : null }
					<input 	type="file"  
								name="imagen"
								onChange={leerArchivo}
					/>
				</div>

				<div className="enviar">
						<input 	type="submit" 
									className="btn btn-azul" 
									value="Guardar Cambios"
						/>
				</div>
			</form>
		</Fragment>
	)
}

export default withRouter(EditarProductos);