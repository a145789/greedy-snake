(function(n){function e(e){for(var r,u,a=e[0],i=e[1],l=e[2],d=0,b=[];d<a.length;d++)u=a[d],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&b.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r]);f&&f(e);while(b.length)b.shift()();return c.push.apply(c,l||[]),t()}function t(){for(var n,e=0;e<c.length;e++){for(var t=c[e],r=!0,a=1;a<t.length;a++){var i=t[a];0!==o[i]&&(r=!1)}r&&(c.splice(e--,1),n=u(u.s=t[0]))}return n}var r={},o={app:0},c=[];function u(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=n,u.c=r,u.d=function(n,e,t){u.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},u.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},u.t=function(n,e){if(1&e&&(n=u(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)u.d(t,r,function(e){return n[e]}.bind(null,r));return t},u.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return u.d(e,"a",e),e},u.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},u.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var f=i;c.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("56d7")},"56d7":function(n,e,t){"use strict";t.r(e);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("7a23");function o(n,e,t,o,c,u){var a=Object(r["j"])("Main");return Object(r["f"])(),Object(r["c"])(a)}var c={class:"box"},u={class:"container"},a={class:"snake"};function i(n,e,t,o,i,l){return Object(r["f"])(),Object(r["c"])(r["a"],null,[Object(r["d"])("div",c,[Object(r["d"])("ul",u,[(Object(r["f"])(),Object(r["c"])(r["a"],null,Object(r["i"])(400,(function(n){return Object(r["d"])("li",{key:n,class:["point",o.randomNum===n-1?"b-c-0":""]},null,2)})),64))]),Object(r["d"])("ul",a,[(Object(r["f"])(!0),Object(r["c"])(r["a"],null,Object(r["i"])(o.snake,(function(n){return Object(r["f"])(),Object(r["c"])("li",{key:n.id,style:"top:"+n.top+"px;left:"+n.left+"px;background-color:"+n.bg},null,4)})),128))])]),Object(r["d"])("div",null,"身体长度："+Object(r["k"])(o.snake.length)+" | 吃掉的食物："+Object(r["k"])(o.eatenFood),1),Object(r["d"])("div",null," FoodOptions："+Object(r["k"])(o.randomNum)+" | snake头部："+Object(r["k"])(o.snake[o.snake.length-1].id),1)],64)}t("4160"),t("caad"),t("d81d"),t("fb6a"),t("2532"),t("159b");var l=t("5530"),f=(t("b680"),t("2909"));function d(n,e,t){var r,o,c;if(0===+e)r=o=c=t;else{var u=function(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+6*(e-n)*t:t<.5?e:t<2/3?n+(e-n)*(2/3-t)*6:n},a=t<.5?t*(1+e):t+e-t*e,i=2*t-a;r=u(i,a,n+1/3),o=u(i,a,n),c=u(i,a,n-1/3)}return"rgb("+Math.round(255*r)+","+Math.round(255*o)+","+Math.round(255*c)+")"}function b(){var n=Math.random(),e=Math.random(),t=Math.random();return[n,e,t]}function s(){var n=b();return n[1]=.7+.2*n[1],n[2]=.4+.4*n[2],n=n.map((function(n){return parseFloat(n.toFixed(2))})),d.apply(void 0,Object(f["a"])(n))}function p(n){var e=null,t=j.map((function(n){return n.id}));while(null===e||t.includes(e))e=Math.floor(Math.random()*n);return e}var v=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return{id:t,top:n,left:e,bg:s()}},O=function(){return[v(),v(0,20,1),v(0,40,2)]},j=Object(r["g"])(O()),h=Object(r["h"])(p(400)),g=null,m=function(n){var e=n.keyCode;[37,38,39,40].includes(e)&&(y&&k===e||(e!==k+2&&e!==k-2?(k=e,clearInterval(y),y=setInterval((function(){j.forEach((function(n,t){t+1===j.length?M(n,e):(0===t&&(g=n),j[t]=Object(l["a"])(Object(l["a"])({},j[t+1]),{},{bg:n.bg}))}))}),500)):e=k))},y=null,k=0;function M(n,e){var t,r;h.value===j[j.length-1].id&&x(j),38===e||40===e?(t="top",r=20):(t="left",r=1);var o=n[t],c=n.id;38===e||37===e?(o-=20,c-=r):(o+=20,c+=r),o>380||o<0||j.slice(0,j.length-2).map((function(n){return n.id})).includes(c)?P():(n[t]=o,n.id=c)}var w=Object(r["h"])(0),x=function(n){w.value++,n.unshift(v(g.top,g.left,g.id)),h.value=p(400)},P=function(){clearInterval(y),y=null,Object(r["e"])((function(){alert("游戏结束")}))};window.addEventListener("keydown",m,!0);var _={name:"Main",setup:function(){return{randomNum:h,snake:j,eatenFood:w}}};t("a4cc");_.render=i;var F=_,S={name:"App",components:{Main:F}};t("70f4");S.render=o;var I=S;Object(r["b"])(I).mount("#app")},"57dd":function(n,e,t){},"70f4":function(n,e,t){"use strict";t("57dd")},"7def":function(n,e,t){},a4cc:function(n,e,t){"use strict";t("7def")}});