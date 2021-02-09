import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';

import FormBuscarProducto from './FormBuscarProducto';

function NuevoPedido(props){
   // extraer el ID del cliente
   const {id} = props.match.params;

   /******************** USESTATE *******************/
   // cliente = state | guardarCliente =stateEffect
   const [cliente, guardarCliente] = useState({});

   // busqueda = state | guardarBusqueda=stateEffect
   const [busqueda, guardarBusqueda] = useState('');


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

   }, []);


   /******************** METODOS *******************/

   const buscarProducto = async e => {
      e.preventDefault();
      
      // obtener los productos e la busqueda
      const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
      console.log(resultadoBusqueda);

   }

   // almacenar lo que tecleamos para busqueda en el state
   const leerDatosBusqueda = e => {
      guardarBusqueda( e.target.value );
   }
   
   return (
		<Fragment>
         <h2>Nuevo Pedido</h2>

         <div class="ficha-cliente">
            <h3>Nombre del Cliente:</h3>
            <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
            <p>Correo: {cliente.email}</p>
         </div>
         
         <FormBuscarProducto 
            buscarProducto={buscarProducto}
            leerDatosBusqueda={leerDatosBusqueda}
         />
         

         <ul className="resumen">
            <li>
               <div className="texto-producto">
                  <p className="nombre">Macbook Pro</p>
                  <p className="precio">$250</p>
               </div>
               <div className="acciones">
                  <div className="contenedor-cantidad">
                     <i className="fas fa-minus"></i>
                     <input type="text" name="cantidad" />
                     <i className="fas fa-plus"></i>
                  </div>
                  <button type="button" className="btn btn-rojo">
                     <i className="fas fa-minus-circle"></i>
                           Eliminar Producto
                  </button>
               </div>
            </li>
            <li>
               <div className="texto-producto">
                  <p className="nombre">Macbook Pro</p>
                  <p className="precio">$250</p>
               </div>
               <div className="acciones">
                  <div className="contenedor-cantidad">
                     <i className="fas fa-minus"></i>
                     <input type="text" name="cantidad" />
                     <i className="fas fa-plus"></i>
                  </div>
                  <button type="button" className="btn btn-rojo">
                     <i className="fas fa-minus-circle"></i>
                           Eliminar Producto
                  </button>
               </div>
            </li>
            <li>
               <div className="texto-producto">
                  <p className="nombre">Macbook Pro</p>
                  <p className="precio">$250</p>
               </div>
               <div className="acciones">
                  <div className="contenedor-cantidad">
                     <i className="fas fa-minus"></i>
                     <input type="text" name="cantidad" />
                     <i className="fas fa-plus"></i>
                  </div>
                  <button type="button" className="btn btn-rojo">
                     <i className="fas fa-minus-circle"></i>
                           Eliminar Producto
                  </button>
               </div>
            </li>
         </ul>
         <div className="campo">
            <label>Total:</label>
            <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
         </div>
         <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
         </div>
      </Fragment>
	)
}

export default NuevoPedido;