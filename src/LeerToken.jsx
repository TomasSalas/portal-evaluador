/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Backdrop, CircularProgress } from '@mui/material';
import { useStore } from './Store/StoreData';
import { useNavigate } from 'react-router-dom';
export const LeerToken = () => {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		const Verificar = async () => {
			try {
				const cookieString = document.cookie;
				let token = null;
				if (cookieString) {
					const cookieParts = cookieString.split('; ');
					const tokenRow = cookieParts.find((row) => row.startsWith('token='));

					if (tokenRow) {
						token = tokenRow.split('=')[1];
					} else {
						// window.location.href = 'http://localhost:5173/';
						window.location.href = 'https://login-mg.vercel.app/';

						throw new Error('Cookie "token" no encontrada');
					}
				} else {
					// window.location.href = 'http://localhost:5173/';
					window.location.href = 'https://login-mg.vercel.app/';

					throw new Error('No se encontró ninguna cookie');
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
					document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

					if (decode.role === '8') {
						navigate('/planificar-pct');
					} else if (decode.role === '9') {
						navigate('/prueba-pct');
					}
				} else {
					setOpen(false);
					const error = 'error';
					document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
					document.cookie = `invalid=${error}; path=/; SameSite=None; Secure`;
					window.location.href = 'https://login-mg.vercel.app/';
					// window.location.href = 'http://localhost:5173/';
				}
			} catch (error) {
				console.error('Error al verificar el token:', error);
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
