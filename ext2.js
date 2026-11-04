// Bausteine Tag 9 bis 13: Spiegel, Tastenfeld, Kartei, Kamerabilder, Spurenpuder, Kassette, Spa Kalender
(function(){
const S=(k,...a)=>{try{AMBI.sfx[k]&&AMBI.sfx[k](...a)}catch(e){}};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// Wischfläche: Spiegel freiwischen oder Puder verteilen
function wipe(c,img,mode,onPct){const g=c.getContext('2d');const r=c.getBoundingClientRect();c.width=r.width*2;c.height=r.height*2;
 const fill=()=>{if(mode==='fog'){g.globalCompositeOperation='source-over';const gr=g.createLinearGradient(0,0,0,c.height);gr.addColorStop(0,'rgba(236,240,242,.93)');gr.addColorStop(1,'rgba(214,222,226,.95)');g.fillStyle=gr;g.fillRect(0,0,c.width,c.height);for(let i=0;i<700;i++){g.fillStyle='rgba(255,255,255,'+(Math.random()*.25)+')';g.beginPath();g.arc(Math.random()*c.width,Math.random()*c.height,Math.random()*3+.5,0,7);g.fill()}}
  else{g.globalCompositeOperation='source-over';g.drawImage(img,0,0,c.width,c.height);g.fillStyle='rgba(28,6,8,.88)';g.fillRect(0,0,c.width,c.height)}};
 fill();let down=false,last=null,ticks=0;
 const pt=e=>{const b=c.getBoundingClientRect();const p=e.touches?e.touches[0]:e;return [(p.clientX-b.left)*2,(p.clientY-b.top)*2]};
 const stroke=(a,b)=>{g.globalCompositeOperation='destination-out';g.lineCap='round';g.lineWidth=mode==='fog'?70:58;g.strokeStyle='rgba(0,0,0,'+(mode==='fog'?1:.45)+')';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()};
 const pct=()=>{const d=g.getImageData(0,0,c.width,c.height).data;let n=0,t=0;for(let i=3;i<d.length;i+=64){t++;if(d[i]<60)n++}return n/t};
 c.onpointerdown=e=>{down=true;last=pt(e);c.setPointerCapture(e.pointerId)};
 c.onpointermove=e=>{if(!down)return;const p=pt(e);stroke(last,p);last=p;if(++ticks%12===0){S(mode==='fog'?'paperSlide':'click');onPct(pct())}};
 c.onpointerup=()=>{down=false;onPct(pct())};
 return {refog:()=>{if(mode!=='fog')return;g.globalCompositeOperation='source-over';g.fillStyle='rgba(230,236,239,.035)';g.fillRect(0,0,c.width,c.height)}}}

Object.assign(window.OPEN_X,{
 fog(o){viewer('<div class="wp fogm"><div class="wp-ph" style="background-image:url('+o.img+')"><div class="wp-msg mirror">'+o.msg+'</div><canvas id="wp-c"></canvas></div><p class="v-cap" id="wp-cap">'+o.cap+'</p></div>');$('#v-body').classList.add('wide');
  const w=wipe($('#wp-c'),null,'fog',p=>{if(p>.35)$('#wp-cap').textContent=o.done});const iv=setInterval(()=>{if(!$('#wp-c'))return clearInterval(iv);w.refog()},400)},
 powder(o){viewer('<div class="wp pw"><div class="wp-ph" style="background-image:url('+o.img+')"><div class="wp-lab" id="wp-lab">'+o.label+'</div><canvas id="wp-c"></canvas></div><p class="v-cap" id="wp-cap">'+o.cap+'</p></div>');$('#v-body').classList.add('wide');
  const im=new Image();im.onload=()=>wipe($('#wp-c'),im,'powder',p=>{if(p>.45){$('#wp-lab').classList.add('on');$('#wp-cap').textContent=o.done}});im.src=o.img},

 keypad(o){const key='kp_'+curDay;let v='';
  viewer('<div class="kp"><div class="kp-ph" style="background-image:url('+o.img+')"></div><div class="kp-box"><div class="kp-lcd" id="kp-lcd">'+(st.flag[key]?'OFFEN':'----')+'</div><div class="kp-g">'+['1','2','3','4','5','6','7','8','9','C','0','OK'].map(k=>'<button data-k="'+k+'">'+k+'</button>').join('')+'</div></div>'+(o.note?'<div class="kp-note">'+o.note+'</div>':'')+'<p class="v-cap" id="kp-cap">'+o.cap+'</p><div id="kp-out"></div></div>');$('#v-body').classList.add('wide');
  const lcd=$('#kp-lcd');const open=()=>{st.flag[key]=1;save();lcd.textContent='OFFEN';lcd.classList.add('ok');S('lock');SFX.ok&&SFX.ok();$('#kp-cap').textContent=T(o.openCap);$('#kp-out').innerHTML=(o.docs||[]).map(id=>'<button class="btn sm lk-doc" data-id="'+id+'">'+DOCS[id].title+'</button>').join('');document.querySelectorAll('#kp-out .lk-doc').forEach(b=>b.onclick=()=>{SFX.paper();viewer(DOCS[b.dataset.id].html())})};
  if(st.flag[key]){open();return}
  document.querySelectorAll('.kp-g button').forEach(b=>b.onclick=async()=>{const k=b.dataset.k;S('key');
   if(k==='C'){v='';lcd.textContent='----';return}
   if(k==='OK'){if(await kzSha('sw|kp|'+curDay+'|'+v)===o.hash)open();else{S('lock');lcd.textContent='FEHLER';lcd.classList.add('bad');setTimeout(()=>{lcd.classList.remove('bad');lcd.textContent='----';v=''},900)}return}
   if(v.length<o.digits){v+=k;lcd.textContent=v.padEnd(o.digits,'-')}})},

 kartei(o){let tab=o.start||'A';const L=typeof o.cards==='string'?window[o.cards]:o.cards;const tabs=[...new Set(L.map(c=>c.n[0]))].sort();
  viewer('<div class="kt"><div class="kt-ph" style="background-image:url('+o.img+')"></div><div class="kt-tabs">'+'ABCDEFGHIJKLMNOPRSTUVWZ'.split('').map(t=>'<button data-t="'+t+'"'+(tabs.includes(t)?'':' disabled')+'>'+t+'</button>').join('')+'</div><div class="kt-box" id="kt-box"></div><p class="v-cap">'+o.cap+'</p><div id="kt-out"></div></div>');$('#v-body').classList.add('wide');
  const show=t=>{S('drawer');document.querySelectorAll('.kt-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));const C=L.filter(c=>c.n[0]===t).sort((a,b)=>a.n.localeCompare(b.n));
   $('#kt-box').innerHTML=C.map((c,i)=>'<button class="kt-c" style="--i:'+i+'" data-i="'+L.indexOf(c)+'"><b>'+c.n+'</b><span>'+c.s+'</span></button>').join('')||'<p class="pt-e">Keine Karten unter '+t+'.</p>';
   document.querySelectorAll('.kt-c').forEach(b=>b.onclick=()=>{S('paperSlide');const c=L[b.dataset.i];document.querySelectorAll('.kt-c').forEach(x=>x.classList.remove('up'));b.classList.add('up');
    $('#kt-out').innerHTML='<div class="kt-card"><div class="kt-h">'+c.n+'</div><div class="kt-b">'+c.b+'</div></div>'+(c.env?envOpen([c.env]):'')})};
  document.querySelectorAll('.kt-tabs button').forEach(b=>b.onclick=()=>show(b.dataset.t));show(tab)},

 cctv(o){const key='cctv_'+curDay;
  const run=()=>{const F=o.frames;const t0=o.from,t1=o.to;
   $('#cc-scr').innerHTML='<div class="cc-view"><img id="cc-img" src="" alt=""><div class="cc-osd"><span>'+o.cam+'</span><span id="cc-t"></span></div><div class="cc-rec"><i></i>REC</div><div class="cc-noise"></div></div><div class="cc-ctl"><button class="btn ghost sm" id="cc-m">−1 Min</button><input type="range" id="cc-r" min="'+t0+'" max="'+t1+'" value="'+t0+'"><button class="btn ghost sm" id="cc-p">+1 Min</button></div><div class="cc-ctl2"><button class="btn sm" id="cc-play">Abspielen</button><span class="pt-e">Ein Bild pro Minute · Kamerazeit</span></div>';
   const r=$('#cc-r'),img=$('#cc-img');let timer=null;
   const at=m=>{const f=F.filter(x=>x.t<=m).pop()||F[0];const hh=Math.floor(m/60)%24,mm=m%60;$('#cc-t').textContent=o.date+' '+String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')+':00';
    const v=document.querySelector('.cc-view');if(f.img){img.src=f.img;img.style.display='';v.classList.remove('lost')}else{img.style.display='none';v.classList.add('lost')}};
   r.oninput=()=>{S('tick');at(+r.value)};$('#cc-m').onclick=()=>{r.value=+r.value-1;at(+r.value);S('click')};$('#cc-p').onclick=()=>{r.value=+r.value+1;at(+r.value);S('click')};
   $('#cc-play').onclick=()=>{if(timer){clearInterval(timer);timer=null;$('#cc-play').textContent='Abspielen';return}$('#cc-play').textContent='Pause';timer=setInterval(()=>{if(!document.getElementById('cc-r')){clearInterval(timer);return}if(+r.value>=t1){clearInterval(timer);timer=null;$('#cc-play').textContent='Abspielen';return}r.value=+r.value+1;at(+r.value)},380)};at(t0)};
  viewer('<div class="cc"><div class="cc-mon"><div class="cc-scr" id="cc-scr"><div class="cc-login"><b>VIDEOANLAGE BERGHOTEL</b><span>Benutzer: sepp</span><input id="cc-pin" type="password" inputmode="numeric" maxlength="6" placeholder="PIN"><button class="btn sm" id="cc-go">Anmelden</button></div></div></div><p class="v-cap">'+o.cap+'</p></div>');$('#v-body').classList.add('wide');
  if(st.flag[key]){run();return}
  $('#cc-go').onclick=async()=>{S('key');if(await kzSha('sw|cc|'+norm($('#cc-pin').value))===o.hash){st.flag[key]=1;save();S('boot');run()}else{SFX.no&&SFX.no();toast('Falsche PIN.')}}},

 tape(o){viewer('<div class="tp"><div class="tp-ph" style="background-image:url('+o.img+')"></div><div class="tp-dev"><div class="tp-cas"><i class="l"></i><i class="r"></i><span>Suite 24</span></div><div class="tp-lcd" id="tp-lcd">1 NACHRICHT · 23:51</div><div class="tp-row"><button class="btn sm" id="tp-play">Abspielen</button><button class="btn ghost sm" id="tp-rev">Rückwärts</button></div></div><p class="v-cap" id="tp-cap">'+o.cap+'</p><div class="au-script" id="tp-tx">'+o.script+'</div></div>');$('#v-body').classList.add('wide');
  let rev=true;const a1=new Audio(o.rev),a2=new Audio(o.fwd);[a1,a2].forEach(a=>{a.preload='auto';a.onended=()=>{document.querySelector('.tp-cas').classList.remove('spin');AMBI.duck(false)}});
  const play=()=>{stopAudio();a1.pause();a2.pause();const a=rev?a1:a2;a.currentTime=0;curAudio=a;S('click');document.querySelector('.tp-cas').classList.add('spin');document.querySelector('.tp-cas').classList.toggle('back',!rev);AMBI.duck(true);a.play().catch(()=>{})};
  $('#tp-play').onclick=play;$('#tp-rev').onclick=()=>{rev=!rev;$('#tp-rev').classList.toggle('on',!rev);$('#tp-lcd').textContent=rev?'1 NACHRICHT · 23:51':'1 NACHRICHT · 23:51 · RÜCKWÄRTS';if(!rev){$('#tp-cap').textContent=o.done;$('#tp-tx').classList.add('on')}play()}}
});

// Spa Buchungssystem
window.PC_RENDER.spa=function(b){const D=SPA;let d=D.days.length-1;
 b.innerHTML='<div class="pt spa"><div class="pt-h"><img src="a/icon_spa.jpg" alt=""><div><b>Spa Sternwand · Buchungen</b><span>Gastzugang Präsidium · nur lesen</span></div></div><div class="spa-nav"><button class="btn ghost sm" id="sp-l">Vortag</button><b id="sp-d"></b><button class="btn ghost sm" id="sp-r">Folgetag</button></div><div id="sp-g" class="spa-g"></div></div>';
 const draw=()=>{const x=D.days[d];$('#sp-d').textContent=x.d;S('click');$('#sp-g').innerHTML=D.res.map(r=>'<div class="spa-r"><div class="spa-n">'+r+'</div><div class="spa-s">'+(x.b.filter(z=>z.r===r).map(z=>'<div class="spa-b'+(z.p?' priv':'')+'"><b>'+z.t+'</b><span>'+z.w+'</span>'+(z.n?'<i>'+z.n+'</i>':'')+'</div>').join('')||'<span class="spa-f">frei</span>')+'</div></div>').join('')};
 $('#sp-l').onclick=()=>{if(d>0){d--;draw()}};$('#sp-r').onclick=()=>{if(d<D.days.length-1){d++;draw()}};draw()};
})();
