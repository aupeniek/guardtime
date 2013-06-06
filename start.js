/**
 * Created with JetBrains WebStorm.
 * User: aupeniek
 * Date: 6/4/13
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

var fisher = require('./fisher');

var params = fisher.init(process.argv.slice(2));

var baseURL = params.server;

var webdriver = require(params.env)
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

var desired = {
    browserName: params.platform.browser
    , version: params.platform.version
    , platform: params.platform.os
    , tags: [params.suite]
    , name: "Example fisher test with parameters"
}

console.log(desired);
browser.init(desired, function(err, sessionId) {
    browser.get(baseURL, function() {
        browser.title(function(err, title) {
            assert.ok(~title.indexOf('Joyent Portal'), 'Wrong title!');
            browser.elementByLinkText('Create an Account', function(err, el) {
                browser.clickElement(el, function() {
                    browser.eval("window.location.href", function(err, href) {
                        assert.ok(~href.indexOf('joyentcloud'), 'Wrong URL!');
                        browser.quit()
                        console.log('Test available at: https://saucelabs.com/tests/' + sessionId);
                    })
                })
            })
        })
    })
})