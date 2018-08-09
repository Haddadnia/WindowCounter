const ONE_SECOND = 1000;
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR   = 1000 * 60 * 60;

class Counter {

	constructor() {
		this.events = []; //Array versus linked list for better performance

		this.secondCount = 0;
		this.minuteCount = 0;
		this.hourCount = 0;

		this.secondIndex = null;
		this.minuteIndex = null;
		this.hourIndex = null;
	}

	toString() {
 		return `Events: -
 			events      :  ${this.events},
 			secondCount :  ${this.secondCount},
 			minuteCount :  ${this.minuteCount},
 			hourCount   :  ${this.hourCount}
 		`
 	}

 	increment() {
 		const newEvent = Date.now();
 		this.events.push(newEvent);

 		this.secondCount++;
 		this.minuteCount++;
 		this.hourCount++; 		
 	}

 	numberInLastSecond() {
 		return Counter.numInLast(ONE_SECOND, this.secondIndex, this.secondCount, this.events);
 	}
 	numberInLastMinute() {
 		return Counter.numInLast(ONE_MINUTE, this.minuteIndex, this.minuteCount, this.events);
 	}	
 	numberInLastHour() {
 		return Counter.numInLast(ONE_HOUR, this.hourIndex, this.hourCount, this.events);
 	}

 	static numInLast(timeRange, index, count, events) {
 		
 		var targetTime = new Date(Date.now() - timeRange);

 		if (index === null) {
 			index = 0;
 			count = events.length;
 		}

 		count++;
 		index--;
 		let currentEvent;
 		do {
 			if (index + 1 > events.length - 1) {
 				// You've reached the end of the array, without any hits
 				return 0
 			}
 			count--;
 			index++;

			currentEvent = events[index];
 		} while (currentEvent < targetTime);

 		return count;
 	}
}

module.exports = Counter;
