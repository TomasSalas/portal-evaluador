import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LeerToken } from './LeerToken';
import PruebaPCT from './PruebaPCT';
import PruebaPROT from './PruebaPROT';
import MiCuenta from './Micuenta';
import { PlanificarPCT } from './PlanificarPCT';
import { ProcesosPendientes } from './ProcesosPendientes';
import { PCT } from './PCT';
import { CrearCandidato } from './CrearCandidato';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LeerToken />}></Route>
				<Route path="/prueba-pct" element={<PruebaPCT />}></Route>
				<Route path="/prueba-prot" element={<PruebaPROT />}></Route>
				<Route path="/mi-cuenta" element={<MiCuenta />}></Route>
				<Route path="/planificar-pct" element={<PlanificarPCT />}></Route>
				<Route path="/pendientes" element={<ProcesosPendientes />}></Route>
				<Route path="/prueba" element={<PCT />}></Route>
				<Route path="/crear-candidato" element={<CrearCandidato />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
