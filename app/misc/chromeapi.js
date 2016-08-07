((chrome) => {
  "use strict";

  chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

      switch (message.type) {

        case "authenticate":
          chrome.identity.getProfileUserInfo((res) => {
            console.log('identity: ', res);
            sendResponse(res);
          });
          break;
        case "history":
          chrome.history.search({text: ''}, (res) => {
            console.log('res from history in back: ', res);
            sendResponse(res);
          });
          break;
      }

      return true;
    }
  );

})(window.chrome);
