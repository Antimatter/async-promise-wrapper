const async = require('async');

function Async1(fn) {
    return function(arg1, pf) {
        return new Promise(function(resolve, reject) {
            async[fn](
                arg1,
                function(item, callback) {
                    pf(item)
                        .then(function(value) {
                            callback(null, value);
                        })
                        .catch(callback);
                },
                function(error, results) {
                    if (error) reject(error);
                    else resolve(results);
                }
            );
        });
    };
}

function Async2(fn) {
    return function(arg1, arg2, pf) {
        return new Promise(function(resolve, reject) {
            async[fn](
                arg1,
                arg2,
                function(item, callback) {
                    pf(item)
                        .then(function(value) {
                            callback(null, value);
                        })
                        .catch(callback);
                },
                function(error, results) {
                    if (error) reject(error);
                    else resolve(results);
                }
            );
        });
    };
}

function Async3(fn) {
    return function(arg1, arg2, pf) {
        return new Promise(function(resolve, reject) {
            async[fn](
                arg1,
                arg2,
                function(item1, item2, callback) {
                    pf(item1, item2)
                        .then(function(value) {
                            callback(null, value);
                        })
                        .catch(callback);
                },
                function(error, results) {
                    if (error) reject(error);
                    else resolve(results);
                }
            );
        });
    };
}

[
    'concat',
    'concatSeries',
    'detect',
    'detectSeries',
    'each',
    'eachSeries',
    'eachOf',
    'eachOfSeries',
    'every',
    'everySeries',
    'filter',
    'filterSeries',
    'map',
    'mapSeries',
    'mapValues',
    'mapValuesSeries',
    'reject',
    'rejectSeries',
    'some',
    'someSeries',
    'sortBy'
].forEach(function(name) {
    module.exports[name] = Async1(name);
});

[
    'detectLimit',
    'eachLimit',
    'eachOfLimit',
    'everyLimit',
    'filterLimit',
    'mapLimit',
    'mapValuesLimit',
    'rejectLimit',
    'someLimit',
    'transform'
].forEach(function(name) {
    module.exports[name] = Async2(name);
});

['reduce', 'reduceRight'].forEach(function(name) {
    module.exports[name] = Async3(name);
});

module.exports.doWhilst = function(pf, tf) {
    return new Promise(function(resolve, reject) {
        async.doWhilst(
            function(callback) {
                pf()
                    .then(function(msg) {
                        callback(null, msg);
                    })
                    .catch(function(err) {
                        callback(err);
                    });
            },
            tf,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports.whilst = function(tf, pf) {
    return new Promise(function(resolve, reject) {
        async.whilst(
            tf,
            callback => {
                pf()
                    .then(msg => {
                        callback(null, msg);
                    })
                    .catch(error => {
                        callback(error);
                    });
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports.delay = function(t, r) {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    }).then(function() {
        return Promise.resolve(r);
    });
};

module.exports.retry = function(opts, pf) {
    return new Promise(function(resolve, reject) {
        async.retry(
            opts,
            function(callback) {
                pf()
                    .then(function(msg) {
                        callback(null, msg);
                    })
                    .catch(function(err) {
                        callback(err);
                    });
            },

            function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports.retryForever = function(interval, pf) {
    return new Promise(function(resolve) {
        var result = null;
        var done = false;
        async.whilst(
            function() {
                return !done;
            },
            function(callback) {
                pf()
                    .then(function(r) {
                        result = r;
                        done = true;
                        callback();
                    })
                    .catch(function() {
                        setTimeout(callback, interval);
                    });
            },
            function() {
                resolve(result);
            }
        );
    });
};
