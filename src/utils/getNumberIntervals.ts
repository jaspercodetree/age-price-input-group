export default function getNumberIntervals(arrays: number[][]) {
	// 1.將每個小陣列各自展開為連續的數字，例如：[2,5] =>[2,3,4,5]
	const convertedArrays: number[][] = convertToConsecutiveArrays(arrays);
	// console.log(convertedArrays);
	function convertToConsecutiveArrays(arrays: number[][]) {
		const convertedArrays: number[][] = [];

		for (const subArray of arrays) {
			const start: number = subArray[0];
			const end: number = subArray[1];
			const consecutiveSubArray: number[] = [];

			for (let i = start; i <= end; i++) {
				consecutiveSubArray.push(i);
			}

			convertedArrays.push(consecutiveSubArray); // 再將每個小陣列合併成一個陣列
		}

		return convertedArrays;
	}

	const flatArray: number[] = convertedArrays.flat(); // 將所有數字展開拉平成一個陣列
	const allNumbers = [...new Set(flatArray)]; // 去除重複數字

	const overlap: number[][] = []; // 儲存重疊的區間
	const notInclude: number[][] = []; // 儲存未包含的數字區間

	// console.log(allNumbers);

	// 2.notInclude
	// 開始檢查從 0 到 20 的數字
	for (let i = 0; i <= 20; i++) {
		// 如果數字不在合併的陣列中，則表示這是一個未包含的數字
		if (!allNumbers.includes(i)) {
			let interval = [i];
			// 從這個i開始往後找未包含的數字
			while (!allNumbers.includes(i + 1) && i < 20) {
				interval.push(i + 1);
				i++;
			}
			notInclude.push(interval);
		}
	}

	// 3.overlap
	// 找出重複出現的數字
	const duplicates: number[] = flatArray.filter(
		(num, index) => flatArray.indexOf(num) !== index // indexOf是第一次出現的數字
	);

	duplicates.sort((a, b) => a - b); // 排序

	const newDuplicates = [...new Set(duplicates)]; // 去除重複的數字
	// console.log('duplicates', newDuplicates);

	const result: number[][] = findConsecutiveGroups(newDuplicates); // 將連續的數字合併成一個小陣列
	overlap.push(...result); // 再將所有小陣列合併成一個陣列
	// console.log(overlap);

	function findConsecutiveGroups(arr: number[]) {
		const consecutiveGroups: number[][] = [];
		let currentGroup: number[] = []; // 用來暫時儲存連續的數字

		for (let i = 0; i < arr.length; i++) {
			// 如果是第一個數字，或是這個數字不是前一個數字加一
			if (i === 0 || arr[i] !== arr[i - 1] + 1) {
				if (currentGroup.length > 0) {
					// 將目前暫存的陣列結束，放入二維陣列
					consecutiveGroups.push(currentGroup);
				}
				// 開啟新的暫存陣列
				currentGroup = [arr[i]];
			} else {
				// 連續數字繼續暫存
				currentGroup.push(arr[i]);
			}
		}

		// 迴圈結束，將最後一個暫存陣列，放入二維陣列
		if (currentGroup.length > 0) {
			consecutiveGroups.push(currentGroup);
		}

		return consecutiveGroups;
	}

	// 4.判斷是哪幾個array有重疊，記住index，用來標示要顯示錯誤訊息
	const repeatCardIndexList: number[] = [];

	// 每一個card，age展開連續數字
	convertedArrays.forEach((array: number[], index: number) => {
		let findOverlap: boolean = false;

		// 將重疊的數字與card內的數字比較，如果有一個數字相同，則將其index放入repeatCardIndexList
		newDuplicates.forEach((num: number) => {
			if (array.includes(num)) {
				if (findOverlap) {
					return;
				}

				repeatCardIndexList.push(index);
				findOverlap = true; // 找到重疊，跳脫迴圈
			}
		});
	});

	return { overlap, notInclude, repeatCardIndexList };
}

// 測試輸入數字陣列
// const arrays = [
// 	[6, 7, 8, 9, 10, 11],
// 	[5, 6, 7, 8],
// 	[17, 18, 19, 20],
// 	[7, 7],
// 	[14, 15, 16, 17],
// ];

// const testArrays = [
// 	[6, 11],
// 	[5, 8],
// 	[17, 20],
// 	[7, 7],
// 	[14, 17],
// ];

// const answer: { overlap: number[][]; notInclude: number[][] } =
// 	getNumberIntervals(testArrays);
// console.log('answer', answer);
