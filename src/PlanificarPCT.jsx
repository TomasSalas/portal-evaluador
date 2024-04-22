import Navbar from './Components/Navbar/NavBar';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Verificar } from './Functions/Verificar';
import {
	Autocomplete,
	Avatar,
	Backdrop,
	Button,
	CircularProgress,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import 'moment/locale/es';
import { Controller, useForm } from 'react-hook-form';
import { ListarPerfiles } from './Functions/ListarPerfiles';
import { ListarCandidatos } from './Functions/ListarCandidatos';
import { ListarUCL } from './Functions/ListarUCL';
import { ListarVersiones } from './Functions/ListarVersiones';
import { CrearPrePlanificacion } from './Functions/CrearPrePlanificacion';
import { Toaster, toast } from 'sonner';

export const PlanificarPCT = () => {
	moment.updateLocale('es', {
		months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
		monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
		weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
		weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
		weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
		week: {
			dow: 1,
		},
	});

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const verificar = Verificar();
	let Role = '';
	let Nombre = '';

	const [data, setData] = useState([]);
	const [Perfil, setPerfil] = useState([]);
	const [Candidato, setCandidato] = useState([]);
	const [Ucl, setUcl] = useState([]);
	const [Version, setVersion] = useState([]);
	const [open, setOpen] = useState(false);

	const storedData = localStorage.getItem('userData');

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Nombre = parsedData.state.name;
		Role = parsedData.state.rol;
	}

	const Rubrica = [
		{ id: 1, name: 'OPERACIONAL' },
		{ id: 2, name: 'CODELCO VP' },
		{ id: 3, name: 'CODELCO VP SIN CRITICIDAD EN FAENA' },
	];

	const onSubmitPlan = async (parms) => {
		setOpen(true);
		const { Candidato, Fecha_Prueba, Perfil, Ucl, Version, rubrica } = parms;
		const fechaCreacion = Fecha_Prueba.format('YYYY-MM-DD');
		const crridperfil = Perfil.crrIdperfil;
		const nombrePerfil = Perfil.descPerfil;
		const crriducl = Ucl.idUcl;
		const nombreUcl = Ucl.desUcl;
		const crridinstrumento = Version.crrIdInstrumento;
		const nombreVersion = Version.glsInstrumento;
		const crridrubrica = rubrica.id;
		const nombreRubrica = rubrica.name;
		const idcandidato = Candidato.idcandidatos;
		const nombreCandidato = Candidato.nombre;

		const infoTabla = { nombrePerfil, nombreUcl, nombreVersion, fechaCreacion, nombreRubrica, nombreCandidato };
		const infoEnvio = { crridperfil, crriducl, crridinstrumento, crridrubrica, idcandidato, fechaCreacion };

		const { error, data } = await CrearPrePlanificacion(infoEnvio);

		if (!error) {
			setOpen(false);
			toast.success('Candidato agregado exitosamente');
			setData((prevData) => [...prevData, infoTabla]);
			reset();
		} else {
			setOpen(false);
			toast.error(data);
			reset();
		}
	};

	const obtenerPerfiles = useCallback(async () => {
		try {
			const { error, result } = await ListarPerfiles();
			if (!error) {
				const perfilesUnicos = result.filter((perfil, index, self) => index === self.findIndex((p) => p.descPerfil === perfil.descPerfil));
				setPerfil(perfilesUnicos);
			}
		} catch (error) {
			console.error('Error al obtener los perfiles:', error);
		}
	}, []);

	const obtenerCandidatos = useCallback(async () => {
		try {
			const { error, result } = await ListarCandidatos();
			if (!error) {
				setCandidato(result);
			}
		} catch (error) {
			console.error('Error al obtener los perfiles:', error);
		}
	}, []);

	const ObtenerUcl = useCallback(async (id) => {
		try {
			const { error, result } = await ListarUCL(id);
			if (!error) {
				setUcl(result);
			}
		} catch (error) {
			console.error('Error al obtener los perfiles:', error);
		}
	}, []);

	const ObtenerVersiones = useCallback(async (id) => {
		try {
			const { error, result } = await ListarVersiones(id);
			if (!error) {
				setVersion(result);
			}
		} catch (error) {
			console.error('Error al obtener los perfiles:', error);
		}
	}, []);

	useEffect(() => {
		obtenerPerfiles();
		obtenerCandidatos();
	}, [obtenerPerfiles, obtenerCandidatos]);

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
					<Avatar sx={{ backgroundColor: '#ed6c02' }}> P </Avatar> <Typography variant="h6"> INGRESAR CANDIDATOS Y PRUEBAS </Typography>
				</Container>
				<form onSubmit={handleSubmit(onSubmitPlan)}>
					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 3 }}>
						<Controller
							name="Candidato"
							control={control}
							defaultValue={null}
							rules={{ required: 'Este campo es requerido' }}
							render={({ field }) => (
								<Autocomplete
									{...field}
									isOptionEqualToValue={(option, value) => option.idcandidatos === value.idcandidatos}
									onChange={(e, newValue) => field.onChange(newValue)}
									noOptionsText="No hay resultados ..."
									options={Candidato}
									getOptionLabel={(option) => option.nombre}
									fullWidth
									renderInput={(params) => (
										<TextField {...params} label="CANDIDATO" error={!!errors.Candidato} helperText={errors.Candidato ? 'Campo Obligatorio' : ' '} />
									)}
								/>
							)}
						/>

						<Controller
							name="rubrica"
							control={control}
							defaultValue={null}
							rules={{ required: 'Este campo es requerido' }}
							render={({ field }) => (
								<Autocomplete
									{...field}
									isOptionEqualToValue={(option, value) => option.id === value.id}
									onChange={(e, newValue) => field.onChange(newValue)}
									noOptionsText="No hay resultados ..."
									options={Rubrica}
									getOptionLabel={(option) => option.name}
									fullWidth
									renderInput={(params) => (
										<TextField {...params} label="RUBRICA" error={!!errors.rubrica} helperText={errors.rubrica ? 'Campo Obligatorio' : ' '} />
									)}
								/>
							)}
						/>
					</Container>
					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 2 }}>
						<Controller
							name="Perfil"
							control={control}
							defaultValue={null}
							rules={{ required: 'Este campo es requerido' }}
							render={({ field }) => (
								<Autocomplete
									{...field}
									isOptionEqualToValue={(option, value) => option.crrPerfil === value.crrPerfil}
									onChange={(event, newValue) => {
										if (newValue != undefined) {
											setValue('Ucl', null);
											ObtenerUcl(newValue.crrIdperfil);
										}
										field.onChange(newValue);
									}}
									sx={{ width: '100%' }}
									options={Perfil}
									getOptionLabel={(option) => option.descPerfil}
									renderInput={(params) => (
										<TextField {...params} label="PERFIL" error={!!errors.Perfil} helperText={errors.Perfil ? 'Campo Obligatorio' : ' '} />
									)}
								/>
							)}
						/>
					</Container>
					<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingTop: 2 }}>
						<Controller
							name="Ucl"
							control={control}
							defaultValue={null}
							rules={{ required: 'Este campo es requerido' }}
							render={({ field }) => (
								<Autocomplete
									{...field}
									isOptionEqualToValue={(option, value) => option.idUcl === value.idUcl}
									onChange={(e, newValue) => {
										if (newValue != undefined) {
											setValue('Version', null);
											ObtenerVersiones(newValue.idUcl);
										}
										field.onChange(newValue);
									}}
									noOptionsText="No hay resultados ..."
									options={Ucl}
									getOptionLabel={(option) => option.desUcl}
									fullWidth
									renderInput={(params) => (
										<TextField {...params} label="UCL" error={!!errors.Ucl} helperText={errors.Ucl ? 'Campo Obligatorio' : ' '} />
									)}
								/>
							)}
						/>
						<Controller
							name="Version"
							control={control}
							defaultValue={null}
							rules={{ required: 'Este campo es requerido' }}
							render={({ field }) => (
								<Autocomplete
									{...field}
									isOptionEqualToValue={(option, value) => option.crrIdInstrumento === value.crrIdInstrumento}
									onChange={(e, newValue) => field.onChange(newValue)}
									sx={{ width: '100%' }}
									options={Version}
									getOptionLabel={(option) => option.glsInstrumento}
									renderInput={(params) => (
										<TextField {...params} label="VERSIÓN" error={!!errors.Version} helperText={errors.Version ? 'Campo Obligatorio' : ' '} />
									)}
								/>
							)}
						/>
						<LocalizationProvider dateAdapter={AdapterMoment} locale="es">
							<Controller
								name="Fecha_Prueba"
								control={control}
								defaultValue={null}
								rules={{
									validate: (value) => value !== null || 'Este campo es requerido',
								}}
								render={({ field }) => (
									<DatePicker
										{...field}
										label="FECHA"
										inputFormat="DD/MM/YYYY"
										sx={{ width: '100%' }}
										error={!!errors.Fecha_Prueba}
										helperText={errors.Fecha_Prueba ? errors.Fecha_Prueba.message : ' '}
										firstDayOfWeek={1}
										slotProps={{
											textField: {
												error: !!errors.Fecha_Prueba,
												helperText: errors.Fecha_Prueba ? errors.Fecha_Prueba.message : ' ',
											},
										}}
									/>
								)}
							/>
						</LocalizationProvider>
					</Container>
					<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button variant="contained" color="warning" type="submit">
							Agregar
						</Button>
					</Container>
				</form>
				<Container maxWidth="xxl" sx={{ paddingTop: 5 }}>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell> NOMBRE CANDIDATO </TableCell>
									<TableCell> PERFIL </TableCell>
									<TableCell> UCL </TableCell>
									<TableCell> VERSIÓN </TableCell>
									<TableCell> RÚBRICA </TableCell>
									<TableCell> FECHA </TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((item, index) => {
									return (
										<TableRow key={index}>
											<TableCell>{item.nombreCandidato}</TableCell>
											<TableCell>{item.nombrePerfil}</TableCell>
											<TableCell>{item.nombreUcl}</TableCell>
											<TableCell>{item.nombreVersion}</TableCell>
											<TableCell>{item.nombreRubrica}</TableCell>
											<TableCell>{moment(item.Fecha).format('DD-MM-YYYY')}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</Container>

			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="warning" />
			</Backdrop>
		</>
	);
};
