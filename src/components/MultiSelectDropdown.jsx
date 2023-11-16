import { useState } from 'react';

const MultiSelectDropdown = () => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleSelectChange = (e) => {
		const selectedValues = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setSelectedOptions(selectedValues);
	};

	return (
		<div>
			<label>Select multiple options:</label>
			<select multiple value={selectedOptions} onChange={handleSelectChange}>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
				{/* Add more options as needed */}
			</select>

			<div>
				<p>Selected Options:</p>
				<ul>
					{selectedOptions.map((option) => (
						<li key={option}>{option}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default MultiSelectDropdown;
