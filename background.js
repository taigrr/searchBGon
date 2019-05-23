function announce_close(){
	console.log("closing all search tabs")
	chrome.tabs.query({}, function(tabs) {
		var closeable=[];
		for (var i=0; i<tabs.length; ++i) {
			console.log(tabs[i]);
			if(tabs[i].url.includes("https://www.google.com/search?"))
			{	
				closeable.push(tabs[i].id)
			}
			chrome.tabs.remove(closeable);
		}
	});
}
chrome.browserAction.onClicked.addListener(function(tab){announce_close()});
