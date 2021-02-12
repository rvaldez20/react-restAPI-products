import React, {Fragment, useState, useContext} from 'react';
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function NuevoCliente({history}) {

	// inicializamos el state- cliente=state | guardarCliente=funcion para modificar el state
	const [cliente, guardarCliente] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: ''
	});

	// Definicmos el context
	const [auth, guardarAuth] = useContext(CRMContext);

	// funcion para leer los datos del formulario
	const actualizarState = e => {
		// almacenamos lo que el usuuario escribe en el state
		guardarCliente({
			// obtenemos una copia del state actual
			...cliente, 
			[e.target.name]: e.target.value
		});
		// console.log( [e.target.name] + ":" + e.target.value);
		// console.log(cliente);
	}

	// añade en la restAPI el nuevo cliente
	const agregarCliente = e => {
		e.preventDefault();
		
		// enviar peticion POST a axios
		clienteAxios.post('/clientes', cliente, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		})
			.then(res => {
				// console.log(res);
				// validamos si hay errores de mongo (res.data.code solo existe si hay error)
				if(res.data.code === 11000) {
					// existe un error de mongo
					// console.log('Error de duplicado de Mongo')
					Swal.fire({
						title: 'Hubo un Error',
						text: 'Ese cliente ya esta registrado',
						icon: 'error'
					})
				} else {
					// No existen errores
					// console.log(res.data);
					Swal.fire(
						'Se Guardo Correctamente!',
						res.data.mensaje,
						'success'
					)
				}

				// redireccionamos
				history.push('/');
			});
	}

	// validar el formulario
	const validarCliente = () => {
		// destroctring al state
		const {nombre, apellido, email, empresa} = cliente;

		// revisamos que los campos te gan contenido
		let valido = !nombre.length || !apellido.length || !email.length || !empresa;

		// return true or false
		return valido;
	}

	return (
		<Fragment>
			<h2>Nuevo Cliente</h2>

			<form
				onSubmit={agregarCliente}
			>
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input  	type="text" 
							  	placeholder="Nombre Cliente" 
								name="nombre" 
								onChange={actualizarState}
					/>
				</div>

				<div className="campo">
					<label>Apellido:</label>
					<input 	type="text" 
								placeholder="Apellido Cliente" 
								name="apellido"
								onChange={actualizarState}
					/>
				</div>
		
				<div className="campo">
					<label>Empresa:</label>
					<input 	type="text" 
								placeholder="Empresa Cliente" 
								name="empresa"
								onChange={actualizarState}
					/>
				</div>

				<div className="campo">
					<label>Email:</label>
					<input 	type="email" 
								placeholder="Email Cliente" 
								name="email"
								onChange={actualizarState}
					/>
				</div>				

				<div className="enviar">
					<input 	type="submit" 
								className="btn btn-azul" 
								value="Agregar Cliente" 
								disabled={ validarCliente() }
					/>
				</div>
			</form>
			
		</Fragment>
	);
}

// HighOrdenComponet (HOC) es una function que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);