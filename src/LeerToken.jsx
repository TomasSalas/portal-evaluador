import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Backdrop, CircularProgress } from '@mui/material';
import { useStore } from './Store/StoreData';
import { useNavigate } from 'react-router-dom';
import { ConsultarToken } from './Functions/ConsultarToken';

export const LeerToken = () => {
	const [open, setOpen] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const Verificar = async () => {
			console.log('FUNCION VERIFICAR');
			const searchParams = new URLSearchParams(window.location.search);
			let idToken = searchParams.get('id');
			let token;

			if (!idToken) {
				setOpen(false);
				window.location.href = 'https://login-mg.vercel.app/';
				//window.location.href = 'http://localhost:5173/';

				return;
			}

			const { error, data } = await ConsultarToken(idToken);

			if (!error) {
				token = data[0].accessToken;
			} else {
				window.location.href = 'https://login-mg.vercel.app/';
				//return (window.location.href = 'http://localhost:5173/');
			}
			const param = {
				accessToken: token,
			};

			const response = await fetch('https://app-prod-eastus-portalevaluador-api.azurewebsites.net/api/Procesos/VerificarToken', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(param),
			});

			const result = await response.json();

			const { isExitoso } = result;

			if (isExitoso) {
				const decode = decodeToken(token);
				useStore.getState().setRun(decode.Run);
				useStore.getState().setRol(decode.role);
				useStore.getState().setName(decode.Nombre + ' ' + decode.Apellido);
				useStore.getState().setIdUsuario(decode.IdUsuario);
				localStorage.setItem('token', token);

				if (decode.role === '8') {
					return navigate('/planificar-pct');
				} else if (decode.role === '9') {
					return navigate('/prueba-pct');
				}
			} else {
				return (window.location.href = 'https://login-mg.vercel.app/');
				//return (window.location.href = 'http://localhost:5173/');
			}
		};
		Verificar();
	}, [navigate]);

	return (
		<>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="warning" />
			</Backdrop>
		</>
	);
};
