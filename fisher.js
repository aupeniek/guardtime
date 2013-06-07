/**
 * Created with JetBrains WebStorm.
 * User: aupeniek
 * Date: 6/4/13
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

function init(args) {
    var config = {};
    args.forEach(function (argument, index, array) {
        if (argument.charAt(0)=='-') {
            argument = argument.slice(1);
            var key = argument.split("=")[0];
            var value = argument.split("=")[1];
            if (key == 'env') config[key] = getPath(value);
            if (key == 'suite') config[key] =  value;
            if (key == 'platform') config[key] = getPlatform(value);
            if (key == 'server') config[key] = getServer(value);
            if (key == 'portaluser') config[key] = value;
            if (key == 'password') config[key] = value;
            //if (!params[2]) params[2] = '21'; //defaulting to FIREFOX version 21
        }
    })
    //console.log(config);
    return config;
};

function getPath(parameter) {
    switch (parameter) {
        case 'local' : return '../wd'; break;
        case 'jenkins' : return 'wd'; break;
        //default: return 'local';
    };
};

function getPlatform(parameter) {
    var params = parameter.split("+");
    var result = {};
    result['os'] = getOs(params[0]);
    result['browser'] = getBrowser(params[1]);
    result['version'] = params[2];
    //console.log(result);
    return result;
};

function getOs(parameter) {
    switch (parameter) {
        case 'win7' : return 'Windows 7';      break;
        case 'win8' : return 'Windows 8';      break;
        case 'winxp' : return 'Windows XP';     break;
        case 'osx' : return 'OS X 10.6';        break;
        case 'iphone' : return 'OS X 10.6';     break;
        case 'android' : return 'Linux';      break;
        case 'linux' : return 'Linux';      break;
    };
}

function getBrowser(parameter) {
    switch (parameter) {
        case 'ie' : return 'INTERNETEXPLORER';   break;
        case 'safari' : return 'SAFARI';    break;
        case 'opera' : return 'OPERA';   break;
        case 'chrome' : return 'CHROME';   break;
        case 'ff' : return 'FIREFOX';      break;
        case 'android' : return 'ANDROID';    break;
        default: return 'FIREFOX'; break;
    };
};

function getServer(parameter) {
    switch (parameter) {
        case 'staging' : return 'http://staging.piranha.ee';   break;
        case 'live' : return 'http://my.joyentcloud.com';    break;
        default: return 'http://staging.piranha.ee';  break;
    };
};

exports.init=init;