(this.webpackJsonpc_farewell_card=this.webpackJsonpc_farewell_card||[]).push([[0],{19:function(e,t,a){e.exports=a(42)},24:function(e,t,a){},36:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(14),l=a.n(o),c=(a(24),a(11)),s=a(15),i=a.n(s),u=(a(36),a(37),a(17)),m=a(9),f=a(6),h=a(8),d=function(e){var t=e.messages.map((function(e,t){return r.a.createElement(f.a,{key:t},r.a.createElement(h.a,{style:{width:"18rem"}},r.a.createElement(h.a.Body,null,r.a.createElement(h.a.Title,null,r.a.createElement("b",null,e.author)),r.a.createElement(h.a.Text,null,e.farewellMessage))))}));return r.a.createElement(u.a,null,r.a.createElement(m.a,null,t))},p=a(7),E=a(18),w=function(e){return r.a.createElement(p.a,{onSubmit:function(t){var a,n;a=e.id,n=t,console.log(a),console.log(n.target.elements.formBasicText.value),n.preventDefault(),n.stopPropagation(),fetch("https://cory-farewell-card.herokuapp.com/message",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:a,farewellMessage:n.target.elements.formBasicText.value})}).then((function(e){return e.json()})).then((function(e){console.log("Success:",e),document.location.href="/"})).catch((function(e){console.error("Error:",e)}))}},r.a.createElement(p.a.Group,{as:m.a,controlId:"formBasicText"},r.a.createElement(f.a,{sm:3},r.a.createElement(p.a.Label,null,"Your Farewell Wishes To Cory")),r.a.createElement(f.a,{sm:6},r.a.createElement(p.a.Control,{type:"text",placeholder:"Enter your wish here."})),r.a.createElement(f.a,{sm:3},r.a.createElement(E.a,{type:"submit"},"Submit"))))},g=function(e){var t=Object(n.useState)([]),a=Object(c.a)(t,2),o=a[0],l=a[1],s=Object(n.useState)(null),u=Object(c.a)(s,2),m=u[0],f=u[1];Object(n.useEffect)((function(){var e=i.a.parse(window.location.search);e.id&&f(e.id),fetch("https://cory-farewell-card.herokuapp.com/messages").then((function(e){return e.json()})).then((function(e){l(e)}))}),[]);var h=m&&r.a.createElement(w,{id:m});return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Farewell Cory! Best wishes for your new life out west!"),h,r.a.createElement(d,{messages:o}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[19,1,2]]]);
//# sourceMappingURL=main.5887b2a5.chunk.js.map