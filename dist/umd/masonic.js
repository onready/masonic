!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Masonic={},t.React)}(this,(function(t,e){"use strict";function n(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:1,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}function r(){return(r=Object.assign||function(t){for(var e=1;arguments.length>e;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e,n,r){var i=st(n),o=st(r);at((function(){function n(){if(!u){for(var t=arguments.length,e=new Array(t),n=0;t>n;n++)e[n]=arguments[n];i.current.apply(this,e)}}var r=t&&"current"in t?t.current:t;if(r){var u=0;r.addEventListener(e,n);var s=o.current;return function(){u=1,r.removeEventListener(e,n),s&&s()}}}),[t,e])}function o(t,n,r){function i(){s.current=0,a()}void 0===n&&(n=30),void 0===r&&(r=0);var o=st(t),u=1e3/n,s=e.useRef(0),c=e.useRef(),a=function(){return c.current&&clearTimeout(c.current)},f=[n,r,o];return e.useEffect((function(){return i}),f),e.useCallback((function(){var t=arguments,e=vt(),n=function(){s.current=e,a(),o.current.apply(null,t)},i=s.current;if(r&&0===i)return n();if(e-i>u){if(i>0)return n();s.current=e}a(),c.current=setTimeout((function(){n(),s.current=0}),u)}),f)}function u(t,n){function r(){a(0)}void 0===t&&(t=0),void 0===n&&(n=12);var u=function(t){void 0===t&&(t=30);var n=function(t,n){var r=e.useState(t);return[r[0],o(r[1],n,1)]}("undefined"==typeof window?0:mt,t);return i(pt,"scroll",(function(){return n[1](mt())})),n[0]}(n),s=e.useState(0),c=s[0],a=s[1],f=e.useRef(0);return e.useEffect((function(){1===f.current&&a(1);var t,e,i,o,u=(t=r,e=40+1e3/n,i=wt(),(o={}).v=Rt((function n(){wt()-i<e?o.v=Rt(n):t.call(null)})),o);return f.current=1,function(){return function(t){Ct(t.v||-1)}(u)}}),[n,u]),{scrollTop:Math.max(0,u-t),isScrolling:c}}function s(){var t=e.useState(St)[1];return e.useRef((function(){return t({})})).current}function c(t){var n=t.positioner,i=t.resizeObserver,o=t.items,u=t.as,c=void 0===u?"div":u,f=t.id,h=t.className,d=t.style,l=t.role,v=void 0===l?"grid":l,p=t.tabIndex,m=void 0===p?0:p,g=t.containerRef,y=t.itemAs,b=void 0===y?"div":y,w=t.itemStyle,_=t.itemHeightEstimate,P=void 0===_?300:_,x=t.itemKey,R=void 0===x?a:x,C=t.overscanBy,M=void 0===C?2:C,E=t.scrollTop,L=t.isScrolling,O=t.height,T=t.render,z=t.onRender,A=0,S=void 0,j=s(),k=Gt(n,i),I=o.length,W=n.columnWidth,H=n.columnCount,D=n.range,B=n.estimateHeight,G=n.size,q=n.shortestColumn,F=G(),N=q(),V=[],Y=v+"item",K=st(z),J=E+(M*=O),Q=J>N&&I>F;if(D(Math.max(0,E-M/2),J,(function(t,e,n){var i=o[t],u=R(i,t),s={top:n,left:e,width:W,writingMode:"horizontal-tb",position:"absolute"};V.push(jt(b,{key:u,ref:k(t),role:Y,style:"object"==typeof w&&null!==w?r({},s,w):s},It(T,t,i,W))),void 0===S?(A=t,S=t):(A=Math.min(A,t),S=Math.max(S,t))})),Q)for(var U=Math.min(I-F,Math.ceil((E+M-N)/P*H)),X=F,Z=Bt(W);F+U>X;X++){var $=o[X],tt=R($,X);V.push(jt(b,{key:tt,ref:k(X),role:Y,style:"object"==typeof w?r({},Z,w):Z},It(T,X,$,W)))}e.useEffect((function(){"function"==typeof K.current&&void 0!==S&&K.current(A,S,o),kt="1"}),[A,S,o,K]),e.useEffect((function(){Q&&j()}),[Q]);var et=Wt(L,B(I,P));return jt(c,{ref:g,key:kt,id:f,role:v,className:h,tabIndex:m,style:"object"==typeof d?Dt(et,d):et,children:V})}function a(t,e){return e}function f(t){var e=u(t.offset,t.scrollFps);return c({scrollTop:e.scrollTop,isScrolling:e.isScrolling,positioner:t.positioner,resizeObserver:t.resizeObserver,items:t.items,onRender:t.onRender,as:t.as,id:t.id,className:t.className,style:t.style,role:t.role,tabIndex:t.tabIndex,containerRef:t.containerRef,itemAs:t.itemAs,itemStyle:t.itemStyle,itemHeightEstimate:t.itemHeightEstimate,itemKey:t.itemKey,overscanBy:t.overscanBy,height:t.height,render:t.render})}function h(t,n){void 0===n&&(n=qt);var r=e.useState({offset:0,width:0}),i=r[0],o=r[1];return at((function(){var e=t.current;if(null!==e){var n=0,r=e;do{n+=r.offsetTop||0,r=r.offsetParent}while(r);n===i.offset&&e.offsetWidth===i.width||o({offset:n,width:e.offsetWidth})}}),n),i}function d(t,e){var n=-1;return t.some((function(t,r){return t[0]===e?(n=r,1):0})),n}function l(){this.__entries__=[]}function v(){return this.__entries__.length}function p(t){var e=d(this.__entries__,t),n=this.__entries__[e];return n&&n[1]}function m(t,e){var n=d(this.__entries__,t);~n?this.__entries__[n][1]=e:this.__entries__.push([t,e])}function g(t){var e=this.__entries__,n=d(e,t);~n&&e.splice(n,1)}function y(t){return!!~d(this.__entries__,t)}function b(){this.__entries__.splice(0)}function w(t,e){void 0===e&&(e=null);for(var n=0,r=this.__entries__;n<r.length;n++){var i=r[n];t.call(e,i[1],i[0])}}function _(t){return setTimeout((function(){return t(Date.now())}),1e3/60)}function P(){this.connected_=0,this.mutationEventsAdded_=0,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t){function e(){i&&(i=0,t()),o&&r()}function n(){Yt(e)}function r(){var t=Date.now();if(i){if(2>t-u)return;o=1}else i=1,o=0,setTimeout(n,20);u=t}var i=0,o=0,u=0;return r}(this.refresh.bind(this))}function x(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()}function R(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()}function C(){this.updateObservers_()&&this.refresh()}function M(t){return t.gatherActive(),t.hasActive()}function E(t){return t.broadcastActive()}function L(){var t=this.observers_.filter(M);return t.forEach(E),t.length>0}function O(){Nt&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),Jt?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:1,childList:1,characterData:1,subtree:1})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=1),this.connected_=1)}function T(){Nt&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=0,this.connected_=0)}function z(t){var e=t.propertyName,n=void 0===e?"":e;Kt.some((function(t){return!!~n.indexOf(t)}))&&this.refresh()}function A(){return this.instance_||(this.instance_=new P),this.instance_}function S(t){return parseFloat(t)||0}function j(t){for(var e=[],n=1;arguments.length>n;n++)e[n-1]=arguments[n];return e.reduce((function(e,n){return e+S(t["border-"+n+"-width"])}),0)}function k(t){return t instanceof Xt(t).SVGGraphicsElement}function I(t){return t instanceof Xt(t).SVGElement&&"function"==typeof t.getBBox}function W(t){return Nt?$t(t)?function(t){var e=t.getBBox();return H(0,0,e.width,e.height)}(t):function(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return Zt;var r=Xt(t).getComputedStyle(t),i=function(t){for(var e={},n=0,r=["top","right","bottom","left"];r.length>n;n++){var i=r[n],o=t["padding-"+i];e[i]=S(o)}return e}(r),o=i.left+i.right,u=i.top+i.bottom,s=S(r.width),c=S(r.height);if("border-box"===r.boxSizing&&(Math.round(s+o)!==e&&(s-=j(r,"left","right")+o),Math.round(c+u)!==n&&(c-=j(r,"top","bottom")+u)),!function(t){return t===Xt(t).document.documentElement}(t)){var a=Math.round(s+o)-e,f=Math.round(c+u)-n;1!==Math.abs(a)&&(s-=a),1!==Math.abs(f)&&(c-=f)}return H(i.left,i.top,s,c)}(t):Zt}function H(t,e,n,r){return{x:t,y:e,width:n,height:r}}function D(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=H(0,0,0,0),this.target=t}function B(){var t=W(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight}function G(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t}function q(t,e){var n,r,i,o,u,s,c,a=(r=(n=e).x,i=n.y,o=n.width,u=n.height,s="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(s.prototype),Ut(c,{x:r,y:i,width:o,height:u,top:i,right:r+o,bottom:u+i,left:r}),c);Ut(this,{target:t,contentRect:a})}function F(t,e,n){if(this.activeObservations_=[],this.observations_=new Ft,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}function N(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Xt(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new te(t)),this.controller_.addObserver(this),this.controller_.refresh())}}function V(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Xt(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}}function Y(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)}function K(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))}function J(t){return new ee(t.target,t.broadcastRect())}function Q(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map(J);this.callback_.call(t,e,t),this.clearActive()}}function U(){this.activeObservations_.splice(0)}function X(){return this.activeObservations_.length>0}function Z(t){function n(){return i.disconnect()}var r=s(),i=ue(t,r);return e.useEffect((function(){return n}),[i]),i}function $(t){var e=t.high;t.L===se&&t.R===se?t.max=e:t.L===se?t.max=Math.max(t.R.max,e):t.R===se?t.max=Math.max(t.L.max,e):t.max=Math.max(Math.max(t.L.max,t.R.max),e)}function tt(t){for(var e=t;e.P!==se;)$(e.P),e=e.P}function et(t,e){if(e.R!==se){var n=e.R;e.R=n.L,n.L!==se&&(n.L.P=e),n.P=e.P,e.P===se?t.root=n:e===e.P.L?e.P.L=n:e.P.R=n,n.L=e,e.P=n,$(e),$(n)}}function nt(t,e){if(e.L!==se){var n=e.L;e.L=n.R,n.R!==se&&(n.R.P=e),n.P=e.P,e.P===se?t.root=n:e===e.P.R?e.P.R=n:e.P.L=n,n.R=e,e.P=n,$(e),$(n)}}function rt(t,e,n){e.P===se?t.root=n:e===e.P.L?e.P.L=n:e.P.R=n,n.P=e.P}function it(t,n){var r=t.width,i=t.columnWidth,o=void 0===i?200:i,u=t.columnGutter,s=void 0===u?0:u,c=t.columnCount;void 0===n&&(n=he);var a=function(){var t=fe(r,o,s,c),e=t[0],n=t[1];return ce(n,e,s)},f=e.useState(a),h=f[0],d=f[1],l=e.useRef(0);return at((function(){l.current&&d(a()),l.current=1}),n),at((function(){if(l.current){for(var t=h.size(),e=a(),n=0;t>n;n++){var r=h.get(n);e.set(n,void 0!==r?r.height:0)}d(e)}}),[r,o,s,c]),h}function ot(t,n){var r,u=n.align,s=void 0===u?"top":u,c=n.element,a=void 0===c?"undefined"!=typeof window&&window:c,f=n.offset,h=void 0===f?0:f,d=n.height,l=void 0===d?"undefined"!=typeof window?window.innerHeight:0:d,v=st({positioner:t,element:a,align:s,offset:h,height:l}),p=e.useRef((function(){var t=v.current.element;return t&&"current"in t?t.current:t})).current,m=e.useReducer((function(t,e){var n,r={position:t.position,index:t.index,prevTop:t.prevTop};if("scrollToIndex"===e.type)return{position:v.current.positioner.get(null!==(n=e.value)&&void 0!==n?n:-1),index:e.value,prevTop:void 0};if("setPosition"===e.type)r.position=e.value;else if("setPrevTop"===e.type)r.prevTop=e.value;else if("reset"===e.type)return de;return r}),de),g=m[0],y=m[1],b=o(y,15);i(p(),"scroll",(function(){if(!g.position&&g.index){var t=v.current.positioner.get(g.index);t&&y({type:"setPosition",value:t})}}));var w=void 0!==g.index&&(null===(r=v.current.positioner.get(g.index))||void 0===r?void 0:r.top);return e.useEffect((function(){var t=p();if(t){var e=v.current,n=e.height,r=e.align,i=e.offset,o=e.positioner;if(g.position){var u=g.position.top;"bottom"===r?u=u-n+g.position.height:"center"===r&&(u-=(n-g.position.height)/2),t.scrollTo(0,Math.max(0,u+=i));var s=0,c=setTimeout((function(){return!s&&y({type:"reset"})}),400);return function(){s=1,clearTimeout(c)}}if(void 0!==g.index){var a=o.shortestColumn()/o.size()*g.index;g.prevTop&&(a=Math.max(a,g.prevTop+n)),t.scrollTo(0,a),b({type:"setPrevTop",value:a})}}}),[w,g,v,p,b]),e.useRef((function(t){y({type:"scrollToIndex",value:t})})).current}function ut(t){var n=e.useRef(null),o=function(t){void 0===t&&(t=ft);var n=t,r=n.wait,o=n.leading,u=n.initialWidth,s=void 0===u?0:u,c=n.initialHeight,a=function(t,n,r){var i=e.useState(t);return[i[0],ct(i[1],n,r)]}("undefined"==typeof document?[s,void 0===c?0:c]:dt,r,o),f=a[0],h=a[1],d=function(){return h(dt)};return i(ht,"resize",d),i(ht,"orientationchange",d),f}({initialWidth:t.ssrWidth,initialHeight:t.ssrHeight}),u=h(n,o),s=r({offset:u.offset,width:u.width||o[0],height:o[1],containerRef:n},t);s.positioner=it(s),s.resizeObserver=Z(s.positioner);var c=ot(s.positioner,{height:s.height,offset:u.offset,align:"object"==typeof t.scrollToIndex?t.scrollToIndex.align:void 0}),a=t.scrollToIndex&&("number"==typeof t.scrollToIndex?t.scrollToIndex:t.scrollToIndex.index);return e.useEffect((function(){void 0!==a&&c(a)}),[a,c]),le(f,s)}var st=function(t){var n=e.useRef(t);return n.current=t,n},ct=function(t,n,r){function i(){s.current&&clearTimeout(s.current),s.current=void 0}function o(){s.current=void 0}void 0===n&&(n=100),void 0===r&&(r=0);var u=st(t),s=e.useRef(),c=[n,r,u];return e.useEffect((function(){return i}),c),e.useCallback((function(){var t=arguments,e=s.current;if(void 0===e&&r)return s.current=setTimeout(o,n),u.current.apply(null,t);e&&clearTimeout(e),s.current=setTimeout((function(){s.current=void 0,u.current.apply(null,t)}),n)}),c)},at=n(e)["undefined"!=typeof document&&void 0!==document.createElement?"useLayoutEffect":"useEffect"],ft={},ht="undefined"==typeof window?null:window,dt=function(){return[document.documentElement.clientWidth,document.documentElement.clientHeight]},lt="undefined"!=typeof performance?performance:Date,vt=function(){return lt.now()},pt="undefined"==typeof window?null:window,mt=function(){return void 0!==pt.scrollY?pt.scrollY:void 0===pt.pageYOffset?0:pt.pageYOffset},gt="undefined",yt=typeof window!==gt?window:{},bt=typeof performance!==gt?performance:Date,wt=function(){return bt.now()},_t="AnimationFrame",Pt="cancel"+_t,xt="request"+_t,Rt=yt[xt]&&yt[xt].bind(yt),Ct=yt[Pt]&&yt[Pt].bind(yt);if(!Rt||!Ct){var Mt=0;Rt=function(t){var e=wt(),n=Math.max(Mt+1e3/60,e);return setTimeout((function(){t(Mt=n)}),n-e)},Ct=function(t){return clearTimeout(t)}}var Et=function(t){try{return new t}catch(t){var e={};return{set:function(t,n){e[t]=n},get:function(t){return e[t]}}}},Lt=function(t,e){var n,r,i,o,u,s,c,a,f,h=(c=(r=t).length,a=Et(r[0]),f=1===c,3>c?{g:function(t){return void 0===(i=a.get(t[0]))||f?i:i.get(t[1])},s:function(t,e){return f?a.set(t[0],e):void 0===(i=a.get(t[0]))?((o=Et(r[1])).set(t[1],e),a.set(t[0],o)):i.set(t[1],e),e}}:{g:function(t){for(s=a,u=0;c>u;u++)if(void 0===(s=s.get(t[u])))return;return s},s:function(t,e){for(s=a,u=0;c-1>u;u++)void 0===(o=s.get(t[u]))?(o=Et(r[u+1]),s.set(t[u],o),s=o):s=o;return s.set(t[c-1],e),e}}),d=h.g,l=h.s;return function(){return void 0===(n=d(arguments))?l(arguments,e.apply(null,arguments)):n}},Ot=function(){var t,e;this.set=void 0,this.get=void 0,this.get=function(n){return n===t?e:void 0},this.set=function(n,r){t=n,e=r}},Tt=function(t,e){var n,r,i=e||zt;return function(){return n&&i(arguments,n)?r:r=t.apply(null,n=arguments)}},zt=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]},At=new Map,St={},jt=e.createElement,kt="0",It=Lt([Ot,{},WeakMap,Ot],(function(t,e,n,r){return jt(t,{index:e,data:n,width:r})})),Wt=Tt((function(t,e){return{position:"relative",width:"100%",maxWidth:"100%",height:Math.ceil(e),maxHeight:Math.ceil(e),willChange:t?"contents":void 0,pointerEvents:t?"none":void 0}})),Ht=function(t,e){return t[0]===e[0]&&t[1]===e[1]},Dt=Tt((function(t,e){return r({},t,e)}),Ht),Bt=Tt((function(t){return{width:t,zIndex:-1e3,visibility:"hidden",position:"absolute",writingMode:"horizontal-tb"}}),(function(t,e){return t[0]===e[0]})),Gt=Tt((function(t,e){return function(n){return function(r){null!==r&&(e&&(e.observe(r),At.set(r,n)),void 0===t.get(n)&&t.set(n,r.offsetHeight))}}}),Ht),qt=[],Ft=function(){return"undefined"!=typeof Map?Map:(Object.defineProperty(l.prototype,"size",{get:v,enumerable:1,configurable:1}),l.prototype.get=p,l.prototype.set=m,l.prototype.delete=g,l.prototype.has=y,l.prototype.clear=b,l.prototype.forEach=w,l)}(),Nt="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,Vt=function(){return"undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")()}(),Yt=function(){return"function"==typeof requestAnimationFrame?requestAnimationFrame.bind(Vt):_}(),Kt=["top","right","bottom","left","width","height","size","weight"],Jt="undefined"!=typeof MutationObserver,Qt=function(){return P.prototype.addObserver=x,P.prototype.removeObserver=R,P.prototype.refresh=C,P.prototype.updateObservers_=L,P.prototype.connect_=O,P.prototype.disconnect_=T,P.prototype.onTransitionEnd_=z,P.getInstance=A,P.instance_=null,P}(),Ut=function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n++){var i=r[n];Object.defineProperty(t,i,{value:e[i],enumerable:0,writable:0,configurable:1})}return t},Xt=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||Vt},Zt=H(0,0,0,0),$t=function(){return"undefined"!=typeof SVGGraphicsElement?k:I}(),te=function(){return D.prototype.isActive=B,D.prototype.broadcastRect=G,D}(),ee=function(){return q}(),ne=function(){return F.prototype.observe=N,F.prototype.unobserve=V,F.prototype.disconnect=Y,F.prototype.gatherActive=K,F.prototype.broadcastActive=Q,F.prototype.clearActive=U,F.prototype.hasActive=X,F}(),re="undefined"!=typeof WeakMap?new WeakMap:new Ft,ie=function(){return function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=Qt.getInstance(),r=new ne(e,n,this);re.set(this,r)}}();["observe","unobserve","disconnect"].forEach((function(t){ie.prototype[t]=function(){var e;return(e=re.get(this))[t].apply(e,arguments)}}));var oe=function(){return void 0!==Vt.ResizeObserver?Vt.ResizeObserver:ie}(),ue=Lt([WeakMap],(function(t,e){return new oe((function(n){for(var r=[],i=0;i<n.length;i++){var o=n[i],u=o.target.offsetHeight;if(u>0){var s=At.get(o.target);if(void 0!==s){var c=t.get(s);void 0!==c&&u!==c.height&&r.push(s,u)}}}r.length>0&&(t.update(r),e(r))}))})),se={low:0,max:0,high:0,C:2,P:void 0,R:void 0,L:void 0,list:void 0};se.P=se,se.L=se,se.R=se;var ce=function(t,e,n){void 0===n&&(n=0);for(var r=function(){var t={root:se,size:0},e={};return{insert:function(n,r,i){for(var o=t.root,u=se;o!==se&&n!==(u=o).low;)o=n<o.low?o.L:o.R;if(n===u.low&&u!==se){if(!function(t,e,n){for(var r,i=t.list;i;){if(i.index===n)return 0;if(e>i.high)break;r=i,i=i.next}return r||(t.list={index:n,high:e,next:i}),r&&(r.next={index:n,high:e,next:r.next}),1}(u,r,i))return;return u.high=Math.max(u.high,r),$(u),tt(u),e[i]=u,void t.size++}var s={low:n,high:r,max:r,C:0,P:u,L:se,R:se,list:{index:i,high:r,next:null}};u===se?t.root=s:(s.low<u.low?u.L=s:u.R=s,tt(s)),function(t,e){for(var n;0===e.P.C;)e.P===e.P.P.L?0===(n=e.P.P.R).C?(e.P.C=1,n.C=1,e.P.P.C=0,e=e.P.P):(e===e.P.R&&et(t,e=e.P),e.P.C=1,e.P.P.C=0,nt(t,e.P.P)):0===(n=e.P.P.L).C?(e.P.C=1,n.C=1,e.P.P.C=0,e=e.P.P):(e===e.P.L&&nt(t,e=e.P),e.P.C=1,e.P.P.C=0,et(t,e.P.P));t.root.C=1}(t,s),e[i]=s,t.size++},remove:function(n){var r=e[n];if(void 0!==r){delete e[n];var i=function(t,e){var n=t.list;if(n.index===e)return null===n.next?0:(t.list=n.next,1);var r=n;for(n=n.next;null!==n;){if(n.index===e)return r.next=n.next,1;r=n,n=n.next}}(r,n);if(void 0!==i){if(1===i)return r.high=r.list.high,$(r),tt(r),void t.size--;var o,u=r,s=u.C;r.L===se?(o=r.R,rt(t,r,r.R)):r.R===se?(o=r.L,rt(t,r,r.L)):(s=(u=function(t){for(;t.L!==se;)t=t.L;return t}(r.R)).C,o=u.R,u.P===r?o.P=u:(rt(t,u,u.R),u.R=r.R,u.R.P=u),rt(t,r,u),u.L=r.L,u.L.P=u,u.C=r.C),$(o),tt(o),1===s&&function(t,e){for(var n;e!==se&&1===e.C;)e===e.P.L?(0===(n=e.P.R).C&&(n.C=1,e.P.C=0,et(t,e.P),n=e.P.R),1===n.L.C&&1===n.R.C?(n.C=0,e=e.P):(1===n.R.C&&(n.L.C=1,n.C=0,nt(t,n),n=e.P.R),n.C=e.P.C,e.P.C=1,n.R.C=1,et(t,e.P),e=t.root)):(0===(n=e.P.L).C&&(n.C=1,e.P.C=0,nt(t,e.P),n=e.P.L),1===n.R.C&&1===n.L.C?(n.C=0,e=e.P):(1===n.L.C&&(n.R.C=1,n.C=0,et(t,n),n=e.P.L),n.C=e.P.C,e.P.C=1,n.L.C=1,nt(t,e.P),e=t.root));e.C=1}(t,o),t.size--}}},search:function(e,n,r){for(var i=[t.root];0!==i.length;){var o=i.pop();if(o!==se&&e<=o.max&&(o.L!==se&&i.push(o.L),o.R!==se&&i.push(o.R),o.low<=n&&o.high>=e))for(var u=o.list;null!==u;)u.high<e||r(u.index,o.low),u=u.next}},get size(){return t.size}}}(),i=new Array(t),o=[],u=new Array(t),s=0;t>s;s++)i[s]=0,u[s]=[];return{columnCount:t,columnWidth:e,set:function(t,s){void 0===s&&(s=0);for(var c=0,a=1;a<i.length;a++)i[a]<i[c]&&(c=a);var f=i[c]||0;i[c]=f+s+n,u[c].push(t),o[t]={left:c*(e+n),top:f,height:s,column:c},r.insert(f,f+s,t)},get:function(t){return o[t]},update:function(e){for(var s=new Array(t),c=0,a=0;c<e.length-1;c++){var f=e[c],h=o[f];h.height=e[++c],r.remove(f),r.insert(h.top,h.top+h.height,f),s[h.column]=void 0===s[h.column]?f:Math.min(f,s[h.column])}for(c=0;c<s.length;c++)if(void 0!==s[c]){var d=u[c],l=ae(d,s[c]),v=u[c][l],p=o[v];for(i[c]=p.top+p.height+n,a=l+1;a<d.length;a++){var m=d[a],g=o[m];g.top=i[c],i[c]=g.top+g.height+n,r.remove(m),r.insert(g.top,g.top+g.height,m)}}},range:function(t,e,n){return r.search(t,e,(function(t,e){return n(t,o[t].left,e)}))},estimateHeight:function(e,n){var o=Math.max(0,Math.max.apply(null,i));return e===r.size?o:o+Math.ceil((e-r.size)/t)*n},shortestColumn:function(){return i.length>1?Math.min.apply(null,i):i[0]||0},size:function(){return r.size}}},ae=function(t,e){for(var n=0,r=t.length-1;r>=n;){var i=n+r>>>1,o=t[i];if(o===e)return i;o>e?r=i-1:n=i+1}return-1},fe=function(t,e,n,r){return void 0===t&&(t=0),void 0===e&&(e=0),void 0===n&&(n=8),r=r||Math.floor(t/(e+n))||1,[Math.floor((t-n*(r-1))/r),r]},he=[],de={index:void 0,position:void 0,prevTop:void 0},le=e.createElement,ve=e.createElement,pe=function(t,e){return void 0!==e[t]},me={};t.List=function(t){return ve(ut,r({role:"list",columnGutter:t.rowGutter,columnCount:1,columnWidth:1},t))},t.Masonry=ut,t.MasonryScroller=f,t.createPositioner=ce,t.createResizeObserver=ue,t.useContainerPosition=h,t.useInfiniteLoader=function(t,n){void 0===n&&(n=me);var r=n,i=r.isItemLoaded,o=r.minimumBatchSize,u=void 0===o?16:o,s=r.threshold,c=void 0===s?16:s,a=r.totalItems,f=void 0===a?9e9:a,h=st(t),d=st(i);return e.useCallback((function(t,e,n){for(var r=function(t,e,n,r,i,o){void 0===t&&(t=pe),void 0===e&&(e=16),void 0===r&&(r=9e9);for(var u,s,c=[],a=i;o>=a;a++)t(a,n)?void 0!==u&&void 0!==s&&(c.push(u,s),u=s=void 0):(s=a,void 0===u&&(u=a));if(void 0!==u&&void 0!==s){var f=Math.min(Math.max(s,u+e-1),r-1);for(a=s+1;f>=a&&!t(a,n);a++)s=a;c.push(u,s)}if(c.length)for(var h=c[0],d=c[1];e>d-h+1&&h>0;){var l=h-1;if(t(l,n))break;c[0]=h=l}return c}(d.current,u,n,f,Math.max(0,t-c),Math.min(f-1,(e||0)+c)),i=0;i<r.length-1;++i)h.current(r[i],r[++i],n)}),[f,u,c,h,d])},t.useMasonry=c,t.usePositioner=it,t.useResizeObserver=Z,t.useScrollToIndex=ot,t.useScroller=u,Object.defineProperty(t,"__esModule",{value:1})}));
//# sourceMappingURL=masonic.js.map