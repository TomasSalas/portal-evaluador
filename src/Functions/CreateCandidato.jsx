export const CreateCandidato = async (data) => {
	const { rut, dni, nombres, apellidos, telefono, direccion, ciudad, comuna, email, nacionalidad, rutEmpresa, nombreEmpresa } = data;

	try {
		const url = 'https://app-prod-eastus-portalevaluador-api.azurewebsites.net/api/Candidato/registrarCandidato';

		let partes = rut.split('-');
		let run = partes[0].replace(/\./g, '');
		let digVerificador = partes[1];

		let idUsuario = '';
		const storedData = localStorage.getItem('userData');

		if (storedData) {
			const parsedData = JSON.parse(storedData);
			idUsuario = parsedData.state.idUsuario;
		}

		const params = {
			run,
			digVerificador,
			dni,
			nombres,
			apellidos,
			telefono,
			direccion,
			ciudad,
			comuna,
			email,
			nacionalidad,
			usuarioCreacion: idUsuario,
			rutEmpresa,
			nombreEmpresa,
			estado: 1,
		};

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});

		const response = await res.json();

		if (response.isExitoso) {
			return {
				error: null,
				data: '',
			};
		} else {
			return {
				error: true,
				data: response.errorMessages,
			};
		}
	} catch (e) {
		console.error(e);
	}
};
