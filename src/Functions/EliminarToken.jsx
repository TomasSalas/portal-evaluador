export const EliminarToken = async (id) => {
	try {
		const url = '' + id;

		const res = await fetch(url, {
			method: 'DELETED',
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
