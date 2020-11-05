// 利用正则匹配格式化字符串
Date.prototype.format = function(formatStr) {
	const reg = /(Y*)(.)(M+)(.)(D+)/
	let res = formatStr.match(reg)
	let year = this.getFullYear().toString()
	let month = (this.getMonth() + 1).toString()
	let day = this.getDate().toString()
	let formatDate = ''
	for (let i = 1; i < res.length; i++) {
		console.log()
		const f = res[i].substr(0, 1)
		switch (f) {
			case 'Y':
				formatDate += year.substr(0, res[i].length);
				break;
			case 'M':
				formatDate += month.substr(0, res[i].length);
				break;
			case 'D':
				formatDate += 0 + day;
				break;
			case '/':
				formatDate += '/';
				break;
			case '-':
				formatDate += '-';
				break;
		}
	}
	return formatDate
}
console.log(new Date().format('YYYY/MM/DD'))