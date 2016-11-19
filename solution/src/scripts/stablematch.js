var students = require("../JSON/studentsByAvailability.json");
var classes = require("../JSON/classes.json");

var days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

/*
 * Student class
 * constructor	: takes in JSON student
 * s			: student data as given in the JSON file
 * matrix		: matrix that indicates if available at a given time and day. Columns are days, rows are intervals of 30mins.
 * lectures 	: array of Lectures registered for
 * lectureCount	: amount of lectures registered for
 * print()		: prints name (temporary)
 * printHours()	: prints matrix of booleans describing available hours
 */

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
		this.lectureCount = 0;
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

/*
 * Lecture class
 * constructor	: takes in name of course, JSON time1
 * name			: name of course
 * start		: start time as string
 * end			: end time as string
 * day			: day of week as string
 * students		: array of Students registered in lecture
 * studentCount	: amount of Students registered in lecture
 * addStudent(s): adds Student s to student list, and adds lecture to s's lecture list.
 * print()		: prints course name and time range
 */

class Lecture {
	constructor(name,l) {
		this.name = name;
		this.start = l["start"];
		this.end = l["end"];
		this.day = l["day"];
		this.students = [];
		this.studentCount = 0;
	}
	
	addStudent(s) {
		this.students.push(s);
		s.lectures.push(this);
		for(var c = timeAsIndex(this.start); c <= timeAsIndex(this.end); c++) {
			s.matrix[l.day][c] = false;
		}
		this.studentCount++;
		s.lectureCount++;
	}

	print() {
		console.log(this.name + ": " + this.day + " from " + this.start + " to " + this.end);
	}
}

/*
 * Class class
 * constructor	: Takes in course number (i) and JSON class
 * num			: course number
 * name			: course name
 * lec1			: first lecture session
 * lec2			: second lecture session
 */

class Class { 
	constructor(i,c) {
		this.num = i;
		this.name = c["name"];
		this.lec1 = new Lecture(this.name,c["times"]["time1"]);
		this.lec2 = new Lecture(this.name,c["times"]["time2"]);
	}
}


var roster = [];	//list of Students in system
var courses = [];	// list of Classes in system

//initializes all Classes
var i = 101;
for(var c in classes["classes"]) {
	courses.push(new Class(i,classes["classes"][(i++).toString()]));
}

//initializes all Students
for(var s in students) {
	roster.push(new Student(students[s]));
}

/*
 * isAvailable(Student s, Lecture l)
 * returns true if Student is available to register in Lecture
 */

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

/*
 * timeAsNum(String time)
 * returns integer representation of time string.
 * Ex.: "04:30pm" -> 1630
 * Not being used right now
 */

function timeAsNum(time) {
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p') hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	return hour * 100 + minute;
}

/*
 * timeAsIndex(String time)
 * returns row number for student matrix that corresponds to a time string
 */

function timeAsIndex(time) {
	if(time == "NA") return 19; //Out of bounds -- will be interpreted as not available for that day altogether
	var timearray = time.split(":");
	var hour = parseInt(timearray[0]);
	if(timearray[1].charAt(2) === 'p' && !(hour === 12)) hour += 12;
	var minute = parseInt(timearray[1].substr(0,2));
	hour -= 8;
	return hour * 2 + Math.floor(minute/30);
}

/*
 * dayAsIndex(String day)
 * returns column number for student matrix that corresponds to a day string
 */

function dayAsIndex(day) {
	return days.indexOf(day);
}

//Testing
roster[1].print();
roster[1].printHours();
courses[2].lec1.print();
console.log(isAvailable(roster[1],courses[2].lec1));
