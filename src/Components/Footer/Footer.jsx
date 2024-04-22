import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './footer.css';

function Footer() {
	return (
		<Paper className="footer" elevation={3}>
			<Typography variant="body2" align="center">
				© {new Date().getFullYear()} Rakin - Tec. Todos los derechos reservados.
			</Typography>
		</Paper>
	);
}

export default Footer;
