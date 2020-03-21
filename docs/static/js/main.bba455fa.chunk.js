(this.webpackJsonpattinyx14=this.webpackJsonpattinyx14||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},329:function(e,t){},347:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),c=n.n(i),o=(n(54),n(42)),s=n.n(o),l=n(43),u=n.n(l),p=n(44),m=n.n(p),f=(n(55),n(10)),g=function(e){var t=e.pin,n=e.children;return r.a.createElement("div",{className:"pin-row pin-".concat(t.pin)},n)},d=(n(58),function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}),h=n(2),v=h.b.model({type:h.b.string,label:h.b.string,alt:h.b.optional(h.b.boolean,!1),groups:h.b.array(h.b.string)}),b=h.b.model({pin:h.b.number,attributes:h.b.array(v)}),E=h.b.model({topic:h.b.string,title:h.b.string,text:h.b.string,chip:h.b.optional(h.b.boolean,!1)}),y=h.b.model({name:h.b.maybeNull(h.b.string),size:h.b.optional(h.b.number,1),description:h.b.maybeNull(h.b.string),relatedGroups:h.b.array(h.b.string)}),G=h.b.model({name:h.b.string,fields:h.b.array(y)}),N=h.b.model({name:h.b.string,datasheetPage:h.b.maybeNull(h.b.number),offsets:h.b.array(G)}),k=h.b.model({topics:h.b.array(E),registries:h.b.array(N),pins:h.b.array(b),highlightGroups:h.b.array(h.b.string),activeGroup:h.b.maybeNull(h.b.string),activePin:h.b.maybeNull(h.b.number),datasheetUrl:h.b.optional(h.b.string,"http://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny214-414-814-DataSheet-DS40001912C.pdf")}).actions((function(e){return{setTopics:function(t){e.topics=t},setRegistries:function(t){e.registries=t},setPins:function(t){e.pins=t,console.log("Set pins",t)},setHighlightGroups:function(t){console.log("set",t),t!==e.highlightGroups&&(e.highlightGroups=t||[])},setActiveGroup:function(t){t!==e.activeGroup&&(e.activeGroup=t)},setActivePinAndGroup:function(t,n){t!==e.activePin&&(e.activePin=t),n!==e.activeGroup&&(e.activeGroup=n)}}})).views((function(e){return{get primaryHighlightGroup(){return e.highlightGroups.length?e.highlightGroups[0]:null},get secondaryHighlightGroups(){return e.highlightGroups.slice(1)},getTopic:function(t){return e.topics.find((function(e){return e.topic===t}))},getRegistry:function(t){return e.registries.find((function(e){return e.name===t}))},getRegistryDatasheetLink:function(t){return e.getDatasheetPageLink(t.datasheetPage)},getDatasheetPageLink:function(t){return t?"".concat(e.datasheetUrl,"#page=").concat(t):null},get chipTopics(){return e.topics.filter((function(e){return e.chip}))}}})).create(),w=n(4),P=Object(w.a)((function(e){var t=e.pin,n=e.attribute,a=n.label,i=n.type,c=n.alt,o=n.groups,s=k.activeGroup,l=k.activePin,u=o.length?o[0]:null,p=l&&l===t.pin,m=o.includes(s),f=s&&!m,g=o.includes(k.primaryHighlightGroup),v=!g&&k.secondaryHighlightGroups.filter((function(e){return o.includes(e)})).length;return r.a.createElement("div",{className:d("pin-attribute","".concat(i,"-pin"),c&&"alt-pin",g&&"highlight-primary-pin",v&&"highlight-secondary-pin",p&&"active-pin",m&&"active-group",f&&"inactive-group"),onMouseEnter:function(){return k.setHighlightGroups(Object(h.a)(o))},onMouseLeave:function(){return k.setHighlightGroups([])},onClick:function(e){k.setActivePinAndGroup(t.pin,u),e.stopPropagation()}},a)})),x=(n(12),function(e){var t=e.pin;return r.a.createElement("div",{className:"chip-leg"},r.a.createElement("span",{className:"pin-number"},t))}),A=(n(13),Object(w.a)((function(e){var t=e.topic,n=k.activeGroup===t,a=k.activeGroup&&!n;return r.a.createElement("div",{className:d("chip-topic",n&&"active-topic",a&&"inactive-topic"),onMouseEnter:function(){return k.setHighlightGroups([t])},onMouseLeave:function(){return k.setHighlightGroups([])},onClick:function(e){k.setActivePinAndGroup(null,t),e.stopPropagation()}},t)}))),T=function(e){var t=k.pins,n=t.length/2;console.log("PINS",t);var a=t.slice(0,n).map((function(e){var t=e.attributes.map((function(t,n){return r.a.createElement(P,{key:n,attribute:t,pin:e})}));return t.reverse(),r.a.createElement(g,{pin:e},t,r.a.createElement(x,{pin:e.pin}))})),i=t.slice(n,t.length).map((function(e){var t=e.attributes.map((function(t,n){return r.a.createElement(P,{key:n,attribute:t,pin:e})}));return r.a.createElement(g,{pin:e},r.a.createElement(x,{pin:e.pin}),t)})),c=k.chipTopics.map((function(e){return r.a.createElement(A,{key:e.topic,topic:e.topic})}));return r.a.createElement("div",{className:"model-row",onClick:function(){return k.setActivePinAndGroup(null,null)}},r.a.createElement("div",{className:"model-row--left-column"},a),r.a.createElement("div",{className:"model-row--middle-column"},r.a.createElement("div",{className:"attiny"},r.a.createElement("div",{className:"pin1marker"}),c)),r.a.createElement("div",{className:"model-row--right-column"},i))},H=n(47),D=(n(61),function(e){var t=e.registry,n=e.offset,a=(e.field,n?"".concat(t,".").concat(n):"".concat(t));return r.a.createElement("a",null,a)}),L=n(48),R=(n(62),function(e){var t=e.offset,n=0,a=t.fields.map((function(e,t){n+=e.size;var a=e.relatedGroups.includes(k.activeGroup),i=!e.name,c=e.size>1&&!i?"[".concat(t+e.size-1,":").concat(t,"]"):null;return r.a.createElement("div",{className:d("field-size-".concat(e.size),a&&"active",i&&"disabled")},e.name,c)})).reverse(),i=[Object(L.a)(Array(n).keys()).map((function(e){return r.a.createElement("div",{className:d("field-size-1","bit-number")},e)})).reverse(),a].map((function(e){return r.a.createElement("div",{className:"block-row"},e)}));return r.a.createElement("div",{className:"registry-offset offset-fields"},i)}),j=(n(63),Object(w.a)((function(e){var t=e.registry,n=t.offsets.map((function(e,n){var a=e?"".concat(t.name,".").concat(e.name):t.name;return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("span",{className:"title"},a),r.a.createElement(R,{offset:e}))}));return r.a.createElement(r.a.Fragment,null,n)}))),z=function(e){var t=e.registry,n=e.page,a=t?k.getRegistryDatasheetLink(t):k.getDatasheetPageLink(n);return a?r.a.createElement("a",{href:a,target:"_blank",rel:"noopener noreferrer"},"\ud83d\uddce"):r.a.createElement("span",null,"(??? link ???)")},O=function(e){var t=k.getRegistry(e.registry);if(!t)return r.a.createElement("div",null,"Registry definition for '",e.registry,"' is missing");var n=t.offsets.find((function(t){return t.name===e.offset}));console.log("offset",n,e.offset,t.offsets);var a=n?"".concat(t.name," > ").concat(n.name):t.name,i=r.a.createElement(z,{registry:t});return e.offset?r.a.createElement("div",{className:"registry"},r.a.createElement("div",null,r.a.createElement("span",{className:"title"},a," ",i),n&&r.a.createElement(R,{offset:n}))):r.a.createElement("div",{className:"registry"},r.a.createElement("div",null,r.a.createElement("span",{className:"title"},a," ",i),r.a.createElement(j,{registry:t})))},C=n(45),M=n.n(C),F=n(19),S=(n(304),n(46)),B=n.n(S),I=new M.a({highlight:function(e,t){if(t&&F.getLanguage(t))try{return F.highlight(t,e).value}catch(n){}return""},html:!0}),J=Object(w.a)((function(e){var t=k.activeGroup,n=null;if(t){var a=k.getTopic(t);n=a?r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,a.title),r.a.createElement("div",{className:"topic-text"},function(e){var t=[],n=I.render(e),a=B()(n,{transform:function(e,n){if(e.parent&&"reg"===e.parent.name&&"text"===e.type){var a=e.data.split("."),i=Object(H.a)(a,3),c=i[0],o=i[1],s=i[2];return t.push(r.a.createElement(O,{registry:c,offset:o,field:s})),r.a.createElement(D,{registry:c,offset:o,field:s})}if(e.parent&&"ref"===e.parent.name&&"text"===e.type)return r.a.createElement(z,{page:e.data})}});return r.a.createElement(r.a.Fragment,null,a,r.a.createElement("div",{className:"references"},t))}(a.text))):r.a.createElement("span",null,"Topic '",t,"' not found")}if(!n){var i=k.primaryHighlightGroup,c=k.getTopic(i);n=c?r.a.createElement("h3",null,c.title):null}return r.a.createElement("div",{className:"topic-view",onClick:function(e){return e.stopPropagation()}},r.a.createElement("div",null,n))}));function U(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText}var W=U(s.a),X=U(u.a),q=U(m.a);k.setPins(f.parse(W).pins),k.setTopics(f.parse(X).topics),k.setRegistries(f.parse(q).regs);var Q=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"ATtinyX14 Quick Reference"),r.a.createElement(T,null),r.a.createElement(J,null),r.a.createElement("div",{className:"data-row"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},42:function(e,t,n){e.exports=n.p+"static/media/attinyx14-pins.9bd68c0b.toml"},43:function(e,t,n){e.exports=n.p+"static/media/attinyx14-topics.69f81031.toml"},44:function(e,t,n){e.exports=n.p+"static/media/attinyx14-registries.53cdde4c.toml"},49:function(e,t,n){e.exports=n(347)},54:function(e,t,n){},55:function(e,t,n){},58:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){}},[[49,1,2]]]);
//# sourceMappingURL=main.bba455fa.chunk.js.map