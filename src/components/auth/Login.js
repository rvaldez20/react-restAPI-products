import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login(props) {

   // Auth y token
   const [auth, guardarAuth] = useContext(CRMContext);
   // console.log(auth);


   /******************** USESTATE *******************/
	const [credenciales, guardarCredenciales] = useState({});

   /******************** METODOS *******************/

   // Enviamos los datos para iniciar sesion
   const iniciarSesion = async e => {
      e.preventDefault();

      // Autenticar usurio
      try {

         const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
         // esta solo se muestra cuando es correcto - console.log(respuesta);

         // extraer el token y colocarlo en el localstorage
         const {token} = respuesta.data;
         localStorage.setItem('token', token);

         // colocarlo en el state globla context
         guardarAuth({
            token: token,
            auth: true
         });

         // lanzaos una alerta 
         Swal.fire(
            'Login Correcto',
            'Has Iniciado Sesión',
            'success'
         )

         // redireccionar
         props.history.push('/');

         
      } catch (error) {
         console.log(error);
         Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: error.response.data.mensaje
         })
      }
   }
	
   // Almacenamos lo que se teclea en los inputs en el state
   const leerDatos = e => {
      guardarCredenciales({
         ...credenciales,
         [e.target.name]: e.target.value
      })
   }

   return(
      <div className='login'>
         <h2>Iniciar Sesión</h2>

         <div className="contenedor-formulario">
            <form
               onSubmit={iniciarSesion}
            >
               <div className="campo">
                  <label>Email</label>
                  <input type="text" 
                         name="email"
                         placeholder="Email para Iniciar Sesión"
                         required
                         onChange={leerDatos}
                  />
               </div>

               <div className="campo">
                  <label>Password</label>
                  <input type="password" 
                         name="password"
                         placeholder="Password para Iniciar Sesión"
                         required
                         onChange={leerDatos}
                  />
               </div>

               <input type="submit"
                      value="Iniciar Sesión"
                      className="btn btn-verde btn-block"
               />

            </form>
         </div>
      </div>
   )
}

export default withRouter(Login);