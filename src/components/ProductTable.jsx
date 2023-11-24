/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import Table from './TableWithPaginiation';
import { Link } from 'react-router-dom';
import DebouncedInput from './DebouncedInput';

const ProductTable = ({ data, isLoading }) => {
	const [selectedStatus, setSelectedStatus] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');
	const name = 'Products';

	const handelEdit = (value) => {
		console.log(value);
	};
	const columns = [
		{
			Header: 'Name',
			accessor: 'name',
			Cell: ({ row }) => {
				const product = row.original;
				return (
					<Link
						to={`/products/${product?._id}`}
						className="flex items-center space-x-5"
					>
						<img
							className="w-[60px] h-[60px] rounded-md"
							src={
								product?.image?.url ||
								product?.image ||
								'assets/img/product/prodcut-1.jpg'
							}
							alt={product?.name}
						/>
						<span className="font-medium text-heading text-hover-primary transition">
							{product?.name}
						</span>
					</Link>
				);
			},
		},
		{ Header: 'SKU', accessor: 'sku' },
		{
			Header: 'QTY',
			accessor: 'quantity',

			Cell: ({ row }) => {
				const product = row.original;
				return (
					<>
						{product?.quantity <= 0 && (
							<span className="text-[11px] -translate-y-[1px] inline-block text-danger px-3 py-1 rounded-md leading-none bg-danger/10 font-medium text-end">
								Out Of Stock
							</span>
						)}
						{product?.quantity > 0 && product?.quantity < 10 && (
							<span className="text-[11px] -translate-y-[1px] inline-block text-warning px-3 py-1 rounded-md leading-none bg-warning/10 font-medium text-end">
								Low Stock
							</span>
						)}{' '}
						{product?.quantity}
					</>
				);
			},
		},

		{ Header: 'Price', accessor: 'price' },
		{ Header: 'Rating', accessor: 'rating' },
		{
			Header: 'Status',
			accessor: 'status',
			Cell: ({ value }) => (
				<span className={`text-[11px] ${getStatusStyle(value)}`}>{value}</span>
			),
		},
		{
			Header: 'Actions',
			accessor: 'actions',
			Cell: ({ row }) => {
				return (
					<div className="flex items-center space-x-2">
						<button
							onClick={() => handelEdit(row.original)}
							className="bg-success hover:bg-green-600 text-white inline-block text-center leading-5 text-tiny font-medium pt-2 pb-[6px] px-4 rounded-md"
						>
							<span className="text-[9px] inline-block -translate-y-[1px] mr-[1px]">
								Edit
							</span>
						</button>
						<button className="bg-white text-slate-700 border border-slate-200 hover:bg-danger hover:border-danger hover:text-white inline-block text-center leading-5 text-tiny font-medium pt-[6px] pb-[5px] px-4 rounded-md">
							<svg
								className="-translate-y-px"
								width="14"
								height="14"
								viewBox="0 0 20 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.0697 4.23C17.4597 4.07 15.8497 3.95 14.2297 3.86V3.85L14.0097 2.55C13.8597 1.63 13.6397 0.25 11.2997 0.25H8.67967C6.34967 0.25 6.12967 1.57 5.96967 2.54L5.75967 3.82C4.82967 3.88 3.89967 3.94 2.96967 4.03L0.929669 4.23C0.509669 4.27 0.209669 4.64 0.249669 5.05C0.289669 5.46 0.649669 5.76 1.06967 5.72L3.10967 5.52C8.34967 5 13.6297 5.2 18.9297 5.73C18.9597 5.73 18.9797 5.73 19.0097 5.73C19.3897 5.73 19.7197 5.44 19.7597 5.05C19.7897 4.64 19.4897 4.27 19.0697 4.23Z"
									fill="currentColor"
								/>
								<path
									d="M17.2297 7.14C16.9897 6.89 16.6597 6.75 16.3197 6.75H3.67975C3.33975 6.75 2.99975 6.89 2.76975 7.14C2.53975 7.39 2.40975 7.73 2.42975 8.08L3.04975 18.34C3.15975 19.86 3.29975 21.76 6.78975 21.76H13.2097C16.6997 21.76 16.8398 19.87 16.9497 18.34L17.5697 8.09C17.5897 7.73 17.4597 7.39 17.2297 7.14ZM11.6597 16.75H8.32975C7.91975 16.75 7.57975 16.41 7.57975 16C7.57975 15.59 7.91975 15.25 8.32975 15.25H11.6597C12.0697 15.25 12.4097 15.59 12.4097 16C12.4097 16.41 12.0697 16.75 11.6597 16.75ZM12.4997 12.75H7.49975C7.08975 12.75 6.74975 12.41 6.74975 12C6.74975 11.59 7.08975 11.25 7.49975 11.25H12.4997C12.9097 11.25 13.2497 11.59 13.2497 12C13.2497 12.41 12.9097 12.75 12.4997 12.75Z"
									fill="currentColor"
								/>
							</svg>
							<span className="text-[9px] inline-block -translate-y-[1px] mr-[1px]">
								Delete
							</span>
						</button>
					</div>
				);
			},
		},
	];

	const getStatusStyle = (status) => {
		switch (status) {
			case 'Active':
				return 'text-success';
			case 'Pending':
				return 'text-warning';
			case 'Delivered':
				return 'text-primary';
			default:
				return '';
		}
	};
	const filteredData = useMemo(() => {
		if (selectedStatus === '') {
			return data;
		}
		return data.filter((items) => items.status === selectedStatus);
	}, [data, selectedStatus]);
	data = useMemo(() => filteredData, [filteredData]);
	return (
		<>
			<div className="tp-search-box flex items-center justify-between px-8 py-8">
				<div className="search-input relative">
					<DebouncedInput
						className="input h-[44px] w-full pl-14"
						value={globalFilter ?? ''}
						onChange={(value) => setGlobalFilter(String(value))}
						type="text"
						placeholder="Search..."
					/>
					<button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
						<svg
							width="16"
							height="16"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M18.9999 19L14.6499 14.65"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>
				<div className="flex justify-end space-x-6">
					<div className="search-select mr-3 flex items-center space-x-3 ">
						<span className="text-tiny inline-block leading-none -translate-y-[2px]">
							Status
						</span>
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
						>
							<option value="">Show All</option>
							<option value="active">Active</option>
							<option value="inActive">In Active</option>
							<option value="schedule">Scheduled</option>
							<option value="lowStock">Low Stock</option>
							<option value="outOfStock">Out of Stock</option>
						</select>
					</div>
					<div className="product-add-btn flex ">
						<Link to={'/add-product'} className="tp-btn">
							Add {name}
						</Link>
					</div>
				</div>
			</div>
			<Table
				data={data}
				columns={columns}
				globalFilter={globalFilter}
				pageSize={2}
				name={name}
				isLoading={isLoading}
			/>
		</>
	);
};

export default ProductTable;
