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
