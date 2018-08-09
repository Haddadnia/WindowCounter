## Description

This is a module for tracking incoming events, and reporting back how many of said events occured within the last second, minute, and hour. 

The counter uses a sliding window implementation. It maintains references to the earliest known event which occured within the last second, minute, and hour, and counts for how many transactions have taken place in each time frame. The Counter then dynamically computes the count at a given moment by iterating over the array of events starting from where it was last, and ending once it reaches an event/timestamp which occured within the given range.

## Drawbacks of Implementation, Scaling Concerns, and Possible Improvements

1. This algorithm uses linear search. In the event of an extremely large amount of data it will become very slow. We could improve this by using other searching algorithms such as a binary search, where the referenced index (i.e. minuteIndex) is the beginning of the searchable array, and the end of the array is the end. This would speed up the time it takes to find the oldest event within a time slot.

1. This implementation doesn't gracefully take into account the need for other "unsupported" time intervals. If you wanted to query for every transaction for the last two seconds for example, you would have to call the `numInLast(timeRange, index, count, events)` function directly, and pass in a null index. This would then search the entire array starting from the beginning in order to find the first timestamp that fell within the last two seconds, which isn't very efficient. To solve this a system could be added in which, when an "unsupported" time interval is passed in (aka 2 seconds), it relies on the other pointers as a starting point. In our example with 2 seconds, the function could determine that 2 seconds is likely closest to the 1 second pointer, check the events above and below the 1 second pointer (to know in which direction to traverse the array) and seek out the correct value. This would cut down on the time needed to determine how many events had occured within "unsupported" time intervals.

1. This implementation is also not optimized for longer windows of time. For example, assuming a high volume of events, determining the number of events over the past week would be very expensive. To mitigate this, we could potentially add a batching system, which caches counts per hour, day, or even week. Then if a user wanted to know the number of events in the past 7 days (168 hours), they could compute the # of events in the 1st and last day using the algorithm (since those will be dependent on what time you make the query) and add those together with the cached values for the middle 5 days.

1. There is no minimum time interval. We could make improvements if we knew that we only cared about time intervals as small as 1 second. One way to do this would be to change the events (which are currently just timestamps) to be simple structures containing a timestamp and a count. That count could then be used for incrementing/decrementing during search. This would of course would bring up some complications with relying on indeces of an array to hold the count, which in turn could potentially be solved with a linked list implementation. Each new node/block would hold a pointer to the next block as well as a reference containing the blocks (at its time of conception) for a second, minute, and hour ago, as well as the count for how many events occured within the minimum time interval.

1. The pointers to the earliest events within the second, minute, and hour are only updated when a query is made. In order to improve query time, a timer could be set up to update these pointers every so often.

1. Currently we hold the entire array in memory indefinitely. This is wasteful. If we knew for sure what our longest desired time interval would be (for example 1 hour), instead of moving the hour index, we could simply remove events before it from the array, and update the other indeces (seconds and minutes) since the array length has now changed. The hourIndex would always be 0, and there wouldn't be memory wasted hanging onto unused events.

## Setup

1. Clone the repo: `git clone https://github.com/Haddadnia/WindowCounter.git`
1. Install dependencies: `npm install`
1. Run tests: `npm run test`

Note: tests will take around 7 seconds to run. In order to verify that the Counter 'can exclude events from numberInLastMinute' and 'can juggle hours minutes and seconds' open up `Counter.test.js` and uncomment those tests. The test suite will then take just over an hour to run.


