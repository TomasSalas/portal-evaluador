import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useStore = create(
	persist(
		(set) => ({
			run: null,
			rol: null,
			name: null,
			idUsuario: null,
			setRun: (newRun) => set({ run: newRun }),
			setRol: (newRol) => set({ rol: newRol }),
			setName: (newName) => set({ name: newName }),
			setIdUsuario: (newIdUsuario) => set({ idUsuario: newIdUsuario }),
		}),
		{
			name: 'userData',
		},
	),
);
