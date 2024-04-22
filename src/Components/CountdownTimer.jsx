/* eslint-disable react/prop-types */
import { Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const CountdownTimer = ({ onTimeUp }) => {
	const initialMinutes = 10;
	const [minutes, setMinutes] = useState(parseInt(localStorage.getItem('remainingMinutes')) || initialMinutes);
	const [seconds, setSeconds] = useState(parseInt(localStorage.getItem('remainingSeconds')) || 0);

	useEffect(() => {
		const timer = setInterval(() => {
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(timer);
					onTimeUp();
				} else {
					setMinutes((prevMinutes) => {
						const newMinutes = prevMinutes - 1;
						localStorage.setItem('remainingMinutes', newMinutes);
						return newMinutes;
					});
					setSeconds(59);
				}
			} else {
				setSeconds((prevSeconds) => {
					const newSeconds = prevSeconds - 1;
					localStorage.setItem('remainingSeconds', newSeconds);
					return newSeconds;
				});
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [minutes, seconds, onTimeUp]);

	return (
		<>
			<Container maxWidth="xxl">
				<Typography variant="h6">
					{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
				</Typography>
			</Container>
		</>
	);
};

export default CountdownTimer;
