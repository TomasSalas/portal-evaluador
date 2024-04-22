import Navbar from './Components/Navbar/NavBar';
import { Avatar, Backdrop, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Verificar } from './Functions/Verificar';
import { useForm } from 'react-hook-form';
import { FormatRut } from './Functions/FormatRut';
import { CreateCandidato } from './Functions/CreateCandidato';
import { Toaster, toast } from 'sonner';

export const CrearCandidato = () => {
	let Nombre = '';
	let Role = '';

	const storedData = localStorage.getItem('userData');
	const navigate = useNavigate();
	const verificar = Verificar();
	const [open, setOpen] = useState(false);

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const onChangeInput = useCallback(
		(data) => {
			if (data.target.value.includes('NaN-')) {
				setValue('rut', '');
			}
			setValue('rut', FormatRut(data.target.value));
		},
		[setValue],
	);

	const onChangeInputEmpresa = useCallback(
		(data) => {
			if (data.target.value.includes('NaN-')) {
				setValue('rutEmpresa', '');
			}
			setValue('rutEmpresa', FormatRut(data.target.value));
		},
		[setValue],
	);

	const handleTelefonoChange = (e) => {
		const input = e.target.value;
		if (input.length > 9) {
			e.target.value = input.slice(0, 9);
		}
		handleDniChange(e);
	};

	const handleDniChange = useCallback(
		(event) => {
			switch (event.target.name) {
				case 'dni':
					setValue('dni', event.target.value.toUpperCase());
					break;
				case 'nombres':
					setValue('nombres', event.target.value.toUpperCase());
					break;
				case 'apellidos':
					setValue('apellidos', event.target.value.toUpperCase());
					break;
				case 'direccion':
					setValue('direccion', event.target.value.toUpperCase());
					break;
				case 'ciudad':
					setValue('ciudad', event.target.value.toUpperCase());
					break;
				case 'comuna':
					setValue('comuna', event.target.value.toUpperCase());
					break;
				case 'email':
					setValue('email', event.target.value.toUpperCase());
					break;
				case 'nacionalidad':
					setValue('nacionalidad', event.target.value.toUpperCase());
					break;
				case 'nombreEmpresa':
					setValue('nombreEmpresa', event.target.value.toUpperCase());
					break;
			}
		},
		[setValue],
	);

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.name;
		Role = parsedData.state.rol;
	}

	const onSubmit = async (info) => {
		setOpen(true);
		const { error, data } = await CreateCandidato(info);

		if (!error) {
			setOpen(false);
			toast.success('Candidato agregado exitosamente');
			reset();
		} else {
			setOpen(false);
			toast.error(data);
			reset();
		}
	};

	const rut = watch('rut', '');
	const dni = watch('dni', '');

	useEffect(() => {
		const rutRequired = !dni;
		const dniRequired = !rut;
		register('rut', {
			onChange: (e) => {
				onChangeInput(e);
			},
			required: rutRequired,
		});
		register('dni', {
			onChange: (e) => {
				handleDniChange(e);
			},
			required: dniRequired,
		});
	}, [dni, rut, register, handleDniChange, onChangeInput]);

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
			<Toaster richColors />
			<Navbar name={Nombre} rol={Role} />
			<Container maxWidth="xxl" sx={{ paddingTop: 10 }}>
				<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
					<Avatar sx={{ backgroundColor: '#ed6c02' }}> C </Avatar> <Typography variant="h6"> CREAR CANDIDATOS </Typography>
				</Container>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', paddingTop: 3, gap: 3 }}>
						<TextField
							fullWidth
							variant="outlined"
							label="RUT CANDIDATO"
							inputProps={{ maxLength: 12 }}
							{...register('rut')}
							error={!!errors.rut}
							helperText={errors.rut ? 'Campo Obligatorio' : ' '}
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="DNI"
							inputProps={{ maxLength: 20 }}
							{...register('dni')}
							error={!!errors.dni}
							helperText={errors.dni ? 'Campo Obligatorio' : ' '}
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="NOMBRE"
							{...register('nombres', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.nombres}
							helperText={errors.nombres ? 'Campo Obligatorio' : ' '}
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="APELLIDOS"
							{...register('apellidos', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.apellidos}
							helperText={errors.apellidos ? 'Campo Obligatorio' : ' '}
						/>
					</Container>

					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 2 }}>
						<TextField
							fullWidth
							variant="outlined"
							label="DIRECCIÓN"
							{...register('direccion', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.direccion}
							helperText={errors.direccion ? 'Campo Obligatorio' : ' '}
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="CIUDAD"
							{...register('ciudad', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.ciudad}
							helperText={errors.ciudad ? 'Campo Obligatorio' : ' '}
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="COMUNA"
							{...register('comuna', {
								onChange: (e) => {
									handleDniChange(e);
								},
							})}
							error={!!errors.comuna}
							helperText={errors.comuna ? 'Campo Obligatorio' : ' '}
						/>
					</Container>

					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 2 }}>
						<TextField
							fullWidth
							variant="outlined"
							label="CORREO ELECTRÓNICO"
							{...register('email', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.email}
							helperText={errors.email ? 'Campo Obligatorio' : ' '}
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="TELÉFONO"
							{...register('telefono', {
								onChange: (e) => {
									handleTelefonoChange(e);
								},
								required: true,
							})}
							error={!!errors.telefono}
							helperText={errors.telefono ? 'Campo Obligatorio' : ' '}
							type="number"
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="NACIONALIDAD"
							{...register('nacionalidad', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.nacionalidad}
							helperText={errors.nacionalidad ? 'Campo Obligatorio' : ' '}
						/>
					</Container>

					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 2 }}>
						<TextField
							fullWidth
							variant="outlined"
							label="RUT EMPRESA"
							{...register('rutEmpresa', {
								onChange: (e) => {
									onChangeInputEmpresa(e);
								},
							})}
							inputProps={{ maxLength: 12 }}
							error={!!errors.telefono}
							helperText={errors.telefono ? 'Campo Obligatorio' : ' '}
							type="number"
						/>
						<TextField
							fullWidth
							variant="outlined"
							label="NOMBRE EMPRESA"
							{...register('nombreEmpresa', {
								onChange: (e) => {
									handleDniChange(e);
								},
								required: true,
							})}
							error={!!errors.nacionalidad}
							helperText={errors.nacionalidad ? 'Campo Obligatorio' : ' '}
						/>
					</Container>

					<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 3 }}>
						<Button variant="contained" color="success" type="submit">
							Guardar
						</Button>
					</Container>
				</form>
			</Container>

			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="warning" />
			</Backdrop>
		</>
	);
};
