//Code to send instrumentation ping when extension installed.
var pingURL;

if(localStorage["PartnerCode"] && !localStorage["pc"])
{
	localStorage["pc"] = localStorage["PartnerCode"];
}
var bingUrl = "https://www.bing.com/";

//Sets '_DPC' session cookie in bing.com domain whenever background.js gets executed
setTimeout(function () {
    var pc = "U524";
    chrome.cookies.set({ url: bingUrl, domain: '.bing.com', name: '_DPC', value: pc }, function (cookie) {
    });
}, 100);

chrome.runtime.onInstalled.addListener(function () {
    //console.log("onInstalled");
	chrome.cookies.get({ url: bingUrl, name: 'MUID' }, function (cookie) {
        if (cookie && cookie.value != "" && cookie.value != null) {
            localStorage["muid"] = cookie.value;
        }
    });
	
});
chrome.management.onEnabled.addListener(function (ExtensionInfo) {
    //console.log("onEnabled");    
    
	var PCCode = "UWDF";
	var MachineID = "EEF42D79F57F4E57AE3C8A2D67332C93";
	var OS = "6.2.8400.1";
	var LoggerVersion = "1.7.29.0";
	var Market = "en-us";
	var PackageCode = "DefaultPack";
	var currentdate = new Date();
	var InstalledDate = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate();
	var InstalledTime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ":" + currentdate.getMilliseconds();
	var cookieFound = false;
	console.log("test1");
	if(!localStorage["pc"])
	{
        chrome.cookies.getAll({}, function (cookies) {

            for (var i in cookies) {
				console.log(cookies);
                cookieFound = false;
				console.log("test2");
                if (cookies[i].name == "PCCode") {
					console.log("test3");
                    PCCode = cookies[i].value;
                    cookieFound = true;
					localStorage["PartnerCode"] = PCCode;
					localStorage["pc"] = PCCode;
                }
                else if (cookies[i].name == "MachineID") {
                    MachineID = cookies[i].value;
                    cookieFound = true;
                }
                else if (cookies[i].name == "OS") {
                    OS = cookies[i].value;
                    cookieFound = true;
                }
                else if (cookies[i].name == "InstalledDate") {
                    InstalledDate = cookies[i].value;
                    cookieFound = true;
                }
                else if (cookies[i].name == "InstalledTime") {
                    InstalledTime = cookies[i].value;
                    cookieFound = true;
                }
                else if (cookies[i].name == "Market") {
                    Market = cookies[i].value;
                    cookieFound = true;
                }
                else if (cookies[i].name == "LoggerVersion") {
                    LoggerVersion = cookies[i].value;
                    cookieFound = true;
                }
                else if (cookies[i].name == "PackageCode") {
                    PackageCode = cookies[i].value;
                    cookieFound = true;
                }

                //Remove cookies value
                if (cookieFound) {
                    var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
                    chrome.cookies.remove({ "url": url, "name": cookies[i].name });
                }
            }
            
        });
    }

});



