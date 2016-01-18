"use strict";
define(
    ['js/dummylib'],
    function(dummylib) {
        var run = function() {
            test('dummyLib should return the sum of the two supplied numbers.', function() {
                equal(dummylib("alora que tal"), ["alora que tal"], 'The return should be [["alora","que","tal"]]');
                equal(dummylib("alora que \n tal"), ["alora que","tal"], 'The return should be [["alora"],["tal"]]');
            });
        };
        return {run: run}
    }
);