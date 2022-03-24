// First Search Notification - only show on first address bar search

var promptMarket = chrome.i18n.getMessage("PromptMarket");
var browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase();

function firstSearchNotification(tabId, changeInfo) {
    if(changeInfo.url){
		
		var pc = extractQueryString("PC", changeInfo.url);
		
		var formcode = extractQueryString("FORM", changeInfo.url);
		
		if(changeInfo.url.includes("search?FORM="+formcode+"&PC="+ pc  +"&q="))
		{
			 var isBingExtensionSearch = changeInfo.url.includes("search?FORM="+formcode+"&PC="+ pc  +"&q=");
		
				var showFirstSearchNotification = localStorage["showFirstSearchNotification"];
				//console.log(showFirstSearchNotification);
				  if(isBingExtensionSearch && (showFirstSearchNotification==null || showFirstSearchNotification==undefined || showFirstSearchNotification=="") ) {
					  localStorage["showFirstSearchNotification"] = "false";
					  chrome.tabs.insertCSS(tabId, {file: "templates/firstSearchNotification-chrome.css"});
					  chrome.tabs.executeScript(tabId, {file: "scripts/injectFirstSearchNotification.js"});
				
					}
					else if(isBingExtensionSearch  && localStorage["showFirstSearchNotification"] == "false"){
						chrome.tabs.onUpdated.removeListener(firstSearchNotification);
					}
		}
    }
}

function extractQueryString(param, url) {
	param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var p = (new RegExp("[\\?&]" + param + "=([^&#]*)")).exec(url);
	return (p === null) ? "" : p[1];
}

setTimeout(function () {
	if(navigator.language.length==5){
		if(localStorage["ChangeItback"] !="False" ){          // only for new user
		   var showFirstSearchNotification = localStorage["showFirstSearchNotification"];
		   if(showFirstSearchNotification==null || showFirstSearchNotification=="" || showFirstSearchNotification==undefined){  // to restrict 2nd search injection
				if(promptMarket == browserLanguage)
				{
				   chrome.tabs.onUpdated.addListener(firstSearchNotification);
				}
		   }
		}
	}
	else{
		promptMkt=promptMarket.substring(0,2);
		if(localStorage["ChangeItback"] !="False" ){   
		   var showFirstSearchNotification = localStorage["showFirstSearchNotification"];
		   if(showFirstSearchNotification==null || showFirstSearchNotification=="" || showFirstSearchNotification==undefined){
			   if(promptMkt == browserLanguage)
				{
					chrome.tabs.onUpdated.addListener(firstSearchNotification);
				}
		   }
		}
	}
}, 200);

var externalCallback = null;
var notificationDismissed = false;
chrome.runtime.onMessage.addListener(
    function(request) {
        if(request == "notificationDismissed"){
            notificationDismissed = true;
            if(externalCallback) {
                externalCallback({isEnabled: "true"});
            }
        }
        return true;
    }
);


chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        const url = 'https://browserdefaults.microsoft.com/';
        if(sender && sender.url && sender.url.toLocaleLowerCase().includes(url) && request == "isExtensionEnabled"){
            if(notificationDismissed){
                sendResponse({isEnabled: "true"});
            }
            else {
				console.log("sendResponse:" + sendResponse);
                externalCallback = sendResponse;
            }
        }
        return true;
    }
);

