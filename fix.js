// Korrekturen 11.11.2026: tolerante Codeeingabe, Spurenlampe ohne Kamera
(function(){
// Mehrere Schreibweisen je Code: Zeitangaben, Vorsilben wie LK oder ES, Artikel, einzelne Wörter
const ALIAS={PFLANZTISCH:'GEWAECHSHAUS',UNTERDEMPFLANZTISCH:'GEWAECHSHAUS',AKONITIN:'ACONITIN',ACONITUM:'EISENHUT',STURMHUT:'EISENHUT'};
const STOP=new Set(['DER','DIE','DAS','DEN','DEM','EIN','EINE','IM','IN','AM','UNTER','UHR','ZIMMER','NR','NUMMER','PAAR','NEBENSTELLE','BANDEROLE','BLAUER','BLAUE','BLAUEN','ES','LK','P','AZ','DURCHWAHL','PERSONALNUMMER']);
function cands(raw){const s=(raw||'').toUpperCase().replace(/Ä/g,'AE').replace(/Ö/g,'OE').replace(/Ü/g,'UE').replace(/ß/g,'SS');const out=new Set();const n=norm(raw);if(!n)return [];out.add(n);if(ALIAS[n])out.add(ALIAS[n]);
 const words=s.split(/[^A-Z0-9]+/).filter(Boolean);words.forEach(w=>{out.add(w);if(ALIAS[w])out.add(ALIAS[w])});
 const rest=words.filter(w=>!STOP.has(w));if(rest.length){const j=rest.join('');out.add(j);if(ALIAS[j])out.add(ALIAS[j])}
 const t=s.match(/(\d{1,2})\s*[:.]\s*(\d{2})/);if(t)out.add(t[1].padStart(2,'0')+t[2]);
 const dg=s.replace(/[^0-9]/g,'');if(dg&&dg.length<=4){out.add(dg);out.add(dg.replace(/^0+/,'')||'0');for(let L=dg.length+1;L<=4;L++)out.add(dg.padStart(L,'0'))}
 return [...out].slice(0,40)}
window.codeCands=cands;
$('#btn-check').onclick=async()=>{ac();const raw=$('#daycode').value;if(!norm(raw))return;const D=DAYS[curDay];const want=D.codes?D.codes[ROLE]:D.code;let ok=false;
 for(const v of cands(raw)){if(await kzSha('sw|'+curDay+'|'+v)===want){ok=true;break}}
 if(ok){st.solved[curDay]=1;save();AMBI.sfx.stamp();setTimeout(SFX.ok,250);$('#codecard').classList.add('solved');showReveal(true)}
 else{SFX.no();const c=$('#codecard');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');
  let msg='Das passt nicht. Habt ihr alles verglichen?';if(D.codes){const other=D.codes[ROLE==='A'?'B':'A'];for(const v of cands(raw)){if(await kzSha('sw|'+curDay+'|'+v)===other){msg='Das ist dein eigenes Wort. Sag es deinem Partner und tipp seines ein.';break}}}toast(msg)}};

// Spurenlampe ohne Kamera: das Blatt in der App unter der Lampe
const LAMP_DOC={4:'visitenkarte',17:'foto_rueck',18:'bericht_kopie'};
window.lampSim=function(){const id=LAMP_DOC[curDay];if(!id||!DOCS[id]){toast('Für heute gibt es kein Blatt für die Spurenlampe.');return}
 viewer('<p class="v-cap top">So sieht das Blatt unter der Spurenlampe aus. Das Gelb wird dunkel und lesbar.</p><div class="lamp-sim">'+DOCS[id].html()+'</div>');$('#v-body').classList.add('wide');try{AMBI.sfx.click()}catch(e){}};
const _lamp=MODS.lamp;MODS.lamp=function(x){const w=_lamp(x);const b=el('button','btn ghost sm lamp-alt','Keine Kamera? Hier ansehen');b.onclick=()=>{ac();lampSim()};const host=w.querySelector('div:last-child')||w;host.appendChild(b);return w};
})();

// Nahaufnahme: Texttafeln und Fundstücke zeigen oben den Bildausschnitt der angetippten Stelle
(function(){
let lastImg='',lastAsp=.75;
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.spot');if(!b)return;const im=b.parentElement.querySelector('img');if(im){lastImg=im.getAttribute('src');if(im.naturalWidth)lastAsp=im.naturalWidth/im.naturalHeight}},true);
function shot(s){if(!lastImg||s.x==null)return '';const A=4/3;const k=lastAsp/A; // Anteil der Bildhöhe je Anteil Bildbreite
 let fw=Math.max(s.w*1.7,(s.h*1.5)/k,.42);fw=Math.min(1,fw);let fh=fw*k;if(fh>1){fh=1;fw=1/k}
 const cx=s.x+s.w/2,cy=s.y+s.h/2;let x0=Math.min(Math.max(cx-fw/2,0),1-fw),y0=Math.min(Math.max(cy-fh/2,0),1-fh);
 const px=fw>=1?0:x0/(1-fw)*100,py=fh>=1?0:y0/(1-fh)*100;
 return '<div class="nah" style="background-image:url('+lastImg+');background-size:'+(100/fw).toFixed(2)+'% auto;background-position:'+px.toFixed(2)+'% '+py.toFixed(2)+'%"><i></i></div>'}
const _open=window.openSpot;
window.openSpot=function(s){const o=s.open;if(o&&(o.t==='text'||o.t==='env')&&!(window.OPEN_X&&OPEN_X[o.t])){_open(s);const n=document.querySelector('#v-body .note');if(n){const h=shot(s);if(h){n.insertAdjacentHTML('afterbegin',h);n.classList.add('has-nah')}}return}
 return _open(s)};
try{openSpot=window.openSpot}catch(e){}
})();

// Testmappe (nur im Testlink): alle Papierblätter beider Rollen direkt in der App ansehen, ohne Ausdruck
(function(){
const P=()=>{try{return PROBE}catch(e){return false}};
const sortNo=(a,b)=>a[1].no.localeCompare(b[1].no,undefined,{numeric:true});
const pv=id=>{const d=DOCS[id];if(!d||!d.html)return;try{SFX.paper()}catch(e){}
 viewer('<p class="v-cap top">'+(d.no?'Blatt '+d.no+' · ':'')+'Testansicht des Papierblatts <button class="pv-zoom" type="button">Vergrößern</button></p><div class="pv-fit"><div class="pv-sheet">'+d.html()+'</div></div>');
 requestAnimationFrame(()=>{const f=document.querySelector('#v-body .pv-fit'),sh=f&&f.firstChild,z=document.querySelector('#v-body .pv-zoom');if(!sh)return;
  const meas=()=>{const L=sh.getBoundingClientRect().left;let R=0;sh.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(q.width>0)R=Math.max(R,q.right-L)});return Math.ceil(Math.max(R,sh.scrollWidth))};
  const fit=()=>{sh.style.transform='';sh.style.width='';f.style.height='';const W=f.clientWidth;let N=meas();if(N>W+1)N=Math.max(N,720);for(let i=0;i<4&&N>W+1;i++){sh.style.width=N+'px';const M=meas();if(M<=N+1)break;N=M}if(N>W+1){sh.style.width=N+'px';const L=sh.getBoundingClientRect().left;let a=1e9,R=0;[...sh.children].forEach(c=>[c,...c.querySelectorAll('*')].forEach(e=>{const q=e.getBoundingClientRect();if(q.width>0&&q.height>0){a=Math.min(a,q.left-L);R=Math.max(R,q.right-L)}}));if(a>1e8)a=0;const C=Math.max(R-a,10),k=Math.min(1,W/C);sh.style.transform='scale('+k+') translateX('+(-a)+'px)';f.style.height=sh.scrollHeight*k+'px';z.style.display=''}else z.style.display='none'};
  fit();z.onclick=()=>{const on=f.classList.toggle('big');z.textContent=on?'Ganzes Blatt':'Vergrößern';if(on){sh.style.transform='';f.style.height=''}else fit()}})};
window.pvDoc=pv;
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pdoc]');if(!b||!P())return;e.preventDefault();e.stopPropagation();pv(b.dataset.pdoc)},true);
const btn=id=>DOCS[id]?'<button class="btn sm pv-doc" data-pdoc="'+id+'">'+DOCS[id].no+' ansehen: '+DOCS[id].title+'</button>':'';
// Umschläge, die die App öffnen lässt
const _env=window.envOpen;if(_env){window.envOpen=function(ids){const h=_env(ids);return P()?h+'<div class="pv-row">'+ids.map(btn).join('')+'</div>':h}}
// Papierliste im Tag
if(typeof MODS!=='undefined'&&MODS.paper){const _p=MODS.paper;MODS.paper=function(x){const w=_p(x);if(P())w.querySelectorAll('.pp-it').forEach((it,i)=>{const id=x.items[i];if(id){it.dataset.pdoc=id;it.classList.add('pv-it')}});return w}}
// Umschlag Stellen im Raum
const _os=window.openSpot;window.openSpot=function(s){const r=_os(s);try{if(P()&&s&&s.open&&s.open.t==='env'&&DOCS[s.open.id]){const vb=document.querySelector('#v-body');if(vb)vb.insertAdjacentHTML('beforeend','<div class="pv-row">'+btn(s.open.id)+'</div>')}}catch(e){}return r};
try{openSpot=window.openSpot}catch(e){}
// Knopf auf dem Schreibtisch
function mappe(){const all=Object.entries(DOCS).filter(([id,d])=>d&&d.no&&d.html);
 const grp=(r,t)=>'<div class="pv-grp"><div class="kick">'+t+'</div>'+all.filter(([id,d])=>d.role===r).sort(sortNo).map(([id,d])=>'<button class="pv-li" data-pdoc="'+id+'"><b>'+d.no+'</b><span>'+d.title+(d.sealed?'<i>Umschlag, Tag '+d.day+'</i>':'<i>offen von Anfang an</i>')+'</span></button>').join('')+'</div>';
 viewer('<div class="pv-mappe"><p class="v-cap top">Testmappe: alle Papierblätter, wie sie im PDF liegen. Diese Ansicht gibt es nur im Testlink.</p>'+grp(ROLE,ROLE==='B'?'Deine Fallakte (B)':'Deine Unterlagen (A)')+grp(ROLE==='B'?'A':'B',ROLE==='B'?'Unterlagen des Partners vor Ort (A)':'Fallakte des Partners im Präsidium (B)')+'</div>')}
const _rd=window.renderDesk;window.renderDesk=function(){_rd.apply(this,arguments);if(!P())return;const f=document.querySelector('#deskfoot');if(f&&!f.querySelector('#btn-pmappe')){const b=document.createElement('button');b.className='btn ghost sm desk-film';b.id='btn-pmappe';b.textContent='Testmappe: alle Papierblätter';b.onclick=()=>{try{ac()}catch(e){}mappe()};f.appendChild(b)}};
try{renderDesk=window.renderDesk}catch(e){}
})();

// Ende des Intros: Übergang zur Akte
(function(){const _fe=window.filmEnd;if(!_fe)return;window.filmEnd=function(){_fe.apply(this,arguments);const t=document.querySelector('#film-end-t'),b=document.querySelector('#btn-film-go');let kitOk=false;try{kitOk=!!(st.kit&&st.kit.ok)}catch(e){}
 if(t)t.innerHTML=(ROLE==='B'?'Das Präsidium wartet auf dich. Bevor du loslegst, leg deine ausgedruckte Fallakte bereit.':'Das Berghotel wartet auf dich. Bevor du loslegst, leg deine ausgedruckten Unterlagen bereit.')+'<span class="fe-sm">Die verschlossenen Umschläge bleiben zu, bis die App dich bittet, einen zu öffnen.</span>';
 if(b&&!kitOk)b.textContent=ROLE==='B'?'Fallakte vorbereiten':'Unterlagen vorbereiten'};try{filmEnd=window.filmEnd}catch(e){}})();
