import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
	const { user } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '') {
			return toast.error('error.message');
		}
		try {
			setIsLoading(true);
			const data = { email };
			console.log(data);
			axios
				.post(`${apiUrl}/admin/login`, data)
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success('Product saved successfully');
					}
					// setUser({ ...res.data, token: user.token });
					// LocalStorage.set('user', { ...res.data, token: user.token });
					// LocalStorage.set('token', user.token);
				})
				.catch((error) => {
					console.log(error);
					toast.error(error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};
	return (
		<>
			<div className="tp-main-wrapper h-screen">
				<div className="container mx-auto my-auto h-full flex items-center justify-center">
					<div className="w-[500px] mx-auto my-auto shadow-lg bg-white pt-[50px] py-[60px] px-[60px]">
						<div className="text-center">
							<h4 className="text-[24px] mb-1">Reset Password</h4>
							<p>Enter your email address to request password reset.</p>
						</div>
						<div className="">
							<form onSubmit={handleSubmit}>
								<div className="mb-5">
									<p className="mb-0 text-base text-black">
										Email <span className="text-red">*</span>
									</p>
									<input
										className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
										type="email"
                                        placeholder="Enter Your Email"
                                        onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									className="tp-btn h-[49px] w-full justify-center"
								>
									Send Mail
								</button>

								<div className="tp-checkbox flex items-start space-x-2 mt-5 justify-center">
									<p className="mb-0 leading-none">
										Remember password ?{' '}
										<a
											href="/login"
											className="text-theme border-b border-transparent hover:border-theme"
										>
											Login
										</a>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default ForgetPassword;
