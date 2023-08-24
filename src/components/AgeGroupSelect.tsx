import React, { useEffect, useState } from 'react';
import './AgeGroupSelect.scss';
import getNumberIntervals from '../utils/getNumberIntervals';

type resultType = {
	ageGroup: string[];
	price: string;
};

type AgeGroupSelectProps = {
	index: number;
	result: resultType[];
	setResult: React.Dispatch<React.SetStateAction<resultType[]>>;
	setIsContainAllNum: React.Dispatch<React.SetStateAction<boolean>>;
};
const AgeGroupSelect: React.FC<AgeGroupSelectProps> = ({
	index,
	result,
	setResult,
	setIsContainAllNum,
}) => {
	const [isOverlap, setIsOverlap] = useState(false); // 判斷是否顯示錯誤訊息

	// 生成0~20的陣列
	const ageOptions: string[] = Array.from({ length: 21 }, (_, index) =>
		index.toString()
	);

	// 修改年齡input(前、後)
	const handleAgeSelect = (
		e: React.ChangeEvent<HTMLSelectElement>,
		youngOrOld: 0 | 1
	) => {
		const age = e.target.value;
		result[index].ageGroup[youngOrOld] = age; // 更新result
		setResult([...result]);
	};

	// 判斷是否重複以及是否滿號

	useEffect(() => {
		const allAgeGroup: string[][] = [];
		result.forEach((item: any) => {
			// 判斷陣列內都不為空字串，才加入驗證陣列
			if (item.ageGroup[0] && item.ageGroup[1]) {
				allAgeGroup.push(item.ageGroup);
			}
		});

		// 轉為數字陣列(getNumberIntervals需要)
		const numAllAgeGroup: number[][] = allAgeGroup.map((subArray) =>
			subArray.map((str) => parseInt(str))
		);
		// console.log(numAllAgeGroup);

		// 獲取驗證結果
		const ageValidation = getNumberIntervals(numAllAgeGroup);
		console.log(ageValidation);

		// 滿號disabled(控制樣式，無法再新增card)
		ageValidation.notInclude.length === 0
			? setIsContainAllNum(true)
			: setIsContainAllNum(false);

		// 重複disabled(控制樣式)
		ageValidation.repeatCardIndexList.includes(index)
			? setIsOverlap(true)
			: setIsOverlap(false);
	}, [index, result, setIsContainAllNum]);

	return (
		<div className="ageGroupSelectContainer">
			<label htmlFor="ageGroupSelect" className="ageGroupSelectLabel">
				年齡
			</label>
			<div className="ageGroupSelectGroup">
				<select
					id="ageYoungSelect"
					className="ageGroupSelect"
					value={result[index].ageGroup[0]}
					onChange={(e) => handleAgeSelect(e, 0)}
				>
					<option value="" disabled>
						請選擇
					</option>
					{ageOptions.map((item) => (
						<option
							key={item}
							className={`${
								parseInt(item) >
								parseInt(result[index].ageGroup[1])
									? 'disableColor'
									: ''
							}`}
							value={item}
							disabled={
								parseInt(item) >
								parseInt(result[index].ageGroup[1])
									? true
									: false
							}
						>
							{item}
						</option>
					))}
				</select>
				<div className="tilde">~</div>
				<select
					id="ageOldSelect"
					className="ageGroupSelect"
					value={result[index].ageGroup[1]}
					onChange={(e) => handleAgeSelect(e, 1)}
				>
					<option value="" disabled>
						請選擇
					</option>
					{ageOptions.map((item) => (
						<option
							key={item}
							className={`${
								parseInt(item) <
								parseInt(result[index].ageGroup[0])
									? 'disableColor'
									: ''
							}`}
							value={item}
							disabled={
								parseInt(item) <
								parseInt(result[index].ageGroup[0])
									? true
									: false
							}
						>
							{item}
						</option>
					))}
				</select>
			</div>
			{isOverlap && (
				<div className="errMsgWrap">
					<h6>年齡區間不可重疊</h6>
				</div>
			)}
		</div>
	);
};

export default AgeGroupSelect;
