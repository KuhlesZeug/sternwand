// Minispiele: Schloss knacken (Hotel) und Wartungszugang knacken (Präsidium)
(function(){
// ===== Geräusche aus dem Synthesizer =====
let AC=null;const ctx=()=>{if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC};
const noise=(dur,f,q,g,type)=>{const a=ctx();if(!a||st.sound===false)return null;const n=a.createBuffer(1,Math.max(1,a.sampleRate*dur|0),a.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);
 const s=a.createBufferSource();s.buffer=n;const fl=a.createBiquadFilter();fl.type=type||'bandpass';fl.frequency.value=f;fl.Q.value=q;const gn=a.createGain();gn.gain.value=g;s.connect(fl);fl.connect(gn);gn.connect(a.destination);s.start();return s};
const tone=(f,dur,g,type)=>{const a=ctx();if(!a||st.sound===false)return;const o=a.createOscillator(),gn=a.createGain();o.type=type||'square';o.frequency.value=f;gn.gain.setValueAtTime(g,a.currentTime);gn.gain.exponentialRampToValueAtTime(.0001,a.currentTime+dur);o.connect(gn);gn.connect(a.destination);o.start();o.stop(a.currentTime+dur)};
const snd={tick:()=>noise(.03,5200,6,.5),pin:()=>{noise(.05,3400,4,.9);setTimeout(()=>noise(.04,2200,5,.6),45)},snap:()=>{noise(.12,6500,1.5,1.2,'highpass');noise(.2,900,1,.4)},
 open:()=>{noise(.09,1500,2,1);setTimeout(()=>noise(.25,420,1.2,.9,'lowpass'),110);setTimeout(()=>noise(.5,260,.8,.5,'lowpass'),300)},
 key:()=>tone(1800+Math.random()*400,.04,.05),err:()=>{tone(180,.25,.12,'sawtooth')},ok:()=>{tone(880,.12,.08,'triangle');setTimeout(()=>tone(1320,.2,.08,'triangle'),120)}};
let scr=null;const scrape=on=>{const a=ctx();if(!a||st.sound===false)return;if(on&&!scr){const n=a.createBuffer(1,a.sampleRate,a.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  const s=a.createBufferSource();s.buffer=n;s.loop=true;const f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=2600;f.Q.value=3;const g=a.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(a.destination);s.start();scr={s,g,f}}
 if(!on&&scr){try{scr.s.stop()}catch(e){}scr=null}};
const buzz=ms=>{try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};

// ===== Raum mit verschlossener Tür =====
const _room=MODS.room;
MODS.room=function(x){if(!x.gate||st.flag[x.gate])return _room(x);
 const w=el('div','mod gate','<div class="gt-ph" style="background-image:url(a/lock_door.jpg)"><span class="gt-lk">Abgeschlossen</span></div><div class="gt-t"><b>'+x.label+'</b><p>'+T(x.gateCap)+'</p><button class="btn">Schloss knacken</button></div>');
 w.querySelector('.btn').onclick=()=>{ac();lockpick(x.gate,()=>{const y=window.scrollY;openDay(curDay);setTimeout(()=>window.scrollTo(0,y),50)})};return w};

// ===== Schloss knacken =====
function lockpick(key,done){
 const STAGES=3,SPAN=30;let picks=5,health=1,stage=0,rot=0,ang=0,hold=false,last=performance.now(),raf=0,sweet=[],openFlag=false,lastTick=0,shake=0;
 for(let i=0;i<STAGES;i++){let s;do{s=Math.round(Math.random()*130-65)}while(i&&Math.abs(s-sweet[i-1])<25);sweet.push(s)}
 viewer('<div class="lp2"><div class="lp2-st" id="lp-st"><img class="lp2-bg" src="a/lock_door.jpg" alt=""><div class="lp2-vg"></div>'+
  '<div class="lp2-core" id="lp-core"><img src="a/wrench.png" class="lp2-wr" alt=""></div><div class="lp2-pv" id="lp-pv"><img src="a/pick.png" class="lp2-pk" id="lp-pk" alt=""></div>'+
  '<div class="lp2-pins" id="lp-pins">'+Array.from({length:STAGES},()=>'<i></i>').join('')+'</div><div class="lp2-msg" id="lp-msg"></div></div>'+
  '<div class="lp2-ui"><div class="lp2-pk-c"><span>Dietriche</span><b id="lp-n"></b></div><button class="lp2-turn" id="lp-turn">Halten<br><small>zum Drehen</small></button><div class="lp2-pk-c"><span>Stifte</span><b id="lp-s">0 / '+STAGES+'</b></div></div>'+
  '<p class="v-cap" id="lp-cap">Wisch über das Schloss, um den Dietrich zu bewegen. Halte den Knopf, um den Zylinder zu drehen. Dreht er sich kaum, liegt der Dietrich falsch: loslassen, neu ansetzen. Zu viel Druck verbiegt den Dietrich.</p></div>');
 $('#v-body').classList.add('wide');
 const stg=$('#lp-st'),core=$('#lp-core'),pv=$('#lp-pv'),pk=$('#lp-pk'),tb=$('#lp-turn');
 const fit=()=>{const r=stg.getBoundingClientRect(),t=core.style.transform;core.style.transform='translate(-50%,-50%)';const c=core.getBoundingClientRect();core.style.backgroundSize=r.width+'px '+r.height+'px';core.style.backgroundPosition=(r.left-c.left)+'px '+(r.top-c.top)+'px';core.style.transform=t};fit();setTimeout(fit,300);window.addEventListener('resize',fit);
 const ui=()=>{$('#lp-n').textContent=picks;$('#lp-s').textContent=stage+' / '+STAGES;document.querySelectorAll('#lp-pins i').forEach((e,i)=>e.classList.toggle('on',i<stage))};ui();
 // Dietrich bewegen
 let px=null;const setAng=a=>{ang=Math.max(-85,Math.min(85,a))};
 const pm=e=>{if(openFlag)return;const t=e.touches?e.touches[0]:e;if(px===null){px=t.clientX;return}const r=stg.getBoundingClientRect();setAng(ang+(t.clientX-px)/r.width*190);px=t.clientX};
 stg.addEventListener('pointerdown',e=>{px=e.clientX;stg.setPointerCapture(e.pointerId)});stg.addEventListener('pointermove',e=>{if(px!==null)pm(e)});stg.addEventListener('pointerup',()=>px=null);stg.addEventListener('pointercancel',()=>px=null);
 window.__lp={s:()=>({sweet,stage,rot,picks}),a:v=>setAng(v),h:v=>{hold=v}};
 const kd=e=>{if(e.key==='ArrowLeft')setAng(ang-4);if(e.key==='ArrowRight')setAng(ang+4);if(e.key===' '){hold=true;e.preventDefault()}},ku=e=>{if(e.key===' ')hold=false};
 window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 const hs=e=>{e.preventDefault();ac();hold=true;tb.classList.add('on')},he=()=>{hold=false;tb.classList.remove('on')};
 tb.addEventListener('pointerdown',hs);tb.addEventListener('pointerup',he);tb.addEventListener('pointerleave',he);tb.addEventListener('pointercancel',he);tb.addEventListener('contextmenu',e=>e.preventDefault());
 const msg=(t,c)=>{const m=$('#lp-msg');if(!m)return;m.textContent=t;m.className='lp2-msg on '+(c||'');clearTimeout(m._t);m._t=setTimeout(()=>m.classList.remove('on'),1600)};
 const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;if(!document.getElementById('lp-st')){cleanup();return}
  const base=stage*SPAN,d=Math.abs(ang-sweet[stage]||0),q=d<=6?1:Math.max(0,1-(d-6)/34),target=hold?base+SPAN*q:base;
  if(hold){if(rot<target)rot=Math.min(target,rot+95*dt);else rot=Math.max(target,rot-160*dt)}else rot=Math.max(base,rot-200*dt);
  const stuck=hold&&q<1&&rot>=target-.5;
  if(stuck){health-=dt*(0.4+0.7*(1-q));shake=Math.min(1,shake+dt*6);if(now-lastTick>140){buzz(12);lastTick=now}}else shake=Math.max(0,shake-dt*5);
  if(scr){scr.g.gain.value=hold?.05+.12*shake:0;scr.f.frequency.value=2200+q*1800}
  if(hold&&!scr)scrape(true);if(!hold&&scr)scrape(false);
  if(!hold&&Math.abs(d)<12&&now-lastTick>260){snd.tick();lastTick=now}
  if(health<=0){picks--;health=1;rot=base;hold=false;tb.classList.remove('on');snd.snap();buzz([60,40,120]);stg.classList.add('brk');setTimeout(()=>stg.classList.remove('brk'),500);
   if(picks<=0){msg('Alle Dietriche verbogen. Du holst neue aus der Werkzeugkiste.','bad');setTimeout(()=>{picks=5;ui()},1800)}else msg('Dietrich verbogen','bad');ui()}
  if(rot>=base+SPAN-.3&&q===1&&hold){stage++;health=1;hold=false;tb.classList.remove('on');snd.pin();buzz(35);ui();if(stage>=STAGES){finish();return}msg('Stift gesetzt, neu ansetzen')}
  const sx=(Math.random()-.5)*shake*3;core.style.transform='translate(-50%,-50%) rotate('+rot+'deg)';pv.style.transform='translate(-50%,-50%) rotate('+(ang+rot*.35+sx)+'deg)';
  raf=requestAnimationFrame(loop)};
 raf=requestAnimationFrame(loop);
 function finish(){openFlag=true;scrape(false);core.style.transition='transform .6s cubic-bezier(.3,1.4,.5,1)';core.style.transform='translate(-50%,-50%) rotate(95deg)';snd.open();buzz([30,60,90]);
  st.flag[key]=1;save();stg.classList.add('open');$('#lp-cap').textContent='Das Schloss gibt nach. Die Tür ist offen.';
  tb.outerHTML='<button class="btn" id="lp-in">Hineingehen</button>';$('#lp-in').onclick=()=>{$('#viewer').classList.remove('on');done&&done()}}
 function cleanup(){cancelAnimationFrame(raf);scrape(false);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku)}
 const vw=$('#viewer');const obs=new MutationObserver(()=>{if(!vw.classList.contains('on')){cleanup();obs.disconnect();if(st.flag[key]&&done&&!openFlag)done()}});obs.observe(vw,{attributes:true,attributeFilter:['class']})}
window.lockpick=lockpick;

// ===== Wartungszugang knacken =====
const HX=['1C','55','7A','BD','E9','FF'];
function makeGrid(){const N=5;const g=Array.from({length:N},()=>Array.from({length:N},()=>HX[Math.random()*HX.length|0]));
 const pick=a=>a[Math.random()*a.length|0];const seqA=[pick(HX),pick(HX)],seqB=[pick(HX),pick(HX),pick(HX)];
 // gültigen Weg bauen: Zeile 0, dann abwechselnd Spalte und Zeile
 const c0=Math.random()*N|0;const others=(x)=>[...Array(N).keys()].filter(i=>i!==x);
 const r1=pick(others(0)),c2=pick(others(c0)),r3=pick(others(r1)),c4=pick(others(c2));
 const path=[[0,c0],[r1,c0],[r1,c2],[r3,c2],[r3,c4]];const vals=seqA.concat(seqB);path.forEach((p,i)=>g[p[0]][p[1]]=vals[i]);
 return {g,seq:[{c:seqA,n:'Firewall umgehen'},{c:seqB,n:'Sitzung übernehmen'}]}}
function hack(done){let G=makeGrid(),buf=[],mode='row',line=0,used={},t0=0,T=60,timer=0,over=false,BUF=7,fails=0;window.__hk=()=>G;
 viewer('<div class="hk"><div class="hk-scr" id="hk-scr"><div class="hk-top"><b>HT FORENSIK</b><span>Wartungszugang · hotelsoft-sternwand:8443</span><i id="hk-t">60,0</i></div>'+
  '<div class="hk-log" id="hk-l"></div><div class="hk-main" id="hk-m"><div class="hk-gw"><div class="hk-lab">Codematrix</div><div class="hk-grid" id="hk-g"></div></div>'+
  '<div class="hk-side"><div class="hk-lab">Puffer</div><div class="hk-buf" id="hk-b"></div><div class="hk-lab">Sequenzen hochladen</div><div class="hk-seq" id="hk-s"></div></div></div></div>'+
  '<p class="v-cap">Wähle zuerst einen Code in der markierten obersten Zeile. Danach wechselst du immer: Spalte des letzten Codes, dann seine Zeile, dann wieder Spalte. Bring beide Sequenzen in den Puffer, bevor er voll ist oder die Zeit abläuft.</p></div>');
 $('#v-body').classList.add('wide');
 const L=$('#hk-l');const log=(t,c)=>{const p=document.createElement('div');p.className=c||'';p.textContent='> '+t;L.appendChild(p);while(L.children.length>4)L.removeChild(L.firstChild)};
 const prog=s=>{for(let k=s.c.length;k>0;k--){const tail=buf.slice(-k).join(' ');if(buf.join(' ').includes(s.c.join(' ')))return s.c.length;if(tail===s.c.slice(0,k).join(' '))return k}return 0};
 const done2=s=>{for(let i=0;i+s.c.length<=buf.length;i++)if(s.c.every((v,j)=>buf[i+j]===v))return true;return false};
 const draw=()=>{const g=$('#hk-g');if(!g)return;g.innerHTML='';G.g.forEach((r,ri)=>r.forEach((v,ci)=>{const b=document.createElement('button');b.className='hk-c';b.textContent=used[ri+'_'+ci]?'[ ]':v;
   const act=!over&&!used[ri+'_'+ci]&&(mode==='row'?ri===line:ci===line);if(mode==='row'&&ri===line||mode==='col'&&ci===line)b.classList.add('band');if(act)b.classList.add('act');else b.disabled=true;
   b.onclick=()=>choose(ri,ci,v);b.onmouseenter=()=>hl(v,true);b.onmouseleave=()=>hl(v,false);g.appendChild(b)}));
  $('#hk-b').innerHTML=Array.from({length:BUF},(_,i)=>'<span class="'+(buf[i]?'f':'')+'">'+(buf[i]||'')+'</span>').join('');
  $('#hk-s').innerHTML=G.seq.map(s=>{const ok=done2(s),p=ok?s.c.length:prog(s);return '<div class="hk-q'+(ok?' ok':'')+'"><div class="hk-qc">'+s.c.map((c,i)=>'<span class="'+(i<p?'m':'')+'">'+c+'</span>').join('')+'</div><div class="hk-qn">'+(ok?'hochgeladen':s.n)+'</div></div>'}).join('')};
 const hl=(v,on)=>document.querySelectorAll('.hk-q .hk-qc span').forEach(s=>{if(s.textContent===v)s.classList.toggle('hv',on)});
 function choose(r,c,v){if(over)return;snd.key();buzz(8);used[r+'_'+c]=1;buf.push(v);if(!t0){t0=performance.now();timer=setInterval(tick,100)}
  if(mode==='row'){mode='col';line=c}else{mode='row';line=r}
  const before=G.seq.filter(s=>s._d).length;G.seq.forEach(s=>{if(!s._d&&done2(s)){s._d=1;snd.ok();log(s.n+': erfolgreich','g')}});
  draw();if(G.seq.every(s=>s._d))return win();if(buf.length>=BUF)return fail('Puffer voll. Verbindung getrennt.')}
 function tick(){const left=Math.max(0,T-(performance.now()-t0)/1000);const e=$('#hk-t');if(!e){clearInterval(timer);return}e.textContent=left.toFixed(1).replace('.',',');e.classList.toggle('low',left<10);if(left<=0)fail('Zeit abgelaufen. Firewall hat die Verbindung getrennt.')}
 function fail(t){over=true;clearInterval(timer);snd.err();buzz([80,50,80]);log(t,'r');$('#hk-scr').classList.add('glitch');draw();
  setTimeout(()=>{if(!$('#hk-g'))return;$('#hk-scr').classList.remove('glitch');fails++;T=Math.min(120,60+fails*20);G=makeGrid();buf=[];mode='row';line=0;used={};t0=0;over=false;$('#hk-t').textContent=T+',0';log('Neuer Versuch über Ausweichport '+(8443+fails)+', Firewall langsamer','y');draw()},2200)}
 function win(){over=true;clearInterval(timer);st.flag.hack_spa=1;save();buzz([30,40,30,40,120]);log('Sitzung aktiv, Spuren werden verwischt','y');
  const m=$('#hk-m');m.innerHTML='<div class="hk-win"><div class="hk-wt">ZUGANG GEWÄHRT</div><div class="hk-pb"><i id="hk-pb"></i></div><div class="hk-ws" id="hk-ws">Sitzung wird übernommen …</div></div>';
  let p=0;const iv=setInterval(()=>{p+=4+Math.random()*9;const b=$('#hk-pb');if(!b){clearInterval(iv);return}b.style.width=Math.min(100,p)+'%';snd.key();
   if(p>=100){clearInterval(iv);snd.ok();$('#hk-ws').innerHTML='Spa Buchungen · nur lesen<br><button class="btn" id="hk-go">Buchungen öffnen</button>';$('#hk-go').onclick=()=>done&&done()}},90)}
 // Startsequenz
 $('#hk-m').style.visibility='hidden';const boot=['verbinde mit hotelsoft-sternwand …','Gastzugang Präsidium: gesperrt seit Stromausfall 23:40','Wartungsport 8443 offen, Firewall aktiv','Freigabe der Staatsanwaltschaft liegt vor. Starte Einbruch.'];
 boot.forEach((t,i)=>setTimeout(()=>{if(!$('#hk-l'))return;snd.key();log(t,i===1?'r':i===3?'y':'');if(i===boot.length-1){$('#hk-m').style.visibility='visible';draw()}},350+i*650));
 const vw=$('#viewer');const obs=new MutationObserver(()=>{if(!vw.classList.contains('on')){clearInterval(timer);obs.disconnect()}});obs.observe(vw,{attributes:true,attributeFilter:['class']})}
window.hackOpen=hack;
// Spa Buchungen erst nach dem Einbruch
const _spa=PC_RENDER.spa;
PC_RENDER.spa=function(b){if(st.flag.hack_spa)return _spa(b);
 b.innerHTML='<div class="hk-lock"><b>Gastzugang gesperrt</b><p>Hotelsoft Sternwand meldet: Die Sitzung des Präsidiums wurde beim Stromausfall um 23:40 beendet. Neue Zugänge vergibt nur die Hotelleitung.</p><p class="hk-lock-s">Der Wartungsport des Systems ist noch offen.</p><button class="btn" id="hk-start">Forensikwerkzeug starten</button></div>';
 $('#hk-start').onclick=()=>{ac();hack(()=>pcOpen({t:'pc',app:'spa'}))}};
MAILS.push({d:9,f:'IT Präsidium',s:'Gastzugang Hotelsoft gesperrt',b:'Der Gastzugang zum Buchungssystem des Hotels ist seit dem Stromausfall gesperrt, und oben weiß niemand das Verwaltungspasswort. Der Wartungsport ist noch offen. Nimm das Forensikwerkzeug auf deinem Rechner, die Freigabe der Staatsanwaltschaft liegt vor.'});
// Ilses Zimmer ist abgeschlossen
if(DAYS[17]&&DAYS[17].A)DAYS[17].A.mods.forEach(m=>{if(m.t==='room'){m.gate='pick_17';m.gateCap='Ilses Tür ist abgeschlossen. Sie steht unten in der Küche, und fragen willst du sie noch nicht. Das alte Schloss hakt, aber in der Werkzeugkiste aus dem Technikraum liegt ein Satz Dietriche.'}});
})();
