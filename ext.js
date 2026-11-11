// Bausteine ab Tag 4: Zahlenschloss, Stromausfall, Sicherungen, Laptop, Portale, Spurenlampe
(function(){
const A=window.AMBI,S=(k,...a)=>{try{A.sfx[k]&&A.sfx[k](...a)}catch(e){}};
st.flag=st.flag||{};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const dgt=s=>norm(s);

// ---------- Zusätzliche Öffner ----------
window.OPEN_X={
 // Zahlenschloss mit Rädern über einem Foto
 lock(o){const key='lock_'+curDay+'_'+(o.k||'');const n=o.digits||4;let v=Array(n).fill(0);
  const done=()=>{st.flag[key]=1;save();const box=$('#lk');if(!box)return;box.classList.add('open');S('lock');setTimeout(()=>{SFX.ok&&SFX.ok()},300);
   $('#lk-img2').classList.add('on');$('#lk-out').innerHTML='<p class="v-cap">'+T(o.openCap)+'</p>'+(o.env?envOpen(o.env):'')+(o.docs||[]).map(id=>'<button class="btn sm lk-doc" data-id="'+id+'">'+DOCS[id].title+'</button>').join('');
   document.querySelectorAll('.lk-doc').forEach(b=>b.onclick=()=>{SFX.paper();viewer(DOCS[b.dataset.id].html())})};
  viewer('<div class="lk" id="lk"><div class="lk-ph"><img src="'+o.img+'" alt=""><img id="lk-img2" class="lk-2" src="'+o.imgOpen+'" alt=""></div>'+
   (o.tag?'<div class="lk-tag"><i></i><span>'+o.tag+'</span></div>':'')+
   '<div class="lk-plate">'+Array.from({length:n},(_,i)=>'<div class="lk-w" data-i="'+i+'"><button class="lk-u" aria-label="hoch"></button><div class="lk-d"><span class="p">9</span><span class="c">0</span><span class="nx">1</span></div><button class="lk-dn" aria-label="runter"></button></div>').join('')+'</div>'+
   '<p class="v-cap lk-hint">'+(o.cap||'Dreh die Räder. Wischen oder tippen.')+'</p><div id="lk-out"></div></div>');
  $('#v-body').classList.add('wide');
  const wheels=[...document.querySelectorAll('.lk-w')];
  const draw=()=>wheels.forEach((w,i)=>{const d=v[i];w.querySelector('.p').textContent=(d+9)%10;w.querySelector('.c').textContent=d;w.querySelector('.nx').textContent=(d+1)%10});
  const check=async()=>{if(st.flag[key])return;if(await kzSha('sw|lock|'+curDay+'|'+v.join(''))===o.hash)done()};
  wheels.forEach((w,i)=>{const turn=dir=>{v[i]=(v[i]+dir+10)%10;w.classList.remove('up','dn');void w.offsetWidth;w.classList.add(dir>0?'up':'dn');S('tick');draw();check()};
   w.querySelector('.lk-u').onclick=()=>turn(-1);w.querySelector('.lk-dn').onclick=()=>turn(1);
   let sy=null;w.onpointerdown=e=>{sy=e.clientY};w.onpointerup=e=>{if(sy==null)return;const dy=e.clientY-sy;sy=null;if(Math.abs(dy)>14)turn(dy<0?1:-1)}});
  draw();if(st.flag[key]){v=String(o.show||'').split('').map(Number);draw();done()}},

 // Sicherungskasten
 fuse(o){const key='power_'+curDay;const N=8,trip=o.trip||[2,5,7],order=o.order||[5,2,7],names=o.names||[];
  let main=true,up=Array.from({length:N},(_,i)=>!trip.includes(i+1)),seq=[];
  if(st.flag[key]){main=true;up=up.map(()=>true)}
  viewer('<div class="fz'+(st.flag[key]?' lit':'')+'" id="fz"><div class="fz-ph"><img src="'+o.img+'" alt=""></div><div class="fz-panel"><div class="fz-row">'+
   Array.from({length:N},(_,i)=>'<button class="fz-b" data-i="'+i+'"><span class="fz-t">F'+(i+1)+'</span><span class="fz-sw"><i></i></span><span class="fz-n">'+(names[i]||'')+'</span></button>').join('')+
   '</div><div class="fz-main"><button class="fz-m" id="fz-m"><span class="fz-ml"><i></i></span><b>Hauptschalter</b></button><div class="fz-lcd" id="fz-lcd">'+(st.flag[key]?o.lcd:'')+'</div></div></div><p class="v-cap" id="fz-cap">'+o.cap+'</p></div>');
  $('#v-body').classList.add('wide');
  const bs=[...document.querySelectorAll('.fz-b')],m=$('#fz-m');
  const draw=()=>{bs.forEach((b,i)=>b.classList.toggle('on',up[i]));m.classList.toggle('on',main)};draw();
  const bang=async()=>{S('thunder');const f=$('#fz');f.classList.add('bang');await sleep(700);f.classList.remove('bang');main=true;trip.forEach(t=>up[t-1]=false);seq=[];draw();$('#fz-cap').textContent=o.fail;toast('Knall. Die Sicherungen fliegen wieder raus.')};
  bs.forEach((b,i)=>b.onclick=()=>{if(st.flag[key])return;S('click');up[i]=!up[i];if(up[i]&&trip.includes(i+1)){if(main){draw();setTimeout(bang,180);return}seq.push(i+1)}draw()});
  m.onclick=async()=>{if(st.flag[key])return;S('drawer');main=!main;draw();if(!main){seq=[];return}
   const allUp=up.every(Boolean);const ok=allUp&&seq.join()==order.join();
   if(!allUp){$('#fz-cap').textContent=o.notAll;return}
   if(!ok){setTimeout(bang,250);return}
   st.flag[key]=1;save();const f=$('#fz');f.classList.add('flick');S('boot');await sleep(1600);f.classList.remove('flick');f.classList.add('lit');
   $('#fz-lcd').textContent=o.lcd;$('#fz-cap').textContent=o.win;SFX.ok&&SFX.ok();const r=document.querySelector('.mod.dark');r&&r.classList.add('lit')}},

 // Laptop mit Anmeldung und kleinem Schreibtisch
 laptop(o){const key='laptop_'+curDay;
  const desk=()=>{const L=typeof o.desk==='string'?LAPTOPS[o.desk]:o.desk;$('#lt-scr').innerHTML='<div class="lt-desk"><div class="lt-wall"></div><div class="lt-icons">'+L.map((x,i)=>'<button class="lt-ic" data-i="'+i+'"><img src="'+x.ic+'" alt=""><span>'+x.n+'</span></button>').join('')+'</div><div class="lt-bar"><span>'+o.user+'</span><span>'+o.clock+'</span></div><div class="lt-win" id="lt-win"></div></div>';
   document.querySelectorAll('.lt-ic').forEach(b=>b.onclick=()=>{S('click');const x=L[b.dataset.i];const w=$('#lt-win');w.innerHTML='<div class="lt-wb"><b>'+x.n+'</b><button class="lt-x">schließen</button></div><div class="lt-wc">'+x.html+'</div>';w.classList.add('on');w.querySelector('.lt-x').onclick=()=>w.classList.remove('on')})};
  viewer('<div class="lt"><div class="lt-frame"><div class="lt-scr" id="lt-scr"><div class="lt-login"><div class="lt-av" style="background-image:url('+o.avatar+')"></div><div class="lt-u">'+o.user+'</div><input id="lt-pw" type="password" autocomplete="off" placeholder="Passwort"><button class="btn sm" id="lt-go">Anmelden</button><div class="lt-hint">'+o.hintLine+'</div></div></div></div><div class="lt-base"></div><p class="v-cap">'+o.cap+'</p></div>');
  $('#v-body').classList.add('wide');
  if(st.flag[key]){desk();return}
  const pw=$('#lt-pw');pw.addEventListener('keydown',e=>{S('type',1);if(e.key==='Enter')$('#lt-go').click()});
  $('#lt-go').onclick=async()=>{if(await kzSha('sw|lt|'+curDay+'|'+dgt(pw.value))===o.hash){st.flag[key]=1;save();S('boot');desk()}else{SFX.no&&SFX.no();pw.value='';pw.classList.remove('shake');void pw.offsetWidth;pw.classList.add('shake');toast('Falsches Passwort.')}}},

 // Stimme am Telefon oder vor Ort im Fenster
 audio(o){viewer('');const w=$('#v-body');w.appendChild(el('p','v-cap top',T(o.cap||'')));w.appendChild(MODS.audio(o));setTimeout(()=>{const b=w.querySelector('.au-play');b&&b.click()},500)},

 // Rechner an einem anderen Ort
 pc2(o){pcOpen(o)},

 // Bilderserie zum Anschauen
 photos(o){viewer('<div class="ph-strip">'+o.items.map(x=>'<figure><img src="'+x.img+'" alt=""><figcaption>'+x.cap+'</figcaption></figure>').join('')+'</div>')}
};

// ---------- Module ----------
MODS.dark=function(x){const key='power_'+curDay;const w=el('div','mod room dark'+(st.flag[key]?' lit':''));
 w.appendChild(el('div','mod-h','<span>'+KI.eye+'</span>'+x.label+'<i>'+(st.flag[key]?'Tippe auf Stellen, die dir auffallen':'Zieh den Finger über das Bild, deine Lampe leuchtet nur einen kleinen Kreis aus')+'</i>'));
 const f=el('div','roomimg');const im=el('img');im.src=x.img;im.alt=x.label;f.appendChild(im);const sh=el('div','dk-shade');f.appendChild(sh);
 const mv=e=>{const r=f.getBoundingClientRect();const p=e.touches?e.touches[0]:e;sh.style.setProperty('--lx',((p.clientX-r.left)/r.width*100)+'%');sh.style.setProperty('--ly',((p.clientY-r.top)/r.height*100)+'%');sh.classList.add('on')};
 f.addEventListener('pointermove',mv);f.addEventListener('pointerdown',mv);f.addEventListener('touchmove',mv,{passive:true});
 x.spots.filter(s=>!s.after||st.solved[s.after]).forEach(s=>{const b=el('button','spot'+(s.after?' new':''));Object.assign(b.style,{left:s.x*100+'%',top:s.y*100+'%',width:s.w*100+'%',height:s.h*100+'%'});b.setAttribute('aria-label',s.label);b.appendChild(el('span','glint'));
  b.onclick=()=>{ac();const lit=w.classList.contains('lit');if(!lit&&!s.dark){const r=f.getBoundingClientRect(),bb=b.getBoundingClientRect();const lx=parseFloat(sh.style.getPropertyValue('--lx'))/100*r.width+r.left,ly=parseFloat(sh.style.getPropertyValue('--ly'))/100*r.height+r.top;if(!(lx>bb.left-40&&lx<bb.right+40&&ly>bb.top-40&&ly<bb.bottom+40)){toast('Zu dunkel. Leuchte erst mit dem Finger dorthin.');return}}
   S('click');b.classList.add('seen');if(s.after){st.trail=st.trail||{};st.trail[curDay+'_'+s.label]=1;save()}openSpot(lit&&s.lit?Object.assign({},s,{open:s.lit}):s)};f.appendChild(b)});
 w.appendChild(f);return w};

// Spurenlampe: Kamera mit Filter, macht helles Gelb dunkel
MODS.lamp=function(x){const w=el('div','mod lampm','<div class="lm-ic"><img src="a/icon_lamp.jpg" alt=""></div><div><b>Spurenlampe</b><p>'+T(x.note)+'</p><button class="btn sm">Spurenlampe einschalten</button></div>');w.querySelector('button').onclick=()=>{ac();lampOpen(x)};return w};
async function lampOpen(x){viewer('<div class="lamp"><canvas id="lp-c"></canvas><div class="lp-ring"></div><p class="v-cap" id="lp-cap">Kamera wird gestartet …</p><div class="lp-row"><button class="btn ghost sm" id="lp-t">Licht</button></div></div>');$('#v-body').classList.add('wide');
 S('click');let stream;try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:1280}},audio:false})}catch(e){$('#lp-cap').innerHTML='Die Kamera ist nicht freigegeben oder nicht vorhanden. Erlaube den Kamerazugriff für diese Seite, oder sieh dir das Blatt hier unter der Lampe an.<br><button class="btn sm" id="lp-sim" style="margin-top:10px">Ohne Kamera ansehen</button>';const sb=$('#lp-sim');if(sb)sb.onclick=()=>lampSim();return}
 const v=document.createElement('video');v.playsInline=true;v.muted=true;v.srcObject=stream;await v.play();
 $('#lp-cap').textContent=T(x.cap||'Halte das Papier ruhig und nah vor die Kamera.');
 const c=$('#lp-c'),g=c.getContext('2d',{willReadFrequently:true});let on=true;
 const tr=stream.getVideoTracks()[0];$('#lp-t').onclick=async()=>{try{const cap=tr.getCapabilities&&tr.getCapabilities();if(cap&&cap.torch){const s=tr.getSettings();await tr.applyConstraints({advanced:[{torch:!s.torch}]})}else toast('Dieses Handy erlaubt kein Kameralicht. Leg das Papier unter eine Lampe.')}catch(e){}};
 const stop=()=>{on=false;stream.getTracks().forEach(t=>t.stop())};const cl=$('#v-close');const old=cl.onclick;cl.onclick=()=>{stop();cl.onclick=old;old()};
 const loop=()=>{if(!on)return;const W=480,H=Math.round(W*v.videoHeight/v.videoWidth)||640;if(c.width!==W){c.width=W;c.height=H}g.drawImage(v,0,0,W,H);const d=g.getImageData(0,0,W,H),p=d.data;
  for(let i=0;i<p.length;i+=4){const r=p[i],gg=p[i+1],b=p[i+2];const y=Math.max(0,Math.min(r,gg)-b-12);const gray=(r+gg+b)/3;let o=200+gray*0.2-y*3.2;o=o<0?0:o>255?255:o;p[i]=o*0.78;p[i+1]=o*0.72;p[i+2]=o*0.98}
  g.putImageData(d,0,0);requestAnimationFrame(loop)};loop()}

// ---------- Portale am Dienstrechner ----------
window.PC_RENDER={
 hr(b){b.innerHTML='<div class="pt hr"><div class="pt-h"><img src="a/icon_hr.jpg" alt=""><div><b>Gemeinsames Registerportal</b><span>Handelsregister · Unternehmensträger</span></div></div><div class="pt-s"><input id="hr-q" placeholder="Firma oder Stichwort"><button class="btn sm" id="hr-go">Suchen</button></div><div id="hr-r" class="pt-r"><p class="pt-e">Gib den Namen einer Firma ein.</p></div></div>';
  const go=()=>{S('type',5);const q=$('#hr-q').value.trim().toLowerCase();const r=$('#hr-r');if(q.length<3){r.innerHTML='<p class="pt-e">Bitte mindestens drei Zeichen.</p>';return}
   const L=HR.filter(x=>x.n.toLowerCase().includes(q)||x.k.some(k=>k.includes(q)));
   r.innerHTML=L.length?L.map((x,i)=>'<details class="pt-hit"><summary><b>'+x.n+'</b><span>'+x.ort+' · '+x.nr+'</span></summary><table class="pt-t">'+x.rows.map(z=>'<tr><td>'+z[0]+'</td><td>'+z[1]+'</td></tr>').join('')+'</table></details>').join(''):'<p class="pt-e">Keine Treffer für „'+esc(q)+'“.</p>'};
  $('#hr-go').onclick=go;$('#hr-q').addEventListener('keydown',e=>{if(e.key==='Enter')go()})},

 web(b){const tabs=[['start','Willkommen'],['prospekt','Hausprospekt'],['bar','Bar'],['kontakt','Anreise']];
  b.innerHTML='<div class="ws"><div class="ws-url"><i></i>www.berghotel-sternwand.at</div><div class="ws-top" style="background-image:url(a/hotel.jpg)"><div class="ws-logo">Berghotel Sternwand</div><div class="ws-sub">Seit 1961 auf 2.140 Metern</div></div><nav class="ws-nav">'+tabs.map(t=>'<button data-t="'+t[0]+'">'+t[1]+'</button>').join('')+'</nav><div class="ws-c" id="ws-c"></div></div>';
  const show=t=>{document.querySelectorAll('.ws-nav button').forEach(x=>x.classList.toggle('on',x.dataset.t===t));S('click');const c=$('#ws-c');
   if(t==='start')c.innerHTML='<div class="ws-hero"><img src="a/a_ofen.jpg" alt=""><p>Vierundzwanzig Zimmer, ein Kachelofen und ein Berg, der dir den Atem nimmt. Familie Wendt freut sich auf dich.</p></div><div class="ws-news"><b>Aktuell</b><p>Wegen des Sturms ist die Straße ins Hochtal gesperrt. Die Seilbahn steht still. Wir melden uns bei allen Gästen mit Anreise ab 5.12.</p></div>';
   if(t==='prospekt')flip(c);
   if(t==='bar')c.innerHTML='<div class="ws-bar"><img src="a/hotelbar.jpg" alt=""><div class="bk"><div class="bk-h">Barkarte</div><div class="bk-s">Luca empfiehlt</div>'+BARKARTE.map(g=>'<div class="bk-g">'+g[0]+'</div>'+g[1].map(i=>'<div class="bk-i"><span>'+i[0]+'</span><i></i><b>'+i[1]+'</b></div>').join('')).join('')+'<div class="bk-f">Alle Preise in Euro inklusive Mehrwertsteuer</div></div></div>';
   if(t==='kontakt')c.innerHTML='<div class="ws-news"><b>Anreise</b><p>Talstation der Seilbahn Sternwand, Hochtal 1. Im Dezember bitte vorher anrufen. Wir holen dich gern ab.</p><p>Telefon Rezeption: Nebenstelle 200</p></div>'};
  document.querySelectorAll('.ws-nav button').forEach(x=>x.onclick=()=>show(x.dataset.t));show(curDay>=7?'bar':'prospekt')},

 ar(b){const ok=()=>st.flag.ar_login;const render=()=>{if(!ok()){b.innerHTML='<div class="pt ar"><div class="ar-mast"><b>Hochtaler Bote</b><span>Digitales Archiv für Behörden</span></div><div class="pt-login"><label>Benutzer<input id="ar-u" autocomplete="off"></label><label>Passwort<input id="ar-p" type="password" autocomplete="off"></label><button class="btn sm" id="ar-go">Anmelden</button><p class="pt-e">Zugang laut Zugangsblatt Dienstliche Portale.</p></div></div>';
    $('#ar-go').onclick=async()=>{S('type',6);if($('#ar-u').value.trim().toLowerCase().replace(/ä/g,'ae').replace(/\s+/g,'')==='praesidium'&&await kzSha('sw|ar|'+dgt($('#ar-p').value))===ARHASH){st.flag.ar_login=1;save();render()}else{SFX.no&&SFX.no();toast('Anmeldung fehlgeschlagen.')}};return}
   b.innerHTML='<div class="pt ar"><div class="ar-mast"><b>Hochtaler Bote</b><span>Archiv · angemeldet: Präsidium Hochtal</span></div><div class="pt-s"><select id="ar-f"><option value="a">Autorin oder Autor</option><option value="t">Stichwort</option></select><input id="ar-q" placeholder="Suchbegriff"><button class="btn sm" id="ar-go">Suchen</button></div><div id="ar-r" class="pt-r"></div></div>';
   const go=()=>{S('type',5);const f=$('#ar-f').value,q=$('#ar-q').value.trim().toLowerCase(),r=$('#ar-r');if(q.length<3){r.innerHTML='<p class="pt-e">Bitte mindestens drei Zeichen.</p>';return}
    const L=ARCHIV.filter(x=>(!x.day||maxDay()>=x.day)&&(f==='a'?x.a.toLowerCase().includes(q):(x.t+' '+x.k+' '+(x.x||'').replace(/<[^>]+>/g,'')).toLowerCase().includes(q))).sort((x,y)=>y.d.localeCompare(x.d));
    r.innerHTML=L.length?'<p class="pt-e">'+L.length+' Treffer, neueste zuerst</p>'+L.map(x=>'<details class="pt-hit ar-hit"><summary><span class="ar-d">'+x.dd+'</span><b>'+x.t+'</b><span>'+x.a+' · '+x.r+'</span></summary><div class="ar-art">'+(x.img?'<img src="'+x.img+'" alt="">':'')+'<p>'+x.x+'</p>'+(x.cap?'<p class="ar-cap">'+x.cap+'</p>':'')+'</div></details>').join(''):'<p class="pt-e">Keine Treffer.</p>'};
   $('#ar-go').onclick=go;$('#ar-q').addEventListener('keydown',e=>{if(e.key==='Enter')go()})};render()}
};

// Blätterprospekt: feste Zeilen, damit jede Zeile auf jedem Handy gleich ist
function flip(c){let p=0;const P=PROSPEKT;
 c.innerHTML='<div class="fb"><div class="fb-page" id="fb-p"></div><div class="fb-nav"><button class="btn ghost sm" id="fb-l">Zurück</button><span id="fb-n"></span><button class="btn ghost sm" id="fb-r">Weiter</button></div><p class="pt-e">Tipp: Wisch nach links oder rechts zum Blättern.</p></div>';
 const draw=dir=>{const x=P[p],e=$('#fb-p');e.className='fb-page'+(dir?' t'+dir:'');e.innerHTML='<div class="fb-img" style="background-image:url('+x.img+')"><span>'+x.h+'</span></div><div class="fb-txt">'+x.l.map(l=>'<div class="fb-l">'+l+'</div>').join('')+'</div><div class="fb-no">'+(p+1)+'</div>';$('#fb-n').textContent='Seite '+(p+1)+' von '+P.length;S('paperSlide')};
 $('#fb-l').onclick=()=>{if(p>0){p--;draw('l')}};$('#fb-r').onclick=()=>{if(p<P.length-1){p++;draw('r')}};
 let sx=null;const e=$('#fb-p');e.onpointerdown=v=>{sx=v.clientX};e.onpointerup=v=>{if(sx==null)return;const d=v.clientX-sx;sx=null;if(d<-30)$('#fb-r').click();if(d>30)$('#fb-l').click()};draw()}

window.maxDayX=()=>maxDay();
})();
