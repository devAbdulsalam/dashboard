/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { LocalStorage } from '../hooks/LocalStorage';

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [site, setSite] = useState('');
	const [selectedProduct, setSelectedProduct] = useState('');
	const [notification, setNotification] = useState([]);
	const [groupInfo, setGroupInfo] = useState('');
	const fetchUser = async () => {
		const user = await LocalStorage.get(`user`);
		const token = await LocalStorage.get('token');
		if (user) {
			setUser(user);
			setToken(token);
		}
	};
	// useEffect(() => {
	// 	const rememberMe = LocalStorage.get('rememberMe');
	// 	const username = LocalStorage.get('username');

	// 	if (rememberMe === 'true' && username) {
	// 		console.log(username);
	// 	}
	// }, []);

	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				site,
				setSite,
				selectedProduct,
				setSelectedProduct,
				notification,
				setNotification,
				groupInfo,
				setGroupInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
const AuthContext = createContext();
export default AuthContext;
