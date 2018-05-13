# async-promise-wrapper

## Async libraries wrapped to use promises

Maps most of the functions in caolan/async to work with functions that return promises instead of iteratees and callbacks.  Iplemented as a simple wrapper that works for most of those methods with very little code.

Here's an example:

if you implemented a callback-based control flow with caolan/async like this:

```
const async = require('async');
async.mapLimit(collection, 2, (item, callback) => {
    callback(null, someKindOfTransform(item));
})
```

With this library you can do your transform as a promise-returning function instead

```
const ap = require('async-promise-wrapper');
ap.mapLimit(collection, 2, item => {
    return functionThatReturnsPromise(item);
});
```

Each of the following caolan/async functions has been mapped to work this way:

```
concat
concatSeries
detect
detectSeries
each
eachSeries
eachOf
eachOfSeries
every
everySeries
filter
filterSeries
map
mapSeries
mapValues
mapValuesSeries
reject
rejectSeries
some
someSeries
sortBy
detectLimit
eachLimit
eachOfLimit
everyLimit
filterLimit
mapLimit
mapValuesLimit
rejectLimit
someLimit
doWhilst
whilst
retry
```
I've added a couple of handy functions as well:
```
retryForever(interval, pf)
delay(timeout, pf)
```

