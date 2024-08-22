exports.getDateTimeNow = () => {
  	let date_ob = new Date();
	let date = IntTwoChars(date_ob.getDate());
	let month = IntTwoChars(date_ob.getMonth() + 1);
	let year = date_ob.getFullYear();
	let hours = IntTwoChars(date_ob.getHours());
	let minutes = IntTwoChars(date_ob.getMinutes());
	let seconds = IntTwoChars(date_ob.getSeconds());

  	return (date_ob.getFullYear() + "-" + month + "-" + date  + " " + hours + ":" + minutes + ":" + seconds);
};

exports.getDateTimeAdd = (addMinute) => {
	var currentDate = new Date();
  	let date_ob = new Date(currentDate.getTime() + (addMinute*60000));
	let date = IntTwoChars(date_ob.getDate());
	let month = IntTwoChars(date_ob.getMonth() + 1);
	let year = date_ob.getFullYear();
	let hours = IntTwoChars(date_ob.getHours());
	let minutes = IntTwoChars(date_ob.getMinutes());
	let seconds = IntTwoChars(date_ob.getSeconds());

  	return (date_ob.getFullYear() + "-" + month + "-" + date  + " " + hours + ":" + minutes + ":" + seconds);
};


function IntTwoChars(i) {
   return (`0${i}`).slice(-2);
}
