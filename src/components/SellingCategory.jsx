/* eslint-disable react/prop-types */
import BarChart from './BarChart';
const SellingCategory = ({ data }) => {
	// const labels = data.map((item) => item.label);
	// const data = data.map((item) => item.data);

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
			label: 'Sales Count',
			data: [0, 0, 0, 0, 0, 0, 10, 70, 56, 67, 89, 909],
		},
	];
	return <BarChart data={datasets} labels={labels} />;
};

export default SellingCategory;
