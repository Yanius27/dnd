!function(){"use strict";class e{constructor(){this.#e()}#e(){const e=document.createElement("div");e.classList.add("container");const t=document.createElement("div");t.classList.add("column"),t.classList.add("toDo");const s=document.createElement("div");s.classList.add("column_header"),t.appendChild(s);const n=document.createElement("span");n.classList.add("column_title"),n.textContent="TODO",s.appendChild(n);const a=document.createElement("span");a.classList.add("column_settings"),a.textContent="...",s.appendChild(a);const d=document.createElement("div");d.classList.add("column_tasks"),t.appendChild(d);const o=document.createElement("div");o.classList.add("column_footer"),t.appendChild(o);const c=document.createElement("span");c.classList.add("column_footer-span"),c.textContent="+ Add another card",o.appendChild(c);const l=document.createElement("div");l.classList.add("column"),l.classList.add("inProgress");const i=document.createElement("div");i.classList.add("column_header"),l.appendChild(i);const r=document.createElement("span");r.classList.add("column_title"),r.textContent="IN PROGRESS",i.appendChild(r);const m=document.createElement("span");m.classList.add("column_settings"),m.textContent="...",i.appendChild(m);const h=document.createElement("div");h.classList.add("column_tasks"),l.appendChild(h);const u=document.createElement("div");u.classList.add("column_footer"),l.appendChild(u);const p=document.createElement("span");p.classList.add("column_footer-span"),p.textContent="+ Add another card",u.appendChild(p);const E=document.createElement("div");E.classList.add("column"),E.classList.add("done");const v=document.createElement("div");v.classList.add("column_header"),E.appendChild(v);const C=document.createElement("span");C.classList.add("column_title"),C.textContent="DONE",v.appendChild(C);const L=document.createElement("span");L.classList.add("column_settings"),L.textContent="...",v.appendChild(L);const g=document.createElement("div");g.classList.add("column_tasks"),E.appendChild(g);const f=document.createElement("div");f.classList.add("column_footer"),E.appendChild(f);const y=document.createElement("span");y.classList.add("column_footer-span"),y.textContent="+ Add another card",f.appendChild(y),e.appendChild(t),e.appendChild(l),e.appendChild(E),this._element=e}get element(){return this._element}}class t{constructor(e,t){this.#e(e,t)}#e(e,t){const s=document.createElement("div");s.classList.add("card"),s.textContent=e,s.setAttribute("id",t);const n=document.createElement("div");n.classList.add("card_deleteIcon"),s.appendChild(n),this._element=s}get element(){return this._element}}class s{constructor(){this.#e()}#e(){const e=document.createElement("div");e.classList.add("popover");const t=document.createElement("input");t.classList.add("titleInput"),t.setAttribute("type","text"),t.setAttribute("placeholder","Enter a title for this card...");const s=document.createElement("div");s.classList.add("iconsContainer");const n=document.createElement("button");n.classList.add("addBtn"),n.textContent="Add Card";const a=document.createElement("div");a.classList.add("closeIcon");const d=document.createElement("span");d.classList.add("popover_settings"),d.textContent="...",s.appendChild(n),s.appendChild(a),s.appendChild(d),e.appendChild(t),e.appendChild(s),this._element=e}get element(){return this._element}}new class{constructor(){this.storage=localStorage,this.cards={toDo:[],inProgress:[],done:[]},this.columns=Object.keys(this.cards),this.container=new e,this.popover=new s,this.#t(),this.actualElement,this.shiftX,this.shiftY,this.#s(),this.#n()}#a(){this.storage.setItem("cards",JSON.stringify(this.cards))}#d(){return JSON.parse(this.storage.getItem("cards"))}#t(){document.body.appendChild(this.container.element),this.#d()&&(this.cards=this.#d(),this.#o(),this.#c())}#c(){for(let e in this.cards)this.cards[e].forEach((s=>{const n=new t(s.task,s.id).element;document.querySelector(`.${e}`).querySelector(".column_tasks").appendChild(n)}));this.#l()}#o(){[...document.querySelectorAll(".column_tasks")].forEach((e=>e.innerHTML=""))}#i(e){const t=this.popover.element.querySelector(".titleInput").value,s=`${Math.floor(1e4*Math.random())}${Math.floor(1e4*Math.random())}${Math.floor(1e4*Math.random())}`;t&&""!==t&&(this.columns.forEach((n=>{e.classList.contains(n)&&this.cards[n].push({task:t,id:s})})),this.#a(),this.#o(),this.#c()),this.popover.element.querySelector(".titleInput").value=""}#n(){this.popover.element.addEventListener("click",(e=>{const t=e.target.closest(".column");e.target.classList.contains("closeIcon")&&(this.popover.element.previousElementSibling.style.removeProperty("opacity"),this.popover.element.remove()),e.target.classList.contains("addBtn")&&(this.#i(t),this.popover.element.previousElementSibling.style.removeProperty("opacity"),this.popover.element.remove())}))}#s(){const e=this.container.element.querySelectorAll(".column_footer-span");[...e].forEach((t=>{t.addEventListener("click",(s=>{[...e].forEach((e=>e.style.removeProperty("opacity"))),s.target.style.opacity="0",t.parentNode.appendChild(this.popover.element)}))}))}#r=e=>{this.actualElement.style.display="none",document.body.style.cursor="default";const t=document.elementFromPoint(e.clientX,e.clientY);if(this.actualElement.style.display="flex",!t||t===document.querySelector("html"))return this.actualElement.classList.remove("dragged"),this.actualElement.remove(),this.actualElement=void 0,document.body.style.cursor="default",this.#o(),this.#c(),document.documentElement.removeEventListener("mouseup",this.#r),void document.documentElement.removeEventListener("mousemove",this.#m);if(t.classList.contains("card")){for(let e in this.cards)this.cards[e]=this.cards[e].filter((e=>e.id!==this.actualElement.id));const e=t.parentNode.parentNode.className.split(" ")[1],s=Array.from(t.parentNode.children);this.cards[e].splice(s.indexOf(t),0,{task:this.actualElement.textContent,id:this.actualElement.id})}else if(t.classList.contains("column_tasks")){for(let e in this.cards)this.cards[e]=this.cards[e].filter((e=>e.id!==this.actualElement.id));const e=t.parentNode.className.split(" ")[1];this.cards[e].push({task:this.actualElement.textContent,id:this.actualElement.id})}this.actualElement.classList.remove("dragged"),this.actualElement.remove(),this.actualElement=void 0,this.#a(),this.#o(),this.#c(),document.documentElement.removeEventListener("mouseup",this.#r),document.documentElement.removeEventListener("mousemove",this.#m)};#m=e=>{this.actualElement.style.left=e.pageX-this.shiftX+"px",this.actualElement.style.top=e.pageY-this.shiftY+"px"};#l(){[...document.querySelectorAll(".card")].forEach((e=>{e.addEventListener("click",(e=>{if(e.target.classList.contains("card_deleteIcon")){const t=e.target.parentNode;for(let e in this.cards)this.cards[e]=this.cards[e].filter((e=>e.id!==t.id));this.#a(),this.#o(),this.#c()}}))})),[...document.querySelectorAll(".column_tasks")].forEach((e=>{e.addEventListener("mousedown",(e=>{e.preventDefault(),e.target.classList.contains("card")&&(this.actualElement=e.target,this.shiftX=e.pageX-this.actualElement.getBoundingClientRect().left,this.shiftY=e.pageY-this.actualElement.getBoundingClientRect().top,document.body.appendChild(this.actualElement),this.actualElement.style.left=e.pageX-this.shiftX+"px",this.actualElement.style.top=e.pageY-this.shiftY+"px",this.actualElement.classList.add("dragged"),document.body.style.cursor="grabbing",document.documentElement.addEventListener("mouseup",this.#r),document.documentElement.addEventListener("mousemove",this.#m))}))}))}}}();
//# sourceMappingURL=main.js.map