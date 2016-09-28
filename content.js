// content.js
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);*/

chrome.runtime.onMessage.addListener
    (function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var images = [];
        for(var i = 0; i < document.images.length; i++){
          images.push(document.images[i].src);
        }
      chrome.runtime.sendMessage({method:"downloadImages", images:images});
    }
  }
);
