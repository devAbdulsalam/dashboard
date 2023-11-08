import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchSite = async () => {
	try {
		const { data } = await axios.get(`${apiUrl}/general`);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchDashboard = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/general/dashboard`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProduct = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/product`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCoupons = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/management/coupon`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchOrder = async (prop) => {
	const { user, orderId } = prop;
	// console.log(prop);
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/order/${orderId}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchOrders = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/management/orders`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCoupon = async (prop) => {
	const { user, groupId } = prop;
	// console.log(prop);
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/group/${groupId}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCustomers = async (prop) => {
	const { user } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/user`, prop, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchCustomer = async (prop) => {
	const { user } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/user/${prop.id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchProductCategory = async (prop) => {
	const { user } = prop;
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/product/category`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchTransactions = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/transactions`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
const fetchTransaction = async (prop) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${prop?.token}`,
			},
		};
		const { data } = await axios.get(
			`${apiUrl}/transactions/${prop.id}`,
			config
		);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export {
	fetchSite,
	fetchDashboard,
	fetchProduct,
	fetchCoupons,
	fetchCoupon,
	fetchOrder,
	fetchOrders,
	fetchCustomers,
	fetchCustomer,
	fetchProductCategory,
	fetchTransactions,
	fetchTransaction,
};
