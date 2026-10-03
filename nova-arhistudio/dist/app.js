const projects = [
 {id:'the-courtyard-house',name:'The Courtyard House',category:'architecture',label:'Architecture',type:'Private residence',year:'2025',image:'assets/exterior.jpg',alt:'Contemporary residence with sculptural concrete forms',description:'A home organised around a quiet central courtyard. Generous openings bring daylight deep into the plan, while a restrained material palette gives the architecture a calm, grounded presence.',materials:'Concrete, glass, natural stone'},
 {id:'quiet-residence',name:'Quiet Residence',category:'interiors',label:'Interior design',type:'Residential interior',year:'2025',image:'assets/interior.jpg',alt:'Warm contemporary living space with carefully composed furniture',description:'A study in warmth and restraint. Natural textures, generous seating, and a soft palette create a living space that feels open and intimate in equal measure.',materials:'Oak, linen, textured plaster'},
 {id:'the-light-house',name:'The Light House',category:'architecture',label:'Architecture',type:'Private residence',year:'2024',image:'assets/pavilion.jpg',alt:'Modern architecture framed by a landscaped setting',description:'A simple architectural gesture creates a generous connection to the outdoors. The relationship between solid walls and open views shapes a home that changes with the light throughout the day.',materials:'Stone, glass, timber'},
 {id:'soft-minimalism',name:'Soft Minimalism',category:'interiors',label:'Interior design',type:'Residential interior',year:'2024',image:'assets/staircase.jpg',alt:'Minimal interior with sculptural furniture and natural light',description:'Clean lines meet tactile surfaces in an interior designed around quiet daily rituals. Carefully chosen pieces give each room its own character while preserving a sense of continuity.',materials:'Natural wood, stone, woven textiles'}
];
const grid=document.querySelector('#project-grid');
const projectDialog=document.querySelector('#project-dialog');
function renderProjects(filter='all'){
 const selected=projects.filter(p=>filter==='all'||p.category===filter);
 grid.innerHTML=selected.map(p=>`<button class="project-card" data-project="${p.id}" aria-label="View ${p.name}"><div class="project-image"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="project-index">0${projects.indexOf(p)+1}</span></div><div class="project-meta"><div><h3>${p.name}</h3><p>${p.label} / ${p.type}</p></div><span>${p.year}</span></div></button>`).join('');
 document.querySelector('#project-status').textContent=`${selected.length} projects shown`;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderProjects(button.dataset.filter);
}));
grid.addEventListener('click',event=>{
 const card=event.target.closest('[data-project]');if(!card)return;const p=projects.find(p=>p.id===card.dataset.project);
 document.querySelector('#project-detail').innerHTML=`<img src="${p.image}" alt="${p.alt}"><p class="eyebrow">${p.label} / ${p.year}</p><h2 id="project-title">${p.name}</h2><p>${p.description}</p><div class="detail-facts"><div><span>Project type</span>${p.type}</div><div><span>Material palette</span>${p.materials}</div></div>`;
 projectDialog.showModal();
});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});});
document.querySelector('#inquiry-open').addEventListener('click',()=>document.querySelector('#inquiry-dialog').showModal());
document.querySelector('#inquiry-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.target);const text=`NOVA ARHISTUDIO — PROJECT BRIEF\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${data.get('type')}\n\n${data.get('message')}\n`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='nova-project-brief.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#form-status').textContent='Your project brief has been saved. It is ready to share with the studio.';});
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'Close':'Menu';document.querySelector('.header nav').classList.toggle('open',open);});
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='Menu';document.querySelector('.header nav').classList.remove('open');}));
document.querySelector('#year').textContent=new Date().getFullYear();
renderProjects();

