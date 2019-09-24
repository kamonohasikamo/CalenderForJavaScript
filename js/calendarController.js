window.onload = function() {
	// 現在の年月を取得
	var current = new Date();
	var year = current.getFullYear();
	var month = current.getMonth() + 1;

	var wrapper = document.getElementById('calendar');
	addCalendar(wrapper, year, month);
}

//================================================
// 指定した年月のカレンダーを表示する
// @param {object} wrapper	- カレンダーを追加する親要素
// @param {number} year			- 年の指定
// @param {number} month		- 月の指定
//================================================
function addCalendar(wrapper, year, month) {
	// カレンダーが追加されている場合はいったん削除
	wrapper.textContent = null;

	var headData = generateCalendarHeader(wrapper, year, month);
	var bodyData = generateMonthCalendar(year, month);

	wrapper.appendChild(headData);
	wrapper.appendChild(bodyData);
}

//================================================
// 指定した年月のカレンダーのヘッダを返す関数
// @param {object} wrapper	- カレンダーを追加する親要素
// @param {number} year		- 年の指定
// @param {number} month	- 月の指定
//================================================
function generateCalendarHeader(wrapper, year, month) {
	var nextMonth = new Date(year, (month - 1));
	nextMonth.setMonth(nextMonth.getMonth() + 1);
	var prevMonth = new Date(year, (month - 1));
	prevMonth.setMonth(prevMonth.getMonth() - 1);

	var calendarHeader = document.createElement('div');
	calendarHeader.className = 'calendar-header';

	var calendarTitle = document.createElement('div');
	calendarTitle.className = 'calendar-headar-title';
	var calendarTitleText = document.createTextNode(year + '年' + month + '月');
	calendarTitle.appendChild(calendarTitleText);
	calendarHeader.appendChild(calendarTitle);

	// prevMonthButton Add
	var prevMonthButton = document.createElement('button');
	prevMonthButton.className = 'calendar-header-prevMonthButton';
	var prevMonthButtonText = document.createTextNode('prev');
	prevMonthButton.appendChild(prevMonthButtonText);
	// タップ時の処理
	prevMonthButton.addEventListener('click', function() {
		addCalendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
	}, false);
	calendarHeader.appendChild(prevMonthButton);

	// nextMonthButton Add
	var nextMonthButton = document.createElement('button');
	nextMonthButton.className = 'calendar-header-nextMonthButton';
	var nextMonthButtonText = document.createTextNode('next');
	nextMonthButton.appendChild(nextMonthButtonText);
	// タップ時の処理
	nextMonthButton.addEventListener('click', function() {
		addCalendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
	}, false);
	calendarHeader.appendChild(nextMonthButton);

	return calendarHeader;
}

//================================================
// 指定した年月のカレンダーの情報を返す関数
// @param {number} year		- 年の指定
// @param {number} month	- 月の指定
//================================================
function getMonthCalendar(year, month) {
	var firstDate = new Date(year, (month - 1), 1); // 指定した年月の初日情報
	var lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
	var weekDay = firstDate.getDay();

	var calendarData = [];
	var weekDayCount = weekDay;
	for (var i = 0; i < lastDay; i++) {
		calendarData[i] = {
			day: i + 1,
			weekDay: weekDayCount
		}
		// 曜日のカウントが6(土曜日)になったら0(日曜日)に戻す
		if (weekDayCount >= 6) {
			weekDayCount = 0;
		} else {
			weekDayCount++;
		}
	}
	return calendarData;
}

//================================================
// 指定した年月のカレンダー要素を生成して返す関数
// @param {number} year		- 年の指定
// @param {number} month	- 月の指定
//================================================
function generateMonthCalendar(year, month) {
	var weekDayData = ['日','月','火','水','木','金','土'];
	var calendarData = getMonthCalendar(year, month);

	var i = calendarData[0]['weekDay']; //初日情報
	while(i > 0) {
		i--;
		calendarData.unshift({
			day: '',
			weekDay: i
		});
	}
	var i = calendarData[calendarData.length - 1]['weekDay']; // 末日の曜日を取得
	// カレンダー上の末日より後を埋める
	while(i < 6) {
		i++;
		calendarData.push({
			day: '',
			weekDay: i
		});
	}

	// カレンダー要素の生成
	var calendarTable = document.createElement('table');
	calendarTable.border = '1';
	calendarTable.className = 'calendar-table';
	var insertData = '';
	// 曜日部分の生成
	insertData += '<thead>';
	insertData += '<tr>';
	for (var i = 0; i < weekDayData.length; i++) {
		insertData += '<th>';
		if (i == 0) {
			insertData += '<font color="red">';
			insertData += weekDayData[i];
			insertData += '</font>';
		} else if (i == 6) {
			insertData += '<font color="blue">';
			insertData += weekDayData[i];
			insertData += '</font>';
		} else {
			insertData += weekDayData[i];
		}
		insertData += '</th>';
	}
	insertData += '</tr>';
	insertData += '</thead>';

	// 日付部分の生成
	insertData += '<tbody>';
	for (var i = 0; i < calendarData.length; i++) {
		if(calendarData[i]['weekDay'] <= 0) {
			insertData += '<tr>';
		}
		insertData += '<td align="right">';
		insertData += calendarData[i]['day'];
		insertData += '</td>';
		if(calendarData[i]['weekDay'] >= 6) {
			insertData += '</tr>';
		}
	}
	insertData += '</tbody>';

	calendarTable.innerHTML = insertData;
	return calendarTable;
}