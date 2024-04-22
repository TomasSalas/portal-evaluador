import { useCallback, useEffect, useState } from 'react';
import { Verificar } from './Functions/Verificar';
import { useNavigate } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { FormatRut } from './Functions/FormatRut';
import { useForm } from 'react-hook-form';
import { DatosCandidato } from './Functions/DatosCandidato';
import { DatosPrePlan } from './Functions/DatosPrePlan';
import { ListarInstrumentosPrueba } from './Functions/ListarInstrumentosPrueba';

export default function PruebaPCT() {
	const { setValue, register } = useForm();
	const verificar = Verificar();
	const navigate = useNavigate();
	const [idUsuario, setIdUsuario] = useState('');
	const [descPerfil, setdescPerfil] = useState('');
	const [descUcl, setdescUcl] = useState('');
	const [descVersion, setdescVersion] = useState('');
	const [idVersion, setIdVersion] = useState('');
	const [open, setOpen] = useState(false);

	let Role = '';
	let Nombre = '';
	let Rut = '';

	const storedData = localStorage.getItem('userData');

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.name;
		Role = parsedData.state.rol;
		Rut = parsedData.state.run.slice(0, -1);
	}

	const getDatosCandidato = useCallback(async () => {
		setOpen(true);
		const { error, data } = await DatosCandidato(Rut);

		if (!error) {
			setValue('rut', data[0].run);
			setValue('dni', data[0].dni);
			setValue('nombre', data[0].nombre);
			setValue('email', data[0].email);
			setValue('telefono', data[0].telefono);
			setValue('ciudad', data[0].ciudad);
			setValue('comuna', data[0].comuna);
			setValue('nacionalidad', data[0].nacionalidad);
			setValue('nombreEmpresa', data[0].nombreEmpresa);
			setValue('direccion', data[0].direccion);
			setIdUsuario(data[0].idcandidatos);
		}
		setOpen(false);
	}, [Rut, setValue]);

	const getDatosPrePlan = useCallback(async () => {
		const { error, data } = await DatosPrePlan(idUsuario);

		if (!error) {
			setValue('perfil', data[0].descripcionPerfil);
			setValue('ucl', data[0].descripcionUCL);
			setValue('version', data[0].descripcionVersionInstrumento);
			setdescPerfil(data[0].descripcionPerfil);
			setdescUcl(data[0].descripcionUCL);
			setdescVersion(data[0].descripcionVersionInstrumento);
			setdescVersion(data[0].descripcionVersionInstrumento);
			setIdVersion(data[0].crrIdInstrumento);
		}
	}, [idUsuario, setValue]);

	const getPruebaInstrumento = useCallback(async () => {
		const { error, data } = await ListarInstrumentosPrueba(idVersion);
		if (!error) {
			navigate('/prueba', { state: { dataPrueba: data, idCandidato: idUsuario } });
		}
	}, [idVersion, navigate, idUsuario]);

	const steps = ['Verificar Información', 'Confirmar Prueba', 'Rendir Prueba'];

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	useEffect(() => {
		getDatosCandidato();
	}, [getDatosCandidato]);

	useEffect(() => {
		setOpen(true);
		if (idUsuario !== '') {
			getDatosPrePlan();
			setOpen(false);
		}
	}, [getDatosPrePlan, idUsuario]);

	useEffect(() => {
		if (Role != null) {
			if (Role === '6') {
				navigate('/pendientes');
			}
			if (Role === '9') {
				navigate('/prueba-pct');
			} else {
				verificar();
			}
		} else {
			navigate('/');
		}
	}, [verificar, Role, navigate]);

	return (
		<>
			<Container maxWidth="xxl">
				<Stepper activeStep={activeStep}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>
								<Typography variant="h6">{label}</Typography>
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<form>
					{activeStep === 0 && (
						<Container maxWidth="xxl" sx={{ paddingTop: 5, paddingBottom: 5, height: '370px' }}>
							<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
								<Avatar sx={{ backgroundColor: '#ed6c02' }}> P </Avatar> <Typography variant="h6"> INGRESAR CANDIDATOS Y PRUEBAS </Typography>
							</Box>
							<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 3 }}>
								<TextField
									variant="outlined"
									label="RUT"
									disabled
									fullWidth
									{...register('rut')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="DNI"
									disabled
									fullWidth
									{...register('dni')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="NOMBRE CANDIDATO"
									disabled
									fullWidth
									{...register('nombre')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
							</Container>
							<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 3 }}>
								<TextField
									variant="outlined"
									label="EMAIL"
									disabled
									fullWidth
									defaultValue=""
									{...register('email')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="TELEFONO"
									disabled
									fullWidth
									defaultValue=""
									{...register('telefono')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="CIUDAD"
									disabled
									fullWidth
									defaultValue=""
									{...register('ciudad')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="COMUNA"
									disabled
									fullWidth
									defaultValue=""
									{...register('comuna')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
							</Container>
							<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 3 }}>
								<TextField
									variant="outlined"
									label="NACIONALIDAD"
									disabled
									fullWidth
									defaultValue=""
									{...register('nacionalidad')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="NOMBRE EMPRESA"
									disabled
									fullWidth
									defaultValue=""
									{...register('nombreEmpresa')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="DIRECCIÓN"
									disabled
									fullWidth
									defaultValue=""
									{...register('direccion')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
							</Container>
						</Container>
					)}

					{activeStep === 1 && (
						<Container maxWidth="xxl" sx={{ paddingTop: 5, paddingBottom: 5, height: '270px' }}>
							<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
								<Avatar sx={{ backgroundColor: '#ed6c02' }}> P </Avatar> <Typography variant="h6"> DATOS DE PRUEBA A REALIZAR </Typography>
							</Box>
							<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 3 }}>
								<TextField
									variant="outlined"
									label="PERFIL"
									disabled
									fullWidth
									defaultValue=""
									{...register('perfil')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="UCL"
									disabled
									fullWidth
									defaultValue=""
									{...register('ucl')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
								<TextField
									variant="outlined"
									label="VERSIÓN PRUEBA"
									disabled
									fullWidth
									defaultValue=""
									{...register('version')}
									InputLabelProps={{
										shrink: true,
									}}
								></TextField>
							</Container>
						</Container>
					)}

					{activeStep === 2 && (
						<Container maxWidth="xxl" sx={{ paddingTop: 5, paddingBottom: 5, height: '270px' }}>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Typography variant="subtitle1">
									CANDIDATO <span style={{ fontWeight: 'bold' }}>{Nombre.toLocaleUpperCase()}</span> RUN{' '}
									<span style={{ fontWeight: 'bold' }}>{FormatRut(Rut) + ' '}</span>
									SE SOMETERÁ A UNA PRUEBA PCT VERSIÓN <span style={{ fontWeight: 'bold' }}>{descVersion}</span> PARA EL PERFIL
									<span style={{ fontWeight: 'bold' }}>{descPerfil}</span> con su respectiva UCL <span style={{ fontWeight: 'bold' }}>{descUcl}</span>
									.
								</Typography>
							</Box>
							<Box sx={{ display: 'flex' }}>
								<Typography variant="subtitle1">
									CONSTA DE UN TIEMPO MÁXIMO DE <span style={{ fontWeight: 'bold' }}>60 MINUTOS</span> PARA RENDIR LA PRUEBA. LAS ALTERNATIVAS SON
									<span style={{ fontWeight: 'bold' }}> A, B, C, D, E </span>.
								</Typography>
							</Box>

							<Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
								<Button variant="contained" size="large" onClick={() => getPruebaInstrumento()}>
									INICIAR PRUEBA
								</Button>
							</Box>
						</Container>
					)}
				</form>

				<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
					<Button variant="contained" color="warning" disabled={activeStep === 0} onClick={handleBack}>
						Atrás
					</Button>
					<Button variant="contained" color="success" onClick={handleNext} disabled={activeStep === steps.length - 1}>
						{activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
					</Button>
				</Container>
			</Container>

			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="warning" />
			</Backdrop>
		</>
	);
}
