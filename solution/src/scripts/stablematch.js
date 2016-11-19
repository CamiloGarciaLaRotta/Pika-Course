var students = require("../JSON/studentsByAvailability.json");
var classes = require("../JSON/classes.json");

var days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

console.log(timeAsNum("04:30pm"));


class Student {
	constructor (s) {
		this.s = s;
		this.matrix = [];
		for(var c = 0; c < 5; c++) {
			var row = [];
			for(var r = 0; r < 18; r++) {
				row[r] = false;
			}
			this.matrix[c] = row;
		}
		for(var a in s[1]) {
			var daylist = this.matrix[dayAsIndex(a["day"])];
			var start = timeAsIndex(a["start"]);
			var end = timeAsIndex(a["end"]);
			for (var c = start; c <= end; c++) {
				if(end > 17) break;
				daylist[c] = true;
			}
		}
		this.lectures = [];
	}

	addLecture(l) {
		this.lectures.push(l);
		for(var c = timeAsIndex(l.start); c <= timeAsIndex(l.end); c++) {
			this.matrix[l.day][c] = false;
		}
	}
}

class Lecture {
	constructor(l) {
		this.start = l["start"];
		this.end = l["end"];
		this.day = l["day"];
		this.students = [];
	}
}

class Class { 
	constructor(i,c) {
		this.num = i;
		this.name = c["name"];
		this.lec1 = new Lecture(c["times"]["time1"]);
		this.lec2 = new Lecture(c["times"]["time2"]);
	}
}


var roster = [];
var courses = [];

var i = 101;
for(var c in classes["classes"]) {
	console.log(Object.keys(c));
	courses.push(new Class(i++,c[(i-1).toString()]));
}
//cl = new Class(101,classes["classes"]["101"]);
//console.log(cl.num + ": " + cl.name);

for(var s in students) {
	roster.push(new Student(s));
}

function isAvailable(s,l) {
	var day = l["day"];
	var start = timeAsIndex(l["start"]);
	var end = timeAsIndex(l["end"]);
	var daylist = s.matrix[dayAsIndex(day)];
	for (var c = start; c < end; c++) {
		if(!daylist[c]) return false;
	}
	return true;
}

function timeAsNum(time) {
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p') hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	return hour * 100 + minute;
}

function timeAsIndex(time) {
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p') hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	hour -= 8;
	return hour * 2 + Math.floor(minute/30);
}

function dayAsIndex(day) {
	return days.indexOf(day);
}

console.log(isAvailable(roster[0],courses[0].lec1));
