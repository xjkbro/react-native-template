import { create } from "zustand";

export const useStore = create((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));

export const useTokens = create((set) => ({
	accessToken: "",
	refreshToken: "",
	setAccessToken: (accessToken) => set({ accessToken }),
	setRefreshToken: (refreshToken) => set({ refreshToken }),
}));
