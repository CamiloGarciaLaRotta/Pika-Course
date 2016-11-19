var students = require("../JSON/studentsByAvailability.json");
var classes = require("../JSON/classes.json");

var days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

class Student {
	constructor (s) {
		this.s = s;
		this.matrix = [];
		for(var c = 0; c < 5; c++) {
			var row = [];
			for(var r = 0; r < 19; r++) {
				row[r] = false;
			}
			this.matrix[c] = row;
		}
		for(var a in s[1]) {
			var daylist = this.matrix[dayAsIndex(s[1][a]["day"])];
			var start = timeAsIndex(s[1][a]["start"]);
			var end = timeAsIndex(s[1][a]["end"]);
			for (var c = start; c <= end; c++) {
				if(c > 18) break;
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
	
	print() {
		console.log(this.s[0]);
	}

	printHours() {
		for(var j = 0; j <= 18; j++) {
			var timeslot = "";
			for (var c = 0; c < 5; c++) {
				timeslot += this.matrix[c][j] + " "
			}
			console.log(timeslot);
		}
	}
}

class Lecture {
	constructor(name,l) {
		this.name = name;
		this.start = l["start"];
		this.end = l["end"];
		this.day = l["day"];
		this.students = [];
	}
	
	print() {
		console.log(this.name + ": " + this.day + " from " + this.start + " to " + this.end);
	}
}

class Class { 
	constructor(i,c) {
		this.num = i;
		this.name = c["name"];
		this.lec1 = new Lecture(this.name,c["times"]["time1"]);
		this.lec2 = new Lecture(this.name,c["times"]["time2"]);
	}
}


var roster = [];
var courses = [];

var i = 101;
for(var c in classes["classes"]) {
	courses.push(new Class(i,classes["classes"][(i++).toString()]));
}

for(var s in students) {
	roster.push(new Student(students[s]));
}

function isAvailable(s,l) {
	var day = l["day"];
	var start = timeAsIndex(l["start"]);
	console.log(l["start"] + " -> " + start);
	var end = timeAsIndex(l["end"]);
	console.log(l["end"] + " -> " + end);
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
	if(time == "NA") return 19; //Out of bounds -- will be interpreted as not available for that day altogether
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p' && !(hour === 12)) hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	hour -= 8;
	return hour * 2 + Math.floor(minute/30);
}

function dayAsIndex(day) {
	return days.indexOf(day);
}

roster[1].print();
roster[1].printHours();
courses[2].lec1.print();
console.log(isAvailable(roster[1],courses[2].lec1));
