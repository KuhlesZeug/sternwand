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
