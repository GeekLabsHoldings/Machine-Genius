import { globalObject } from "./globalObject.js";

var atob, btoa;

(function() {
  atob = globalObject.atob.bind(globalObject);
  btoa = globalObject.btoa.bind(globalObject);
  return;

})();

export { atob, btoa };
