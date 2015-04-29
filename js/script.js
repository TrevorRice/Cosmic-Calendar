var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "JUL", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(function(){

	getDaysInMonth(1);
	$('#month-1').addClass('month-selected');
	getEvents(1,1);
	displayNumYearsAgo(numYearsAgo(1,1));

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

	while(numPrevMonths != 0) {
		var numDays = numDaysInMonth(numPrevMonths, curYear);
		totalNumDays += numDays;
		numPrevMonths--;
	}

	totalNumDays = totalNumDays + curNumDays;
	return Math.round((totalAge - totalNumDays*eachDayYears) * 1000) / 1000;	
}

function displayNumYearsAgo (value) {
	$("#time").text(value + " Billion Years Ago");
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
	//$('header').addClass('hide-title');

	var title = document.getElementById("main-title");
	TweenLite.to(title, 2, {
		x: window.innerWidth,
		y: -window.innerHeight
	});

	var enter = document.getElementById("enter");
	TweenLite.to(enter, 2, {
		y: window.innerHeight
	});
});

/**
* On click, display right date div
*/
$('#day-wrapper').click(function(e) {
	var day = $(e.target).text();
	var month = $('#month-wrapper').find('.month-selected').attr('id').split('month-')[1];
	
	getEvents(day, month);
	displayNumYearsAgo(numYearsAgo(day, month));
});