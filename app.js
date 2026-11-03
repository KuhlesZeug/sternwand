'use strict';
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const params=new URLSearchParams(location.search);
const ROLE=(params.get('r')||'').toUpperCase()==='B'?'B':'A';
const KEY='kz_sternwand_v1_'+ROLE;
let st={act:0,solved:{},hint:{},sound:true,seen:{}};
try{Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
if(params.get('reset')==='1'&&params.get('probe')){st={act:0,solved:{},hint:{},sound:true,seen:{}}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const RN={A:'Ermittlung vor Ort',B:'Präsidium im Tal'};
const RD={A:'Du ermittelst vor Ort im eingeschneiten Hotel',B:'Du ermittelst im Präsidium im Tal'};

// Testmodus
let PROBE=false;const ready=(async()=>{const q=params.get('probe');if(q&&await kzSha(q)==='747d0d509e349f606cddf94e726f2ec3667112646ac24b6fcdba8903e754d750')PROBE=true})();
function berlin(){const p=new Intl.DateTimeFormat('de-DE',{timeZone:'Europe/Berlin',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());const o={};p.forEach(x=>o[x.type]=+x.value);return o}
function unlocked(d){if(PROBE)return true;const b=berlin();if(b.month===12)return b.day>=d;if(b.month===1)return true;return false}
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
function setSound(on){st.sound=on;save();if(master)master.gain.value=on?1:0;if(!on)stopAudio();['#btn-sound'].forEach(s=>$(s)&&($(s).innerHTML=on?KI.sound:KI.mute))}

// Schnee
(function(){const c=$('#snow'),x=c.getContext('2d');let W,H,fl=[];function rs(){W=c.width=innerWidth*devicePixelRatio;H=c.height=innerHeight*devicePixelRatio;fl=Array.from({length:Math.min(140,Math.floor(innerWidth/4))},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.8+.6)*devicePixelRatio,s:Math.random()*.6+.3,w:Math.random()*2}))}rs();addEventListener('resize',rs);
 (function f(){x.clearRect(0,0,W,H);x.fillStyle='rgba(255,255,255,.75)';fl.forEach(p=>{p.y+=p.s*devicePixelRatio*1.4;p.x+=Math.sin((p.y/H)*6+p.w)*.6*devicePixelRatio+.5;if(p.y>H){p.y=-5;p.x=Math.random()*W}if(p.x>W)p.x=0;x.beginPath();x.arc(p.x,p.y,p.r,0,6.3);x.fill()});requestAnimationFrame(f)})()})();

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const s=$(id);s.classList.add('on');s.scrollTop=0;window.scrollTo(0,0);$('#snow').style.display=(id==='#s-start'||id==='#s-desk')?'block':'none'}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2800)}
const norm=s=>(s||'').toUpperCase().replace(/Ä/g,'AE').replace(/Ö/g,'OE').replace(/Ü/g,'UE').replace(/ß/g,'SS').replace(/[^A-Z0-9]/g,'');

// Start
$('#role-badge').innerHTML='<span>'+(ROLE==='A'?'Rolle A':'Rolle B')+'</span>'+RD[ROLE];
if(st.act)$('#codebox').style.display='none';
$('#btn-start').onclick=async()=>{ac();await ready;if(!st.act){const v=kzNormCode($('#code').value);if(!(v&&await kzSha(v)===KZ_H)){SFX.no();toast('Der Zugangscode stimmt nicht.');return}st.act=1;save()}SFX.door();wind();goDesk()};
$('#code').addEventListener('keydown',e=>{if(e.key==='Enter')$('#btn-start').click()});

// Flur mit 24 Türen
function goDesk(){stopAudio();renderDesk();show('#s-desk')}
function renderDesk(){$('#desk-kick').textContent=RN[ROLE];const g=$('#doors');g.innerHTML='';let n=0;
 for(let d=1;d<=24;d++){const has=!!DAYS[d],open=unlocked(d),done=!!st.solved[d];if(done)n++;
  const b=el('button','door'+(done?' done':'')+(!open||!has?' shut':''),'<span class="dn">'+d+'</span><span class="dr">'+(ROOMS[d-1]||'')+'</span>'+(done?'<span class="dok">'+KI.check+'</span>':(!open||!has?'<span class="dlk">'+KI.lock+'</span>':'')));
  b.onclick=()=>{ac();if(!has){toast(open?'Diese Tür ist noch in Arbeit.':'Diese Tür öffnet sich am '+d+'. Dezember.');return}if(!open){toast('Diese Tür öffnet sich am '+d+'. Dezember.');return}SFX.door();openDay(d)};g.appendChild(b)}
 $('#desk-lead').textContent=n?'Gelöst: '+n+' von 24 Türen. Was heute geschieht, löst ihr nur gemeinsam.':'Jeden Tag öffnet sich eine Tür. Ihr seht beide nur eure Hälfte. Redet miteinander.';
 $('#deskfoot').textContent=PROBE?'Testmodus: alle vorhandenen Türen offen':'Verpasste Tage lassen sich jederzeit nachholen.'}

// Tag
let curDay=0;
function openDay(d){curDay=d;const D=DAYS[d],R=D[ROLE];stopAudio();show('#s-day');
 $('#day-kick').textContent='Tür '+d+' · '+RN[ROLE];$('#day-title').textContent=D.room;
 const sc=$('#scene');sc.innerHTML='';const vo=el('button','vo','<span class="vo-ic">'+KI.play+'</span><span>Szene anhören</span>');sc.appendChild(vo);const p=el('p','scene-t',R.scene);sc.appendChild(p);
 bindVoice(vo,R.vo);if(st.sound)setTimeout(()=>vo.click(),400);
 const m=$('#mods');m.innerHTML='';R.mods.forEach(x=>m.appendChild(MODS[x.t](x)));
 const cc=$('#codecard'),rv=$('#reveal');$('#daycode').value='';
 renderHints();
 if(st.solved[d]){cc.classList.add('solved');showReveal(false)}else{cc.classList.remove('solved');rv.classList.remove('on');rv.innerHTML=''}
 st.seen[d]=1;save()}
function bindVoice(btn,src){if(!src){btn.style.display='none';return}const au=new Audio(src);au.preload='none';au.onerror=()=>{btn.classList.add('na');btn.querySelector('span:last-child').textContent='Stimme folgt'};
 au._ui=on=>{btn.classList.toggle('on',on);btn.querySelector('.vo-ic').innerHTML=on?KI.pause:KI.play};au.onended=()=>au._ui(false);
 btn.onclick=()=>{ac();if(btn.classList.contains('na'))return;if(curAudio===au&&!au.paused){au.pause();au._ui(false);return}stopAudio();curAudio=au;if(!st.sound){toast('Ton ist aus.');return}au.play().then(()=>au._ui(true)).catch(()=>{})}}
function renderHints(){const h=$('#hints'),D=DAYS[curDay],L=D.hints[ROLE],k=curDay+ROLE,n=st.hint[k]||0;h.innerHTML='';
 L.forEach((t,i)=>{if(i<n)h.appendChild(el('div','hint','<b>Tipp '+(i+1)+'</b> '+t))});
 if(n<L.length&&!st.solved[curDay]){const b=el('button','btn ghost sm','<span>'+KI.hint+'</span> Tipp '+(n+1)+' ansehen');b.onclick=()=>{SFX.paper();st.hint[k]=n+1;save();renderHints()};h.appendChild(b)}}
$('#btn-check').onclick=async()=>{ac();const v=norm($('#daycode').value);if(!v)return;const D=DAYS[curDay];
 if(await kzSha('sw|'+curDay+'|'+v)===D.code){st.solved[curDay]=1;save();SFX.ok();$('#codecard').classList.add('solved');showReveal(true)}else{SFX.no();const c=$('#codecard');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');toast('Das passt nicht. Habt ihr alles verglichen?')}};
$('#daycode').addEventListener('keydown',e=>{if(e.key==='Enter')$('#btn-check').click()});
function showReveal(play){const D=DAYS[curDay],rv=$('#reveal');rv.innerHTML='';rv.appendChild(el('div','rv-k','Erkenntnis'));const vo=el('button','vo','<span class="vo-ic">'+KI.play+'</span><span>Anhören</span>');rv.appendChild(vo);rv.appendChild(el('p','',D.reveal.text));
 const nx=el('button','btn','Zurück zum Flur');nx.onclick=goDesk;rv.appendChild(nx);rv.classList.add('on');bindVoice(vo,D.reveal.vo);if(play){setTimeout(()=>{rv.scrollIntoView({behavior:'smooth',block:'start'});if(st.sound)vo.click()},300)}}
$('#btn-back').onclick=goDesk;

// Module
const MODS={
 room(x){const w=el('div','mod room');w.appendChild(el('div','mod-h','<span>'+KI.eye+'</span>'+x.label+'<i>Tippe auf Stellen, die dir auffallen</i>'));const f=el('div','roomimg');const im=el('img');im.src=x.img;im.alt=x.label;f.appendChild(im);
  x.spots.forEach(s=>{const b=el('button','spot');b.style.left=(s.x*100)+'%';b.style.top=(s.y*100)+'%';b.style.width=(s.w*100)+'%';b.style.height=(s.h*100)+'%';b.setAttribute('aria-label',s.label);b.appendChild(el('span','glint'));b.onclick=()=>{ac();SFX.tap();b.classList.add('seen');openSpot(s)};f.appendChild(b)});
  w.appendChild(f);return w},
 audio(x){const w=el('div','mod audio');w.innerHTML='<div class="au-face"><img src="'+x.img+'" alt=""></div><div class="au-main"><div class="au-who">'+x.who+'</div><div class="au-lab">'+x.label+'</div><div class="au-bar"><i></i></div><div class="au-row"><button class="btn sm au-play"><span>'+KI.play+'</span> Abspielen</button><button class="btn ghost sm au-tx">Mitschrift</button></div><div class="au-script">'+x.script+'</div></div>';
  const au=new Audio(x.src);au.preload='none';const pb=w.querySelector('.au-play'),bar=w.querySelector('.au-bar i');
  au._ui=on=>{pb.innerHTML='<span>'+(on?KI.pause:KI.play)+'</span> '+(on?'Pause':'Abspielen')};au.ontimeupdate=()=>{if(au.duration)bar.style.width=(au.currentTime/au.duration*100)+'%'};au.onended=()=>au._ui(false);
  au.onerror=()=>{pb.disabled=true;pb.innerHTML='Stimme folgt';w.querySelector('.au-script').classList.add('on')};
  pb.onclick=()=>{ac();if(curAudio===au&&!au.paused){au.pause();au._ui(false);return}stopAudio();curAudio=au;au.play().then(()=>au._ui(true)).catch(()=>{})};
  w.querySelector('.au-tx').onclick=()=>w.querySelector('.au-script').classList.toggle('on');return w},
 doc(x){const d=DOCS[x.id];const w=el('button','mod docl','<span class="dl-ic">'+KI.doc+'</span><span><b>'+(ROLE==='B'?'Fallakte':'Tatortmappe')+': '+d.title+'</b><i>Liegt auch ausgedruckt vor dir</i></span>');w.onclick=()=>{SFX.paper();openAkte(x.id)};return w},
 web(x){const w=el('a','mod docl web','<span class="dl-ic">'+KI.web+'</span><span><b>'+x.label+'</b><i>'+x.note+'</i></span>');w.href=x.url;w.target='_blank';w.rel='noopener';return w}
};
function openSpot(s){const o=s.open;if(o.t==='sfx'){SFX[o.k]&&SFX[o.k]();toast(o.cap);return}
 let h='';if(o.t==='zoom')h='<img class="v-img" src="'+o.img+'" alt=""><p class="v-cap">'+(o.cap||'')+'</p>';
 if(o.t==='text')h='<div class="note"><div class="sl-h">'+s.label+'</div><p>'+o.cap+'</p></div>';
 if(o.t==='doc')h=(o.cap?'<p class="v-cap top">'+o.cap+'</p>':'')+DOCS[o.id].html();
 viewer(h)}
function viewer(h){$('#v-body').innerHTML=h;const v=$('#viewer');v.classList.add('on');v.setAttribute('aria-hidden','false');SFX.paper()}
$('#v-close').onclick=()=>{const v=$('#viewer');v.classList.remove('on');v.setAttribute('aria-hidden','true')};
$('#viewer').onclick=e=>{if(e.target.id==='viewer')$('#v-close').click()};

// Akte
let akteFrom='#s-desk';
function myDocs(){const m=maxDay();return Object.entries(DOCS).filter(([k,d])=>d.role===ROLE&&d.day<=Math.max(m,1))}
function openAkte(id){akteFrom=$('#s-day').classList.contains('on')?'#s-day':'#s-desk';stopAudio();show('#s-akte');$('#akte-kick').textContent=RN[ROLE];$('#akte-title').textContent=ROLE==='B'?'Fallakte Wendt':'Tatortmappe';
 const L=myDocs();const t=$('#akte-tabs');t.innerHTML='';const cur=id||(L[0]&&L[0][0]);L.forEach(([k,d])=>{const b=el('button','atab'+(k===cur?' on':''),d.tab);b.onclick=()=>{SFX.paper();openAkte(k)};t.appendChild(b)});
 $('#akte-page').innerHTML='<div class="paper">'+(cur?DOCS[cur].html(st.name):'')+'</div>'}
$('#btn-akte').onclick=()=>openAkte();$('#btn-akte2').onclick=()=>openAkte();$('#btn-akte-back').onclick=()=>{show(akteFrom)};
['#btn-akte','#btn-akte2'].forEach(s=>$(s).innerHTML=KI.akte);$('#btn-back').innerHTML=KI.back;$('#btn-akte-back').innerHTML=KI.back;$('#v-close').innerHTML=KI.close;
$('#btn-sound').onclick=()=>{ac();setSound(!st.sound)};setSound(st.sound);
ready.then(()=>{if(st.act&&params.get('go')==='1')goDesk()});
