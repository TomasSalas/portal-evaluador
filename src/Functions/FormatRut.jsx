/* eslint-disable no-useless-escape */
export const FormatRut = (event) => {
	let run = event;
	let runAux = run;
	if (runAux.length > 2) {
		runAux = runAux.replace(/\./g, '').replace(/\-/g, '');
		let cuerpo = runAux.slice(0, -1);
		let dv = runAux.slice(-1).toUpperCase();

		cuerpo = new Intl.NumberFormat('es-CL').format(parseInt(cuerpo));
		run = cuerpo + '-' + dv;
	}
	return run;
};
