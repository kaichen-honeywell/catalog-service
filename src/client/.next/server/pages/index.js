"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 493:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

;// CONCATENATED MODULE: external "react/jsx-runtime"
const jsx_runtime_namespaceObject = require("react/jsx-runtime");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./pages/index.tsx


const Index = (props)=>{
    const { data  } = props;
    return /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("h1", {
                children: "Honeywell CWP Application Catalog - Home"
            }),
            data
        ]
    });
};
Index.getInitialProps = ({ query  })=>{
    return {
        data: `some initial props including query params and controller data: ${JSON.stringify(query)}`
    };
};
/* harmony default export */ const pages = (Index);


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(493));
module.exports = __webpack_exports__;

})();