import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
const EditCoupon = () => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	useEffect(() => {
		if (!selectedProduct) {
			navigate('/products');
		}
		console.log(selectedProduct);
	}, [selectedProduct, navigate]);
	const [name, setName] = useState('');
	const [code, setcode] = useState('');
	const [endTime, setEndTime] = useState('');
	const [startTime, setStartTime] = useState('');
	const [maxAmount, setMaxAmount] = useState('');
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const [isLoading, setIsLoading] = useState(null);
	const queryClient = useQueryClient();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const handleUpdateCoupon = async () => {
		const data = {
			name,
			code,
			startTime,
			endTime,
			maxAmount,
			image,
		};

		if (image === '') {
			return toast.error('coupon image is required');
		}
		setIsLoading(true);
		try {
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			formData.append('image', imageFile);
			axios
				.patch(`${apiUrl}/products/${selectedProduct._id}`, formData, config)
				.then((res) => {
					if (res.data) {
						toast.success('Product updated successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['products']);
					navigate('/products');
				})
				.catch((error) => {
					toast.error(error.message);
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};
	const handleCancel = () => {
		setSelectedProduct('');
		navigate('/products');
	};
	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const maxSize = 5 * 1024 * 1024; // 5MB in bytes
		const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
		const isValidType = validTypes.includes(file.type);
		if (!file) {
			return toast.error('add a valid image');
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		if (!isValidType) {
			toast.error('Invalid file type. Only SVG, JPEG, and PNG are allowed.');
			return;
		}
		if (file.size > maxSize) {
			return toast.error('Image size must be less than 5Mb');
		}
		const imgname = file.name;
		setImageName(imgname);
		reader.onloadend = () => {
			const imageDataURL = reader.result;
			setImage(imageDataURL);
			setImageFile(file);
		};
	};
	const handleClick = () => {
		hiddenFileInput.current.click();
	};
	return (
		<>
			<div className="body-content px-8 py-8 bg-slate-100">
				<div className="flex justify-between mb-10">
					<div className="page-title mb-6 sm:mb-0">
						<h3 className="mb-0 text-[28px]">Edit Product</h3>
						<ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
							<li className="breadcrumb-item text-muted">
								<Link to={'./'} className="text-hover-primary">
									{' '}
									Home
								</Link>
							</li>
							<li className="breadcrumb-item flex items-center">
								<span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
							</li>
							<li className="breadcrumb-item text-muted">Edit Product</li>
						</ul>
					</div>
					<div className="mb-2 flex sm:justify-end items-center flex-wrap">
						<button
							onClick={handleUpdateCoupon}
							className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2"
						>
							Save
						</button>
						<button
							onClick={handleCancel}
							className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white sm:mb-0 mb-2"
						>
							Cancel
						</button>
					</div>
				</div>

				{/* <!-- table --> */}
				<div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
					<div className="tp-search-box flex items-center justify-between px-8 py-8">
						<div className="product-add-btn flex ">
							<a href="category.html" className="tp-btn">
								Create Coupon
							</a>
						</div>
					</div>

					<div className="relative overflow-x-auto  mx-8">
						<table className="w-full text-base text-left text-gray-500">
							{/* <!-- Sidemenu closed --> */}
							<div className="app-content icon-content">
								<div className="section">
									<div className="coupon-container">
										<h2>Edit Coupon</h2>
										<form className="coupon-form">
											<label htmlFor="coupon-image" className="coupon-label">
												{imageName || 'Coupon Image'}
											</label>
											<br />
											<input
												type="file"
												onChange={handleImageChange}
												onClick={handleClick}
												id="coupon-image"
												name="coupon-image"
											/>
											<div className="mb-6">
												<label
													htmlFor="coupon-name"
													className="mb-0 text-base text-black"
												>
													Coupon Name
												</label>
												<input
													className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
													type="text"
													id="coupon-name"
													name="coupon-name"
													value={name}
													onChange={(e) => setName(e.target.value)}
													required
												/>
											</div>
											<label htmlFor="coupon-code" className="coupon-label">
												Coupon Code
											</label>
											<br />
											<input
												type="text"
												id="coupon-code"
												name="coupon-code"
												value={code}
												onChange={(e) => setcode(e.target.value)}
												required
											/>
											<br />
											<label htmlFor="start-time" className="coupon-label">
												Start Time
											</label>
											<input
												type="datetime-local"
												id="start-time"
												name="start-time"
												value={startTime}
												onChange={(e) => setStartTime(e.target.value)}
												required
											/>
											<br />
											<label htmlFor="end-time" className="coupon-label">
												End Time
											</label>
											<input
												type="datetime-local"
												id="end-time"
												name="end-time"
												value={endTime}
												onChange={(e) => setEndTime(e.target.value)}
												required
											/>
											<br />
											<label htmlFor="discount-type" className="coupon-label">
												Discount Type
											</label>
											<br />
											<select id="discount-type" name="discount-type" required>
												<option value="percentage">Percentage</option>
												<option value="fixed">Fixed Amount</option>
											</select>
											<br />
											<label htmlFor="max-amount" className="coupon-label">
												Maximum Amount
											</label>
											<input
												type="number"
												id="max-amount"
												name="max-amount"
												value={maxAmount}
												onChange={(e) => setMaxAmount(e.target.value)}
												placeholder="$20.00 - $50.00"
											/>
											<br />

											<label htmlFor="discount-type" className="coupon-label">
												Choose status
											</label>
											<br />
											<select id="discount-type" name="discount-type" required>
												<option value="percentage">Publish</option>
												<option value="fixed">Later</option>
											</select>
											<br />
											<br />
											<button
												onClick={handleUpdateCoupon}
												type="button"
												className="add-coupon-btn"
											>
												Add Coupon
											</button>
										</form>
									</div>
								</div>
							</div>
						</table>
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</>
	);
};

export default EditCoupon;
