var promptMarket = chrome.i18n.getMessage("PromptMarket");
var version=chrome.runtime.getManifest().version;
//console.log("version:"+version);
var Machineid;

var body = document.querySelector("body");
var notificationFrame1 = document.createElement("iframe");
notificationFrame1.id="ChangeItBack";
notificationFrame1.classList.add("changeItBack");
notificationFrame1.src = "https://go.microsoft.com/fwlink/?linkid=2179704&xid=2001&version="+version+"&machineid=11111111111111111111111111111111&bmkt=" + promptMarket;
body.appendChild(notificationFrame1);
notificationFrame1.classList.add("b_hide");

chrome.runtime.sendMessage("Get MachineID" ,(response) => {
	//console.log(response.Machineid);
	Machineid=response.Machineid;
	//console.log(Machineid);
		if(chrome.runtime.lasterror)
		{
			console.log("Error in response - Machineid");
		}
		else{
			console.log("got proper Machineid");
			 notificationFrame1.src = "https://go.microsoft.com/fwlink/?linkid=2179704&xid=2001&version="+version+"&machineid="+Machineid+"&bmkt=" + promptMarket;
		}
});
			
var listenerRef = function clickListener() {
	window.removeEventListener("focus", listenerRef);
    window.removeEventListener("click", listenerRef);
   try	{
		chrome.runtime.sendMessage("notificationDismissed" ,(response) => {
				if(chrome.runtime.lasterror)
				{
					console.log("Extension disabled");
				}
				else{
					console.log("Extension enabled");
				}
			});
	}
	catch(exception){
			//console.log("Machineid"+Machineid);
			console.log("Extension disabled");
			notificationFrame1.classList.remove("b_hide");
		}
}


if(!document.hasFocus()) {
	
	window.addEventListener("click", listenerRef);
	window.addEventListener("focus", listenerRef);

}
