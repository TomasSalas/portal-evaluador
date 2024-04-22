/* eslint-disable react-hooks/rules-of-hooks */
import { isExpired, decodeToken } from 'react-jwt';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store/StoreData';

export const Verificar = () => {
	const navigate = useNavigate();

	return useCallback(() => {
		const token = localStorage.getItem('token');
		if (token != null) {
			const expired = isExpired(token);
			if (expired) {
				navigate(0);
				localStorage.removeItem('token');
				localStorage.removeItem('userData');
			} else {
				const decode = decodeToken(token);
				useStore.getState().setRun(decode.Run);
				useStore.getState().setRol(decode.role);
				useStore.getState().setName(decode.Nombre + ' ' + decode.Apellido);
				useStore.getState().setIdUsuario(decode.IdUsuario);
			}
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
			navigate('/');
		}
	}, [navigate]);
};
