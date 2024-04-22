import { useEffect } from 'react';
import Navbar from './Components/Navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import { Verificar } from './Functions/Verificar';

export const ProcesosPendientes = () => {
	const navigate = useNavigate();
	const verificar = Verificar();

	let Role = '';
	let Nombre = '';

	const storedData = localStorage.getItem('userData');

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.name;
		Role = parsedData.state.rol;
	}

	useEffect(() => {
		if (Role != null) {
			if (Role === '6') {
				navigate('/pendientes');
			}
			if (Role === '9') {
				navigate('/prueba-pct');
			} else {
				verificar();
			}
		} else {
			navigate('/');
		}
	}, [verificar, Role, navigate]);
	return (
		<>
			<Navbar name={Nombre} rol={Role} />
		</>
	);
};
