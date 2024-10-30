export const getJobSites = async () => {
	// const response = await fetch(`${import.meta.env.VITE_API_URL}`);
	// return response.json();
	return Promise.resolve([{ id: 1 }, { id: 2 }]);
};

export const getUserPosts = async (userId: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`);
	return response.json();
};

export const getUserById = async (userId: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/`);
	return response.json();
};
