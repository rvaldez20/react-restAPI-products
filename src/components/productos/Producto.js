import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'

function Producto({producto}) {

	// para eliminar elproducto
	const eliminarProducto = idProducto => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Un producto Eliminado no se puede recuperar",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar!',
			cancelButtonText: 'No, Cancelar'
		}).then((result) => {
		if (result.isConfirmed) {
			// hamos la peticion axios
			clienteAxios.delete(`/productos/${idProducto}`)
				.then(res => {
					if(res.status === 200) {
						Swal.fire(
							'Eliminado',
							res.data.mensaje,
							'success'
						)
					}
				})
		}
		})
	}

	// hacemos detrocturing al producto
	const { _id, nombre, precio, imagen} = producto;

   return (
		<li className="producto">
			<div className="info-producto">
				<p className="nombre">{nombre}</p>
				<p className="precio">$ {precio}</p>
				{ 	imagen ? (
						<img className="imagen" alt={`img_${nombre}`} src={`http://localhost:5000/${imagen}`} />
					) : null }
			</div>
			<div className="acciones">
				<Link to={`/productos/editar/${_id}`} 
						className="btn btn-azul">
						<i className="fas fa-pen-alt"></i>
						Editar Producto
				</Link>

				<button 	type="button" 
							className="btn btn-rojo btn-eliminar"
							onClick={ () => eliminarProducto(_id) }
				>
							<i className="fas fa-times"></i>
							Eliminar Producto
				</button>
			</div>
		</li>	 
	)
}

export default Producto;