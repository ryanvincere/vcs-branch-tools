function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')          
    .replace(/[^\u0100-\uFFFF\w\-]/g,'-') 
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}

function reformat(url) {
  var url = url.split("/");
  var branch = "";
  if (url?.length > 0) {
    branch = "CU-" + url[url.length - 1] + "-";
  }
  return branch;
}

chrome.tabs.getSelected(null, function (tab) {
  var tablink = tab.url;
  $("#url").val(reformat(tablink));

  chrome.tabs.executeScript(
    tab.id,
    {
      code: "document.querySelector('h1#task-name').innerHTML",
    },
    receiveText
  );
});

function receiveText(resultsArray) {
  $("#url").val($("#url").val() + slugify(resultsArray[0]))
}

jQuery("#btn-copy").click(function () {
  var data = jQuery("#url");

  if (data != "") {
    data.select();
    document.execCommand("copy");
  }
});