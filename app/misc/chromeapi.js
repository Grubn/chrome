((chrome) => {
  "use strict";

  chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

      switch (message.type) {

        case "authenticate":
          return chrome.identity.getProfileUserInfo((res) => sendResponse(res));

        case "UploadHistory":
          return chrome.history.search('', (res) => sendResponse(res));

      }

      return true;
    }
  );

})(window.chrome);
