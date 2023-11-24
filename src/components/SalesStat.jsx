/* eslint-disable react/prop-types */
import LineChart from './LineChart';
const SalesStat = () => {
	// const labels = data.map((item) => item.year);
	const labels = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const datasets = [
		{
			label: 'Sales',
			tension: 0.3,
			fill: true,
			backgroundColor: 'rgba(62, 151, 255, 0.2)',
			borderColor: 'rgba(62, 151, 255)',
			data: [20, 17, 15, 21, 24, 35, 37, 30, 20, 27, 25, 12],
		},
		{
			label: 'Visitors',
			tension: 0.3,
			fill: true,
			backgroundColor: 'rgba(80, 205, 137, 0.2)',
			borderColor: 'rgb(80, 205, 137)',
			data: [30, 12, 22, 30, 35, 37, 35, 25, 39, 30, 33, 32],
		},
		{
			label: 'Products',
			tension: 0.3,
			fill: true,
			backgroundColor: 'rgba(255, 152, 0, 0.2)',
			borderColor: 'rgb(255, 152, 0)',
			data: [40, 25, 22, 24, 27, 20, 24, 15, 29, 20, 32, 11],
		},
	];
	return <LineChart datasets={datasets} labels={labels} />;
};

export default SalesStat;
