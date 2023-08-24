import React from 'react';

const CreateIcon = ({ isContainAllNum }: { isContainAllNum: boolean }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			viewBox="0 0 12 12"
		>
			<path
				id="_Color"
				data-name=" ↳Color"
				d="M12,6.857H6.857V12H5.143V6.857H0V5.143H5.143V0H6.857V5.143H12Z"
				fill={`${isContainAllNum ? 'var(--grey2)' : 'var(--success)'}`} // 判斷是否disable的顏色
			/>
		</svg>
	);
};

export default CreateIcon;
