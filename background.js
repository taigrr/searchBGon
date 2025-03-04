chrome.action.onClicked.addListener(() => {
	chrome.tabs.query({}, (tabs) =>{
		chrome.tabs.remove(tabs.filter(tab => {
			return tab.url.includes("google.com/search?") || tab.url.includes("duckduckgo.com/?")
		}).map(tab => tab.id));
	});
})
