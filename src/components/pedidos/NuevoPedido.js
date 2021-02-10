import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';

function NuevoPedido(props){
   // extraer el ID del cliente
   const {id} = props.match.params;

   /******************** USESTATE *******************/
   // cliente = state | guardarCliente =stateEffect
   const [cliente, guardarCliente] = useState({});

   // busqueda = state | guardarBusqueda=stateEffect
   const [busqueda, guardarBusqueda] = useState('');

   // productos = state | guardarproductos = stateEffect
   const [productos, guardarProductos] = useState([]);

   // total = state | guardarTotal= stateeffect
   const [total, guardarTotal] = useState(0);


   /******************** USEEFFECT *******************/

   useEffect( () => {
      // obtenemos el cliente
      const consultarAPI = async () => {
         // consultar cliente actual
         const resultado = await clienteAxios.get(`/clientes/${id}`);
         // Tests
         // console.log(resultado.data);         
         // Se guarda el cliente en el state
         guardarCliente(resultado.data);
      }

      // ejecutamos la consulta
      consultarAPI();

      // actualizar el total a pagar
      actualizarTotal();

   }, [productos]);


   /******************** METODOS *******************/

   const buscarProducto = async e => {
      e.preventDefault();
      
      // obtener los productos e la busqueda
      const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
      // para testear
      //console.log(resultadoBusqueda);

      // Validamos si obtuvimos un producto, si es asi lo agregamos al state
      if(resultadoBusqueda.data[0]) {
         // si hay un producto
         let productoResultado = resultadoBusqueda.data[0];
         // console.log(productoResultado);
         //agregar la llave "producto" (copia id)
         productoResultado.producto = resultadoBusqueda.data[0]._id;
         productoResultado.cantidad = 0;

         // guardamos el producto en el state (sacamos una copia del state actual)
         guardarProductos([...productos, productoResultado]);         
      } else {
         // si no hay producto
         Swal.fire({
            type: 'error',
            title: 'No Resultados',
            text: 'No hay resultados'
         });
      }
   }

   // almacenar lo que tecleamos para busqueda en el state
   const leerDatosBusqueda = e => {
      guardarBusqueda( e.target.value );
   }

   // actualiza la cantidad de productos
   // Disminuye en uno la cantidad
   const restarProductos = i => {
      // console.log('Uno Menos...',i);

      // copiar el arreglo original del producto
      const todosProductos = [...productos];

      // validamos: si esta en cero no s epuede restar
      if(todosProductos[i].cantidad === 0) return;

      // si es mayor d ecero hace,os el decremento
      todosProductos[i].cantidad--;
      
      // Y lo almacenamos en el state
      guardarProductos(todosProductos);
   }

   // Aumenta en uno la cantidad
   const aumentarProductos = i => {
      // console.log('Uno mas...',i)

      // copia al arreglo original de productos
      const todosProductos = [...productos];

      // incrementamos uno
      todosProductos[i].cantidad++;

      // Guardamos la cantidad en el state
      guardarProductos(todosProductos);
   }

   // eliminar un producto del state
   const eliminarProductoPedido = id => {
      // console.log(id)      

      // eliminamos el producto en base al ID
      const todosProductos = productos.filter(producto => producto.producto !== id );

      // lo guardamos en el state
      guardarProductos(todosProductos);
   }


   // actualizar el total a pagar
   const actualizarTotal = () => {
      // si el arreglo de productos es igual a cero el total es cero
      if (productos.length === 0) {
         guardarTotal(0);
         return;
      } 

      // calculamos el nuevo total
      let nuevoTotal = 0;
      
      
      // recorrer todos los productos, sus cantidades y precios
      productos.map( producto => nuevoTotal += (producto.cantidad * producto.precio) );

      // almacenar el total en el state
      guardarTotal(nuevoTotal);
   }

   // se guarda el pedido en la DB
   const realizarPedido = async e => {
      e.preventDefault();

      // extraemos el ID de la url con props.match.params
      const { id } = props.match.params;

      // construir el objeto en base a la especificaión de la API
      const pedido = {
         "cliente": id ,
         "pedido": productos,
         "total": total
      }
      // console.log(pedido);

      // almacenarlo en la DB
      const resultado = await clienteAxios.post(`/pedidos`, pedido)
      
      // leer la respuesta
      if(resultado.status === 200) {
         // alerta de todo bien
         Swal.fire({
            type: 'success',
            title: 'Se Guardo Correctamente',
            text: resultado.data.mensaje
         })
      } else {
         // alerta error
         Swal.fire({
            type: 'error',
            title: 'Hubo un Error',
            text: 'Vuelva a intentarlo'
         });
      }

      // redireccionar
      props.history.push('/pedidos');
   }
   
   return (
		<Fragment>
         <h2>Nuevo Pedido</h2>

         <div className="ficha-cliente">
            <h3>Nombre del Cliente:</h3>
            <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
            <p>Correo: {cliente.email}</p>
         </div>
         
         <FormBuscarProducto 
            buscarProducto={buscarProducto}
            leerDatosBusqueda={leerDatosBusqueda}            
         />
         

         <ul className="resumen">

            {productos.map((producto, index) => (
               <FormCantidadProducto 
                  key={producto.producto}
                  producto={producto}
                  restarProductos={restarProductos}
                  aumentarProductos={aumentarProductos}
                  index={index}
                  eliminarProductoPedido={eliminarProductoPedido}
               />
            ))}
             
         </ul>

         <p className="total">Total a Pagar: <span>$ {total}</span> </p>

         { total > 0 ? (
            <form 
               onSubmit={realizarPedido}               
            >
            
            <input   type="submit" 
                     className="btn btn-verde btn-block"
                     value="Realizar Pedido" />
            </form>
         ) : null }
      </Fragment>
	)
}

export default withRouter(NuevoPedido);