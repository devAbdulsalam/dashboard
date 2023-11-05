// import React from 'react'
import { useState, useContext, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// import { fetchProduct } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
// import { useNavigate } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

const Profile = () => {
	const { user } = useContext(AuthContext);
	// const [search, setSearch] = useState();
	const apiUrl = import.meta.env.VITE_API_URL;
	const [name, setName] = useState(user?.name);
	const [lastName, setLastName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phone);
	const [bio, setBio] = useState(user?.bio);
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const hiddenFileInput = useRef(null);
	const [loading, setLoading] = useState(null);
	const queryClient = useQueryClient();
	// const navigate = useNavigate();
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
			'Content-Type': 'multipart/form-data',
		},
	};
	const handleUpdateProfile = async () => {
		const data = {
			name,
			email,
			bio,
		};

		if (name === '') {
			return toast.error('name is required');
		}
		setLoading(true);
		try {
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			formData.append('image', imageFile);
			axios
				.patch(`${apiUrl}/user/${user?._id}`, formData, config)
				.then((res) => {
					if (res.data) {
						toast.success('Profile updated successfully');
					}
					console.log(res);
					queryClient.invalidateQueries(['user']);
				})
				.catch((error) => {
					toast.error(error.message);
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
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
					<div className="page-title">
						<h3 className="mb-0 text-[28px]">My Profile</h3>
					</div>
				</div>

				{/* <!-- content here --> */}

				<div className="bg-white rounded-md overflow-hidden mb-10">
					<div className="relative h-[200px] w-full">
						<div
							data-bg="assets/img/bg/profile-header.jpg"
							className="data-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
						></div>
						<input type="file" id="coverPhoto" onClick={handleClick} />
						<label
							htmlFor="coverPhoto"
							className="bg-white px-4 py-1 rounded-md text-center absolute right-5 top-5 sm:top-auto sm:bottom-5 z-10 text-tiny font-medium shadow-lg transition-all duration-200 border-0  hover:cursor-pointer hover:bg-theme hover:text-white"
						>
							<svg
								className="-translate-y-[2px]"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="12"
								height="12"
							>
								<path
									fill="currentColor"
									d="M19,4h-.508L16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L5.508,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A5.006,5.006,0,0,0,19,4ZM9.276,2.39A1.006,1.006,0,0,1,10.068,2h3.864a1.008,1.008,0,0,1,.792.39L15.966,4H8.034ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6H19a3,3,0,0,1,3,3Z"
								/>
								<path
									fill="currentColor"
									d="M12,8a6,6,0,1,0,6,6A6.006,6.006,0,0,0,12,8Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,18Z"
								/>
							</svg>
							Upload Cover Photo
						</label>
					</div>
					<div className="px-8 pb-8 relative">
						<div className="-mt-[75px] mb-3 relative inline-block">
							<img
								className="w-[150px] h-[150px] rounded-[14px] border-4 border-white bg-white"
								src={image || 'assets/img/users/user-4.jpg'}
								alt={imageName || name}
								onClick={handleClick}
							/>
							<input
								type="file"
								id="profilePhoto"
								className="hidden"
								ref={hiddenFileInput}
								onChange={handleImageChange}
							/>
							<label
								htmlFor="profilePhoto"
								className="inline-block w-8 h-8 rounded-full shadow-lg text-white bg-theme border-[2px] border-white text-center absolute top-[6px] right-[6px] translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
							>
								<svg
									className="-translate-y-[2px]"
									xmlns="http://www.w3.org/2000/svg"
									// xmlns:xlink="http://www.w3.org/1999/xlink"
									x="0px"
									y="0px"
									width="16"
									height="16"
									viewBox="0 0 36.174 36.174"
								>
									<path
										fill="currentColor"
										d="M23.921,20.528c0,3.217-2.617,5.834-5.834,5.834s-5.833-2.617-5.833-5.834s2.616-5.834,5.833-5.834 S23.921,17.312,23.921,20.528z M36.174,12.244v16.57c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4v-16.57c0-2.209,1.791-4,4-4h4.92 V6.86c0-1.933,1.566-3.5,3.5-3.5h11.334c1.934,0,3.5,1.567,3.5,3.5v1.383h4.92C34.383,8.244,36.174,10.035,36.174,12.244z M26.921,20.528c0-4.871-3.963-8.834-8.834-8.834c-4.87,0-8.833,3.963-8.833,8.834s3.963,8.834,8.833,8.834 C22.958,29.362,26.921,25.399,26.921,20.528z"
									/>
								</svg>
							</label>
						</div>
						<div className="">
							<h5 className="text-xl mb-0">{user?.name}</h5>
							<p className="text-tiny mb-0">{user?.name}</p>
						</div>
					</div>
				</div>

				<div className="">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 2xl:col-span-8">
							<div className="py-10 px-10 bg-white rounded-md">
								<h5 className="text-xl mb-6">Basic InhtmlFormation</h5>

								<div className="">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<div className="mb-5">
											<p className="mb-0 text-base text-black">First Name </p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
												type="text"
												placeholder="Name"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="mb-5">
											<p className="mb-0 text-base text-black">Last Name </p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
												type="text"
												placeholder="Name"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</div>
									</div>
									<div className="mb-5">
										<p className="mb-0 text-base text-black">Email </p>
										<input
											className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
											type="email"
											placeholder="Email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<div className="mb-5">
											<p className="mb-0 text-base text-black">Phone </p>
											<input
												className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
												type="text"
												placeholder="Phone"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
											/>
										</div>
										<div className="mb-5 profile-gender-select select-bordered">
											<p className="mb-0 text-base text-black">Gender </p>
											<select>
												<option value="male" selected>
													Male
												</option>
												<option value="female">Female</option>
												<option value="others">Others</option>
											</select>
										</div>
									</div>
									<div className="mb-5">
										<p className="mb-0 text-base text-black">Bio </p>
										<textarea
											className="input w-full h-[200px] py-4 rounded-md border border-gray6 px-6 text-base resize-none text-black"
											placeholder="Hi there, this is my bio..."
											value={bio}
											onChange={(e) => setBio(e.target.value)}
										></textarea>
									</div>
									<div className="text-end mt-5">
										<button
											onClick={handleUpdateProfile}
											className="tp-btn px-10 py-2"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-12 2xl:col-span-4">
							<div className="py-10 px-10 bg-white rounded-md mb-6">
								<h5 className="text-xl mb-6">Notification</h5>

								<div className="space-y-3 flex flex-col">
									<div className="tp-checkbox flex items-center mb-3 sm:mb-0">
										<input id="follows" type="checkbox" />
										<label htmlFor="follows">
											Like & Follows Notifications
										</label>
									</div>
									<div className="tp-checkbox flex items-center mb-3 sm:mb-0">
										<input id="comments" type="checkbox" />
										<label htmlFor="comments">
											Post, Comments & Replies Notifications
										</label>
									</div>
									<div className="tp-checkbox flex items-center mb-3 sm:mb-0">
										<input id="order" type="checkbox" />
										<label htmlFor="order">New Order Notifications</label>
									</div>
								</div>
							</div>
							<div className="py-10 px-10 bg-white rounded-md">
								<h5 className="text-xl mb-6">Security</h5>

								<div className="">
									<div className="mb-5">
										<p className="mb-0 text-base text-black">
											Current Passowrd
										</p>
										<input
											className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
											type="password"
											placeholder="Current Passowrd"
											value="123456"
										/>
									</div>
									<div className="mb-5">
										<p className="mb-0 text-base text-black">New Passowrd</p>
										<input
											className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
											type="password"
											placeholder="New Password"
											value="123456"
										/>
									</div>
									<div className="mb-5">
										<p className="mb-0 text-base text-black">
											Confirm Passowrd
										</p>
										<input
											className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
											type="password"
											placeholder="Confirm Password"
											value="123456"
										/>
									</div>
									<div className="text-end mt-5">
										<button
											onClick={handleUpdateProfile}
											className="tp-btn px-10 py-2"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</>
	);
};

export default Profile;
