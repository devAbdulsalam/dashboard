import { useState } from 'react';

const Tooltip = () => {
	const [showEditTooltip, setShowEditTooltip] = useState(false);
	const handleMouseEnterEdit = () => {
		setShowEditTooltip();
	};
	const handleMouseLeaveEdit = () => {
		setShowEditTooltip(null);
	};
	return (
		<div>
			<button
				className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
				onMouseEnter={handleMouseEnterEdit}
				onMouseLeave={handleMouseLeaveEdit}
			>
				button
			</button>
			{showEditTooltip && (
				<div className="tooltip-container">
					<span className="tooltip-content text-tiny whitespace-no-wrap">
						Edit
					</span>
					<div className="tooltip-arrow"></div>
				</div>
			)}
		</div>
	);
};

export default Tooltip;
