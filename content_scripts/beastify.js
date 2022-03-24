(function () {
  // console.log("backgroudn as content=>bestify")
  // document.body.style.border = "5px solid green";
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  browser.runtime.onMessage.addListener((message) => {
    console.log("hello from beastufy")


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/ApiAddText", true);
    xhr.responseType = 'text';
    console.log("hello from after url")
    xhr.onreadystatechange = function () {
      console.log("hello from inner call")
      console.log(xhr.readyState)
      if (xhr.readyState == 4) {
        // var txtarea = document.querySelector('.comment');

        // if (txtarea === document.activeElement) {
        //   console.log('Element has focus!');
        // } else {
        //   console.log(`Element is not focused.`);
        // }
        
        console.log(xhr)
        console.log("hello from inner state", xhr.responseText)

        var resp = JSON.parse(xhr.responseText);

        console.log(resp[0].text)
        
        // var txtarea = document.getElementById("comment");
        var txtarea = document.activeElement;
        var start = txtarea.selectionStart;
        var end = txtarea.selectionEnd;
        console.log("textare id" + txtarea.selectionStart);
        console.log("textare id2" + txtarea.selectionEnd);
        var finText = txtarea.value.substring(0, start) + resp[0].text + txtarea.value.substring(end);
        txtarea.value = finText;
      }
    }
    console.log("hello from before apicall")
    xhr.send();
  });

})();
