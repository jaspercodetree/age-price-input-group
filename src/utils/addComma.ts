export default function addComma(price: string) {
	const [integerPart, decimalPart]: string[] = price.toString().split('.'); // 以小數點分前後

	let commaPrice: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 加上千分號
	// console.log('commaPrice', decimalPart);

	commaPrice += decimalPart !== undefined ? '.' + decimalPart : ''; // 如果有值加上小數位

	return commaPrice;
}
