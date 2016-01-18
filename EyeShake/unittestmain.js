"use strict";
require.config({
    paths: {
        'QUnit': 'libs/qunit'    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

// require the unit tests.
require(
    ['QUnit', 'tests/dummyTest'],
    function(QUnit, dummyTest) {
        // run the tests.
        dummyTest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);