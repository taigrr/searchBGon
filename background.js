function announce_close(){
	console.log("closing all search tabs")
	chrome.tabs.query({}, function(tabs) {
		var closeable=[];
		for (var i=0; i<tabs.length; ++i) {
			console.log(tabs[i]);
			if(tabs[i].url.includes("google.com/search?")) {	
				closeable.push(tabs[i].id)
			} else if(tabs[i].url.includes("duckduckgo.com/?")){
				closeable.push(tabs[i].id)
			}
		}
		chrome.tabs.remove(closeable);
	});
}
chrome.action.onClicked.addListener(function(){announce_close()});
