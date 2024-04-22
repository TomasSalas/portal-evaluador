import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Backdrop, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { EditarEvaluador } from './Functions/EditarEvaluador';
import { Toaster, toast } from 'sonner';
import { CambiarPasswordGlobal } from './Functions/CambiarPasswordGlobal';
import { Verificar } from './Functions/Verificar';
import { FormatRut } from './Functions/FormatRut';
import Swal from 'sweetalert2';
import Navbar from './Components/Navbar/NavBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MiCuenta() {
	const verificar = Verificar();

	const storedData = localStorage.getItem('userData');
	let Nombre = '';
	let Role = '';

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.name;
		Role = parsedData.state.rol;
	}

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({});

	const {
		register: register2,
		handleSubmit: handleSubmit2,
		watch: watch2,
		formState: { errors: errors2 },
	} = useForm({});

	const [infoLoaded, setInfoLoaded] = useState(false);
	const [openBack, setOpenBack] = useState(false);

	const getInfo = useCallback(async () => {
		const token = localStorage.getItem('token');

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		const response = await fetch('https://portaleval-back.azurewebsites.net/api/Evaluadores/ListadoEvaluadores', {
			method: 'GET',
			headers: headers,
		});

		const result = await response.json();
		const run = localStorage.getItem('run');

		const Users = result.resultado;

		if (Users.length > 0) {
			Users.filter((User) => User.run === parseInt(run)).map((data) => {
				setValue('rutEvaluador', FormatRut(data.run + data.digVerificador));
				setValue('nombreEvaluador', data.nombre);
				setValue('apellidoEvaluador', data.apellido);
				setValue('aniosExperto', data.aniosExperto);
				setValue('correo', data.correo);
				setValue('ciudad', data.ciudad);
				setValue('telefono', data.telefono);
				setValue('id', data.id);
			});
			setInfoLoaded(true);
		}
	}, [setValue]);

	const onSubmit = async (data) => {
		setOpenBack(true);
		const token = localStorage.getItem('token');
		const update = await EditarEvaluador(data, token);

		if (update) {
			setOpenBack(false);
			toast.success('¡Usuario actualizado exitosamente!');
			getInfo();
		}
	};

	const onSubmit2 = async (data2) => {
		Swal.fire({
			title: '¿Desea cambiar la contraseña al usuario?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				setOpenBack(true);
				const params = {
					run: parseInt(localStorage.getItem('run')),
					contrasenaActual: data2.contrasenaActual,
					nuevaContrasena: data2.contrasena2,
				};
				const token = localStorage.getItem('token');
				const success = await CambiarPasswordGlobal(params, token);

				if (success) {
					setOpenBack(false);
					Swal.fire({
						title: '!Contraseña cambiada exitosamente!',
						icon: 'success',
					}).then(() => {
						localStorage.removeItem('token');
						localStorage.removeItem('run');
						localStorage.removeItem('rol');
						localStorage.removeItem('name');
						navigate('/');
					});
				} else {
					Swal.fire({
						title: '!Contraseña no cambiada!',
						icon: 'error',
					});
				}
			}
		});
	};

	useEffect(() => {
		if (Role == null) {
			navigate('/');
		} else {
			verificar();
			getInfo();
		}
	}, [verificar, Role, navigate, getInfo]);

	return (
		<>
			<Navbar name={Nombre} rol={Role} />
			<Container maxWidth="xxl" sx={{ marginTop: 10, marginBottom: 10 }}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 2 }}>
					<Typography variant="h6">Aca puedes actualizar tus datos personales o actualizar tu contraseña.</Typography>
				</Box>

				<Accordion sx={{ marginTop: 3 }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
						<Avatar sx={{ bgcolor: deepOrange[500], marginRight: 2 }}>DS</Avatar> <Typography variant="h6">Datos Personales</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 2 }}>
							<Typography variant="h6">{Nombre} , puedes actualizar tus datos</Typography>
						</Box>
						<Container sx={{ marginTop: 3, marginBottom: 3 }}>
							{infoLoaded && (
								<form onSubmit={handleSubmit(onSubmit)}>
									<TextField
										label="Rut"
										type="text"
										variant="outlined"
										fullWidth
										disabled
										inputProps={{ maxLength: 12 }}
										{...register('rutEvaluador', {
											required: true,
										})}
									/>
									{errors.rutEvaluador && <span style={{ color: 'red' }}>Rut obligatorio</span>}

									<TextField label="Nombres" type="text" variant="outlined" fullWidth disabled sx={{ marginTop: 2 }} {...register('nombreEvaluador', { required: true })} />
									{errors.nombreEvaluador && <span style={{ color: 'red' }}>Nombre obligatorio</span>}

									<TextField label="Apellidos" type="text" variant="outlined" fullWidth disabled sx={{ marginTop: 2 }} {...register('apellidoEvaluador', { required: true })} />
									{errors.apellidoEvaluador && <span style={{ color: 'red' }}>Apellido obligatorio</span>}

									<TextField label="Años de experiencia" type="number" variant="outlined" fullWidth sx={{ marginTop: 2 }} {...register('aniosExperto', { required: true })} />
									{errors.aniosExperto && <span style={{ color: 'red' }}>Experiencia obligatoria</span>}

									<TextField label="Numero de Contacto" variant="outlined" fullWidth aria-readonly sx={{ marginTop: 2 }} inputProps={{ maxLength: 9 }} {...register('telefono', { required: true })} />
									{errors.telefono && <span style={{ color: 'red' }}>Numero de contacto obligatorio</span>}

									<TextField
										label="Correo electrónico"
										type="text"
										variant="outlined"
										fullWidth
										sx={{ marginTop: 2 }}
										{...register('correo', {
											required: true,
											pattern: {
												value: /\S+@\S+\.\S+/,
												message: 'Formato no válido como correo',
											},
										})}
									/>
									{errors.correo && <span style={{ color: 'red' }}>{errors.correo.message != '' ? errors.correo.message : 'Correo obligatorio'}</span>}

									<TextField label="Ciudad" type="text" variant="outlined" fullWidth sx={{ marginTop: 2 }} {...register('ciudad', { required: true })} />
									{errors.ciudad && <span style={{ color: 'red' }}>Cuidad obligatoria</span>}
									<Button fullWidth variant="contained" color="error" sx={{ height: 40, marginTop: 5 }} type="submit">
										{' '}
										Actualizar{' '}
									</Button>
								</form>
							)}
						</Container>
					</AccordionDetails>
				</Accordion>

				<Accordion sx={{ marginTop: 3 }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
						<Avatar sx={{ bgcolor: deepOrange[500], marginRight: 2 }}>CC</Avatar>
						<Typography variant="h6">Cambiar Contraseña</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 2 }}>
							<Typography variant="h6">{Nombre} , puedes actualizar tu contraseña</Typography>
						</Box>
						<Container sx={{ marginTop: 3, marginBottom: 3 }}>
							<form onSubmit={handleSubmit2(onSubmit2)}>
								<TextField label="Contraseña Actual" type="password" variant="outlined" autoComplete="current-password" fullWidth sx={{ marginTop: 3 }} {...register2('contrasenaActual', { required: true })} />
								{errors2.contrasena && (
									<Typography variant="subtitle1" style={{ color: 'red' }}>
										Contraseña actual obligatoria
									</Typography>
								)}

								<TextField label="Contraseña Nueva" type="password" variant="outlined" autoComplete="current-password" fullWidth sx={{ marginTop: 3 }} {...register2('contrasena', { required: true })} />
								{errors2.contrasena && (
									<Typography variant="subtitle1" style={{ color: 'red' }}>
										Nueva Contraseña obligatoria
									</Typography>
								)}

								<TextField
									label="Confirmar Contraseña"
									type="password"
									variant="outlined"
									autoComplete="current-password"
									fullWidth
									sx={{ marginTop: 3 }}
									{...register2('contrasena2', {
										required: true,
										validate: (val) => {
											if (watch2('contrasena') != val) {
												return 'Las contraseñas no coinciden';
											}
										},
									})}
								/>
								{errors2.contrasena2 && (
									<Typography variant="subtitle1" style={{ color: 'red' }}>
										{errors2.contrasena2.message ? errors2.contrasena2.message : 'Confirmación de contraseña obligaroria'}
									</Typography>
								)}
								<Button fullWidth variant="contained" color="error" sx={{ height: 40, marginTop: 5 }} type="submit">
									{' '}
									Cambiar Contraseña{' '}
								</Button>
							</form>
						</Container>
					</AccordionDetails>
				</Accordion>
			</Container>
			<Toaster richColors />
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBack}>
				<CircularProgress color="error" />
			</Backdrop>
		</>
	);
}
