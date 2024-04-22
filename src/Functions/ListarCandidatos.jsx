export const ListarCandidatos = async () => {
	try {
		const url = 'https://app-prod-eastus-portalevaluador-api.azurewebsites.net/api/Candidato/ListarCandidatos';
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const { isExitoso, resultado, errorMessages } = await res.json();
		if (isExitoso) {
			return {
				error: false,
				result: resultado,
			};
		} else {
			return {
				error: false,
				result: errorMessages,
			};
		}
	} catch (e) {
		console.error(e);
	}
};
