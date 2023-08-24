import React, { useState } from 'react';
import './AgeGroupPriceList.scss';
import AgeGroupSelect from './AgeGroupSelect';
import PriceInput from './PriceInput';
import CreateIcon from '../assets/svg/CreateIcon';
import DeleteIcon from '../assets/svg/DeleteIcon';

const AgeGroupPriceList = () => {
	const [result, setResult] = useState([{ ageGroup: ['', ''], price: '' }]);
	const [isContainAllNum, setIsContainAllNum] = useState(false); // 判斷是否滿號

	console.log('result', result);

	// 新增card
	const handleAddCard = () => {
		setResult([...result, { ageGroup: ['', ''], price: '' }]);
	};

	// 刪除card
	const handleDeleteCard = (index: number) => {
		const newResult = [...result];
		newResult.splice(index, 1);
		// console.log(newResult);

		setResult(newResult);
	};

	return (
		<div className="ageGroupPriceListContainer">
			{result.map((item, index) => (
				<div className="ageGroupPriceCard" key={index}>
					<div className="headerWrap">
						<h6>價格設定 - {`${index + 1}`}</h6>
						<button
							className="deleteCardBtn"
							onClick={() => handleDeleteCard(index)}
						>
							<DeleteIcon />
							<span>移除</span>
						</button>
					</div>

					<div className="listWrap">
						<AgeGroupSelect
							index={index}
							result={result}
							setResult={setResult}
							setIsContainAllNum={setIsContainAllNum}
						/>
						<PriceInput
							index={index}
							result={result}
							setResult={setResult}
						/>
					</div>
				</div>
			))}

			<button
				className="addCardBtn"
				onClick={handleAddCard}
				disabled={isContainAllNum}
			>
				<CreateIcon isContainAllNum={isContainAllNum} />
				<span className={`${isContainAllNum && 'disabledColor'}`}>
					新增價格設定
				</span>
			</button>
		</div>
	);
};

export default AgeGroupPriceList;
