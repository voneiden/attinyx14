(this.webpackJsonpattinyx14=this.webpackJsonpattinyx14||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},347:function(e,t){},365:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(16),c=n.n(i),o=(n(68),n(54)),l=n.n(o),s=n(55),u=n.n(s),p=n(56),m=n.n(p),f=(n(69),n(18)),g=function(e){var t=e.pin,n=e.children;return r.a.createElement("div",{className:"pin-row pin-".concat(t.pin)},n)},h=(n(72),function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}),d=n(2),b=d.b.model({type:d.b.string,label:d.b.string,alt:d.b.optional(d.b.boolean,!1),groups:d.b.array(d.b.string)}),v=d.b.model({pin:d.b.number,attributes:d.b.array(b)}),E=d.b.model({topic:d.b.string,title:d.b.string,text:d.b.string,chip:d.b.optional(d.b.boolean,!1)}),y=d.b.model({name:d.b.maybeNull(d.b.string),size:d.b.optional(d.b.number,1),description:d.b.maybeNull(d.b.string),relatedGroups:d.b.array(d.b.string)}),N=d.b.model({name:d.b.string,fields:d.b.array(y)}),k=d.b.model({name:d.b.string,datasheetPage:d.b.maybeNull(d.b.number),offsets:d.b.array(N)}),G=d.b.model({topics:d.b.array(E),registries:d.b.array(k),pins:d.b.array(v),highlightGroups:d.b.array(d.b.string),datasheetUrl:d.b.optional(d.b.string,"http://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny214-414-814-DataSheet-DS40001912C.pdf")}).actions((function(e){return{setTopics:function(t){e.topics=t},setRegistries:function(t){e.registries=t},setPins:function(t){e.pins=t,console.log("Set pins",t)},setHighlightGroups:function(t){console.log("set",t),t!==e.highlightGroups&&(e.highlightGroups=t||[])}}})).views((function(e){return{get primaryHighlightGroup(){return e.highlightGroups.length?e.highlightGroups[0]:null},get secondaryHighlightGroups(){return e.highlightGroups.slice(1)},getTopic:function(t){return e.topics.find((function(e){return e.topic===t}))},getRegistry:function(t){return e.registries.find((function(e){return e.name===t}))},getRegistryDatasheetLink:function(t){return e.getDatasheetPageLink(t.datasheetPage)},getDatasheetPageLink:function(t){return t?"".concat(e.datasheetUrl,"#page=").concat(t):null},get chipTopics(){return e.topics.filter((function(e){return e.chip}))}}})).create(),w=n(9),x=n(4),T=n(13),j=Object(w.a)((function(e){var t=e.pin,n=e.attribute,a=n.label,i=n.type,c=n.alt,o=n.groups,l=Object(x.f)(),s=l.activeGroup,u=parseInt(l.activePin),p=o.length?o[0]:null,m=u&&u===t.pin,f=o.includes(s),g=s&&!f,b=o.includes(G.primaryHighlightGroup),v=!b&&G.secondaryHighlightGroups.filter((function(e){return o.includes(e)})).length;return r.a.createElement(T.b,{to:"/topic/".concat(p,"/").concat(t.pin),className:h("pin-attribute","".concat(i,"-pin"),c&&"alt-pin",b&&"highlight-primary-pin",v&&"highlight-secondary-pin",m&&"active-pin",f&&"active-group",g&&"inactive-group"),onMouseEnter:function(){return G.setHighlightGroups(Object(d.a)(o))},onMouseLeave:function(){return G.setHighlightGroups([])},onClick:function(e){e.stopPropagation()}},a)})),O=(n(21),function(e){var t=e.pin;return r.a.createElement("div",{className:"chip-leg"},r.a.createElement("span",{className:"pin-number"},t))}),P=(n(22),Object(w.a)((function(e){var t=e.topic,n=Object(x.f)().activeGroup,a=n===t,i=n&&!a;return r.a.createElement(T.b,{to:"/topic/".concat(t),className:h("chip-topic",a&&"active-topic",i&&"inactive-topic"),onMouseEnter:function(){return G.setHighlightGroups([t])},onMouseLeave:function(){return G.setHighlightGroups([])},onClick:function(e){e.stopPropagation()}},t)}))),H=Object(x.g)((function(e){var t=G.pins,n=t.length/2;console.log("PINS",t);var a=t.slice(0,n).map((function(e){var t=e.attributes.map((function(t,n){return r.a.createElement(j,{key:n,attribute:t,pin:e})}));return t.reverse(),r.a.createElement(g,{pin:e},t,r.a.createElement(O,{pin:e.pin}))})),i=t.slice(n,t.length).map((function(e){var t=e.attributes.map((function(t,n){return r.a.createElement(j,{key:n,attribute:t,pin:e})}));return r.a.createElement(g,{pin:e},r.a.createElement(O,{pin:e.pin}),t)})),c=G.chipTopics.map((function(e){return r.a.createElement(P,{key:e.topic,topic:e.topic})})),o=e.history;return console.warn("HISTORYY",o),r.a.createElement("div",{className:"model-row",onClick:function(){return o.push("/")}},r.a.createElement("div",{className:"model-row--left-column"},a),r.a.createElement("div",{className:"model-row--middle-column"},r.a.createElement("div",{className:"attiny"},r.a.createElement("div",{className:"pin1marker"}),c)),r.a.createElement("div",{className:"model-row--right-column"},i))})),R=n(61),D=(n(79),function(e){var t=e.registry,n=e.offset,a=(e.field,n?"".concat(t,".").concat(n):"".concat(t));return r.a.createElement("a",null,a)}),L=n(62),z=(n(80),function(e){var t=e.offset,n=0,a=Object(x.f)().activeGroup,i=t.fields.map((function(e,t){n+=e.size;var i=e.relatedGroups.includes(a),c=!e.name,o=e.size>1&&!c?"[".concat(t+e.size-1,":").concat(t,"]"):null;return r.a.createElement("div",{className:h("field-size-".concat(e.size),i&&"active",c&&"disabled")},e.name,o)})).reverse(),c=[Object(L.a)(Array(n).keys()).map((function(e){return r.a.createElement("div",{className:h("field-size-1","bit-number")},e)})).reverse(),i].map((function(e){return r.a.createElement("div",{className:"block-row"},e)}));return r.a.createElement("div",{className:"registry-offset offset-fields"},c)}),A=(n(81),Object(w.a)((function(e){var t=e.registry,n=t.offsets.map((function(e,n){var a=e?"".concat(t.name,".").concat(e.name):t.name;return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("span",{className:"title"},a),r.a.createElement(z,{offset:e}))}));return r.a.createElement(r.a.Fragment,null,n)}))),C=function(e){var t=e.registry,n=e.page,a=t?G.getRegistryDatasheetLink(t):G.getDatasheetPageLink(n);return a?r.a.createElement("a",{href:a,target:"_blank",rel:"noopener noreferrer"},"\ud83d\uddce"):r.a.createElement("span",null,"(??? link ???)")},M=function(e){var t=G.getRegistry(e.registry);if(!t)return r.a.createElement("div",null,"Registry definition for '",e.registry,"' is missing");var n=t.offsets.find((function(t){return t.name===e.offset}));console.log("offset",n,e.offset,t.offsets);var a=n?"".concat(t.name," > ").concat(n.name):t.name,i=r.a.createElement(C,{registry:t});return e.offset?r.a.createElement("div",{className:"registry"},r.a.createElement("div",null,r.a.createElement("span",{className:"title"},a," ",i),n&&r.a.createElement(z,{offset:n}))):r.a.createElement("div",{className:"registry"},r.a.createElement("div",null,r.a.createElement("span",{className:"title"},a," ",i),r.a.createElement(A,{registry:t})))},S=n(59),F=n.n(S),I=n(30),B=(n(322),n(60)),J=n.n(B),U=function(e){var t=e.topic,n=G.getTopic(t);return r.a.createElement("button",{className:"topic-link",onClick:function(){G.setActiveGroup(t)}},n.title)},W=new F.a({highlight:function(e,t){if(t&&I.getLanguage(t))try{return I.highlight(t,e).value}catch(n){}return""},html:!0}),X=Object(w.a)((function(e){var t=Object(x.f)().activeGroup;console.log("");var n=null;if(t){var a=G.getTopic(t);n=a?r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,a.title),r.a.createElement("div",{className:"topic-text"},function(e){var t=[],n=W.render(e),a=J()(n,{transform:function(e,n){if(e.parent&&"reg"===e.parent.name&&"text"===e.type){var a=e.data.split("."),i=Object(R.a)(a,3),c=i[0],o=i[1],l=i[2];return t.push(r.a.createElement(M,{registry:c,offset:o,field:l})),r.a.createElement(D,{registry:c,offset:o,field:l})}return e.parent&&"ref"===e.parent.name&&"text"===e.type?r.a.createElement(C,{page:e.data}):e.parent&&"topic"===e.parent.name&&"text"===e.type?r.a.createElement(U,{topic:e.data}):void 0}});return r.a.createElement(r.a.Fragment,null,a,r.a.createElement("div",{className:"references"},t))}(a.text))):r.a.createElement("span",null,"Topic '",t,"' not found")}if(!n){var i=G.primaryHighlightGroup,c=G.getTopic(i);n=c?r.a.createElement("h3",null,c.title):null}return r.a.createElement("div",{className:"topic-view",onClick:function(e){return e.stopPropagation()}},r.a.createElement("div",null,n))}));function Y(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText}var q=Y(l.a),Q=Y(u.a),$=Y(m.a);G.setPins(f.parse(q).pins),G.setTopics(f.parse(Q).topics),G.setRegistries(f.parse($).regs);var _=function(){return r.a.createElement(T.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"ATtinyX14 Quick Reference"),r.a.createElement(x.c,null,r.a.createElement(x.a,{path:"/topic/:activeGroup?/:activePin?"},r.a.createElement(H,null),r.a.createElement(X,null)),r.a.createElement(x.a,{path:"/"},r.a.createElement(H,null))),r.a.createElement("div",{className:"data-row"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,n){e.exports=n.p+"static/media/attinyx14-pins.febae19a.toml"},55:function(e,t,n){e.exports=n.p+"static/media/attinyx14-topics.f6761100.toml"},56:function(e,t,n){e.exports=n.p+"static/media/attinyx14-registries.53cdde4c.toml"},63:function(e,t,n){e.exports=n(365)},68:function(e,t,n){},69:function(e,t,n){},72:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.87322fe1.chunk.js.map