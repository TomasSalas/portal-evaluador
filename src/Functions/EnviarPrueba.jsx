export const EnviarPrueba = async (param, idCandidato) => {
	try {
		const url = 'https://app-prod-eastus-portalevaluador-api.azurewebsites.net/api/Candidato/RegistrarPctCandidato';
		const respuestas = [];

		for (const item of param) {
			const parametros = {
				crrInstrumento: item.crrIdInstrumento,
				crrDetinstrumento: item.crrIdDetInstrumento,
				glsActividad: item.glsActividad,
				glsCriterio: item.glsCriterio,
				nroPregunta: item.nroPregunta,
				categoria: item.categoria,
				supraCategoria: item.supraCategoria,
				item: item.item,
				nota: 0,
				flgBrecha: true,
				glsBrecha: item.glsBrecha,
				glsRecomendacion: item.glsRecomendacion,
				idcandidatos: idCandidato,
				alternativaSeleccionada: item.alternativaSeleccionada,
				alternativaCorrecta: item.alternativaCorrecta,
				flgAnulado: false,
				flgCompCondCrit: item.flgCompCondCrit,
				glsBrechaCompCond: null,
				flgCompCondCriticaFaena: item.flgCompCondCritFaena,
				glsBrechaCompCondFaena: null,
				flgCompCondCriticaPerfil: item.flgCompCondCritPerfil,
				glsBrechaCompCondPerfil: null,
				flgCompCondCriticaBase: item.flgCompCondCritBase,
				glsBrechaCompCondBase: null,
			};
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(parametros),
			});

			const data = await res.json();
			respuestas.push(data);
		}
		const ultimoIsExitoso = respuestas.length > 0 ? respuestas[respuestas.length - 1].isExitoso : false;

		return ultimoIsExitoso;
	} catch (e) {
		console.error(e);
		return false;
	}
};
