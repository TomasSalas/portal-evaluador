import { useEffect } from 'react';
import { Verificar } from './Functions/Verificar';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';

export default function PruebaPROT() {
	const verificar = Verificar();
	const navigate = useNavigate();
	let Role = '';
	let Nombre = '';

	const storedData = localStorage.getItem('userData');

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.name;
		Role = parsedData.state.rol;
	}

	//VERIFICAR TOKEN
	useEffect(() => {
		if (Role != null) {
			verificar();
		} else {
			navigate('/');
		}
	}, [verificar, Role, navigate]);

	return (
		<div>
			<Navbar name={Nombre} rol={Role} />
		</div>
	);
}
