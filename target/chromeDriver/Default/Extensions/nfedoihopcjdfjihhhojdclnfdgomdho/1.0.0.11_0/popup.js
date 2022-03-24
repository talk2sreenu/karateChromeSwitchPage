const connectionUrl = "https://www.bing.com/favicon.ico?_=" + new Date().getTime();
var extensionId = chrome.runtime.id;
var browserLanguage = navigator.language;
var onlineUrl = "https://go.microsoft.com/fwlink/?linkid=2167808&extnID="+ extensionId +"&mkt="+ browserLanguage;
const offlineUrl = "offline_popup.html";

window.onload = function(){
    loadNewTab();
};

function setPopupPage(online) {
    const popupFrame = document.getElementById("content");
    if (online) {
        if (localStorage["pc"]) {
            onlineUrl = onlineUrl + "&pc=" + localStorage["pc"];
        }
        else {
            onlineUrl = onlineUrl + "&pc=UWDF";
        }
        popupFrame.src = onlineUrl;
    }
    else {
        popupFrame.src = offlineUrl;
    }
}

function loadNewTab(){

    if(!window.navigator.onLine) {
        setPopupPage(false);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", connectionUrl);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) && xhr.responseText)
            {
                setPopupPage(true);
            }
            else{
                setPopupPage(false);
            }
        }
    };
    xhr.send();
}