import React from 'react';
import './PriceInput.scss';
import addComma from '../utils/addComma';

type resultType = {
	ageGroup: string[];
	price: string;
};

type PriceInputProps = {
	index: number;
	result: resultType[];
	setResult: React.Dispatch<React.SetStateAction<resultType[]>>;
};
const PriceInput: React.FC<PriceInputProps> = ({
	index,
	result,
	setResult,
}) => {
	const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const price: string = e.target.value;
		const priceWithoutCommas: string = price.replace(/,/g, ''); // 去除逗號

		// 只能輸入數字、小數、負數
		if (/^-?\d*\.?\d*$/.test(priceWithoutCommas)) {
			let commaPrice = addComma(priceWithoutCommas); // 加上千分號
			// console.log(commaPrice);

			result[index].price = commaPrice; // 更新result
		}

		setResult([...result]);
	};

	return (
		<div className="priceInputContainer">
			<label htmlFor={`priceInput${index}`} className="priceInputLabel">
				入住費用(每人每晚)
			</label>
			<div className="priceInputGroup">
				<div className="currency">TWD</div>
				<input
					type="text"
					id={`priceInput${index}`}
					className={`priceInput ${
						result[index].price === '' && 'errBorder'
					}`}
					placeholder="請輸入費用"
					value={result[index].price}
					onChange={handlePriceInput}
				/>
			</div>
			{result[index].price === '' && (
				<div className="errMsgWrap">
					<h6>不可以為空白</h6>
				</div>
			)}
			<h6 className="hintWord">輸入0表示免費</h6>
		</div>
	);
};

export default PriceInput;
