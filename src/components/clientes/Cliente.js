import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function Cliente(props) {
	// aplicamos destructuring a props para obtener cada cliente, el destructurin se hace con el nombre que le pusimos cuado lo estamos pasando
	const {cliente} = props;
	
	// Volvemos hacer  destructurig para extrer todos los valores del objeto
	const { _id, nombre, apellido, email, empresa} = cliente;

	// console.log(nombre);

	// Eliminar cliente
	const eliminarCliente = idCliente => {
		Swal.fire({
		title: '¿Estas seguro?',
		text: "Un cliente Eliminado no se puede recuperar",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, Eliminar!',
		cancelButtonText: 'No, Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				// llmado axios
				clienteAxios.delete(`/clientes/${idCliente}`)
					.then(res => {
						Swal.fire(
							'Eliminado',
							res.data.mensaje,
							'success'
						)
					})
			}
		})
	}
	
	return(
		<li className="cliente">
			<div className="info-cliente">
				<p className="nombre">{nombre} {apellido}</p>
				<p className="empresa">{empresa}</p>
				<p>{email}</p>				
			</div>
			<div className="acciones">
				<Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
						<i className="fas fa-pen-alt"></i>
						Editar Cliente
				</Link>

				<button 	type="button" 
							className="btn btn-rojo btn-eliminar"
							onClick={() => eliminarCliente(_id)}
				>
						<i className="fas fa-times"></i>
						Eliminar Cliente
				</button>
			</div>
		</li>
	)
}

export default Cliente;