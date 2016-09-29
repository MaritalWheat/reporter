// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);

chrome.runtime.onMessage.addListener(function(message){
  var allImages = new Array();
  //In case you want to do other things too this is a simple way to handle it
  if(message.method == "downloadImages"){
    message.images.forEach(function(v){
      allImages.push(v);
    });
    //alert(allImages[0]);


    //send to imgur API
    //fd.append("image", file); // Append the file
    var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
    xhr.open("POST", "https://api.imgur.com/3/image"); // Boooom!
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        //alert(xhr.responseText);
        var link = JSON.parse(xhr.responseText).data.link;
        //alert(link);
        //chrome.tabs.create({"url": link});
        alert("Captured, motherfucker.")
      };
      /*xhr.onload = function() {
      // Big win!
          var link = JSON.parse(xhr.responseText).data.link;
          document.querySelector("#link").href = link;
          document.querySelector("#link").innerHTML = link;



          document.body.className = "uploaded";
          alert(link);
      }*/
      // Ok, I don't handle the errors. An exercice for the reader.
      xhr.setRequestHeader('Authorization', 'Client-ID f6f5270227cc86d');
      /* And now, we send the formdata */
      //xhr.send(fd);
      xhr.send(JSON.stringify({ image : allImages[0], album : 'gNDGj4I2rDwy5BZ'}));
    }
});

chrome.contextMenus.create({
  "title": "Report It!",
  "contexts": ["image"], "onclick": function (info, tab) {

    //send to imgur API
    var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
    xhr.open("POST", "https://api.imgur.com/3/image"); // Boooom!
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        var link = JSON.parse(xhr.responseText).data.link;
        //alert("Captured, motherfucker.")
    };

    xhr.setRequestHeader('Authorization', 'Client-ID f6f5270227cc86d');
    xhr.send(JSON.stringify({ image : info.srcUrl, album : 'gNDGj4I2rDwy5BZ'}));


    /*console.log(info);
    console.log(tab);
    var pinUrl = "http://pinterest.com/pin/create/bookmarklet/";
    pinUrl += "?media=" + escape(info.srcUrl) + "&url=" + escape(tab.url) + "&alt=alt&title=foo"; //+ escape(tab.title);
    pinUrl += "&is_video=false&";
    window.open(pinUrl,"pin"+(new Date).getTime(),"status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=635,height=290,left=0,top=0");
    */
  }
});
