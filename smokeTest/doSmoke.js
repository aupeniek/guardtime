/**
 * Created with JetBrains WebStorm.
 * User: aupeniek
 * Date: 6/4/13
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */
var webdriver = require('../../wd')
    , assert = require('assert');

var browser = webdriver.remote(
    "ondemand.saucelabs.com"
    , 80
    , "aupeniek"
    , "2850f60b-adb0-4e08-9f82-25b617aeed70"
);

browser.on('status', function(info){
    console.log('\x1b[36m%s\x1b[0m', info);
});

browser.on('command', function(meth, path){
    console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
});

// print process.argv
var args = process.argv;
var tests = setCapabilities(args);
var suite = 'smoke';

function setCapabilities(args) {
    var results = new Array;
    args.forEach(function (val, index, array) {
        if (array[1]) {
            if (index>1 && (val.charAt(0)=='-')) {
                val = val.slice(1);
                var params = val.split('&');
                params[0] = setPlatform(params[0]);
                params[1] = setBrowser(params[1]);
                if (!params[2]) params[2] = '21'; //defaulting to FIREFOX version 21
                console.log(index + ': platform=' + params[0] + '; browser=' + params[1] + '; version=' + params[2]);
                results.push(params);
            }
        } else { // no parameters specified
            var params = new array['Linux', 'FIREFOX', '21'];
            console.log('.. starting default browser: ' + ': platform=' + params[0] + '; browser=' + params[1] + '; version=' + params[2]);
            results.push(params);
        }
    });
    return results;
}


function setPlatform(parameter1) {
    switch (parameter1) {
        case 'win7' : return 'Windows 7';
        case 'win8' : return 'Windows 8';
        case 'winxp' : return 'Windows XP';
        case 'osx' : return 'OS X 10.6';
        case 'iphone' : return 'OS X 10.6';
        case 'android' : return 'Linux';
        case 'linux' : return 'Linux';
        default: return 'Linux';
    };
};

function setBrowser(parameter2) {
    switch (parameter2) {
        case 'ie' : return 'INTERNETEXPLORER';
        case 'safari' : return 'SAFARI';
        case 'opera' : return 'OPERA';
        case 'chrome' : return 'CHROME';
        case 'ff' : return 'FIREFOX';
        case 'android' : return 'ANDROID';
        default: return 'FIREFOX';
    };
};

var desired = {
    browserName: 'iphone'
    , version: '5.0'
    , platform: 'Mac 10.6'
    , tags: ["examples"]
    , name: "This is an example test"
}

browser.init(desired, function() {
    browser.get("http://saucelabs.com/test/guinea-pig", function() {
        browser.title(function(err, title) {
            assert.ok(~title.indexOf('I am a page title - Sauce Labs'), 'Wrong title!');
            browser.elementById('submit', function(err, el) {
                browser.clickElement(el, function() {
                    browser.eval("window.location.href", function(err, href) {
                        assert.ok(~href.indexOf('guinea'), 'Wrong URL!');
                        browser.quit()
                    })
                })
            })
        })
    })
})