function listenForClicks() {
  // let hometown = document.getElementById("hometown");
  document.addEventListener("click", (e) => {
    // document.body.style.border = "5px solid yellow";

    /**
     * into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {

      browser.tabs.sendMessage(tabs[0].id, {
        command: "beastify"
      });
    }

    /**
     * Get the active tab,
     * then call "beastify()"
     */
    if (e.target.classList.contains("beast")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError);
    }

  });
}
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({ file: "/content_scripts/beastify.js" })
  .then(listenForClicks)
  .catch(function () {
    console.log("error msg default")
  });
