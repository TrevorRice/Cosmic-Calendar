var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$(function(){

	getDaysInMonth(1);
	$('#month-1').addClass('month-selected');
	getEvents(1,1);
	displayNumYearsAgo(numYearsAgo(1,1));
	displayDate(getDayString(0, 1), 0, 1);

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

function getDayString (month, dayNum) {
	var date = new Date();
	date.setMonth(month);
	date.setDate(dayNum);
	day = date.getDay();
	var dayString = days[day];

	return dayString;
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

function clearEvents() {
	$('#info').empty();
}

/**
* Fills the event list of date
* @param {day} the value of the day
* @param {month} the value associated with a month
* @return filled divs
*/
function getEvents (day, month) {
	clearEvents();

	var dateString = months[month - 1] + day;
	var monthObject = {};
	var eventLength;

	$.getJSON("./data/cosmicInfo.json", function(data) {
		for(key in data) {
			if(data[key].date === dateString) {
				monthObject = data[key];
			}
		}

		if (monthObject.events === undefined)
			return;

		eventLength = monthObject.events.length;

		for(var i = 0; i < eventLength; i++) {
			$("#info").append('<li><h5>' + monthObject.events[i].time + '</h5><div>' + monthObject.events[i].info + '</div></h5>');
		}
	});
}

/**
* Returns the age of date
* @param {day} the value of the day
* @param {month} the value associated with a month
* @return total number of years
*/
function numYearsAgo (day, month) {
	var totalAge = 13.8;
	var daysInYear = 365;
	var eachDayYears = totalAge / daysInYear;
	var curYear = new Date().getFullYear();
	var numPrevMonths = month - 1;
	var totalNumDays = 0;
	var curNumDays = parseInt(day);
	var numYears;

	while(numPrevMonths != 0) {
		var numDays = numDaysInMonth(numPrevMonths, curYear);
		totalNumDays += numDays;
		numPrevMonths--;
	}

	totalNumDays = totalNumDays + curNumDays;

	if (month == 12) {
		numYears = Math.round((totalAge - totalNumDays*eachDayYears) * 1000 *1000) / 1000;
	} else {
		numYears = Math.round((totalAge - totalNumDays*eachDayYears) * 1000) / 1000;
	}

	return numYears;	
}

function displayNumYearsAgo (value, month) {
	if (month == 12) {
		$("#time").text(value + " Million Years Ago");
	} else {
		$("#time").text(value + " Billion Years Ago");
	}
}

function displayDate (value, month, day) {
	var monthString = monthsFull[month];
	$("#date-wrapper h2:first-child").text(value);
	$("#date-wrapper h2:nth-child(2)").text(monthString + " " + day+ nth(day));
}

function nth(value) {
	if (value > 3 && value < 21)
		return 'th';
	switch (value % 10) {
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		default: return 'th';
	}
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
	render();
	
	$('#calendar').addClass('display-cal');

	var title = document.getElementById("main-title");
	var enter = document.getElementById("enter");
	TweenLite.to([title, enter], 1, {
		z: 200
	});

	var calendar = document.getElementById("calendar");
	TweenLite.from(calendar, 1, {
		z: -2000,
		opacity: 0
	});
});

/**
* On click, display right date div
*/
$('#day-wrapper').click(function(e) {
	var day = $(e.target).text();
	var month = $('#month-wrapper').find('.month-selected').attr('id').split('month-')[1];
	
	getEvents(day, month);
	displayNumYearsAgo(numYearsAgo(day, month), month);
	displayDate(getDayString(month-1, day), month-1, day);
});