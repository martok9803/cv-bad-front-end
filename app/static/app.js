async function fetchCV(){const r=await fetch("/api/cv",{cache:"no-store"});if(!r.ok)throw new Error("Failed to fetch CV");return r.json();}
const el=(t,o={})=>{const n=document.createElement(t);for(const k in o){if(k==="className")n.className=o[k];else if(k==="text")n.textContent=o[k];else if(k==="html")n.innerHTML=o[k];else if(k==="href")n.href=o[k];else if(k==="target")n.target=o[k];}return n;};

function initials(name){return (name||"").split(/\s+/).map(s=>s[0]||"").join("").slice(0,2).toUpperCase();}

function mountNav(){const pills=[...document.querySelectorAll(".pill")],panels=[...document.querySelectorAll(".panel")];pills.forEach(p=>p.addEventListener("click",()=>{pills.forEach(x=>x.classList.remove("active"));panels.forEach(x=>x.classList.remove("active"));p.classList.add("active");document.getElementById(p.dataset.target).classList.add("active");window.scrollTo({top:0,behavior:"smooth"});}));}

function renderHeader(cv){
  document.getElementById("cv-name").textContent=`${cv.name} (${cv.handle})`;
  document.getElementById("cv-title").textContent=cv.title;
  document.getElementById("cv-location").textContent=cv.location;
  const email=document.getElementById("cv-email"); email.href=`mailto:${cv.email}`; email.textContent=cv.email;
  const phone=document.getElementById("cv-phone"); phone.href=`tel:${cv.phone}`; phone.textContent=cv.phone;
  const site=document.getElementById("cv-website"); site.href=cv.website; site.textContent=cv.website;
  const gh=document.getElementById("githubBtn"); gh.href=cv.github||cv.website;
  document.getElementById("avatar").textContent=initials(cv.name);
  document.getElementById("cv-summary").textContent=cv.summary;
}

function renderSkills(cv){
  const grid=document.getElementById("cv-skills"); grid.innerHTML="";
  for(const [group,items] of Object.entries(cv.skills||{})){
    const card=el("div",{className:"skill"}); card.appendChild(el("h4",{text:group}));
    const tags=el("div",{className:"tags"}); (items||[]).forEach(s=>tags.appendChild(el("span",{className:"tag",text:s})));
    card.appendChild(tags); grid.appendChild(card);
  }
}

function renderExperience(cv){
  const root=document.getElementById("cv-experience"); root.innerHTML="";
  (cv.experience||[]).forEach(j=>{
    const item=el("div",{className:"item"});
    item.appendChild(el("h3",{text:`${j.role} · ${j.company}`}));
    item.appendChild(el("p",{className:"meta",text:[j.period,j.location].filter(Boolean).join(" · ")}));
    const ul=el("ul"); (j.highlights||[]).forEach(h=>ul.appendChild(el("li",{text:h})));
    item.appendChild(ul); root.appendChild(item);
  });
}

function renderProjects(cv){
  const area=document.getElementById("cv-projects"); area.innerHTML="";
  (cv.projects||[]).forEach(p=>{
    const card=el("div",{className:"card"});
    card.appendChild(el("h3",{text:p.name}));
    card.appendChild(el("p",{text:p.desc}));
    const a=el("a",{href:p.link,target:"_blank"}); a.textContent=p.link;
    card.appendChild(a); area.appendChild(card);
  });
}

function renderEducation(cv){
  const area=document.getElementById("cv-education"); area.innerHTML="";
  (cv.education||[]).forEach(e=>{
    const row=el("div",{className:"edu"});
    row.appendChild(el("h3",{text:e.name}));
    row.appendChild(el("p",{text:e.focus}));
    if(/language/i.test(e.name)) row.appendChild(el("span",{className:"badge",text:"Languages"}));
    area.appendChild(row);
  });
}

(async function init(){
  try{
    const cv=await fetchCV();
    renderHeader(cv); renderSkills(cv); renderExperience(cv); renderProjects(cv); renderEducation(cv);
    mountNav();
  }catch(e){console.error(e);alert("Failed to load CV. Check /api/cv and logs.");}
})();
