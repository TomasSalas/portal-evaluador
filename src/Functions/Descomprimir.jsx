import pako from 'pako';

export const DescomprimirToken = (tokenComprimidoBase64) => {
	const tokenComprimido = new Uint8Array(
		atob(tokenComprimidoBase64)
			.split('')
			.map((char) => char.charCodeAt(0)),
	);

	const tokenDescomprimido = pako.inflate(tokenComprimido);

	const tokenOriginal = new TextDecoder().decode(tokenDescomprimido);
	return tokenOriginal;
};
