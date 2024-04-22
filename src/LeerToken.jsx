/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Backdrop, CircularProgress } from '@mui/material';
import { useStore } from './Store/StoreData';
import { useNavigate } from 'react-router-dom';
import { DescomprimirToken } from './Functions/Descomprimir';
export const LeerToken = () => {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		const Verificar = async () => {
			const searchParams = new URLSearchParams(window.location.search);
			const token = searchParams.get('token');
			console.log('token', token);

			// Descomprime el token
			const tokenValido = DescomprimirToken(token);
			console.log('token url', tokenValido);

			const param = {
				accessToken: tokenValido,
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
					navigate('/planificar-pct');
				} else if (decode.role === '9') {
					navigate('/prueba-pct');
				}
			} else {
				setOpen(false);
				const error = 'error';
				window.location.href = 'https://login-mg.vercel.app/';
				// window.location.href = 'http://localhost:5173/';
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
