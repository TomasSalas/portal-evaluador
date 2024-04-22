export const CrearPrePlanificacion = async (param) => {
	try {
		const url = 'https://app-prod-eastus-portalevaluador-api.azurewebsites.net/api/Candidato/registrarPreplanificacion';
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param),
		});

		const { isExitoso, resultado, errorMessages } = await res.json();
		if (isExitoso) {
			return {
				error: false,
				result: resultado,
			};
		} else {
			return {
				error: true,
				result: errorMessages,
			};
		}
	} catch (e) {
		console.error(e);
	}
};
