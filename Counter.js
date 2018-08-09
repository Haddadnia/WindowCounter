const ONE_SECOND = 1000;
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR   = 1000 * 60 * 60;

class Counter {

	constructor() {
		this.events = [];

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
 			if (index + 1 > events.length - 1) {
 				// You've reached the end of the array, without any hits
 				return 0
 			}

 		let currentEvent = events[index];
 		while (currentEvent < targetTime) {
 			if (index + 1 > events.length - 1) {
 				// You've reached the end of the array, without any hits
 				return 0
 			}
 			// You just hit an event which was outside of your time interval. 
 			// Increment the index to keep searching,
 			// and decrease the count, because that's one less event that meets your criteria.
 			count--;
 			index++;

			currentEvent = events[index];
 		}

 		return count;
 	}
}

module.exports = Counter;
