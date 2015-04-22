$(function(){

	getDaysInMonth(1);
	$('#month-1').addClass('month-selected');

});

/**
* Inserts the correct dates to given month
* @param {monthNum} the number associated with a given month
* @return textNodes for each month div
*/
function getDaysInMonth (monthNum) {
	clearDays();

	var totalNumDivs = 42;
	var curYear = new Date().getFullYear();
	var startDate = new Date(curYear, monthNum - 1, 1).getDay();
	var numDays = numDaysInMonth(monthNum, curYear);
	var prevMonthNum;
	var numPrevDays;

	if (monthNum == 1)
		prevMonthNum = 12;
	else
		prevMonthNum = monthNum - 1;

	numPrevDays = numDaysInMonth(prevMonthNum, curYear);
	
	for (var i = 0; i < totalNumDivs + 1; i++) {
		if (i < startDate + 1) {
			var prevDate = numPrevDays - i;
			$('div#day-wrapper > div:nth-child(' + (startDate - i) + ')').append(document.createTextNode(prevDate));
			$('div#day-wrapper > div:nth-child(' + (startDate - i) + ')').addClass('non-cur-month');
		} else if (i > startDate + numDays) {
			var nextMonthDay = i - (numDays + startDate);
			$('div#day-wrapper > div:nth-child(' + i + ')').append(document.createTextNode(nextMonthDay));
			$('div#day-wrapper > div:nth-child(' + i + ')').addClass('non-cur-month');
		} else {
			var curDate = i - startDate;
			$('div#day-wrapper > div:nth-child(' + i + ')').append(document.createTextNode(curDate));
		}
	}
}

/**
* Returns the number of days in a month
* @param {month} the value associated with a month
* @param {year} the value of the current year
* @return the number of days
*/
function numDaysInMonth (month, year) {
	return new Date(year, month, 0).getDate();
}

/**
* Removes all textNodes of day-wrapper
* @return nothing
*/
function clearDays () {
	$('div#day-wrapper > div').contents().filter(function() {
		return this.nodeType == 3;
	}).remove();
}

/**
* On click, rearrange days
*/
$('.month').click(function() {
	$('.month').removeClass('month-selected');
	$('div#day-wrapper > div').removeClass('non-cur-month');
	$(this).addClass('month-selected');
	var monthNum = $(this).attr('id').split('month-')[1];
	getDaysInMonth(monthNum);
});

/**
* On enter, display calendar and remove title
*/
$('.button').click(function() {
	$('#calendar').addClass('display-cal');
	$('header').addClass('hide-title');
});