const Counter = require('./Counter');

describe('Test the Counter', () => {

	let counter;

	//Javascript doesn't allow this out of the box because they don't want you freezing up the UI
	function delay(seconds) {
		var d1 = new Date();
  		var d2 = new Date();
  		while (d2.valueOf() < d1.valueOf() + seconds*1000) {
    		d2 = new Date();
  		}
	}

	beforeEach(() => {
		counter = new Counter();
	});

	// Incrementing
	it('Can increment', () => {
		counter.increment();
		counter.increment();
		counter.increment();
		expect(counter.events.length).toEqual(3);
	});
	it('Can update second count when incrementing', () => {
		counter.increment();
		counter.increment();
		expect(counter.secondCount).toEqual(2);
	});
	it('Can update minute count when incrementing', () => {
		counter.increment();
		expect(counter.minuteCount).toEqual(1);
	});
	it('Can update hour count when incrementing', () => {
		counter.increment();
		counter.increment();
		counter.increment();
		expect(counter.hourCount).toEqual(3);
	});

	// Seconds
	it('Can include events in numberInLastSecond (Happy Path)', () => {
		counter.increment();
		counter.increment();
		counter.increment();
		counter.increment();
		counter.increment();
		expect(counter.numberInLastSecond()).toEqual(5);
	});
	it('Can exclude events from numberInLastSecond', () => {
		counter.increment();
		counter.increment();

   		delay(2);
    	counter.increment();
    	counter.increment();
    	expect(counter.numberInLastSecond()).toEqual(2);
	});
	it('Can deal with 0 events numberInLastSecond when there havent been any events', () => {
    	expect(counter.numberInLastSecond()).toEqual(0);
	});
	it('Can deal with 0 events numberInLastSecond when there have been events', () => {
		counter.increment();
		counter.increment();
   		delay(2);

    	expect(counter.numberInLastSecond()).toEqual(0);
	});

	// Minutes
	it('Can include events in numberInLastMinute (Happy Path)', () => {
		counter.increment();
		counter.increment();
		counter.increment();
		counter.increment();
		counter.increment();
		expect(counter.numberInLastMinute()).toEqual(5);
	});
		// it('Can exclude events from numberInLastMinute', () => {
	// 	counter.increment();
	// 	counter.increment();

 //   		delay(61);
 //    	counter.increment();
 //    	counter.increment();
 //    	expect(counter.numberInLastMinute()).toEqual(2);
	// });
	it('Can deal with 0 events numberInLastMinute', () => {
    	expect(counter.numberInLastMinute()).toEqual(0);
	});

	// Minutes & Seconds
	it('Can calculate numberInLastMinute after calculating numberInLastSecond', () => {
		counter.increment();
		counter.increment();

   		delay(2);
    	counter.increment();
    	counter.increment();
    	
    	expect(counter.numberInLastSecond()).toEqual(2);
    	expect(counter.numberInLastMinute()).toEqual(4);
	});


});