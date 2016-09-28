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

function refreshMenu() {
  chrome.contextMenus.removeAll();

  var imageMenu = chrome.contextMenus.create({
    "title": "Pin It!",
    "contexts": ["image"], "onclick": function (info, tab) {
      console.log(info);
      console.log(tab);
      var pinUrl = "http://pinterest.com/pin/create/bookmarklet/";
      pinUrl += "?media=" + escape(info.srcUrl) + "&url=" + escape(tab.url) + "&alt=alt&title=foo"; //+ escape(tab.title);
      pinUrl += "&is_video=false&";
      window.open(pinUrl,"pin"+(new Date).getTime(),"status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=635,height=290,left=0,top=0");
    }
  });
}

refreshMenu();
