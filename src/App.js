
/** Layout  */
import { Fragment } from 'react';
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

function App() {
  return (
	<Fragment>
		<Header />

		<div className="grid contenedor contenido-principal">
			<Navegacion />
			<main className="caja-contenido col-9">
				{ /*TODO : Routing a los diferentes componenetes*/ }
			</main>
		</div>
	</Fragment>
  );
}

export default App;
