(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{alfg:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/photo/crop",function(){return r("hqMS")}])},hqMS:function(e,t,r){"use strict";r.r(t);var n=r("hfKm"),o=r.n(n),a=r("2Eek"),i=r.n(a),c=r("XoMD"),s=r.n(c),u=r("Jo+v"),p=r.n(u),h=r("4mXO"),d=r.n(h),f=r("pLtp"),l=r.n(f),v=r("eVuF"),m=r.n(v),g=r("ln6h"),w=r.n(g),y=r("O40h"),b=r("0iUn"),C=r("sLSF"),O=r("MI3g"),x=r("a7VT"),S=r("AT/M"),D=r("Tit0"),E=r("vYYK"),_=r("q1tI"),k=r.n(_),R=r("/MKj"),j=r("nOHt"),T=r.n(j),N=r("uGE4"),P=r("EeRS"),M=r("Ywvz"),I=r("zeFo"),L=r("sOKU"),A=r("qQNu"),W=r.n(A),Y=(r("hzVQ"),r("Q8Fi"),k.a.createElement);function U(e,t){var r=l()(e);if(d.a){var n=d()(e);t&&(n=n.filter((function(t){return p()(e,t).enumerable}))),r.push.apply(r,n)}return r}function H(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){Object(E.a)(e,t,r[t])})):s.a?i()(e,s()(r)):U(Object(r)).forEach((function(t){o()(e,t,p()(r,t))}))}return e}var X=function(e){function t(e){var r;return Object(b.a)(this,t),r=Object(O.a)(this,Object(x.a)(t).call(this,e)),Object(E.a)(Object(S.a)(r),"onImageLoaded",(function(e){r.imageRef=e;var t={};return e.width<e.height?t.width=100:t.height=100,r.setState({crop:H({aspect:1,unit:"%"},t)}),!1})),Object(E.a)(Object(S.a)(r),"onCropChange",(function(e){r.setState({crop:e})})),Object(E.a)(Object(S.a)(r),"onCropComplete",(function(e){r.makeCrop(e)})),r.state={profile_photo_src:r.props.user.profile_photo_src,crop:{aspect:1,unit:"%",width:100},cropped_photo_url:"",blob:null},r.imageRef=null,r}return Object(D.a)(t,e),Object(C.a)(t,[{key:"makeCrop",value:function(){var e=Object(y.a)(w.a.mark((function e(t){var r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.width||!t.height){e.next=5;break}return e.next=3,this.getCroppedPhoto(this.imageRef,t,"cropped-photo.jpeg");case 3:r=e.sent,this.setState({cropped_photo_url:r},(function(){}));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getCroppedPhoto",value:function(e,t,r){var n=this,o=document.createElement("canvas"),a=e.naturalWidth/e.width,i=e.naturalHeight/e.height;return o.width=t.width,o.height=t.height,o.getContext("2d").drawImage(e,t.x*a,t.y*i,t.width*a,t.height*i,0,0,t.width,t.height),new m.a((function(e,t){o.toBlob((function(t){t&&(t.name=r,n.setState({blob:t}),e(t))}),"image/jpeg")}))}},{key:"uploadProfilePhoto",value:function(){var e=this;this.props.progressNotification("Uploading...");var t=new File([this.state.blob],"cropped-photo.jpeg");this.props.uploadProfilePhoto(t).then((function(t){200===t.status&&0===t.data.status.code?(e.props.showNotification("Upload success"),setTimeout((function(){return e.props.hideNotification()}),3e3),T.a.back()):(e.props.showNotification("Upload error, please try again later",!1),setTimeout((function(){return e.props.hideNotification()}),3e3))})).catch((function(t){e.props.showNotification("Upload error, please try again later",!1),setTimeout((function(){return e.props.hideNotification()}),3e3)}))}},{key:"render",value:function(){return Y(M.a,{title:"RCTI+ - Live Streaming Program 4 TV Terpopuler"},Y(I.a,{title:"Crop Photo"}),Y("div",{className:"wrapper-content container-box-ep",style:{marginTop:50}},Y(W.a,{className:"crop-image",src:this.state.profile_photo_src,crop:this.state.crop,onChange:this.onCropChange,circularCrop:!0,onImageLoaded:this.onImageLoaded,onComplete:this.onCropComplete}),Y("div",{className:"btn-group-crop"},Y(L.a,{onClick:function(){return T.a.back()},className:"btn-cancel-crop"},"Cancel"),Y(L.a,{onClick:this.uploadProfilePhoto.bind(this),className:"btn-next btn-save-crop"},"Save"))))}}]),t}(k.a.Component);t.default=Object(R.b)((function(e){return e}),H({},N.a,{},P.a))(X)},qQNu:function(e,t,r){var n;e.exports=(n=r("q1tI"),function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){e.exports=r(2)()},function(e,t){e.exports=n},function(e,t,r){"use strict";var n=r(3);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r.n(n),a=r(0),i=r.n(a);function c(e){var t,r,n="";if(e)if("object"==typeof e)if(e.push)for(t=0;t<e.length;t++)e[t]&&(r=c(e[t]))&&(n&&(n+=" "),n+=r);else for(t in e)e[t]&&(r=c(t))&&(n&&(n+=" "),n+=r);else"boolean"==typeof e||e.call||(n&&(n+=" "),n+=e);return n}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"default",(function(){return E})),r.d(t,"Component",(function(){return E})),r.d(t,"makeAspectCrop",(function(){return C})),r.d(t,"containCrop",(function(){return D}));var m=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){return m=!0,!0}}))}catch(e){}function g(e){var t,r;if(e.touches){var n=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(e.touches,1)[0];t=n.pageX,r=n.pageY}else t=e.pageX,r=e.pageY;return{x:t,y:r}}function w(e,t,r){return Math.min(Math.max(e,t),r)}function y(e){return e&&e.width&&e.height&&!isNaN(e.width)&&!isNaN(e.height)}function b(e){return"n"===e?"s":"ne"===e?"sw":"e"===e?"w":"se"===e?"nw":"s"===e?"n":"sw"===e?"ne":"w"===e?"e":"nw"===e?"se":e}function C(e,t,r){if(isNaN(e.aspect))return console.warn("`crop.aspect` should be a number in order to make an aspect crop",e),e;var n=l({unit:"px",x:0,y:0},e);return e.width&&(n.height=n.width/e.aspect),e.height&&(n.width=n.height*e.aspect),n.y+n.height>r&&(n.height=r-n.y,n.width=n.height*e.aspect),n.x+n.width>t&&(n.width=t-n.x,n.height=n.width/e.aspect),n}function O(e,t,r){return"%"===e.unit?e:{unit:"%",aspect:e.aspect,x:e.x/t*100,y:e.y/r*100,width:e.width/t*100,height:e.height/r*100}}function x(e,t,r){return e.unit?"px"===e.unit?e:{unit:"px",aspect:e.aspect,x:e.x*t/100,y:e.y*r/100,width:e.width*t/100,height:e.height*r/100}:l({},e,{unit:"px"})}function S(e,t,r){if(!e)return e;var n=e,o=e.x+e.width>t,a=e.y+e.height>r;return o&&a?n={unit:"px",x:0,y:0,width:t>e.width?e.width:t,height:r>e.height?e.height:r}:o?n=l({},e,{x:0,width:t>e.width?e.width:t}):a&&(n=l({},e,{y:0,height:r>e.height?e.height:r})),n.aspect&&function(e,t,r){return!!(!e.width&&e.height||e.width&&!e.height)||e.y+e.height>r||e.x+e.width>t||e.width/e.aspect<e.height-1||e.width/e.aspect>e.height+1||e.height*e.aspect<e.width-1||e.height*e.aspect>e.width+1}(n,t,r)?C(n,t,r):n}function D(e,t,r,n){var o=x(t,r,n),a=x(e,r,n),i=l({},o);if(!o.aspect)return o.x<0?(i.x=0,i.width+=o.x):o.x+o.width>r&&(i.width=r-o.x),o.y+o.height>n&&(i.height=n-o.y),i;var c=!1;o.x<0?(i.x=0,i.width+=o.x,i.height=i.width/o.aspect,c=!0):o.x+o.width>r&&(i.width=r-o.x,i.height=i.width/o.aspect,c=!0),c&&a.y>i.y&&(i.y=o.y+(o.height-i.height));var s=!1;return i.y+i.height>n&&(i.height=n-o.y,i.width=i.height*o.aspect,s=!0),s&&a.x>i.x&&(i.x=o.x+(o.width-i.width)),i}var E=function(e){function t(){var e,r,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=(e=p(t)).call.apply(e,[this].concat(a)),r=!n||"object"!==s(n)&&"function"!=typeof n?h(this):n,v(h(r),"window","undefined"!=typeof window?window:{}),v(h(r),"document","undefined"!=typeof document?document:{}),v(h(r),"state",{}),v(h(r),"onCropMouseTouchDown",(function(e){var t=r.props,n=t.crop,o=t.disabled,a=r.mediaDimensions,i=x(n,a.width,a.height);if(!o){e.preventDefault();var c=g(e);r.componentRef.setActive?r.componentRef.setActive({preventScroll:!0}):r.componentRef.focus({preventScroll:!0});var s,u=e.target.dataset.ord,p="nw"===u||"w"===u||"sw"===u,h="nw"===u||"n"===u||"ne"===u;i.aspect&&(s=r.getElementOffset(r.cropSelectRef)),r.evData={clientStartX:c.x,clientStartY:c.y,cropStartWidth:i.width,cropStartHeight:i.height,cropStartX:p?i.x+i.width:i.x,cropStartY:h?i.y+i.height:i.y,xInversed:p,yInversed:h,xCrossOver:p,yCrossOver:h,startXCrossOver:p,startYCrossOver:h,isResize:e.target.dataset.ord,ord:u,cropOffset:s},r.mouseDownOnCrop=!0,r.setState({cropIsActive:!0})}})),v(h(r),"onComponentMouseTouchDown",(function(e){var t=r.props,n=t.crop,o=t.disabled,a=t.locked,i=t.keepSelection,c=t.onChange,s=r.mediaWrapperRef.firstChild;if(e.target===s&&s.contains(e.target)&&!(o||a||i&&y(n))){e.preventDefault();var u=g(e);r.componentRef.setActive?r.componentRef.setActive({preventScroll:!0}):r.componentRef.focus({preventScroll:!0});var p=r.getElementOffset(r.mediaWrapperRef),h=u.x-p.left,d=u.y-p.top,f={unit:"px",aspect:n?n.aspect:void 0,x:h,y:d,width:0,height:0};r.evData={clientStartX:u.x,clientStartY:u.y,cropStartWidth:f.width,cropStartHeight:f.height,cropStartX:f.x,cropStartY:f.y,xInversed:!1,yInversed:!1,xCrossOver:!1,yCrossOver:!1,startXCrossOver:!1,startYCrossOver:!1,isResize:!0,ord:"nw"},r.mouseDownOnCrop=!0;var l=r.mediaDimensions,v=l.width,m=l.height;c(x(f,v,m),O(f,v,m)),r.setState({cropIsActive:!0,newCropIsBeingDrawn:!0})}})),v(h(r),"onDocMouseTouchMove",(function(e){var t=r.props,n=t.crop,o=t.disabled,a=t.onChange,i=t.onDragStart;if(!o&&r.mouseDownOnCrop){e.preventDefault(),r.dragStarted||(r.dragStarted=!0,i(e));var c,s=h(r).evData,u=g(e);if(s.isResize&&n.aspect&&s.cropOffset&&(u.y=r.straightenYPath(u.x)),s.xDiff=u.x-s.clientStartX,s.yDiff=u.y-s.clientStartY,(c=s.isResize?r.resizeCrop():r.dragCrop())!==n){var p=r.mediaDimensions,d=p.width,f=p.height;a(x(c,d,f),O(c,d,f))}}})),v(h(r),"onComponentKeyDown",(function(e){var n=r.props,o=n.crop,a=n.disabled,i=n.onChange,c=n.onComplete;if(!a){var s=e.key,u=!1;if(y(o)){var p=r.makeNewCrop(),h=e.shiftKey?t.nudgeStepLarge:t.nudgeStep;if("ArrowLeft"===s?(p.x-=h,u=!0):"ArrowRight"===s?(p.x+=h,u=!0):"ArrowUp"===s?(p.y-=h,u=!0):"ArrowDown"===s&&(p.y+=h,u=!0),u){e.preventDefault();var d=r.mediaDimensions,f=d.width,l=d.height;p.x=w(p.x,0,f-p.width),p.y=w(p.y,0,l-p.height);var v=x(p,f,l),m=O(p,f,l);i(v,m),c(v,m)}}}})),v(h(r),"onDocMouseTouchEnd",(function(e){var t=r.props,n=t.crop,o=t.disabled,a=t.onComplete,i=t.onDragEnd;if(!o&&r.mouseDownOnCrop){r.mouseDownOnCrop=!1,r.dragStarted=!1;var c=r.mediaDimensions,s=c.width,u=c.height;i(e),a(x(n,s,u),O(n,s,u)),r.setState({cropIsActive:!1,newCropIsBeingDrawn:!1})}})),v(h(r),"onMediaLoaded",(function(){var e=r.props,t=e.onComplete,n=e.onChange,o=r.createNewCrop(),a=o.pixelCrop,i=o.percentCrop;n(a,i),t(a,i)})),r}var r,n;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),r=t,(n=[{key:"componentDidMount",value:function(){if(this.document.addEventListener){var e=!!m&&{passive:!1};this.document.addEventListener("mousemove",this.onDocMouseTouchMove,e),this.document.addEventListener("touchmove",this.onDocMouseTouchMove,e),this.document.addEventListener("mouseup",this.onDocMouseTouchEnd,e),this.document.addEventListener("touchend",this.onDocMouseTouchEnd,e),this.document.addEventListener("touchcancel",this.onDocMouseTouchEnd,e),this.componentRef.addEventListener("medialoaded",this.onMediaLoaded)}}},{key:"componentWillUnmount",value:function(){this.document.removeEventListener&&(this.document.removeEventListener("mousemove",this.onDocMouseTouchMove),this.document.removeEventListener("touchmove",this.onDocMouseTouchMove),this.document.removeEventListener("mouseup",this.onDocMouseTouchEnd),this.document.removeEventListener("touchend",this.onDocMouseTouchEnd),this.document.removeEventListener("touchcancel",this.onDocMouseTouchEnd),this.componentRef.removeEventListener("medialoaded",this.onMediaLoaded))}},{key:"componentDidUpdate",value:function(e){if(e.crop!==this.props.crop&&this.imageRef){var t=this.imageRef,r=t.width,n=t.height,o=this.makeNewCrop(),a=S(o,r,n);if(o!==a){var i=x(a,r,n),c=O(a,r,n);this.props.onChange(i,c),this.props.onComplete(i,c)}}}},{key:"createNewCrop",value:function(){var e=this.mediaDimensions,t=e.width,r=e.height,n=S(this.makeNewCrop(),t,r);return{pixelCrop:x(n,t,r),percentCrop:O(n,t,r)}}},{key:"onImageLoad",value:function(e){var t=this.props,r=t.onComplete,n=t.onChange;if(!1!==(0,t.onImageLoaded)(e)){var o=this.createNewCrop(),a=o.pixelCrop,i=o.percentCrop;n(a,i),r(a,i)}}},{key:"getDocumentOffset",value:function(){var e=this.document.documentElement||{},t=e.clientTop,r=void 0===t?0:t,n=e.clientLeft;return{clientTop:r,clientLeft:void 0===n?0:n}}},{key:"getWindowOffset",value:function(){var e=this.window,t=e.pageYOffset,r=void 0===t?0:t,n=e.pageXOffset;return{pageYOffset:r,pageXOffset:void 0===n?0:n}}},{key:"getElementOffset",value:function(e){var t=e.getBoundingClientRect(),r=this.getDocumentOffset(),n=this.getWindowOffset();return{top:t.top+n.pageYOffset-r.clientTop,left:t.left+n.pageXOffset-r.clientLeft}}},{key:"getCropStyle",value:function(){var e=this.makeNewCrop(this.props.crop?this.props.crop.unit:"px");return{top:"".concat(e.y).concat(e.unit),left:"".concat(e.x).concat(e.unit),width:"".concat(e.width).concat(e.unit),height:"".concat(e.height).concat(e.unit)}}},{key:"getNewSize",value:function(){var e,t=this.props,r=t.crop,n=t.minWidth,o=t.maxWidth,a=t.minHeight,i=t.maxHeight,c=this.evData,s=this.mediaDimensions,u=s.width,p=s.height,h=c.cropStartWidth+c.xDiff;return c.xCrossOver&&(h=Math.abs(h)),h=w(h,n,o||u),e=r.aspect?h/r.aspect:c.cropStartHeight+c.yDiff,c.yCrossOver&&(e=Math.min(Math.abs(e),c.cropStartY)),e=w(e,a,i||p),r.aspect&&(h=w(e*r.aspect,0,u)),{width:h,height:e}}},{key:"dragCrop",value:function(){var e=this.makeNewCrop(),t=this.evData,r=this.mediaDimensions,n=r.width,o=r.height;return e.x=w(t.cropStartX+t.xDiff,0,n-e.width),e.y=w(t.cropStartY+t.yDiff,0,o-e.height),e}},{key:"resizeCrop",value:function(){var e=this.evData,r=this.makeNewCrop(),n=e.ord;e.xInversed&&(e.xDiff-=2*e.cropStartWidth,e.xDiffPc-=2*e.cropStartWidth),e.yInversed&&(e.yDiff-=2*e.cropStartHeight,e.yDiffPc-=2*e.cropStartHeight);var o=this.getNewSize(),a=e.cropStartX,i=e.cropStartY;e.xCrossOver&&(a=r.x+(r.width-o.width)),e.yCrossOver&&(i=!1===e.lastYCrossover?r.y-o.height:r.y+(r.height-o.height));var c=this.mediaDimensions,s=c.width,u=c.height,p=D(this.props.crop,{unit:r.unit,x:a,y:i,width:o.width,height:o.height,aspect:r.aspect},s,u);return r.aspect||t.xyOrds.indexOf(n)>-1?(r.x=p.x,r.y=p.y,r.width=p.width,r.height=p.height):t.xOrds.indexOf(n)>-1?(r.x=p.x,r.width=p.width):t.yOrds.indexOf(n)>-1&&(r.y=p.y,r.height=p.height),e.lastYCrossover=e.yCrossOver,this.crossOverCheck(),r}},{key:"straightenYPath",value:function(e){var t,r,n=this.evData,o=n.ord,a=n.cropOffset,i=n.cropStartWidth,c=n.cropStartHeight;return"nw"===o||"se"===o?(t=c/i,r=a.top-a.left*t):(t=-c/i,r=a.top+(c-a.left*t)),t*e+r}},{key:"createCropSelection",value:function(){var e=this,t=this.props,r=t.disabled,n=t.locked,a=t.renderSelectionAddon,i=t.ruleOfThirds,c=this.getCropStyle();return o.a.createElement("div",{ref:function(t){return e.cropSelectRef=t},style:c,className:"ReactCrop__crop-selection",onMouseDown:this.onCropMouseTouchDown,onTouchStart:this.onCropMouseTouchDown,tabIndex:"0"},!r&&!n&&o.a.createElement("div",{className:"ReactCrop__drag-elements"},o.a.createElement("div",{className:"ReactCrop__drag-bar ord-n","data-ord":"n"}),o.a.createElement("div",{className:"ReactCrop__drag-bar ord-e","data-ord":"e"}),o.a.createElement("div",{className:"ReactCrop__drag-bar ord-s","data-ord":"s"}),o.a.createElement("div",{className:"ReactCrop__drag-bar ord-w","data-ord":"w"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-nw","data-ord":"nw"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-n","data-ord":"n"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-ne","data-ord":"ne"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-e","data-ord":"e"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-se","data-ord":"se"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-s","data-ord":"s"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-sw","data-ord":"sw"}),o.a.createElement("div",{className:"ReactCrop__drag-handle ord-w","data-ord":"w"})),a&&o.a.createElement("div",{className:"ReactCrop__selection-addon",onMouseDown:function(e){return e.stopPropagation()}},a(this.state)),i&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"ReactCrop__rule-of-thirds-hz"}),o.a.createElement("div",{className:"ReactCrop__rule-of-thirds-vt"})))}},{key:"makeNewCrop",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"px",r=l({},t.defaultCrop,{},this.props.crop),n=this.mediaDimensions,o=n.width,a=n.height;return"px"===e?x(r,o,a):O(r,o,a)}},{key:"crossOverCheck",value:function(){var e=this.evData,t=this.props,r=t.minWidth,n=t.minHeight;!r&&(!e.xCrossOver&&-Math.abs(e.cropStartWidth)-e.xDiff>=0||e.xCrossOver&&-Math.abs(e.cropStartWidth)-e.xDiff<=0)&&(e.xCrossOver=!e.xCrossOver),!n&&(!e.yCrossOver&&-Math.abs(e.cropStartHeight)-e.yDiff>=0||e.yCrossOver&&-Math.abs(e.cropStartHeight)-e.yDiff<=0)&&(e.yCrossOver=!e.yCrossOver);var o=e.xCrossOver!==e.startXCrossOver,a=e.yCrossOver!==e.startYCrossOver;e.inversedXOrd=!!o&&b(e.ord),e.inversedYOrd=!!a&&b(e.ord)}},{key:"render",value:function(){var e=this,t=this.props,r=t.children,n=t.circularCrop,a=t.className,i=t.crossorigin,s=t.crop,u=t.disabled,p=t.locked,h=t.imageAlt,d=t.onImageError,f=t.renderComponent,l=t.src,v=t.style,m=t.imageStyle,g=t.ruleOfThirds,w=this.state,b=w.cropIsActive,C=w.newCropIsBeingDrawn,O=y(s)&&this.componentRef?this.createCropSelection():null,x=function(){for(var e,t=0,r="";t<arguments.length;)(e=c(arguments[t++]))&&(r&&(r+=" "),r+=e);return r}("ReactCrop",a,{"ReactCrop--active":b,"ReactCrop--disabled":u,"ReactCrop--locked":p,"ReactCrop--new-crop":C,"ReactCrop--fixed-aspect":s&&s.aspect,"ReactCrop--crop-invisible":s&&b&&(!s.width||!s.height),"ReactCrop--circular-crop":s&&n,"ReactCrop--rule-of-thirds":s&&g});return o.a.createElement("div",{ref:function(t){e.componentRef=t},className:x,style:v,onTouchStart:this.onComponentMouseTouchDown,onMouseDown:this.onComponentMouseTouchDown,tabIndex:"0",onKeyDown:this.onComponentKeyDown},o.a.createElement("div",{ref:function(t){e.mediaWrapperRef=t}},f||o.a.createElement("img",{ref:function(t){return e.imageRef=t},crossOrigin:i,className:"ReactCrop__image",style:m,src:l,onLoad:function(t){return e.onImageLoad(t.target)},onError:d,alt:h})),r,O)}},{key:"mediaDimensions",get:function(){var e=this.mediaWrapperRef;return{width:e.clientWidth,height:e.clientHeight}}}])&&u(r.prototype,n),t}(n.PureComponent);E.xOrds=["e","w"],E.yOrds=["n","s"],E.xyOrds=["nw","ne","se","sw"],E.nudgeStep=.2,E.nudgeStepLarge=2,E.defaultCrop={x:0,y:0,width:0,height:0,unit:"px"},E.propTypes={className:i.a.string,children:i.a.oneOfType([i.a.arrayOf(i.a.node),i.a.node]),circularCrop:i.a.bool,crop:i.a.shape({aspect:i.a.number,x:i.a.number,y:i.a.number,width:i.a.number,height:i.a.number,unit:i.a.oneOf(["px","%"])}),crossorigin:i.a.string,disabled:i.a.bool,locked:i.a.bool,imageAlt:i.a.string,imageStyle:i.a.shape({}),keepSelection:i.a.bool,minWidth:i.a.number,minHeight:i.a.number,maxWidth:i.a.number,maxHeight:i.a.number,onChange:i.a.func.isRequired,onImageError:i.a.func,onComplete:i.a.func,onImageLoaded:i.a.func,onDragStart:i.a.func,onDragEnd:i.a.func,src:i.a.string.isRequired,style:i.a.shape({}),renderComponent:i.a.node,renderSelectionAddon:i.a.func,ruleOfThirds:i.a.bool},E.defaultProps={circularCrop:!1,className:void 0,crop:void 0,crossorigin:void 0,disabled:!1,locked:!1,imageAlt:"",maxWidth:void 0,maxHeight:void 0,minWidth:0,minHeight:0,keepSelection:!1,onComplete:function(){},onImageError:function(){},onImageLoaded:function(){},onDragStart:function(){},onDragEnd:function(){},children:void 0,style:void 0,renderComponent:void 0,imageStyle:void 0,renderSelectionAddon:void 0,ruleOfThirds:!1}}]))},uGE4:function(e,t,r){"use strict";var n=r("eVuF"),o=r.n(n),a=r("ln6h"),i=r.n(a),c=r("O40h"),s=r("vDqi"),u=r.n(s),p=r("obyI"),h=r("cph9"),d=u.a.create({baseURL:p.c+"/api"});d.interceptors.request.use(function(){var e=Object(c.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.a)();case 2:return r=Object(h.b)("ACCESS_TOKEN"),t.headers.Authorization=void 0==r?Object(h.d)():r,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());t.a={updateUserProfile:function(e,t,r,n){return function(a){return new o.a(function(){var o=Object(c.a)(i.a.mark((function o(c,s){var u;return i.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,d.post("/v1/user",{username:e,dob:t,gender:r,location:n});case 3:0===(u=o.sent).data.status.code?(a({type:"UPDATE_PROFILE",status:u.data.status}),c(u)):s(u),o.next=10;break;case 7:o.prev=7,o.t0=o.catch(0),s(o.t0);case 10:case"end":return o.stop()}}),o,null,[[0,7]])})));return function(e,t){return o.apply(this,arguments)}}())}},getUserData:function(){return function(e){return new o.a(function(){var t=Object(c.a)(i.a.mark((function t(r,n){var o;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.get("/v2/user");case 3:200===(o=t.sent).status&&0===o.data.status.code?(e({type:"USER_DATA",data:o.data.data,meta:o.data.meta}),r(o)):n(o),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,r){return t.apply(this,arguments)}}())}},getInterests:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"active";return function(t){return new o.a(function(){var r=Object(c.a)(i.a.mark((function r(n,o){var a;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d.get("/v1/genre?status=".concat(e));case 3:0===(a=r.sent).data.status.code?(t({type:"INTERESTS",data:a.data.data,meta:a.data.meta,status:a.data.status}),n(a)):o(a),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),o(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(e,t){return r.apply(this,arguments)}}())}},checkUser:function(e){return function(t){return new o.a(function(){var r=Object(c.a)(i.a.mark((function r(n,o){var a;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d.get("/v2/user/exist?username=".concat(e));case 3:a=r.sent,t({type:"CHECK_USER",status:a.data.status}),n(a),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),o(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e,t){return r.apply(this,arguments)}}())}},setInterest:function(e){return function(t){return new o.a(function(){var t=Object(c.a)(i.a.mark((function t(r,n){var o;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.post("/v2/interest",{interest:e});case 3:o=t.sent,r(o),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,r){return t.apply(this,arguments)}}())}},setUserProfile:function(e,t,r,n,o,a,i,c){return function(s){return s({type:"SET_PROFILE",nickname:e,fullname:t,dob:r,gender:n,phone_number:o,email:a,otp:i,location:c})}},setValue:function(e,t){return function(r){return r({type:"SET_VALUE",index:e,value:t})}},updateUserData:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(n){return new o.a(function(){var n=Object(c.a)(i.a.mark((function n(o,a){var c,s;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,(c={})[e]=t,r&&(c.otp=r),n.next=6,d.post("/v2/user",c);case 6:200===(s=n.sent).status&&0===s.data.status.code?o(s):a(s),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),a(n.t0);case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e,t){return n.apply(this,arguments)}}())}},setUserProfilePhoto:function(e){return function(t){return t({type:"SET_PROFILE_PHOTO_SRC",src:e})}},uploadProfilePhoto:function(e){var t=new FormData;return t.append("photo",e),function(e){return new o.a(function(){var e=Object(c.a)(i.a.mark((function e(r,n){var o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.post("/v1/user/photo",t,{headers:{"Content-Type":"multipart/form-data"}});case 3:200===(o=e.sent).status&&0===o.data.status.code?r(o):n(o),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}())}},verify:function(e){var t=e.nickname,r=e.password;return function(e){return new o.a(function(){var e=Object(c.a)(i.a.mark((function e(n,o){var a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={},t&&(a.nickname=t),r&&(a.password=r),e.next=6,d.post("/v2/verify",a);case 6:200===(c=e.sent).status&&0===c.data.status.code?n(c):o(c),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),o(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,r){return e.apply(this,arguments)}}())}},setChangePasswordData:function(e,t,r){return function(n){return n({type:"SET_CHANGE_PASSWORD_DATA",change_password:{current_password:e,new_password:t,re_password:r}})}},changePassword:function(e,t,r){return function(n){return new o.a(function(){var n=Object(c.a)(i.a.mark((function n(o,a){var c;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,d.post("/v2/change-password",{password:e,repassword:t,otp:r});case 3:200===(c=n.sent).status&&0===c.data.status.code?o(c):a(c),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),a(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(e,t){return n.apply(this,arguments)}}())}},getUserInterest:function(){return function(e){return new o.a(function(){var e=Object(c.a)(i.a.mark((function e(t,r){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.get("/v2/user/interest");case 3:200===(n=e.sent).status&&0===n.data.status.code?t(n):r(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),r(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}())}},contactUs:function(e){var t=e.name,r=e.phone,n=e.email,a=e.comment;return function(e){return new o.a(function(){var e=Object(c.a)(i.a.mark((function e(o,c){var s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.post("/v1/contactus",{name:t,phone:r,email:n,comment:a});case 3:200===(s=e.sent).status&&0===s.data.status.code?o(s):c(s),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),c(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}())}}}}},[["alfg",1,0,2]]]);