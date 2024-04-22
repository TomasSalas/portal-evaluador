/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logot.png';
function Navbar(props) {
	const drawerWidth = 230;
	const { name, rol } = props;
	let navItems = [];

	if (rol == '8') {
		navItems = [
			{ label: 'Planificar Pruebas', path: '/planificar-pct' },
			{ label: 'Crear Candidato', path: '/crear-candidato' },
		];
	} else if (rol == '9') {
		navItems = [{ label: 'Rendir PCT', path: '/prueba-pct' }];
	} else if (rol == '6') {
		navItems = [{ label: 'Procesos Pendientes', path: '/pendientes' }];
	}

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorElCerrar, setAnchorElCerrar] = React.useState(null);
	const [anchorElCerrar3, setAnchorElCerrar3] = React.useState(null);

	//const navigate = useNavigate();

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const handleMenuOpenCerrar = (event) => {
		setAnchorElCerrar(event.currentTarget);
	};

	const handleMenuOpenCerrar3 = (event) => {
		setAnchorElCerrar3(event.currentTarget);
	};
	const handleMenuCloseCerrar = () => {
		setAnchorElCerrar(null);
	};
	const handleMenuCloseCerrar3 = () => {
		setAnchorElCerrar3(null);
	};
	// const handleMenuCloseCerrarUsuarios = () => {
	// 	setAnchorElCerrarUsuarios(null);
	// };

	// handleMenuCloseCerrarUsuarios;

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userData');
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		// const error = 'error';
		// document.cookie = `invalid=${error}; path=/; samesite=strict`;
		//window.location.href = 'http://localhost:5173/';
		window.location.href = 'https://login-mg.vercel.app/';
	};

	// const miCuenta = () => {
	//   navigate("/mi-cuenta");
	// };

	const location = useLocation();

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav" sx={{ backgroundColor: 'white', color: 'black', height: 60 }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{
								display: { xs: 'none', sm: 'none', md: 'block' },
								color: 'black',
								paddingRight: 2,
							}}
						>
							<img src={Logo} width={120} alt="Logo" />
						</Typography>
						<Typography
							variant="h6"
							component="div"
							sx={{
								display: { xs: 'none', sm: 'none', md: 'block' },
								color: 'black',
							}}
						>
							{rol == 'administrador' && (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 15,
										alignItems: 'start',
									}}
								>
									<Button
										aria-controls="nav-menu-cerrar"
										aria-haspopup="true"
										onClick={handleMenuOpenCerrar3}
										sx={{
											color:
												rol === 'administrador' &&
												(location.pathname === '/agregar-usuarios' || location.pathname === '/listar-usuarios' ? '#0063F7' : 'black'),
										}}
									>
										Usuarios
									</Button>
									<Menu
										anchorEl={anchorElCerrar3}
										open={Boolean(anchorElCerrar3)}
										onClose={handleMenuCloseCerrar3}
										id="nav-menu-cerrar"
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
									>
										{navItems.map((item, index) => (
											<div key={`user_${index}`}>
												<MenuItem onClick={handleMenuCloseCerrar3} component={Link} to={item.path}>
													<Button
														sx={{
															color: location.pathname === item.path ? '#0063F7' : 'black',
														}}
													>
														{item.label}
													</Button>
												</MenuItem>
											</div>
										))}
									</Menu>
								</div>
							)}
							{rol == '9' && (
								<>
									{navItems.map((item) => (
										<Link to={item.path} key={`evaluador_${item.label}`}>
											<Button
												sx={{
													color: location.pathname === item.path ? '#0063F7' : 'black',
													padding: 1,
												}}
											>
												{item.label}
											</Button>
										</Link>
									))}
								</>
							)}

							{rol == '8' && (
								<>
									{navItems.map((item) => (
										<Link to={item.path} key={`evaluador_${item.label}`}>
											<Button
												sx={{
													color: location.pathname === item.path ? '#0063F7' : 'black',
													padding: 1,
												}}
											>
												{item.label}
											</Button>
										</Link>
									))}
								</>
							)}

							{rol == '6' && (
								<>
									{navItems.map((item) => (
										<Link to={item.path} key={`evaluador_${item.label}`}>
											<Button
												sx={{
													color: location.pathname === item.path ? '#0063F7' : 'black',
													padding: 1,
												}}
											>
												{item.label}
											</Button>
										</Link>
									))}
								</>
							)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: { xs: 'none', sm: 'none', md: 'block' },
							color: 'black',
						}}
					>
						<Box>
							<Button aria-controls="nav-menu-cerrar" aria-haspopup="true" onClick={handleMenuOpenCerrar}>
								<PersonIcon /> Bienvenido {name}
							</Button>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'block', md: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
						color: 'black',
					}}
				>
					<Box
						sx={{
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography variant="h6" sx={{ my: 2 }}>
							<img src={Logo} width={150} alt="Logo" />
						</Typography>
						<Box
							sx={{
								paddingBottom: 1,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{rol == '9' && (
								<>
									{navItems.map((item) => (
										<Link to={item.path} key={`evaluador_${item.label}`}>
											<Button
												sx={{
													color: location.pathname === item.path ? '#0063F7' : 'black',
													padding: 1,
												}}
											>
												{item.label}
											</Button>
										</Link>
									))}
								</>
							)}

							{rol == '8' && (
								<>
									{navItems.map((item) => (
										<Link to={item.path} key={`evaluador_${item.label}`}>
											<Button
												sx={{
													color: location.pathname === item.path ? '#0063F7' : 'black',
													padding: 1,
												}}
											>
												{item.label}
											</Button>
										</Link>
									))}
								</>
							)}

							{rol == '6' && (
								<>
									{navItems.map((item) => (
										<Link to={item.path} key={`evaluador_${item.label}`}>
											<Button
												sx={{
													color: location.pathname === item.path ? '#0063F7' : 'black',
													padding: 1,
												}}
											>
												{item.label}
											</Button>
										</Link>
									))}
								</>
							)}
						</Box>
						<Typography variant="h6" sx={{ marginTop: '68vh' }}>
							<Button aria-controls="nav-menu-cerrar" aria-haspopup="true" onClick={handleMenuOpenCerrar}>
								<PersonIcon /> Bienvenido {name}
							</Button>
							<Menu
								anchorEl={anchorElCerrar}
								open={Boolean(anchorElCerrar)}
								onClose={handleMenuCloseCerrar}
								id="nav-menu-cerrar"
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
									}}
								>
									<MenuItem component={Link} to="/mi-cuenta">
										<Button
											sx={{
												color: location.pathname === '/mi-cuenta' ? '#0063F7' : 'black',
											}}
										>
											Mi Cuenta
										</Button>
									</MenuItem>
									<MenuItem component={Link} to="/">
										<Button sx={{ color: 'red' }} onClick={handleLogout}>
											Cerrar Sesión
										</Button>
									</MenuItem>
								</Box>
							</Menu>
						</Typography>
					</Box>
				</Drawer>
			</nav>
		</Box>
	);
}

Navbar.propTypes = {
	window: PropTypes.func,
};

export default Navbar;
