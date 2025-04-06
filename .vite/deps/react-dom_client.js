import {
  require_react_dom
} from "./chunk-I77EGHU6.js";
import "./chunk-TBXE5IYZ.js";
import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// Employee-Smart-Roster-main/Employee-Smart-Roster-main/fireJetReact/node_modules/react-dom/client.js
var require_client = __commonJS({
  "Employee-Smart-Roster-main/Employee-Smart-Roster-main/fireJetReact/node_modules/react-dom/client.js"(exports) {
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});
export default require_client();
//# sourceMappingURL=react-dom_client.js.map
