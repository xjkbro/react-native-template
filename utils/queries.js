import { useTokens } from "../store/store";
import { refreshAuthToken } from "./auth";

const updateToken = async ({ res }) => {
	if (res.status === 401 || res.status === 400) {
		const access = await refreshAuthToken(refreshToken, user, setUser);
		setAccessToken(access);
	}
};
export const createPost = async (data) => {
	const { post, accessToken, refreshToken, setAccessToken, user, setUser } =
		data;
	const res = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/api/posts`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(post),
	});

	updateToken({ res, refreshToken, setAccessToken, user, setUser });
	return res.json();
};
