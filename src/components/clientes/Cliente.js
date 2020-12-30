import React from 'react';

function Cliente(props) {
	// aplicamos destructuring a props para obtener cada cliente, el destructurin se hace con el nombre que le pusimos cuado lo estamos pasando
	const {cliente} = props;
	
	// Volvemos hacer  destructurig para extrer todos los valores del objeto
	const {_id, nombre, apellido, email, empresa} = cliente;

	// console.log(nombre);
	
	return(
		<li className="cliente">
			<div className="info-cliente">
				<p className="nombre">{nombre} {apellido}</p>
				<p className="empresa">{empresa}</p>
				<p>{email}</p>				
			</div>
			<div className="acciones">
				<a href="#" className="btn btn-azul">
						<i className="fas fa-pen-alt"></i>
						Editar Cliente
				</a>
				<button type="button" className="btn btn-rojo btn-eliminar">
						<i className="fas fa-times"></i>
						Eliminar Cliente
				</button>
			</div>
		</li>
	)
}

export default Cliente;