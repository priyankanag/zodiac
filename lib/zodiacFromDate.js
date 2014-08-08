module.exports = (function() {
	var changeDates = [120, 218, 320, 420, 521, 621, 722, 823, 923, 1023, 1122, 1222, 1231];
	var zodiacs = ["Capricorn", "Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra", "Scorpio","Sagittarius","Capricorn"];
	
	function h(d){
		var date = new Date(d);
		var day = date.getDate();
		var month = date.getMonth()+1;
		var value = month*100+day;
		var index = month-1;

		while(index< changeDates.length){
			if(value <= changeDates[index]) break;
			index++;
		}
		
		return zodiacs[index];
	}
	return h;
})();