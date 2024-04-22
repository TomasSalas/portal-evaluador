/* eslint-disable no-unused-vars */
import {
	Backdrop,
	Box,
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
import { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import CountdownTimer from './Components/CountdownTimer';
import { Verificar } from './Functions/Verificar';
import { useNavigate, useLocation } from 'react-router-dom';
import { EnviarPrueba } from './Functions/EnviarPrueba';

export const PCT = () => {
	const location = useLocation();
	const [prueba, setPrueba] = useState([]);
	const [respuestas, setRespuestas] = useState([]);
	const [idUsuario, setIdUsuario] = useState([]);

	let Role = '';

	const storedData = localStorage.getItem('userData');

	if (storedData) {
		const parsedData = JSON.parse(storedData);
		Role = parsedData.state.rol;
	}

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const verificar = Verificar();

	const [open, setOpen] = useState(false);
	const [openCargar, setOpenCargar] = useState(false);
	const [openFinal, setOpenFinal] = useState(false);
	const [pruebaActualizada, setPruebaActualizada] = useState([]);

	const validateInput = (value) => {
		const validCharacters = ['A', 'B', 'C', 'D', 'E', 'Z'];
		return validCharacters.includes(value.toUpperCase());
	};

	const handleAnswerChange = (nroPregunta, value) => {
		const preguntaIndex = prueba.findIndex((pregunta) => pregunta.nroPregunta === nroPregunta);

		if (preguntaIndex !== -1) {
			const nuevaPrueba = [...prueba];
			nuevaPrueba[preguntaIndex] = { ...nuevaPrueba[preguntaIndex], alternativaSeleccionada: value };
			setPrueba(nuevaPrueba);

			const storedRespuestas = JSON.parse(localStorage.getItem('Preguntas')) || [];
			const respuestaIndex = storedRespuestas.findIndex((respuesta) => respuesta.pregunta === nroPregunta);

			if (respuestaIndex !== -1) {
				storedRespuestas[respuestaIndex] = { pregunta: nroPregunta, value: value };
			} else {
				storedRespuestas.push({ pregunta: nroPregunta, value: value });
			}

			localStorage.setItem('Preguntas', JSON.stringify(storedRespuestas));

			const respuestasCompletas = nuevaPrueba.map((pregunta) => ({
				...pregunta,
				alternativaSeleccionada: storedRespuestas.find((respuesta) => respuesta.pregunta === pregunta.nroPregunta)?.value || '',
			}));
			localStorage.setItem('PreguntasCompletas', JSON.stringify(respuestasCompletas));
		}
	};

	const onSubmit = async (data) => {
		setOpenCargar(true);
		const updatedPrueba = [...prueba];

		Object.entries(data).forEach(([nroPregunta, alternativaSeleccionada]) => {
			const preguntaIndex = parseInt(nroPregunta) - 1;

			const pregunta = updatedPrueba.find((pregunta) => pregunta.nroPregunta === preguntaIndex + 1);

			if (pregunta) {
				pregunta.alternativaSeleccionada = alternativaSeleccionada;
			}
		});

		const Enviar = await EnviarPrueba(updatedPrueba, idUsuario);

		if (Enviar) {
			setOpenCargar(false);
			setOpenFinal(true);
		}
	};

	const salirPrueba = () => {
		localStorage.removeItem('remainingMinutes');
		localStorage.removeItem('PreguntasCompletas');
		localStorage.removeItem('Preguntas');
		localStorage.removeItem('remainingSeconds');
		localStorage.removeItem('userData');
		localStorage.removeItem('token');
		//window.location.href = 'http://localhost:5173/';
		window.location.href = 'https://login-mg.vercel.app/';
	};
	const handleTimeUp = () => {
		setOpen(true);
	};

	useEffect(() => {
		const storedRespuestas = JSON.parse(localStorage.getItem('Preguntas'));

		if (storedRespuestas) {
			setRespuestas(storedRespuestas);
			storedRespuestas.forEach((data, index) => {
				setValue(`${index + 1}`, data.value);
			});
		}
	}, [setValue]);

	useEffect(() => {
		if (Role != null) {
			if (Role === '6') {
				navigate('/pendientes');
			}
			if (Role === '8') {
				navigate('/planificar-pct');
			} else {
				verificar();
			}
		} else {
			navigate('/');
		}
	}, [verificar, Role, navigate]);

	useEffect(() => {
		setPrueba(location.state.dataPrueba);
		setIdUsuario(location.state.idCandidato);
	}, [location.state.dataPrueba, location.state.idCandidato]);

	return (
		<>
			<CountdownTimer onTimeUp={handleTimeUp} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Container maxWidth="xxl">
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontSize: '16px' }}> N° PREGUNTA </TableCell>
									<TableCell sx={{ fontSize: '16px' }}> PREGUNTA </TableCell>
									<TableCell sx={{ fontSize: '16px' }}> ALTERNATIVA </TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{prueba.map((data, index) => {
									const pregunta = data.descPregunta.split(':')[0];
									const opcionesCompleta = data.descPregunta.split(':')[1];
									const opciones = opcionesCompleta.split('a)')[0];
									const opcionesSalto = opciones
										.split(/(\bII\b|\bIII\b|\bIV\b|\bV\b|\bVI\b|\bVII\b|\bVIII\b|\bIX\b|\bX\b)/)
										.map((fragmento, index) => {
											if (index === 0) {
												return <span key={index}>{fragmento.trim()}</span>;
											} else if (index % 2 === 1) {
												return (
													<Fragment key={index}>
														<br />
														{fragmento.trim()}
													</Fragment>
												);
											} else {
												return <Fragment key={index}>{fragmento.trim()}</Fragment>;
											}
										});

									const alternativas = opcionesCompleta.split('a)')[1];
									const texto = alternativas
										.split('.')
										.map((fragmento) => fragmento.trim())
										.filter(Boolean);

									texto[0] = 'a) ' + texto[0];

									const textoConSalto = texto.map((alternativa, index) => (
										<Fragment key={index}>
											{alternativa}
											{index !== texto.length - 1 && <br />}
										</Fragment>
									));

									return (
										<TableRow key={index}>
											<TableCell> {data.nroPregunta}</TableCell>
											<TableCell>
												<Box>
													<Box>{pregunta + ':'}</Box>
													<Box sx={{ paddingTop: 2 }}>{opcionesSalto}</Box>

													<Box sx={{ paddingTop: 2 }}>{textoConSalto}</Box>
												</Box>
											</TableCell>
											<TableCell sx={{ fontSize: '16px', justifyContent: 'flex-end' }}>
												<TextField
													sx={{ fontSize: '20px' }}
													error={!!errors[index + 1]}
													helperText={errors[index + 1] ? 'Campo Obligatorio' : ' '}
													inputProps={{
														maxLength: 1,
														style: { textTransform: 'uppercase' },
														onInput: function (event) {
															event.target.value = event.target.value.toUpperCase();
														},
														onChange: function (event) {
															handleAnswerChange(data.nroPregunta, event.target.value);
														},
													}}
													{...register(`${index + 1}`, { required: true, validate: validateInput })}
												/>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
				<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 2 }}>
					<Button variant="contained" color="success" type="submit">
						Guardar
					</Button>
				</Container>
			</form>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'center' }}>
					<Typography variant="h6"> Prueba terminada, se guardaron todas sus respuestas !</Typography>
				</Container>
			</Backdrop>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openCargar}>
				<CircularProgress color="warning" />
			</Backdrop>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openFinal}>
				<Container maxWidth="xxl" sx={{ display: 'flex', flexDirection: 'column' }}>
					<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography variant="h6"> Prueba terminada, se guardaron todas sus respuestas !</Typography>
					</Container>
					<Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
						<Button variant="contained" size="large" color="error" onClick={() => salirPrueba()}>
							Cerrar
						</Button>
					</Container>
				</Container>
			</Backdrop>
		</>
	);
};
