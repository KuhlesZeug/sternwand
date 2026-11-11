'use strict';
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const params=new URLSearchParams(location.search);
const ROLE=(params.get('r')||'').toUpperCase()==='B'?'B':'A';
const KEY='kz_sternwand_v1_'+ROLE;
let st={act:0,solved:{},hint:{},sound:true,seen:{},me:'',pa:'',intro:0,kit:{}};
try{Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
if(params.get('reset')==='1'&&params.get('probe')){st={act:0,solved:{},hint:{},sound:true,seen:{},me:'',pa:'',intro:0,kit:{}}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const RN={A:'Ermittlung vor Ort',B:'Präsidium im Tal'};
const esc=t=>String(t||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T=t=>String(t||'').replace(/\{N\}/g,esc(st.me)||'du').replace(/\{P\}/g,esc(st.pa)||(ROLE==='A'?'das Präsidium':'die Ermittlung vor Ort'));
const RD={A:'Du ermittelst vor Ort im eingeschneiten Hotel',B:'Du ermittelst im Präsidium im Tal'};

// Testmodus
let PROBE=false;const ready=(async()=>{const q=params.get('probe');if(q&&['747d0d509e349f606cddf94e726f2ec3667112646ac24b6fcdba8903e754d750','db9895336cf3d8e262f67463d3a8a6cdb4733130c1fe1f00c83d8ed6b4106e1c'].includes(await kzSha(q)))PROBE=true})();
function berlin(){const p=new Intl.DateTimeFormat('de-DE',{timeZone:'Europe/Berlin',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());const o={};p.forEach(x=>o[x.type]=+x.value);return o}
function unlocked(d){if(PROBE)return true;const b=berlin();if(b.month===12)return b.day>=d;if(b.month===1||b.month===2)return true;return false}
function maxDay(){let m=0;for(let d=1;d<=24;d++)if(unlocked(d)&&DAYS[d])m=d;return m}

// Ton
let AC=null,master=null;
function ac(){if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=st.sound?1:0;master.connect(AC.destination)}if(AC.state==='suspended')AC.resume();return AC}
function tone(f,d,type,v,t0){const c=ac(),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=f;const t=c.currentTime+(t0||0);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v||.2,t+.01);g.gain.exponentialRampToValueAtTime(.0005,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05)}
function noise(d,f,q,v,t0){const c=ac(),n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),x=b.getChannelData(0);for(let i=0;i<n;i++)x[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const bf=c.createBiquadFilter();bf.type='bandpass';bf.frequency.value=f;bf.Q.value=q||1;const g=c.createGain();const t=c.currentTime+(t0||0);g.gain.setValueAtTime(v||.2,t);g.gain.exponentialRampToValueAtTime(.0005,t+d);s.connect(bf);bf.connect(g);g.connect(master);s.start(t)}
const SFX={
 tap:()=>tone(660,.06,'triangle',.05),
 paper:()=>{noise(.25,2400,.7,.12);noise(.18,1200,.8,.08,.08)},
 bell:()=>{[1568,2349,3136].forEach((f,i)=>tone(f,1.6-i*.3,'sine',.16/(i+1)))},
 ok:()=>{[523,659,784,1047].forEach((f,i)=>tone(f,.5,'triangle',.09,i*.09))},
 no:()=>{tone(180,.25,'square',.05);tone(140,.3,'square',.05,.12)},
 door:()=>{noise(.5,300,.6,.25);tone(90,.4,'sine',.15,.05)}
};
let windOn=false;function wind(){if(windOn||!st.sound)return;windOn=true;const c=ac(),n=c.sampleRate*4,b=c.createBuffer(1,n,c.sampleRate),x=b.getChannelData(0);let l=0;for(let i=0;i<n;i++){l=(l+.02*(Math.random()*2-1))/1.02;x[i]=l*3}const s=c.createBufferSource();s.buffer=b;s.loop=true;const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=500;const g=c.createGain();g.gain.value=.05;const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.08;lg.gain.value=.035;lfo.connect(lg);lg.connect(g.gain);s.connect(f);f.connect(g);g.connect(master);s.start();lfo.start()}
let curAudio=null;
function stopAudio(){if(curAudio){try{curAudio.pause()}catch(e){}curAudio._ui&&curAudio._ui(false)}curAudio=null}
function setSound(on){st.sound=on;save();if(master)master.gain.value=on?1:0;if(!on)stopAudio();if(on&&AC){const sc=document.querySelector('.screen.on');sc&&mood('#'+sc.id)}['#btn-sound'].forEach(s=>$(s)&&($(s).innerHTML=on?KI.sound:KI.mute))}

// Schnee
(function(){const c=$('#snow'),x=c.getContext('2d');let W,H,fl=[];function rs(){W=c.width=innerWidth*devicePixelRatio;H=c.height=innerHeight*devicePixelRatio;fl=Array.from({length:Math.min(140,Math.floor(innerWidth/4))},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.8+.6)*devicePixelRatio,s:Math.random()*.6+.3,w:Math.random()*2}))}rs();addEventListener('resize',rs);
 (function f(){x.clearRect(0,0,W,H);x.fillStyle='rgba(255,255,255,.75)';fl.forEach(p=>{p.y+=p.s*devicePixelRatio*1.4;p.x+=Math.sin((p.y/H)*6+p.w)*.6*devicePixelRatio+.5;if(p.y>H){p.y=-5;p.x=Math.random()*W}if(p.x>W)p.x=0;x.beginPath();x.arc(p.x,p.y,p.r,0,6.3);x.fill()});requestAnimationFrame(f)})()})();

const SCAPE_DEF={A:{1:'lobby',2:'room',3:'kitchen'},B:{1:'office',2:'office',3:'faxroom'}};
function mood(id){if(!AC||!st.sound)return;if(id==='#s-day'){const D=DAYS[curDay];AMBI.scape((D&&D[ROLE].amb)||SCAPE_DEF[ROLE][curDay]||(ROLE==='B'?'office':'room'));AMBI.music(true,.22)}else if(id==='#s-akte'||id==='#s-kit'){AMBI.scape(ROLE==='B'?'office':'room');AMBI.music(true,.35)}else{AMBI.scape('storm');AMBI.music(true,.55)}}
function show(id){setTimeout(()=>mood(id),50);document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const s=$(id);s.classList.add('on');s.scrollTop=0;window.scrollTo(0,0);$('#snow').style.display=(id==='#s-start'||id==='#s-desk'||id==='#s-name')?'block':'none'}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2800)}
const norm=s=>(s||'').toUpperCase().replace(/Ä/g,'AE').replace(/Ö/g,'OE').replace(/Ü/g,'UE').replace(/ß/g,'SS').replace(/[^A-Z0-9]/g,'');

// Start
$('#role-badge').innerHTML='<span>'+(ROLE==='A'?'Rolle A':'Rolle B')+'</span>'+RD[ROLE];
if(st.act)$('#codebox').style.display='none';
$('#btn-start').onclick=async()=>{ac();await ready;if(!st.act){const v=kzNormCode($('#code').value);if(!(v&&await kzSha(v)===KZ_H)){SFX.no();toast('Der Zugangscode stimmt nicht.');return}st.act=1;save()}SFX.door();next()};
function next(){if(!st.me)return goName();if(!st.intro)return goIntro();if(!st.kit.ok)return goKit();goDesk()}
$('#code').addEventListener('keydown',e=>{if(e.key==='Enter')$('#btn-start').click()});

// Namen
function goName(){$('#name-kick').textContent=ROLE==='A'?'Rolle A · Ermittlung vor Ort':'Rolle B · Präsidium im Tal';
 $('#name-lead').textContent=ROLE==='A'?'Du bist oben im Hotel. Dein Partner sitzt im Präsidium im Tal.':'Du sitzt im Präsidium im Tal. Dein Partner ist oben im Hotel.';
 $('#nm-pa-l').textContent=ROLE==='A'?'Wer sitzt im Präsidium?':'Wer ist oben im Hotel?';$('#nm-me').value=st.me;$('#nm-pa').value=st.pa;show('#s-name')}
$('#btn-name').onclick=()=>{ac();const a=$('#nm-me').value.trim(),b=$('#nm-pa').value.trim();if(!a||!b){SFX.no();toast('Tragt bitte beide Namen ein.');return}st.me=a;st.pa=b;save();SFX.paper();next()};
['#nm-me','#nm-pa'].forEach(i=>$(i).addEventListener('keydown',e=>{if(e.key==='Enter')$('#btn-name').click()}));

// Intro Film
let film=null;
function goIntro(){const I=INTRO[ROLE],f=$('#film');f.innerHTML='';stopAudio();$('#film-end').classList.remove('on');$('#btn-skip').classList.remove('off');
 I.slides.forEach((x,i)=>{const d=el('div','fs'+(x.title?' ft':'')+(x.fx==='cut'?' cut':''));const nx=I.slides[i+1];const dur=((nx?nx.t:I.end)-x.t)+1.4;
  if(x.img){const im=el('img');im.src=x.img;im.alt='';im.loading='eager';const k=x.k||[1.04,1.16,'0,0','0,0'];const [x0,y0]=k[2].split(','),[x1,y1]=k[3].split(',');
   d.style.cssText='--s0:'+k[0]+';--s1:'+k[1]+';--x0:'+x0+';--y0:'+y0+';--x1:'+x1+';--y1:'+y1+';--dur:'+dur+'s';d.appendChild(im);if(x.fx==='flicker')d.classList.add('flick')}else d.innerHTML='<div class="ft-in">'+T(x.s)+'</div>';f.appendChild(d)});
 f.appendChild(el('div','flash'));
 $('#film-sub').classList.remove('on');$('#film-prog').style.width='0';$('#btn-film').classList.remove('off');show('#s-intro');$('#snow').style.display='none'}
$('#btn-film').onclick=()=>{ac();$('#btn-film').classList.add('off');playFilm()};
function playFilm(){const I=INTRO[ROLE],sl=[...$('#film').querySelectorAll('.fs')],sub=$('#film-sub'),fl=$('#film .flash');let cur=-1,lastSub='';
 const au=new Audio(I.vo);curAudio=au;AMBI.scape('storm');AMBI.music(true,.4);AMBI.duck(true);au.onended=()=>{AMBI.duck(false);if(useAu){t0=performance.now()-(au.duration||au.currentTime)*1000;useAu=false}};let t0=performance.now(),useAu=false;
 au.play().then(()=>{useAu=true}).catch(()=>{});
 function tick(){if(film!==tick)return;const t=useAu&&!au.error?au.currentTime:(performance.now()-t0)/1000;
  let k=0;I.slides.forEach((x,i)=>{if(t>=x.t)k=i});
  if(k!==cur){const x=I.slides[k];sl.forEach((e,i)=>{if(i===k){e.classList.remove('on','was');void e.offsetWidth;e.classList.add('on')}else if(e.classList.contains('on')){e.classList.add('was');e.classList.remove('on');clearTimeout(e._w);e._w=setTimeout(()=>e.classList.remove('was'),1800)}});
   if(x.fx==='flash'){fl.classList.remove('go');void fl.offsetWidth;fl.classList.add('go')}
   if(x.sfx&&AMBI.sfx[x.sfx])setTimeout(()=>AMBI.sfx[x.sfx](),(x.sfxAt||0)*1000);
   if(x.title){sub.classList.remove('on')}else if(x.s!==lastSub){sub.classList.remove('on');lastSub=x.s;setTimeout(()=>{sub.innerHTML=T(x.s);sub.classList.add('on')},x.fx==='cut'?60:220)}
   cur=k}
  $('#film-prog').style.width=Math.min(100,t/I.end*100)+'%';
  if(t>=I.end){filmEnd();return}requestAnimationFrame(tick)}
 film=tick;requestAnimationFrame(tick)}
function filmEnd(){film=null;AMBI.duck(false);$('#film-prog').style.width='100%';$('#btn-skip').classList.add('off');$('#film-sub').classList.remove('on');$('#film-end-t').textContent=ROLE==='B'?'Das Präsidium wartet auf dich.':'Das Berghotel wartet auf dich.';$('#film-end').classList.add('on')}
$('#btn-film-go').onclick=()=>{ac();SFX.door&&SFX.door();filmDone()};
function filmDone(){film=null;$('#film-end').classList.remove('on');$('#btn-skip').classList.remove('off');stopAudio();AMBI.duck(false);st.intro=1;save();next()}
$('#btn-skip').onclick=()=>{ac();filmDone()};

// Bastelkarte
function goKit(){const K=KIT[ROLE];$('#kit-kick').textContent=RN[ROLE];$('#kit-title').textContent='Bevor die erste Tür aufgeht';const k=$('#kit');k.innerHTML='';
 const c=el('div','kit-card','<h3>'+K.title+'</h3><p class="sub">'+K.sub+'</p>');const ul=el('ul','kit-list');
 const all=Object.entries(DOCS).filter(([id,d])=>d.role===ROLE&&d.no).sort((a,b)=>a[1].no.localeCompare(b[1].no,undefined,{numeric:true}));
 const row=(n,t,i,key)=>{const li=el('li','','<span class="n">'+n+'</span><span><b>'+t+'</b><i>'+i+'</i></span>');const b=el('button','kit-chk'+(st.kit[key]?' on':''),st.kit[key]?KI.check:'');b.setAttribute('aria-label','erledigt');b.onclick=()=>{SFX.tap();st.kit[key]=!st.kit[key];save();b.classList.toggle('on',!!st.kit[key]);b.innerHTML=st.kit[key]?KI.check:''};li.appendChild(b);return li};
 ul.appendChild(el('li','kit-sep','Offen bereitlegen'));K.open.forEach(id=>ul.appendChild(row(DOCS[id].no,DOCS[id].title,K.tips[id]||'',id)));
 const seal=all.filter(([id,d])=>d.sealed);ul.appendChild(el('li','kit-sep','Versiegeln, nicht hineinschauen'));
 ul.appendChild(row(seal.map(([id,d])=>d.no).join(', '),seal.length+' Umschläge','Falten, Banderole mit der passenden Nummer quer darüberlegen, Enden hinten festkleben, beiseitelegen.','seal'));
 c.appendChild(ul);c.appendChild(el('p','pp-note',K.mat));k.appendChild(c);
 const f=el('div','kit-foot');const go=el('button','btn big','Alles liegt bereit');go.onclick=()=>{ac();SFX.door();st.kit.ok=1;save();goDesk()};f.appendChild(go);
 const again=el('button','btn ghost sm desk-film','Intro noch einmal ansehen');again.onclick=()=>{st.intro=0;save();goIntro()};f.appendChild(again);k.appendChild(f);show('#s-kit')}

// Flur mit 24 Türen
function goDesk(){stopAudio();renderDesk();show('#s-desk')}
function newTrail(d){const D=DAYS[d];if(!D)return false;return ['A','B'].includes(ROLE)&&(D[ROLE].mods||[]).some(m=>(m.spots||[]).some(s=>s.after&&st.solved[s.after]&&!(st.trail||{})[d+'_'+s.label]))}
function renderDesk(){$('#desk-kick').textContent=RN[ROLE];const g=$('#doors');g.innerHTML='';let n=0;
 for(let d=1;d<=24;d++){const has=!!DAYS[d],open=unlocked(d),done=!!st.solved[d];if(done)n++;
  const RL=ROLE==='B'?ROOMS_B:ROOMS;
  const b=el('button','door'+(done?' done':'')+(!open||!has?' shut':''),'<span class="dimg" style="background-image:url(a/door_'+(ROLE==='B'?'b':'a')+String((DOORS[ROLE==='B'?'B':'A']||[])[d-1]||d).padStart(2,'0')+'.jpg?v=5)"></span><span class="dn">'+d+'</span><span class="dr">'+(RL[d-1]||'')+'</span>'+(newTrail(d)?'<span class="dnew">Neue Spur</span>':'')+(done?'<span class="dok">'+KI.check+'</span>':(!open||!has?'<span class="dlk">'+KI.lock+'</span>':'')));
  b.onclick=()=>{ac();if(!has){toast(open?'Diese Tür ist noch in Arbeit.':'Diese Tür öffnet sich am '+d+'. Dezember.');return}if(!open){toast('Diese Tür öffnet sich am '+d+'. Dezember.');return}SFX.door();openDay(d)};g.appendChild(b)}
 $('#desk-lead').textContent=n?'Gelöst: '+n+' von 24 Türen. Was heute geschieht, löst ihr nur gemeinsam.':'Jeden Tag öffnet sich eine Tür. Ihr seht beide nur eure Hälfte. Redet miteinander.';
 $('#deskfoot').innerHTML=(PROBE?'Testmodus: alle vorhandenen Türen offen':'Verpasste Tage lassen sich jederzeit nachholen.')+'<br><button class="btn ghost sm desk-film" id="btn-kit">Unterlagen und Intro</button>';$('#btn-kit').onclick=()=>{ac();SFX.paper();goKit()}}

// Tag
let curDay=0;
function openDay(d){curDay=d;const D=DAYS[d],R=D[ROLE];stopAudio();show('#s-day');
 $('#day-kick').textContent='Tür '+d+' · '+RN[ROLE];$('#day-title').textContent=(ROLE==='B'?ROOMS_B:ROOMS)[d-1]||(ROLE==='B'&&D.roomB?D.roomB:D.room);
 const sc=$('#scene');sc.innerHTML='';const vo=el('button','vo','<span class="vo-ic">'+KI.play+'</span><span>Szene anhören</span>');sc.appendChild(vo);const p=el('p','scene-t',T(R.scene));sc.appendChild(p);sc.appendChild(el('div','partner',(ROLE==='A'?'Im Präsidium am Telefon: ':'Oben im Hotel: ')+'<b>'+T('{P}')+'</b>'));
 bindVoice(vo,R.vo);if(st.sound)setTimeout(()=>vo.click(),400);
 const m=$('#mods');m.innerHTML='';R.mods.forEach(x=>m.appendChild(MODS[x.t](x)));
 const cc=$('#codecard'),rv=$('#reveal');$('#daycode').value='';
 renderHints();
 if(st.solved[d]){cc.classList.add('solved');showReveal(false)}else{cc.classList.remove('solved');rv.classList.remove('on');rv.innerHTML=''}
 st.seen[d]=1;save()}
function bindVoice(btn,src){if(!src){btn.style.display='none';return}const au=new Audio(src);au.preload='none';au.onerror=()=>{btn.classList.add('na');const sp=btn.querySelector('span:last-child');if(sp&&!sp.classList.contains('vo-ic'))sp.textContent='Stimme folgt'};
 au._ui=on=>{AMBI.duck(on);btn.classList.toggle('on',on);btn.querySelector('.vo-ic').innerHTML=on?KI.pause:KI.play};au.onended=()=>au._ui(false);
 btn.onclick=()=>{ac();if(btn.classList.contains('na'))return;if(curAudio===au&&!au.paused){au.pause();au._ui(false);return}stopAudio();curAudio=au;if(!st.sound){toast('Ton ist aus.');return}au.play().then(()=>au._ui(true)).catch(()=>{})}}
function renderHints(){const h=$('#hints'),D=DAYS[curDay],L=D.hints[ROLE],k=curDay+ROLE,n=st.hint[k]||0;h.innerHTML='';
 L.forEach((t,i)=>{if(i<n){const d=el('div','hint','<span><b>Tipp '+(i+1)+'</b> '+t+'</span>');const src=hintSrc(i);if(src){const vb=el('button','hint-vo','<span class="vo-ic">'+KI.play+'</span>');vb.setAttribute('aria-label','Tipp anhören');d.prepend(vb);bindVoice(vb,src)}h.appendChild(d)}});
 if(n<L.length&&!st.solved[curDay]){const b=el('button','btn ghost sm','<span>'+KI.hint+'</span> Tipp '+(n+1)+' ansehen');b.onclick=()=>{SFX.paper();st.hint[k]=n+1;save();renderHints();if(st.sound){const vb=h.querySelectorAll('.hint-vo')[n];vb&&setTimeout(()=>vb.click(),250)}};h.appendChild(b)}}
function hintSrc(i){const D=DAYS[curDay];return D.hintVo&&D.hintVo[ROLE]&&D.hintVo[ROLE][i]||null}
$('#btn-check').onclick=async()=>{ac();const v=norm($('#daycode').value);if(!v)return;const D=DAYS[curDay];
 if(await kzSha('sw|'+curDay+'|'+v)===D.code){st.solved[curDay]=1;save();AMBI.sfx.stamp();setTimeout(SFX.ok,250);$('#codecard').classList.add('solved');showReveal(true)}else{SFX.no();const c=$('#codecard');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');toast('Das passt nicht. Habt ihr alles verglichen?')}};
$('#daycode').addEventListener('keydown',e=>{if(e.key==='Enter')$('#btn-check').click()});
function showReveal(play){const D=DAYS[curDay],rv=$('#reveal');rv.innerHTML='';rv.appendChild(el('div','rv-k','Erkenntnis'));const vo=el('button','vo','<span class="vo-ic">'+KI.play+'</span><span>Anhören</span>');rv.appendChild(vo);rv.appendChild(el('p','',T(D.reveal.text)));
 const nx=el('button','btn','Zurück zum Flur');nx.onclick=goDesk;rv.appendChild(nx);rv.classList.add('on');bindVoice(vo,D.reveal.vo);if(play){setTimeout(()=>{rv.scrollIntoView({behavior:'smooth',block:'start'});if(st.sound)vo.click()},300)}}
$('#btn-back').onclick=goDesk;

// Module
const MODS={
 room(x){const w=el('div','mod room');w.appendChild(el('div','mod-h','<span>'+KI.eye+'</span>'+x.label+'<i>Tippe auf Stellen, die dir auffallen</i>'));const f=el('div','roomimg');const im=el('img');im.src=x.img;im.alt=x.label;f.appendChild(im);
  x.spots.filter(s=>!s.after||st.solved[s.after]).forEach(s=>{const b=el('button','spot'+(s.after?' new':''));b.style.left=(s.x*100)+'%';b.style.top=(s.y*100)+'%';b.style.width=(s.w*100)+'%';b.style.height=(s.h*100)+'%';b.setAttribute('aria-label',s.label);b.appendChild(el('span','glint'));b.onclick=()=>{ac();const L=s.label;(/Telefon/.test(L)?AMBI.sfx.pickup:/Schrank|Spind|Regal/.test(L)?AMBI.sfx.drawer:/Tür|Fenster/.test(L)?AMBI.sfx.creak:AMBI.sfx.click)();b.classList.add('seen');if(s.after){st.trail=st.trail||{};st.trail[curDay+'_'+s.label]=1;save()}openSpot(s)};f.appendChild(b)});
  w.appendChild(f);return w},
 audio(x){const w=el('div','mod audio');w.innerHTML='<div class="au-face"><img src="'+x.img+'" alt=""></div><div class="au-main"><div class="au-who">'+x.who+'</div><div class="au-lab">'+x.label+'</div><div class="au-bar"><i></i></div><div class="au-row"><button class="btn sm au-play"><span>'+KI.play+'</span> Abspielen</button><button class="btn ghost sm au-tx">Mitschrift</button></div><div class="au-script">'+x.script+'</div></div>';
  const au=new Audio(x.src);au.preload='none';const pb=w.querySelector('.au-play'),bar=w.querySelector('.au-bar i');
  au._ui=on=>{AMBI.duck(on);pb.innerHTML='<span>'+(on?KI.pause:KI.play)+'</span> '+(on?'Pause':'Abspielen')};au.ontimeupdate=()=>{if(au.duration)bar.style.width=(au.currentTime/au.duration*100)+'%'};au.onended=()=>au._ui(false);
  au.onerror=()=>{pb.disabled=true;pb.innerHTML='Stimme folgt';w.querySelector('.au-script').classList.add('on')};
  pb.onclick=()=>{ac();if(curAudio===au&&!au.paused){au.pause();au._ui(false);return}stopAudio();curAudio=au;au.play().then(()=>au._ui(true)).catch(()=>{})};
  w.querySelector('.au-tx').onclick=()=>w.querySelector('.au-script').classList.toggle('on');return w},
 paper(x){const w=el('div','mod paper','<div class="pp-h">'+x.h+'</div><div class="pp-t">'+x.title+'</div>'+x.items.map(id=>{const d=DOCS[id];return '<div class="pp-it"><span class="n">'+d.no+'</span><span>'+(x.open&&d.sealed?'Umschlag '+d.no+' öffnen: ':'')+d.title+'</span></div>'}).join('')+'<p class="pp-note">'+T(x.note)+'</p>');w.onclick=()=>SFX.paper();return w},
 doc(x){const d=DOCS[x.id];const w=el('button','mod docl','<span class="dl-ic">'+KI.doc+'</span><span><b>'+(ROLE==='B'?'Fallakte':'Tatortmappe')+': '+d.title+'</b><i>Liegt auch ausgedruckt vor dir</i></span>');w.onclick=()=>{SFX.paper();openAkte(x.id)};return w},
 web(x){const w=el('a','mod docl web','<span class="dl-ic">'+KI.web+'</span><span><b>'+x.label+'</b><i>'+x.note+'</i></span>');w.href=x.url;w.target='_blank';w.rel='noopener';return w}
};
function openSpot(s){const o=s.open;if(window.OPEN_X&&OPEN_X[o.t])return OPEN_X[o.t](o,s);if(o.t==='sfx'){SFX[o.k]&&SFX[o.k]();toast(o.cap);return}
 if(o.t==='fax')return faxIn(o);if(o.t==='pc')return pcOpen(o);if(o.t==='wall')return wallOpen();if(o.t==='pile')return pileOpen(o);
 if(o.t==='env'){const d=DOCS[o.id];st.env=st.env||{};st.env[o.id]=1;save();viewer('<div class="note env"><div class="sl-h">Fundstück</div><p>'+o.cap+'</p><div class="env-big"><span>Öffne jetzt</span><b>Umschlag '+d.no+'</b><i>'+d.title+'</i></div></div>');return}
 let h='';if(o.t==='zoom')h='<img class="v-img" src="'+o.img+'" alt=""><p class="v-cap">'+(o.cap||'')+'</p>';
 if(o.t==='text')h='<div class="note"><div class="sl-h">'+s.label+'</div><p>'+T(o.cap)+'</p></div>';
 if(o.t==='doc')h=(o.cap?'<p class="v-cap top">'+o.cap+'</p>':'')+DOCS[o.id].html();
 viewer(h)}
// Präsidium: Fax, Dienstrechner, Ermittlungswand, Stapel
function envOpen(ids){setTimeout(()=>AMBI.sfx.tear(),300);st.env=st.env||{};ids.forEach(i=>st.env[i]=1);save();return '<div class="env-big"><span>Öffne jetzt</span>'+ids.map(i=>'<b>Umschlag '+DOCS[i].no+'</b><i>'+DOCS[i].title+'</i>').join('')+'</div>'}
function faxIn(o){viewer('<div class="fax"><div class="fax-dev"><img src="a/in_b3.jpg" alt=""></div><div class="fax-lcd" id="fax-lcd">EMPFANG …</div><div class="fax-paper" id="fax-paper"><div class="fp-h">'+o.from+'</div><div class="fp-l"></div><div class="fp-l"></div><div class="fp-l s"></div><div class="fp-l"></div><div class="fp-l s"></div></div><div class="fax-out" id="fax-out"></div></div>');
 ac();AMBI.sfx.fax();
 setTimeout(()=>{const l=$('#fax-lcd');if(l)l.textContent=(o.pages||1)+' SEITE'+((o.pages||1)>1?'N':'')+' OK';const f=$('#fax-out');if(f)f.innerHTML='<p class="v-cap">'+o.cap+'</p>'+envOpen(o.items)},4200)}
const PC_APPS={db:{n:'Kripo Datenbank',im:'icon_db'},mail:{n:'Postfach',im:'icon_mail'},hr:{n:'Handelsregister',im:'icon_hr',day:4},web:{n:'Hotel Website',im:'icon_web',day:6},ar:{n:'Archiv Hochtaler Bote',im:'icon_ar',day:8},lab:{n:'Laborportal Bergklinik',im:'icon_lab',day:16}};
const MAILS=[{d:1,f:'Leitstelle Hochtal',s:'Todesermittlung Berghotel Sternwand',b:'Einsatz übernommen. Straße und Seilbahn gesperrt, keine Anfahrt möglich. Vor Ort ist eine Kollegin oder ein Kollege der Kripo im Urlaub. Kontakt nur telefonisch. Unterlagen kommen per Fax.'},
 {d:2,f:'IT Präsidium',s:'Datenbank im Notfallbetrieb',b:'Wegen des Sturms läuft die Datenbank im Notfallbetrieb. Anmeldung mit der Dienstnummer der Ermittlung vor Ort, siehe Zugangsblatt. Kein Passwort nötig.'},
 {d:3,f:'Hausdienst Präsidium',s:'Faxraum',b:'Durch den Sturm gab es heute Nacht Stromschwankungen. Das Gerät im Faxraum hat alle Eingänge auf einen Haufen ausgedruckt. Bitte die eigenen Faxe selbst heraussuchen.'}];
function pcOpen(o){const m=maxDay();const appsH=Object.entries(PC_APPS).map(([k,a])=>{const lock=a.day&&a.day>m;return '<button class="pc-ic'+(lock?' lock':'')+'" data-k="'+k+'"><span class="pc-g"><img src="a/'+a.im+'.jpg" alt=""></span><span>'+a.n+'</span></button>'}).join('');
 AMBI.sfx.boot();viewer('<div class="pc"><div class="pc-top"><span>'+((o&&o.title)||'Dienstrechner · K1')+'</span><span>'+esc(st.me)+'</span></div><div class="pc-desk" id="pc-desk">'+appsH+'</div><div class="pc-win" id="pc-win"></div></div>');$('#v-body').classList.add('wide');
 document.querySelectorAll('.pc-ic').forEach(b=>b.onclick=()=>{AMBI.sfx.click();setTimeout(()=>AMBI.sfx.type(6),150);const k=b.dataset.k,a=PC_APPS[k],w=$('#pc-win');if(b.classList.contains('lock')){toast('Kein Zugang. Wird im Lauf der Ermittlung freigeschaltet.');return}
  w.classList.add('on');let h='<div class="pc-bar"><b>'+a.n+'</b><button class="pc-x">schließen</button></div>';
  if(k==='db')h+='<iframe src="db/" class="pc-frame" title="Kripo Datenbank"></iframe>';
  else if(k==='mail'){const L=MAILS.filter(x=>x.d<=Math.max(curDay||1,1)).reverse();h+='<div class="pc-mail">'+L.map((x,i)=>'<details'+(i===0?' open':'')+'><summary><b>'+x.f+'</b><span>'+x.s+'</span></summary><p>'+x.b+'</p></details>').join('')+'</div>'}
  else if(window.PC_RENDER&&PC_RENDER[k])h+='<div class="pc-body" id="pc-body"></div>';
  else h+='<div class="pc-empty">Verbindung wird aufgebaut …</div>';
  w.innerHTML=h;if(window.PC_RENDER&&PC_RENDER[k]&&$('#pc-body'))PC_RENDER[k]($('#pc-body'));w.querySelector('.pc-x').onclick=()=>{w.classList.remove('on');w.innerHTML=''}});
 if(o&&o.app)setTimeout(()=>{const b=document.querySelector('.pc-ic[data-k="'+o.app+'"]');b&&b.click()},350)}
function pileOpen(o){const L=o.sheets.slice().sort(()=>Math.random()-.5);
 viewer('<div class="pile"><p class="v-cap top">'+o.cap+'</p><div class="pile-g">'+L.map((x,i)=>'<button class="pile-s" style="--r:'+((i*37%9)-4)+'deg" data-ok="'+(x.ok?1:0)+'"><span class="ps-h">'+x.h+'</span><span class="ps-l"></span><span class="ps-l s"></span><span class="ps-l"></span><span class="ps-t">'+x.t+'</span></button>').join('')+'</div><div id="pile-out"></div></div>');
 document.querySelectorAll('.pile-s').forEach(b=>b.onclick=()=>{SFX.paper();if(b.dataset.ok==='1'){document.querySelectorAll('.pile-s').forEach(x=>x.disabled=true);b.classList.add('ok');$('#pile-out').innerHTML='<p class="v-cap">'+o.found+'</p>'+envOpen(o.items)}else{b.classList.add('no');toast(b.querySelector('.ps-t').textContent+': nicht das, was du suchst.')}})}
// Ermittlungswand
const WALL=[{k:'konrad',n:'Konrad Wendt',r:'Opfer, Hotelier',d:0},{k:'marlene',n:'Marlene Wendt',r:'Ehefrau, Zimmer 23',d:1},{k:'jonas',n:'Jonas Wendt',r:'Sohn, Zimmer 12',d:1},{k:'ahrens',n:'Dr. Felix Ahrens',r:'Gast, Zimmer 7',d:1},{k:'sophie',n:'Sophie Lang',r:'Gast, Zimmer 15',d:1},{k:'tom',n:'Tom Riedl',r:'Bergführer, Zimmer 2',d:2},{k:'ilse',n:'Ilse Brandt',r:'Köchin, 30 Jahre im Haus',d:3}];
function wallOpen(){let solved=0;for(let d=1;d<=24;d++)if(st.solved[d])solved=d;st.wall=st.wall||{p:{},s:[],n:{}};const W=st.wall;
 const cards=WALL.filter(c=>c.d<=solved);
 viewer('<div class="wall"><div class="wall-tools"><button class="btn sm" id="w-str">Faden spannen</button><button class="btn ghost sm" id="w-clr">Fäden lösen</button></div><div class="wall-b" id="wall-b"><svg class="wall-svg" id="wall-svg"></svg></div><p class="v-cap">Zieh die Karten, wohin du willst. Zum Verbinden auf „Faden spannen“ und dann nacheinander zwei Karten tippen. Tippe auf eine Karte, um eine Notiz zu schreiben.</p></div>');$('#v-body').classList.add('wide');
 const b=$('#wall-b');let mode=false,first=null;
 cards.forEach((c,i)=>{const p=W.p[c.k]||{x:4+(i%3)*33,y:4+Math.floor(i/3)*31};const e=el('div','wc'+(c.k==='konrad'?' vic':''),'<i class="pin"></i><img src="a/p_'+c.k+'.jpg" alt=""><b>'+c.n+'</b><span>'+c.r+'</span><em>'+esc(W.n[c.k]||'')+'</em>');e.dataset.k=c.k;e.style.left=p.x+'%';e.style.top=p.y+'%';b.appendChild(e);
  let sx,sy,ox,oy,mv=false;e.onpointerdown=ev=>{e.setPointerCapture(ev.pointerId);sx=ev.clientX;sy=ev.clientY;ox=parseFloat(e.style.left);oy=parseFloat(e.style.top);mv=false};
  e.onpointermove=ev=>{if(sx==null)return;const r=b.getBoundingClientRect(),dx=(ev.clientX-sx)/r.width*100,dy=(ev.clientY-sy)/r.height*100;if(Math.abs(dx)+Math.abs(dy)>1.5)mv=true;if(mv){e.style.left=Math.max(0,Math.min(72,ox+dx))+'%';e.style.top=Math.max(0,Math.min(74,oy+dy))+'%';lines()}};
  e.onpointerup=()=>{sx=null;if(mv){W.p[c.k]={x:parseFloat(e.style.left),y:parseFloat(e.style.top)};save();AMBI.sfx.pin();return}
   if(mode){if(!first){first=c.k;e.classList.add('sel')}else if(first!==c.k){W.s.push([first,c.k]);save();AMBI.sfx.string();b.querySelectorAll('.wc').forEach(x=>x.classList.remove('sel'));first=null;mode=false;$('#w-str').classList.remove('on');lines()}return}
   openNote(c,e)}});
 function lines(){const svg=$('#wall-svg'),r=b.getBoundingClientRect();svg.setAttribute('viewBox','0 0 '+r.width+' '+r.height);svg.innerHTML=W.s.map(([a,z])=>{const A=b.querySelector('[data-k="'+a+'"]'),Z=b.querySelector('[data-k="'+z+'"]');if(!A||!Z)return'';const p=q=>[q.offsetLeft+q.offsetWidth/2,q.offsetTop+10];const [x1,y1]=p(A),[x2,y2]=p(Z);return '<path d="M'+x1+' '+y1+' Q'+((x1+x2)/2)+' '+(Math.max(y1,y2)+30)+' '+x2+' '+y2+'" />'}).join('')}
 function openNote(c,e){const w=el('div','wn','<b>'+c.n+'</b><textarea maxlength="80" placeholder="Deine Notiz">'+esc(W.n[c.k]||'')+'</textarea><button class="btn sm">Anheften</button>');b.appendChild(w);const ta=w.querySelector('textarea');ta.focus();w.querySelector('button').onclick=()=>{W.n[c.k]=ta.value.trim();save();e.querySelector('em').textContent=W.n[c.k];w.remove();SFX.paper()}}
 $('#w-str').onclick=()=>{mode=!mode;first=null;$('#w-str').classList.toggle('on',mode);b.querySelectorAll('.wc').forEach(x=>x.classList.remove('sel'))};
 $('#w-clr').onclick=()=>{W.s=[];save();lines()};requestAnimationFrame(lines)}

function viewer(h){$('#v-body').classList.remove('wide');$('#v-body').innerHTML=h;const v=$('#viewer');v.classList.add('on');v.setAttribute('aria-hidden','false');SFX.paper()}
$('#v-close').onclick=()=>{const v=$('#viewer');v.classList.remove('on');v.setAttribute('aria-hidden','true')};
$('#viewer').onclick=e=>{if(e.target.id==='viewer')$('#v-close').click()};

// Akte
let akteFrom='#s-desk';
function openAkte(){akteFrom=$('#s-day').classList.contains('on')?'#s-day':'#s-desk';stopAudio();show('#s-akte');$('#akte-kick').textContent=RN[ROLE];$('#akte-title').textContent='Ermittlungsnotizen';$('#akte-tabs').innerHTML='';
 let h='<div class="nb-sec">Ermittlerteam</div><div class="nb-e"><b>'+(ROLE==='A'?'Vor Ort':'Präsidium')+':</b> '+esc(st.me)+'<br><b>'+(ROLE==='A'?'Präsidium':'Vor Ort')+':</b> '+esc(st.pa)+'</div>';
 h+='<div class="nb-sec">Erkenntnisse</div>';let n=0;for(let d=1;d<=24;d++)if(st.solved[d]&&DAYS[d]){n++;h+='<div class="nb-e"><b>Tür '+d+' · '+DAYS[d].room+'</b><br>'+T(DAYS[d].reveal.text)+'</div>'}
 if(!n)h+='<div class="nb-e">Noch nichts gelöst. Alles Weitere steht in deinen ausgedruckten Unterlagen.</div>';
 h+='<div class="nb-sec">'+KIT[ROLE].title+'</div><div class="nb-e">Die Dokumente gibt es nur auf Papier. Leg sie neben dein Handy.</div>';
 $('#akte-page').innerHTML='<div class="paper">'+h+'</div>'}
$('#btn-akte').onclick=()=>openAkte();$('#btn-akte2').onclick=()=>openAkte();$('#btn-akte-back').onclick=()=>{show(akteFrom)};
['#btn-akte','#btn-akte2'].forEach(s=>$(s).innerHTML=KI.akte);$('#btn-back').innerHTML=KI.back;$('#btn-akte-back').innerHTML=KI.back;$('#v-close').innerHTML=KI.close;
$('#btn-sound').onclick=()=>{ac();setSound(!st.sound)};setSound(st.sound);
ready.then(()=>{if(st.act&&params.get('go')==='1')goDesk()});
