export const ConsultarToken = async (id) => {
	try {
		const url = 'https://app-prod-eastus-portalevaluador-api.azurewebsites.net/api/Candidato/BuscarAccessToken?RandomId=' + id;

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
				data: resultado,
			};
		} else {
			return {
				error: true,
				data: errorMessages,
			};
		}
	} catch (e) {
		console.error(e);
	}
};
