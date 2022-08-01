jQuery("#btn-copy").click(function () {
  var data = jQuery("#url");

  if (data != "") {
    data.select();
    document.execCommand("copy");
  }
});

jQuery(".tabs").click(function () {
  var x;
  x = jQuery(this).attr("data-id");

  $(".wrap").each(function (e) {
    jQuery(this).css("display", "none");
  });

  $(".tabs").each(function (e) {
    jQuery(this).find("div").removeClass("w3-border-white");
  });
  $(this).find("div").addClass("w3-border-white");
  jQuery(x).css("display", "block");
});

jQuery("#btn-copy-result").click(function () {
  var data = jQuery("#content").val();
  var metadata = jQuery("#metadata");

  metadata.html(data);
  metadata.find("a").each(function (e) {
    var format = reformat_content(jQuery(this).attr("href"));
    jQuery(this).attr("href", format);
    jQuery(this).attr("target", "_self");
  });

  var result = jQuery("#content_result");
  result.html(metadata.html());
  result.select();
  document.execCommand("copy");
});

function reformat(url) {
  var url = url.split("/");
  var branch = "";
  if (url?.length > 0) {
    branch = "CU-" + url[url.length - 1] + "-";
  }

  return branch;
  //   var text = jQuery("#url").val();

  //   if (text != "") {
  //     text = text.toLowerCase();

  //     //check if url contain domain

  //     var url = text;
  //     var hostname;

  //     //find & remove protocol (http, ftp, etc.) and get hostname

  //     if (url.indexOf("//") > -1) {
  //       hostname = url.split("/")[2];
  //     } else {
  //       hostname = url.split("/")[0];
  //     }

  //     //find & remove host and port number
  //     hostname = hostname.split(":")[0];

  //     if (hostname != "") {
  //       const url = text;
  //       const lookingFor = hostname;
  //       const replaced = url.substring(
  //         url.indexOf(lookingFor) + lookingFor.length
  //       );

  //       text = replaced;
  //     }

  //     //check / at first and last character
  //     if (text.charAt(0) != "/") {
  //       text = "/" + text;
  //     }

  //     if (text.slice(-1) != "/") {
  //       text = text + "/";
  //     }

  //     //remove .shtml or html
  //     text = text.replace(".shtml", "");
  //     text = text.replace(".html", "");

  //     jQuery("#result").html(text);
  //   } else {
  //   }
}

chrome.tabs.getSelected(null, function (tab) {
  var tablink = tab.url;
  $("#url").val(reformat(tablink));
});

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Injecting content script(s)');
    //On Firefox document.body.textContent is probably more appropriate
    chrome.tabs.executeScript(tab.id,{
        code: 'document.body.innerText;'
        //If you had something somewhat more complex you can use an IIFE:
        //code: '(function (){return document.body.innerText;})();'
        //If your code was complex, you should store it in a
        // separate .js file, which you inject with the file: property.
    },receiveText);
});

function receiveText(resultsArray){
    alert(resultsArray[0]);
}

// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.executeScript(
//     tab.id,
//     { code: `document.getElementById("task-name").innerText` },
//     sendCurrentTitle
//   );
// });

// chrome.tabs.executeScript(null, {
//     code: `document.all[0].innerText`,
//     allFrames: true, // this is the default
// }, function(results) {
//     // results.length must be 1
//     var result = results[0];
//     process_result(result);
//     alert(result)
// });
