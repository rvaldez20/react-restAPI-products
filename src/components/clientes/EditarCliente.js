import React, {Fragment, useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';


function EditarCliente(props) {


   // obtenemos el id props->match->parmas->id
   const { id } = props.match.params;
  
	// inicializamos el state- cliente=state | guardarCliente=funcion para modificar el state
	const [cliente, datosCliente] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		email: ''
	});

	// Definicmos el context
	const [auth, guardarAuth] = useContext(CRMContext);


   // definimos useEffect cuando el componente carga
   useEffect( () => {
		if(!auth.token !== '') {

			// Query a la API
			const consultarAPI = async () => {

				try {
					const clienteConsulta = await clienteAxios.get(`/clientes/${id}`, {
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					});					
		
					// lo guardamos en el state
					datosCliente(clienteConsulta.data);					
				} catch (error) {
					// Error con autorizacion (token expiro o no es valido) y redireccionamos
					//  a iniciar sesion
					if(error.response.status = 500) {
						props.history.push('/iniciar-sesion');
					}
				}								
			}							
					
			consultarAPI();
		} else {
			//lo redireccionamos a iniciar-sesio
			props.history.push('/iniciar-sesion');
			
		}			
   },[]);


	// funcion para leer los datos del formulario
	const actualizarState = e => {
		// almacenamos lo que el usuuario escribe en el state
		datosCliente({
			// obtenemos una copia del state actual
			...cliente, 
			[e.target.name]: e.target.value
		});
		// console.log( [e.target.name] + ":" + e.target.value);
		// console.log(cliente);
	}

   // Envia una petición por axios para cactualizar el cliente
   const actualizarCliente = e => {
      // Hacemos el prevendefault
      e.preventDefault();

      // peticion por axios
      clienteAxios.put(`/clientes/${cliente._id}`, cliente, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		})
         .then(res => {
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
						'Guardado',
						'Se Actualizo Correctamente',
						'success'
					)
				}

            // redireccionar
            props.history.push('/');
         })
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

	// verificar si el usuario esta autenticado o no para proteger el componente
	if(!auth.auth && (localStorage.getItem('token') === auth.token)) {
		props.history.push('/iniciar-sesion');
	}

	return (
		<Fragment>
			<h2>Editar Cliente</h2>

			<form
            onSubmit={actualizarCliente}
         >
				<legend>Llena todos los campos</legend>

				<div className="campo">
					<label>Nombre:</label>
					<input  	type="text" 
							  	placeholder="Nombre Cliente" 
								name="nombre"                         
								onChange={actualizarState}
                        value={cliente.nombre}
					/>
				</div>

				<div className="campo">
					<label>Apellido:</label>
					<input 	type="text" 
								placeholder="Apellido Cliente" 
								name="apellido"
								onChange={actualizarState}
                        value={cliente.apellido}
					/>
				</div>
		
				<div className="campo">
					<label>Empresa:</label>
					<input 	type="text" 
								placeholder="Empresa Cliente" 
								name="empresa"
								onChange={actualizarState}
                        value={cliente.empresa}
					/>
				</div>

				<div className="campo">
					<label>Email:</label>
					<input 	type="email" 
								placeholder="Email Cliente" 
								name="email"
								onChange={actualizarState}
                        value={cliente.email}
                        // readOnly
					/>
				</div>				

				<div className="enviar">
					<input 	type="submit" 
								className="btn btn-azul" 
								value="Guardar Cambios" 
								disabled={ validarCliente() }
					/>
				</div>
			</form>
			
		</Fragment>
	);
}

// HighOrdenComponet (HOC) es una function que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);