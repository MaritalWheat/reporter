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

chrome.runtime.onMessage.addListener
    (function(request, sender, sendResponse) {
      if( request.message === "sent_upload_request" ) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "https://dl.dropboxusercontent.com/u/29669245/ajax-loader.gif");
        iframe.setAttribute("style", "border:none; width:400px; height:400px; position:fixed; top: 50%; left: 50%; margin-top: -200px; margin-left:-200px;");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        document.body.appendChild(iframe);
        fadeIn(iframe, 700);
    }
  }
);

chrome.runtime.onMessage.addListener
    (function(request, sender, sendResponse) {
      if( request.message === "upload_complete" ) {
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            iframes[i].parentNode.removeChild(iframes[i]);
        }

        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "https://dl.dropboxusercontent.com/u/29669245/smiley.png");
        iframe.setAttribute("style", "border:none; width:600px; height:500px; position:fixed; top: 50%; left: 50%; margin-top: -250px; margin-left:-300px;");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        document.body.appendChild(iframe);
        fadeIn(iframe, 700);

        setTimeout(function() {
            iframes = document.querySelectorAll('iframe');
            for (var i = 0; i < iframes.length; i++) {
                iframes[i].parentNode.removeChild(iframes[i]);
            }
          }, 2000
        );
    }
  }
);

function fadeIn(el, duration) {

    /*
     * @param el - The element to be faded out.
     * @param duration - Animation duration in milliseconds.
     */

    var step = 10 / duration,
        opacity = 0;
    function next() {
        if (opacity >= 1) { return; }
        el.style.opacity = ( opacity += step );
        setTimeout(next, 10);
    }
    next();
}
