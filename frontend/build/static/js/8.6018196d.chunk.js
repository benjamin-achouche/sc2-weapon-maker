(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{57:function(e,t,i){"use strict";i.d(t,"d",(function(){return l})),i.d(t,"c",(function(){return o})),i.d(t,"b",(function(){return u})),i.d(t,"a",(function(){return p})),i.d(t,"e",(function(){return d}));var a=i(28),n="REQUIRE",s="MINLENGTH",c="MAXLENGTH",r="EMAIL",l=function(){return{type:n}},o=function(e){return{type:s,val:e}},u=function(e){return{type:c,val:e}},p=function(){return{type:r}},d=function(e,t){var i,l=!0,o=Object(a.a)(t);try{for(o.s();!(i=o.n()).done;){var u=i.value;u.type===n&&(l=l&&e.trim().length>0),u.type===s&&(l=l&&e.trim().length>=u.val),u.type===c&&(l=l&&e.trim().length<=u.val),"MIN"===u.type&&(l=l&&+e>=u.val),"MAX"===u.type&&(l=l&&+e<=u.val),u.type===r&&(l=l&&/^\S+@\S+\.\S+$/.test(e))}}catch(p){o.e(p)}finally{o.f()}return l}},60:function(e,t,i){"use strict";var a=i(5),n=i(25),s=i(1),c=i(57),r=(i(61),i(0)),l=function(e,t){switch(t.type){case"CHANGE":return Object(n.a)(Object(n.a)({},e),{},{value:t.val,isValid:Object(c.e)(t.val,t.validators)});case"TOUCH":return Object(n.a)(Object(n.a)({},e),{},{isTouched:!0});default:return e}};t.a=function(e){var t=Object(s.useReducer)(l,{value:e.initialValue||"",isTouched:e.initialTouch||!1,isValid:e.initialValid||!1}),i=Object(a.a)(t,2),n=i[0],c=i[1],o=e.id,u=e.onInput,p=n.value,d=n.isValid;Object(s.useEffect)((function(){u(o,p,d)}),[o,p,d,u]);var b=function(t){c({type:"CHANGE",val:t.target.value,validators:e.validators})},j=function(){c({type:"TOUCH"})},h="input"===e.element?Object(r.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:b,onBlur:j,value:e.value||n.value}):Object(r.jsx)("textarea",{id:e.id,rows:e.rows||3,placeholder:e.placeholder,onChange:b,onBlur:j,value:n.value,style:{resize:"none"}});return Object(r.jsxs)("div",{className:"form-control ".concat(!n.isValid&&n.isTouched&&"form-control--invalid"),children:[Object(r.jsx)("label",{htmlFor:e.id,children:e.label}),h,!n.isValid&&n.isTouched&&Object(r.jsx)("p",{children:e.errorText})]})}},61:function(e,t,i){},62:function(e,t,i){"use strict";i.d(t,"a",(function(){return l}));var a=i(5),n=i(27),s=i(25),c=i(1),r=function(e,t){switch(t.type){case"INPUT_CHANGE":var i=!0;for(var a in e.inputs)e.inputs[a]&&(i=a===t.inputId?i&&t.isValid:i&&e.inputs[a].isValid);return Object(s.a)(Object(s.a)({},e),{},{inputs:Object(s.a)(Object(s.a)({},e.inputs),{},Object(n.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:i});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},l=function(e,t){var i=Object(c.useReducer)(r,{inputs:e,isValid:t}),n=Object(a.a)(i,2),s=n[0],l=n[1];return[s,Object(c.useCallback)((function(e,t,i){l({type:"INPUT_CHANGE",inputId:e,value:t,isValid:i})}),[]),Object(c.useCallback)((function(e,t){l({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},71:function(e,t,i){},93:function(e,t,i){"use strict";i.r(t);var a=i(11),n=i.n(a),s=i(13),c=i(5),r=i(1),l=i.n(r),o=i(2),u=i(64),p={assassin:"https://i.ibb.co/r3KrBMh/astaroth.jpg",astaroth:"https://i.ibb.co/r3KrBMh/astaroth.jpg",berserker:"https://i.ibb.co/MPDLkQK/cassandra.jpg",cassandra:"https://i.ibb.co/MPDLkQK/cassandra.jpg",cervantes:"https://i.ibb.co/WFGkFrW/cervantes.jpg",charade:"https://i.ibb.co/wLXCGMt/charade.jpg",heihachi:"https://i.ibb.co/zf4vSh2/heihachi.jpg",inferno:"https://i.ibb.co/vs04YVt/inferno.jpg",ivy:"https://i.ibb.co/Yy28sq4/ivy.jpg",kilik:"https://i.ibb.co/GJ3QS5g/kilik.jpg",link:"https://i.ibb.co/47s7Lgd/link.jpg",lizardman:"https://i.ibb.co/W5NSBz3/lizardman.jpg",maxi:"https://i.ibb.co/549xmPT/maxi.jpg",mitsurugi:"https://i.ibb.co/9nzPvK7/mitsurugi.jpg",necrid:"https://i.ibb.co/KNC71n0/necrid.jpg",nightmare:"https://i.ibb.co/hcnb0Pm/nightmare.jpg",raphael:"https://i.ibb.co/qxFfhRg/raphael.jpg",seungmina:"https://i.ibb.co/C7Zm1r3/seung-mina.jpg",siegfried:"https://i.ibb.co/yydtsNy/siegfried.jpg",sophitia:"https://i.ibb.co/SX2JZVy/sophitia.jpg",spawn:"https://i.ibb.co/gzgRxjB/spawn.jpg",taki:"https://i.ibb.co/93b9D8H/taki.jpg",talim:"https://i.ibb.co/S7Pq2Tn/talim.jpg",voldo:"https://i.ibb.co/gTRv8Yk/voldo.jpg",xianghua:"https://i.ibb.co/30nQRXL/xianghua.jpg",yoshimitsu:"https://i.ibb.co/hsMM6Hc/yoshimitsu.jpg",yunsung:"https://i.ibb.co/ynrGcWz/yunsung.jpg"},d=i(15),b=i(60),j=i(25),h=i(57),v=(i(71),i(0)),O=function(e,t){switch(t.type){case"CHANGE_SELECT":return Object(j.a)(Object(j.a)({},e),{},{value:t.val,isValid:Object(h.e)(t.val,t.validators)});case"TOUCH":return Object(j.a)(Object(j.a)({},e),{},{isTouched:!0});default:return e}},m=function(e){var t=Object(r.useReducer)(O,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),i=Object(c.a)(t,2),a=i[0],n=i[1],s=e.id,l=e.onInput,o=a.value,u=a.isValid;Object(r.useEffect)((function(){l(s,o,u)}),[s,o,u,l]);return Object(v.jsxs)("div",{className:"select-control ".concat(!a.isValid&&a.isTouched&&"select-control--invalid"),children:[Object(v.jsx)("label",{htmlFor:e.htmlFor,children:e.label}),Object(v.jsxs)("select",{id:e.id,value:a.value,onChange:function(t){n({type:"CHANGE_SELECT",val:t.target.value,validators:e.validators})},onBlur:function(){n({type:"TOUCH"})},children:[Object(v.jsx)("option",{value:""}),Object(v.jsx)("option",{value:"assassin",children:"Assassin"}),Object(v.jsx)("option",{value:"astaroth",children:"Astaroth"}),Object(v.jsx)("option",{value:"berserker",children:"Berserker"}),Object(v.jsx)("option",{value:"cassandra",children:"Cassandra"}),Object(v.jsx)("option",{value:"cervantes",children:"Cervantes"}),Object(v.jsx)("option",{value:"charade",children:"Charade"}),Object(v.jsx)("option",{value:"heihachi",children:"Heihachi"}),Object(v.jsx)("option",{value:"inferno",children:"Inferno"}),Object(v.jsx)("option",{value:"ivy",children:"Ivy"}),Object(v.jsx)("option",{value:"kilik",children:"Kilik"}),Object(v.jsx)("option",{value:"link",children:"Link"}),Object(v.jsx)("option",{value:"lizardman",children:"Lizardman"}),Object(v.jsx)("option",{value:"maxi",children:"Maxi"}),Object(v.jsx)("option",{value:"mitsurugi",children:"Mitsurugi"}),Object(v.jsx)("option",{value:"necrid",children:"Necrid"}),Object(v.jsx)("option",{value:"nightmare",children:"Nightmare"}),Object(v.jsx)("option",{value:"raphael",children:"Raphael"}),Object(v.jsx)("option",{value:"seungmina",children:"Seung Mina"}),Object(v.jsx)("option",{value:"siegfried",children:"Siegfried"}),Object(v.jsx)("option",{value:"sophitia",children:"Sophitia"}),Object(v.jsx)("option",{value:"spawn",children:"Spawn"}),Object(v.jsx)("option",{value:"taki",children:"Taki"}),Object(v.jsx)("option",{value:"talim",children:"Talim"}),Object(v.jsx)("option",{value:"voldo",children:"Voldo"}),Object(v.jsx)("option",{value:"xianghua",children:"Xianghua"}),Object(v.jsx)("option",{value:"yoshimitsu",children:"Yoshimitsu"}),Object(v.jsx)("option",{value:"yunsung",children:"Yunsung"})]}),!a.isValid&&a.isTouched&&Object(v.jsx)("p",{children:e.errorText})]})},f=i(26),g=i(16),x=i(18),C=i(67),y=i(62),k=i(66),T=i(17),S=i(14);i(63),t.default=function(){var e=Object(r.useContext)(S.a),t=Object(T.a)(),i=t.isLoading,a=t.error,j=t.sendRequest,O=t.clearError,V=Object(y.a)({character:{value:"",isValid:!1},name:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1),w=Object(c.a)(V,2),N=w[0],E=w[1],A=Object(r.useState)(!1),H=Object(c.a)(A,2),I=H[0],M=H[1],L=Object(k.a)({attack:4,defense:4,speed:3,selfGuardPiercing:7,enemyGuardPiercing:1,reach:2,counters:2,enemyDamageReflection:1,lifeContinuous:4,lifeHit:4,lifeVampire:1,lessHealthMoreAttack:1,lessHealthMoreDefense:1,lessHealthMoreSpeed:1,lessHealthMoreLifeCont:1,lessHealthSCLvUp:1,SCAttack:1,SCDefense:1,SCSpeed:3,SCEnemyGuardPiercing:1,SCLifeContinuous:3,SCChargeSpeed:3,SCType:2},100),P=Object(c.a)(L,2),G=P[0],R=P[1],_=Object(o.g)(),z=function(){M(!1)},D=function(){var t=Object(s.a)(n.a.mark((function t(i){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i.preventDefault(),t.prev=1,t.next=4,j("".concat("https://sc2-weapon-maker.herokuapp.com/api","/weapons"),"POST",JSON.stringify({character:N.inputs.character.value,name:N.inputs.name.value,description:N.inputs.description.value,imageUrl:p[N.inputs.character.value],attributes:G.attributes,points:G.points}),{"Content-Type":"application/json",Authorization:"Bearer "+e.token});case 4:_.push("/".concat(e.userId,"/weapons")),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:M(!1);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}(),B=[],F=0,U=!1;for(var K in u.a)++F>16&&(U=!0),B.push({id:F,name:K,isSC:U});return Object(v.jsxs)(l.a.Fragment,{children:[Object(v.jsx)(f.a,{error:a,onClear:O}),Object(v.jsxs)("form",{onSubmit:D,children:[Object(v.jsxs)(x.a,{show:I,onCancel:z,header:"Please enter your weapon informations.",footerClass:"weapon-item__modal-actions",footer:Object(v.jsxs)(l.a.Fragment,{children:[i&&Object(v.jsx)("div",{className:"center",children:Object(v.jsx)(g.a,{asDarkOverlay:!0})}),Object(v.jsx)(d.a,{type:"button",inverse:!0,onClick:z,children:"CANCEL"}),Object(v.jsx)(d.a,{onClick:D,disabled:!N.isValid,children:"CREATE"})]}),children:[Object(v.jsx)(m,{htmlFor:"character-select",id:"character",label:"Select a character",validators:[Object(h.d)()],errorText:"Please select a character.",onInput:E}),Object(v.jsx)(b.a,{id:"name",element:"input",type:"text",label:"Name",validators:[Object(h.d)()],errorText:"Please enter a valid weapon name.",onInput:E}),Object(v.jsx)(b.a,{id:"description",element:"textarea",label:"Description",validators:[Object(h.c)(5)],errorText:"Please enter a valid description (at least 5 characters).",onInput:E})]}),Object(v.jsx)(d.a,{type:"button",className:"new-weapon__create-btn",onClick:function(){M(!0)},children:"Create Weapon"})]}),Object(v.jsxs)("div",{className:"new-weapon__points",children:[G.points," /"," ",G.points>100?G.points:100]}),Object(v.jsx)("div",{className:"new-weapon",children:B.map((function(e){return e.isSC,Object(v.jsx)(C.a,{id:e.id,isSC:e.isSC,name:u.a[e.name].name,image:u.a[e.name].image,attributeValue:u.a[e.name].attributeValue[G.attributes[e.name]-1],attrValues:u.a[e.name].attributeValue,currentLevel:G.attributes[e.name],levels:u.a[e.name].levels,tooltip:u.a[e.name].tooltip,lvlPtsCost:u.a[e.name].lvlPtsCost,onClick:R},"Attribute "+u.a[e.name].name)}))})]})}}}]);
//# sourceMappingURL=8.6018196d.chunk.js.map