// Bausteine Tag 14 bis 24: Matratze, Tatortfotos, Anruf, Lupe, Kerzen, Beweisbeutel, Bank, Labor, Blog, Verhör, Anklage, Finale
(function(){
const S=(k,...a)=>{try{AMBI.sfx[k]&&AMBI.sfx[k](...a)}catch(e){}};
const P=(f,d,q,v,t)=>{try{AMBI.sfx.click()}catch(e){}};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fmt=s=>{s=Math.max(0,Math.floor(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const docBtns=ids=>(ids||[]).map(id=>'<button class="btn sm lk-doc" data-id="'+id+'">'+DOCS[id].title+'</button>').join('');
const bindDocs=()=>document.querySelectorAll('.lk-doc').forEach(b=>b.onclick=()=>{SFX.paper();viewer(DOCS[b.dataset.id].html())});
const playClip=(src,onend)=>{stopAudio();const a=new Audio(src);curAudio=a;a._ui=on=>AMBI.duck(on);a.onended=()=>{AMBI.duck(false);onend&&onend()};if(!st.sound){toast('Ton ist aus. Die Mitschrift steht darunter.');onend&&setTimeout(onend,600);return a}AMBI.duck(true);a.play().catch(()=>{});return a};

// Geheime Botschaft aus dem Geschenklink
try{const q=new URLSearchParams(location.search);if(q.get('m')){st.gm=kzShow(q.get('m'));save()}if(q.get('von')){st.gv=q.get('von').slice(0,40);save()}}catch(e){}

Object.assign(window.OPEN_X,{
 // Matratze anheben
 lift(o){const key='lift_'+curDay;
  viewer('<div class="mt" id="mt"><div class="mt-ph" style="background-image:url('+o.img+')"></div><div class="mt-top" id="mt-top"><div class="mt-q"></div><span>Zieh die Matratze nach oben</span></div></div><p class="v-cap" id="mt-cap">'+o.cap+'</p><div id="mt-out"></div>');$('#v-body').classList.add('wide');
  const top=$('#mt-top'),box=$('#mt');let sy=null,dy=0;
  const open=()=>{box.classList.add('open');top.style.transform='';st.flag[key]=1;save();$('#mt-cap').textContent=T(o.done);$('#mt-out').innerHTML=(o.env?envOpen(o.env):'')+docBtns(o.docs);bindDocs()};
  if(st.flag[key]){open();return}
  top.onpointerdown=e=>{sy=e.clientY;top.setPointerCapture(e.pointerId);S('paperSlide')};
  top.onpointermove=e=>{if(sy==null)return;dy=Math.min(0,e.clientY-sy);top.style.transform='perspective(700px) rotateX('+Math.min(70,-dy/3)+'deg)'};
  top.onpointerup=()=>{sy=null;if(dy<-110){S('drawer');open()}else{top.style.transform=''}dy=0};
  top.onclick=()=>{if(!box.classList.contains('open'))toast('Fass die Matratze an und zieh sie nach oben.')}},

 // Tatortfotos auf dem Handy
 tatort(o){let i=o.start||0;const L=o.items;
  viewer('<div class="tfo"><div class="tf-ph"><img id="tf-img" src="" alt=""><div class="tf-ov" id="tf-ov"></div><div class="tf-ex" id="tf-ex"></div></div><div class="tf-nav"><button class="btn ghost sm" id="tf-l">Zurück</button><span id="tf-n"></span><button class="btn ghost sm" id="tf-r">Weiter</button></div><p class="v-cap" id="tf-cap"></p><div class="tf-th">'+L.map((x,k)=>'<button data-k="'+k+'"><img src="'+x.img+'" alt=""></button>').join('')+'</div></div>');$('#v-body').classList.add('wide');
  const draw=()=>{const x=L[i];$('#tf-img').src=x.img;$('#tf-ov').innerHTML=x.ov||'';$('#tf-ex').textContent='IMG_'+(4100+i*7)+'.JPG · 1.12.2026 · '+x.t;$('#tf-cap').textContent=x.cap;$('#tf-n').textContent=(i+1)+' von '+L.length;document.querySelectorAll('.tf-th button').forEach((b,k)=>b.classList.toggle('on',k===i));S('click')};
  $('#tf-l').onclick=()=>{i=(i+L.length-1)%L.length;draw()};$('#tf-r').onclick=()=>{i=(i+1)%L.length;draw()};document.querySelectorAll('.tf-th button').forEach(b=>b.onclick=()=>{i=+b.dataset.k;draw()});
  let sx=null;const ph=document.querySelector('.tf-ph');ph.onpointerdown=e=>sx=e.clientX;ph.onpointerup=e=>{if(sx==null)return;const d=e.clientX-sx;sx=null;if(Math.abs(d)>40){d<0?$('#tf-r').click():$('#tf-l').click()}};draw()},

 // Lupe über dem Bild
 lupe(o){const lk='lupe_'+curDay;const found=new Set(st.flag[lk]||[]);
  viewer('<div class="lp2"><div class="lp2-ph" id="lp2-ph"><img src="'+o.img+'" alt=""><div class="lp2-lens" id="lp2-lens"><div class="lp2-z" id="lp2-z"></div><div class="lp2-t" id="lp2-t"></div></div></div><p class="v-cap" id="lp2-cap">'+o.cap+'</p><div class="lp2-list" id="lp2-list"></div><div id="lp2-out"></div></div>');$('#v-body').classList.add('wide');
  const ph=$('#lp2-ph'),lens=$('#lp2-lens'),z=$('#lp2-z'),tx=$('#lp2-t');const Z=2.6;
  z.style.backgroundImage='url('+o.img+')';
  const list=()=>{$('#lp2-list').innerHTML=o.items.filter((x,k)=>found.has(k)).map(x=>'<span class="'+(x.key?'key':'')+'">'+x.n+'</span>').join('')};
  const move=e=>{const r=ph.getBoundingClientRect();const p=e.touches?e.touches[0]:e;const x=p.clientX-r.left,y=p.clientY-r.top-60;const L=lens.offsetWidth;
   lens.style.left=(x-L/2)+'px';lens.style.top=(y-L/2)+'px';lens.classList.add('on');z.style.backgroundSize=(r.width*Z)+'px '+(r.height*Z)+'px';z.style.backgroundPosition=(-(x*Z-L/2))+'px '+(-(y*Z-L/2))+'px';
   const fx=x/r.width,fy=y/r.height;let hit=null;o.items.forEach((it,k)=>{if(Math.hypot(fx-it.x,(fy-it.y)*r.height/r.width)<.07)hit=k});
   if(hit!=null){const it=o.items[hit];tx.textContent=it.n;tx.classList.add('on');if(!found.has(hit)){found.add(hit);st.flag[lk]=[...found];save();S('tick');list();if(it.key){$('#lp2-cap').textContent=T(o.done);$('#lp2-out').innerHTML='<img class="v-img" src="'+o.keyImg+'" alt=""><p class="v-cap">'+T(o.keyCap)+'</p>'}}}else tx.classList.remove('on')};
  list();if([...found].some(k=>o.items[k].key)){$('#lp2-cap').textContent=T(o.done);$('#lp2-out').innerHTML='<img class="v-img" src="'+o.keyImg+'" alt=""><p class="v-cap">'+T(o.keyCap)+'</p>'}ph.onpointermove=move;ph.onpointerdown=e=>{ph.setPointerCapture(e.pointerId);move(e)};ph.onpointerleave=()=>lens.classList.remove('on')},

 // Kerzen anzünden, dann Gedenkbuch lesen
 candles(o){const key='cand_'+curDay;const n=o.n||5;let lit=st.flag[key]||0;
  viewer('<div class="cd"><div class="cd-ph" id="cd-ph" style="background-image:url('+o.img+')"><div class="cd-dark" id="cd-dark"></div><div class="cd-row">'+Array.from({length:n},(_,k)=>'<button class="cd-c" data-k="'+k+'" aria-label="Kerze '+(k+1)+'"><i class="fl"></i><i class="wx"></i></button>').join('')+'</div></div><p class="v-cap" id="cd-cap">'+o.cap+'</p><div id="cd-out"></div></div>');$('#v-body').classList.add('wide');
  const C=[...document.querySelectorAll('.cd-c')];
  const upd=()=>{C.forEach((c,k)=>c.classList.toggle('on',k<lit));$('#cd-dark').style.opacity=String(Math.max(0,.9-lit*.19));
   if(lit>=(o.need||4)){$('#cd-cap').textContent=T(o.done);if(!$('#cd-book')){$('#cd-out').innerHTML='<button class="btn" id="cd-book">Gedenkbuch lesen</button>';$('#cd-book').onclick=()=>{S('paperSlide');viewer(DOCS[o.doc].html())}}}};
  C.forEach((c,k)=>c.onclick=()=>{if(k!==lit){if(k<lit)return;toast('Eine nach der anderen, von links.');return}S('fire');lit++;st.flag[key]=lit;save();upd()});upd()},

 // Beweisbeutel
 bag(o){const key='bag_'+curDay;
  viewer('<div class="bg"><div class="bg-ph" style="background-image:url('+o.img+')"><div class="bg-bag" id="bg-bag"><div class="bg-strip"></div><div class="bg-lab"><b>BEWEISMITTEL</b><span>Kripo Hochtal · Az. K1 2412/26</span><div class="bg-r"><i>Probe</i><b>'+o.no+'</b></div><div class="bg-r"><i>Inhalt</i><span>'+o.what+'</span></div><div class="bg-r"><i>Fundort</i><span>'+o.where+'</span></div><div class="bg-seal">VERSIEGELT</div></div></div></div><p class="v-cap" id="bg-cap">'+o.cap+'</p><button class="btn" id="bg-go">Eintüten und versiegeln</button></div>');$('#v-body').classList.add('wide');
  const done=()=>{$('#bg-bag').classList.add('on');$('#bg-go').style.display='none';$('#bg-cap').textContent=T(o.done)};
  if(st.flag[key]){done();return}$('#bg-go').onclick=()=>{S('paperSlide');setTimeout(()=>S('stamp'),700);st.flag[key]=1;save();done()}},

 // Eingehender Anruf
 call(o){callScreen(o)},

 // Verhör
 verhoer(o){verhoerOpen(o)}
});

// Anrufbildschirm
let ringT=null;
function ringStop(){if(ringT){clearInterval(ringT);ringT=null}}
function callScreen(o){const key='call_'+curDay;stopAudio();ringStop();
 const ov=el('div','call on','<div class="call-bg" style="background-image:url('+o.img+')"></div><div class="call-in"><div class="call-k">Eingehender Anruf</div><img class="call-p" src="'+o.img+'" alt=""><div class="call-n">'+o.who+'</div><div class="call-r">'+o.from+'</div><div class="call-t" id="call-t">Diensthandy · klingelt</div><div class="call-w" id="call-w"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="call-b" id="call-b"><button class="call-no" id="call-no" aria-label="Ablehnen"><span>'+KI_PH(1)+'</span>Ablehnen</button><button class="call-ok" id="call-ok" aria-label="Annehmen"><span>'+KI_PH(0)+'</span>Annehmen</button></div><div class="au-script" id="call-tx">'+o.script+'</div></div>');
 document.body.appendChild(ov);if(navigator.vibrate)try{navigator.vibrate([400,200,400,200,400])}catch(e){}
 const ring=()=>S('ring');ring();ringT=setInterval(ring,3000);
 const close=()=>{ringStop();stopAudio();ov.classList.remove('on');setTimeout(()=>ov.remove(),400)};
 $('#call-no').onclick=()=>{close();toast('Verpasster Anruf. Ruf über das Diensthandy zurück.')};
 $('#call-ok').onclick=()=>{ringStop();S('pickup');st.flag[key]=1;save();ov.classList.add('live');$('#call-b').innerHTML='<button class="btn ghost sm" id="call-txb">Mitschrift</button><button class="call-no" id="call-end"><span>'+KI_PH(1)+'</span>Auflegen</button>';
  const t0=Date.now();const tk=setInterval(()=>{const e=$('#call-t');if(!e){clearInterval(tk);return}e.textContent=fmt((Date.now()-t0)/1000)},500);
  const a=playClip(o.src,()=>{clearInterval(tk);const e=$('#call-t');if(e)e.textContent='Anruf beendet';$('#call-tx').classList.add('on')});
  $('#call-txb').onclick=()=>$('#call-tx').classList.toggle('on');$('#call-end').onclick=()=>{clearInterval(tk);close()}}}
function KI_PH(x){return '<svg viewBox="0 0 24 24" width="26" height="26" style="'+(x?'transform:rotate(135deg)':'')+'"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>'}
MODS.call=function(x){const w=el('div','mod callm','<div class="cm-ic"><img src="'+x.img+'" alt=""></div><div><b>Diensthandy</b><p>'+(st.flag['call_'+curDay]?'Anruf von '+x.who+' angenommen.':'Ein Anruf wird erwartet.')+'</p><button class="btn sm">'+(st.flag['call_'+curDay]?'Zurückrufen':'Aufs Handy sehen')+'</button></div>');
 w.querySelector('button').onclick=()=>{ac();callScreen(x)};
 if(!st.flag['call_'+curDay]&&!st.solved[curDay]){const d=curDay;setTimeout(()=>{if(curDay===d&&document.querySelector('#s-day.on')&&!document.querySelector('.call'))callScreen(x)},x.delay||9000)}return w};
MODS.gallery=function(x){const w=el('button','mod docl','<span class="dl-ic"><img src="a/icon_photos.jpg" alt=""></span><span><b>'+x.label+'</b><i>'+x.note+'</i></span>');w.onclick=()=>{ac();OPEN_X.tatort(x)};return w};

// Verhör
function verhoerOpen(o){const key='vh_'+curDay;const F=st.flag[key]||(st.flag[key]={q:{},e:[],c:0});
 viewer('<div class="vh"><div class="vh-top"><img src="'+o.img+'" alt=""><div><b>'+o.who+'</b><span>Vernehmung · Aufnahme läuft</span><div class="vh-rec"><i></i>REC</div></div></div><div class="vh-m"><span>Aussage</span><div class="vh-bar"><i id="vh-bar"></i></div><b id="vh-cnt"></b></div><div class="vh-say" id="vh-say">'+T(o.intro)+'</div><div class="vh-qs">'+o.qs.map((q,k)=>'<button class="vh-q" data-k="'+k+'">'+q.q+'</button>').join('')+'</div><div class="vh-ev"><b>Beweis vorlegen</b><div class="vh-in"><input id="vh-no" inputmode="numeric" maxlength="4" placeholder="Nr."><button class="btn sm" id="vh-go">Vorlegen</button></div><p>Die Nummer kommt aus der Asservatenliste deines Präsidiums.</p></div><div id="vh-out"></div></div>');$('#v-body').classList.add('wide');
 const say=(t,src,cb)=>{$('#vh-say').innerHTML='<i>'+o.who.split(' ')[0]+':</i> '+t;$('#vh-say').classList.remove('pop');void $('#vh-say').offsetWidth;$('#vh-say').classList.add('pop');playClip(src,cb)};
 const upd=()=>{const n=F.e.length;$('#vh-bar').style.width=Math.min(100,n/o.need*100)+'%';$('#vh-cnt').textContent=n>=o.need?'gekippt':n+' von '+o.need+' Beweisen';document.querySelectorAll('.vh-q').forEach(b=>b.classList.toggle('seen',!!F.q[b.dataset.k]));if(F.c)$('#vh-out').innerHTML='<div class="vh-conf"><b>Geständnis</b><p>'+o.conf.t+'</p><button class="btn ghost sm" id="vh-re">Noch einmal anhören</button></div>',$('#vh-re')&&($('#vh-re').onclick=()=>playClip(o.conf.src))};
 document.querySelectorAll('.vh-q').forEach(b=>b.onclick=()=>{const q=o.qs[b.dataset.k];F.q[b.dataset.k]=1;save();S('click');say(q.a,q.src);upd()});
 $('#vh-go').onclick=()=>{const v=$('#vh-no').value.replace(/\D/g,'');if(!v)return;S('paperSlide');const ev=o.ev[v];$('#vh-no').value='';
  if(!ev){say(o.wrong.t,o.wrong.src);toast('Dieser Beweis bringt hier nichts.');return}
  if(F.e.includes(v)){toast('Diesen Beweis hast du schon vorgelegt.');return}
  F.e.push(v);save();S('stamp');upd();
  say(ev.t,ev.src,()=>{if(F.e.length>=o.need&&!F.c){F.c=1;save();setTimeout(()=>{$('#vh-say').innerHTML='<i>'+o.who.split(' ')[0]+':</i> '+o.conf.t;playClip(o.conf.src);upd()},900)}})};
 upd()}
MODS.verhoer=function(x){const w=el('div','mod vhm','<div class="vhm-p"><img src="'+x.img+'" alt=""></div><div><b>'+x.who+'</b><p>'+x.label+'</p><button class="btn sm">Verhör beginnen</button></div>');w.querySelector('button').onclick=()=>{ac();verhoerOpen(x)};return w};

// Anklage mit gegenseitigem Finalcode
const AK=[['Wer hat Konrad Wendt getötet?',['Tom Riedl','Marlene Wendt','Jonas Wendt','Ilse Brandt','Dr. Felix Ahrens','Sophie Lang']],['Womit?',['Mit dem Eispickel','Mit Eisenhut im Tee','Mit Schlaftabletten','Mit einem Kissen']],['Warum?',['Wegen des Erbes','Wegen der Affäre','Wegen Lena und der Lawine','Wegen des Hotelkaufs']],['Wer hat den Tatort verfälscht?',['Niemand','Tom Riedl','Jonas Wendt','Marlene Wendt']]];
const AKS='e79f30d83c06308132645ac0aa64ad8f8a0049111d0d333175df59d12b7bb43a',AKE={A:'dd86b0d05e',B:'59962f59'},BLH='03051c1eabf9b6f29684ff8cf09c14be9ee0461a4a26d57bc42fdabccc522021';
async function akCheck(sel){return await kzSha('sw|ak|'+sel)}
async function akCode(sel,role){const h=await kzSha('sw|akc|'+role+'|'+sel);const enc=role==='A'?AKE.A:AKE.B;let r='';for(let i=0;i<enc.length/2;i++)r+=String.fromCharCode(parseInt(enc.substr(i*2,2),16)^parseInt(h.substr(i*2,2),16));return r}
MODS.anklage=function(x){const key='ak_'+curDay;const F=st.flag[key]||(st.flag[key]={s:[]});
 const w=el('div','mod akm','<div class="mod-h"><span>'+KI.doc+'</span>Anklage<i>Wähle auf jeder Karte genau eine Antwort</i></div>'+AK.map((q,i)=>'<div class="ak-c" data-i="'+i+'"><b>'+q[0]+'</b><div>'+q[1].map((o,k)=>'<button data-k="'+k+'"'+(F.s[i]===k?' class="on"':'')+'>'+o+'</button>').join('')+'</div></div>').join('')+'<button class="btn big" id="ak-go">Anklage erheben</button><div id="ak-out"></div>');
 w.querySelectorAll('.ak-c').forEach(c=>c.querySelectorAll('button').forEach(b=>b.onclick=()=>{S('stamp');const i=+c.dataset.i;F.s[i]=+b.dataset.k;save();c.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b))}));
 w.querySelector('#ak-go').onclick=async()=>{ac();if(F.s.filter(v=>v!=null).length<4){toast('Auf jeder Karte fehlt noch eine Antwort.');return}const sel=F.s.join('');
  if(await akCheck(sel)!==AKS){SFX.no();toast('Die Anklage hält nicht. Geht die Zeitleiste noch einmal zusammen durch.');return}
  F.ok=1;save();SFX.ok();const code=await akCode(sel,ROLE);w.querySelector('#ak-out').innerHTML='<div class="ak-ok"><span>Die Anklage hält.</span><p>Gib diesen Code an '+T('{P}')+' weiter. Den Code für dich bekommst du von dort.</p><b>'+code+'</b></div>';w.querySelector('#ak-out').scrollIntoView({behavior:'smooth',block:'center'})};
 if(F.ok)setTimeout(()=>w.querySelector('#ak-go').click(),50);return w};

// Codeprüfung mit Rollencode und Finale
$('#btn-check').onclick=async()=>{ac();const v=norm($('#daycode').value);if(!v)return;const D=DAYS[curDay];const want=D.codes?D.codes[ROLE]:D.code;
 if(await kzSha('sw|'+curDay+'|'+v)===want){st.solved[curDay]=1;save();AMBI.sfx.stamp();setTimeout(SFX.ok,250);$('#codecard').classList.add('solved');showReveal(true)}else{SFX.no();const c=$('#codecard');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');toast('Das passt nicht. Habt ihr alles verglichen?')}};
const _sr=window.showReveal;window.showReveal=function(play){if(DAYS[curDay]&&DAYS[curDay].finale){finalePanel();return}_sr(play)};
showReveal=window.showReveal;

// Finale: synchroner Start auf beiden Handys
function finalePanel(){const rv=$('#reveal');rv.innerHTML='';rv.classList.add('on');
 const now=Date.now();let tgt=Math.ceil((now+25000)/60000)*60000;
 rv.innerHTML='<div class="rv-k">Finale</div><p>Setzt euch zusammen, legt beide Handys nebeneinander und dreht den Ton laut. Das Finale startet auf beiden Handys zur selben Sekunde. Stellt beide auf dieselbe Startzeit.</p><div class="fz"><button class="btn ghost sm" id="fz-m">früher</button><div class="fz-t"><span>Start um</span><b id="fz-t"></b><i id="fz-c"></i></div><button class="btn ghost sm" id="fz-p">später</button></div><button class="btn big" id="fz-now">Ohne Warten starten</button><p class="pp-note">Ohne Warten, wenn ihr nicht zusammensitzt. Dann hört jeder seine Hälfte für sich.</p>';
 const pre=new Audio(ROLE==='B'?'a/fin_b.mp3?v=7':'a/fin_a.mp3?v=7');pre.preload='auto';try{pre.load()}catch(e){}
 const hm=t=>{const d=new Date(t);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+':00'};
 let iv=setInterval(()=>{const c=$('#fz-c');if(!c){clearInterval(iv);return}const s=(tgt-Date.now())/1000;c.textContent=s>0?'noch '+fmt(s):'';if(s<=0){clearInterval(iv);finaleRun(pre,Date.now()-tgt)}},200);
 const draw=()=>{$('#fz-t').textContent=hm(tgt)};draw();
 $('#fz-m').onclick=()=>{if(tgt-60000>Date.now()+5000){tgt-=60000;draw();S('click')}};$('#fz-p').onclick=()=>{tgt+=60000;draw();S('click')};
 $('#fz-now').onclick=()=>{clearInterval(iv);ac();finaleRun(pre,0)}}
const FIN={A:{src:'a/fin_a.mp3?v=7',sl:[{t:0,img:'a/suite24.jpg'},{t:2,img:'a/p_ilse.jpg',s:'Ilse Brandt'},{t:55,img:'a/a_suite.jpg'},{t:80,img:'a/heli.jpg',s:'Ein Hubschrauber landet neben dem Hotel.'},{t:108,img:'a/hotel_morgen.jpg',s:'Am Morgen nach dem Sturm'}]},
 B:{src:'a/fin_b.mp3?v=7',sl:[{t:0,img:'a/lagezentrum.jpg',s:'Lagezentrum Hochtal'},{t:20,img:'a/in_b4.jpg',s:'Oben im Hotel spricht Ilse Brandt.'},{t:55,img:'a/lagezentrum.jpg',s:'Funkverkehr mit der Bergwacht'},{t:72,img:'a/a_strasse.jpg'},{t:84,img:'a/heli.jpg'},{t:106,img:'a/hotel_morgen.jpg',s:'Am Morgen nach dem Sturm'}]}};
function finaleRun(au,late){const R=FIN[ROLE==='B'?'B':'A'];stopAudio();AMBI.music&&AMBI.music(false);
 const ov=el('div','fin on','<div class="fin-sl" id="fin-sl"></div><div class="fin-cap" id="fin-cap"></div><div class="fin-snow" id="fin-snow"></div><button class="fin-x" id="fin-x">Überspringen</button>');document.body.appendChild(ov);
 const sl=$('#fin-sl');R.sl.forEach((s,k)=>{const d=el('div','fin-i');d.style.backgroundImage='url('+s.img+')';d.dataset.k=k;sl.appendChild(d)});
 let cur=-1;const show=k=>{if(k===cur)return;cur=k;[...sl.children].forEach((d,i)=>d.classList.toggle('on',i===k));$('#fin-cap').textContent=R.sl[k].s||'';$('#fin-cap').classList.toggle('on',!!R.sl[k].s)};
 au.currentTime=Math.max(0,(late||0)/1000);curAudio=au;au._ui=()=>{};au.play().catch(()=>{});show(0);
 const tk=setInterval(()=>{const t=au.currentTime;let k=0;R.sl.forEach((s,i)=>{if(t>=s.t)k=i});show(k);if(t>R.sl[R.sl.length-1].t)$('#fin-snow').classList.add('on')},250);
 const end=()=>{clearInterval(tk);au.pause();ov.classList.add('end');setTimeout(()=>{ov.remove();finaleEnd()},900)};au.onended=end;$('#fin-x').onclick=end}
function finaleEnd(){const msg=st.gm||'';const von=st.gv||'';
 viewer('<div class="fe"><div class="fe-snow"></div><div class="fe-k">Fall gelöst</div><h2>Der Fall Sternwand</h2><p>Ilse Brandt hat Konrad Wendt mit Eisenhut im Abendtee vergiftet, am siebenundzwanzigsten Jahrestag der Lawine, die ihre Tochter Lena getötet hat. Jonas Wendt kam nach dem Tod in die Suite, nahm das Geld und schlug mit Toms Eispickel zu, um den Verdacht zu lenken.</p>'+
  '<div class="fe-msg"><div class="fe-mk">Eine Botschaft für euch</div><p>'+(msg?esc(msg).replace(/\n/g,'<br>'):'Vierundzwanzig Abende, zwei Handys, ein Fall. Ihr habt zugehört, gerechnet, gestritten und zusammengehalten. Frohe Weihnachten, ihr zwei.')+'</p>'+(von?'<span>'+esc(von)+'</span>':'')+'</div>'+
  '<div class="fe-b"><button class="btn" id="fe-u">Urkunde ansehen</button><button class="btn ghost" id="fe-r">Finale noch einmal</button></div></div>');$('#v-body').classList.add('wide');
 $('#fe-u').onclick=()=>(window.urkunde2||urkunde)();$('#fe-r').onclick=()=>{$('#viewer').classList.remove('on');finaleRun(new Audio(FIN[ROLE==='B'?'B':'A'].src),0)}}
function urkunde(){const a=esc(ROLE==='A'?st.me:st.pa)||'Ermittlung vor Ort',b=esc(ROLE==='A'?st.pa:st.me)||'Präsidium';
 viewer('<div class="ur" id="ur"><div class="ur-in"><div class="ur-k">Kriminalpolizei Hochtal</div><div class="ur-t">Urkunde</div><div class="ur-s">Ermittlerteam des Jahres</div><p>Für die Aufklärung des Falls Sternwand im Advent 2026 wird diese Urkunde verliehen an</p><div class="ur-n"><b>'+a+'</b><span>Ermittlung vor Ort</span></div><div class="ur-and">und</div><div class="ur-n"><b>'+b+'</b><span>Präsidium im Tal</span></div><div class="ur-f"><div class="ur-seal"><span>K1<br>Hochtal</span></div><div class="ur-sig"><i>Dr. Lea Hagen</i><span>für die Kriminalpolizei Hochtal</span></div></div></div></div><div class="fe-b"><button class="btn" id="ur-dl">Als Bild speichern</button><button class="btn ghost" id="ur-pr">Drucken</button></div>');$('#v-body').classList.add('wide');
 $('#ur-pr').onclick=()=>window.print();
 $('#ur-dl').onclick=()=>{const c=document.createElement('canvas');c.width=1600;c.height=2000;const g=c.getContext('2d');
  const gr=g.createLinearGradient(0,0,0,2000);gr.addColorStop(0,'#f7efd9');gr.addColorStop(1,'#ecdfbd');g.fillStyle=gr;g.fillRect(0,0,1600,2000);
  g.strokeStyle='#8a6a2a';g.lineWidth=10;g.strokeRect(60,60,1480,1880);g.lineWidth=3;g.strokeRect(90,90,1420,1820);
  g.fillStyle='#3a2a12';g.textAlign='center';g.font='600 44px Lora, serif';g.fillText('KRIMINALPOLIZEI HOCHTAL',800,300);
  g.font='800 150px "Playfair Display", serif';g.fillText('Urkunde',800,520);g.font='italic 64px Lora, serif';g.fillText('Ermittlerteam des Jahres',800,640);
  g.font='40px Lora, serif';g.fillText('Für die Aufklärung des Falls Sternwand',800,800);g.fillText('im Advent 2026 wird diese Urkunde verliehen an',800,860);
  g.font='700 92px "Playfair Display", serif';g.fillText(ROLE==='A'?(st.me||'Ermittlung vor Ort'):(st.pa||'Ermittlung vor Ort'),800,1040);g.font='34px Lora, serif';g.fillText('Ermittlung vor Ort',800,1100);
  g.font='italic 44px Lora, serif';g.fillText('und',800,1200);g.font='700 92px "Playfair Display", serif';g.fillText(ROLE==='A'?(st.pa||'Präsidium'):(st.me||'Präsidium'),800,1330);g.font='34px Lora, serif';g.fillText('Präsidium im Tal',800,1390);
  g.beginPath();g.arc(470,1660,120,0,7);g.fillStyle='#9b2c22';g.fill();g.fillStyle='#f7efd9';g.font='700 40px Lora, serif';g.fillText('K1',470,1650);g.font='28px Lora, serif';g.fillText('HOCHTAL',470,1695);
  g.fillStyle='#3a2a12';g.font='italic 60px Caveat, cursive';g.fillText('Dr. Lea Hagen',1100,1650);g.fillRect(860,1680,480,3);g.font='30px Lora, serif';g.fillText('für die Kriminalpolizei Hochtal',1100,1730);
  const a=document.createElement('a');a.download='Urkunde_Fall_Sternwand.png';a.href=c.toDataURL('image/png');a.click()}}

// Bankauskunft
PC_RENDER.bank=function(b){b.innerHTML='<div class="pt bk"><div class="pt-h"><img src="a/icon_bank.jpg" alt=""><div><b>Bergbank Hochtal · Auskunft</b><span>Interner Zugang Kriminalpolizei</span></div></div><div class="bk-f"><label>Banderole Nr.</label><input id="bk-n" inputmode="numeric" maxlength="4" placeholder="0000"><button class="btn sm" id="bk-go">Prüfen</button></div><div id="bk-out" class="bk-out"></div></div>';
 const go=()=>{const v=$('#bk-n').value.replace(/\D/g,'').padStart(4,'0');S('type',5);const o=$('#bk-out');o.innerHTML='<div class="lab-load"><i></i></div>';
  setTimeout(()=>{const n=+v;if(n>=377&&n<=381)o.innerHTML='<div class="bk-r"><div class="bk-row"><span>Banderole</span><b>'+v+'</b></div><div class="bk-row"><span>Ausgegeben</span><b>27.11.2026, 10:42 Uhr</b></div><div class="bk-row"><span>Betrag</span><b>1.000 € in 10 × 100 €</b></div><div class="bk-row"><span>Teil von</span><b>5 Bündeln, Banderolen 0377 bis 0381</b></div><div class="bk-row"><span>Konto</span><b>Berghotel Sternwand KG</b></div><div class="bk-row"><span>Abgeholt von</span><b>Konrad Wendt, persönlich</b></div><div class="bk-row"><span>Vermerk</span><b>Barabhebung für den Safe der Suite. Kunde wünscht keine Überweisung.</b></div></div>';
   else if(n>=300&&n<400)o.innerHTML='<p class="pt-e">Banderole '+v+': ausgegeben an Privatkunden, kein Bezug zum Fall.</p>';else o.innerHTML='<p class="pt-e">Keine Banderole mit dieser Nummer.</p>'},900)};
 $('#bk-go').onclick=go;$('#bk-n').onkeydown=e=>{if(e.key==='Enter')go()}};

// Laborportal: Giftpflanzen und Proben
PC_RENDER.lab=function(b){const m=maxDay();
 b.innerHTML='<div class="pt lab"><div class="pt-h"><img src="a/icon_lab2.jpg" alt=""><div><b>Laborportal Bergklinik Hochtal</b><span>Toxikologie · Zugang Kriminalpolizei</span></div></div><div class="lab-tabs"><button class="on" data-t="p">Giftpflanzen</button><button data-t="s">Proben</button></div><div id="lab-b"></div></div>';
 const tabs=b.querySelectorAll('.lab-tabs button');
 const P=()=>{$('#lab-b').innerHTML='<div class="bk-f"><label>Pflanze</label><input id="lp-n" placeholder="deutscher Name"><button class="btn sm" id="lp-go">Suchen</button></div><div id="lp-out"></div>';
  const go=()=>{const v=norm($('#lp-n').value);const L=LEAVES.find(x=>norm(x[1]).includes(v)||norm(x[0])===v||norm(x[1].split(' ').pop())===v);S('type',6);
   const W={eisenhut:'Wenige Gramm getrockneter Blätter oder Wurzeln sind tödlich. Erst Kribbeln und Taubheit in Mund und Gesicht, dann Übelkeit, Herzrhythmusstörungen, Atemlähmung. Tod nach einer bis drei Stunden möglich. Im Kräutertee kaum zu schmecken.',fingerhut:'Starke Wirkung auf das Herz. Übelkeit, Sehstörungen, Rhythmusstörungen. Bitter, fällt im Tee auf.',tollkirsche:'Pupillen weit, Herzrasen, Verwirrung. Beeren schmecken süß.',zeitlose:'Wirkt erst nach Stunden, Durchfall, Kreislaufversagen. Verwechslung mit Bärlauch.',germer:'Brennen im Mund, Übelkeit, Puls verlangsamt. Selten tödlich.',schierling:'Krämpfe innerhalb kurzer Zeit. Riecht stark nach Sellerie, fällt sofort auf.'};
   $('#lp-out').innerHTML=L?'<div class="lab-c"><img src="a/leaf_'+L[0]+'.jpg" alt=""><div><b>'+L[1]+'</b><i>'+L[2]+'</i><p><span>Wirkstoff</span>'+L[4]+'</p><p><span>Wirkung</span>'+W[L[0]]+'</p></div></div>':'<p class="pt-e">Nicht in der Datenbank der Giftpflanzen. Prüfe die Schreibweise.</p>'};
  $('#lp-go').onclick=go;$('#lp-n').onkeydown=e=>{if(e.key==='Enter')go()}};
 const Sx=()=>{if(m<20){$('#lab-b').innerHTML='<p class="pt-e">Für diesen Vorgang ist noch keine Probe eingegangen.</p>';return}
  $('#lab-b').innerHTML='<div class="lab-lg"><label>Benutzer<input id="ls-u" placeholder="Dienstnummer"></label><label>Passwort<input id="ls-p" type="password" placeholder="Probennummer"></label><button class="btn sm" id="ls-go">Befund abrufen</button></div><div id="ls-out"></div>';
  $('#ls-go').onclick=()=>{S('key');const u=norm($('#ls-u').value),p=norm($('#ls-p').value);if(u!=='HT2412'){toast('Benutzer unbekannt. Die Dienstnummer steht auf dem Ausweis oben im Hotel.');return}if(p!=='HT20114'){toast('Keine Probe mit diesem Passwort.');return}st.flag.lab_ok=1;save();
   const o=$('#ls-out');o.innerHTML='<div class="lab-load"><i></i></div><p class="pt-e">Massenspektrometrie läuft …</p>';S('boot');
   setTimeout(()=>{o.innerHTML='<div class="lab-r"><div class="lab-rh"><b>Befund</b><span>Probe HT 20 114 · Teesieb mit Pflanzenresten · Suite 24</span></div><div class="lab-chart">'+Array.from({length:34},(_,i)=>'<i style="height:'+(i===21?96:i===22?40:8+((i*37)%23))+'%"></i>').join('')+'</div><div class="bk-row"><span>Nachweis</span><b class="hk">ACONITIN</b></div><div class="bk-row"><span>Menge</span><b>tödliche Dosis, etwa das Zwanzigfache</b></div><div class="bk-row"><span>Weitere Stoffe</span><b>Kamille, Honig</b></div><div class="bk-row"><span>Bewertung</span><b>Vergiftung durch Blauen Eisenhut, Aufnahme mit dem Tee</b></div><div class="lab-sig">Dr. M. Fink · Toxikologie</div></div>';S('stamp')},st.flag.lab_seen?300:3200);st.flag.lab_seen=1;save()};if(st.flag.lab_ok){$('#ls-u').value='HT 2412';$('#ls-p').value='HT20114';$('#ls-go').click()}};
 tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.classList.toggle('on',x===t));S('click');t.dataset.t==='p'?P():Sx()});
 if((curDay||m)>=20){tabs[1].click()}else P()};

// Sophies Blog
PC_RENDER.blog=function(b){const key='blog_open';
 const posts=[['Der Bergsturz von Valtina','14. März 2026','Zwölf Jahre nach dem Bergsturz habe ich mit den Menschen gesprochen, die damals evakuiert wurden. Niemand hat je erklärt, warum die Warnungen der Geologen in einer Schublade lagen.'],['Was eine Akte verschweigt','2. Oktober 2026','Akten sind ehrlich in dem, was sie weglassen. Wer genau liest, findet die Lücke.'],['Unterwegs im Hochtal','27. November 2026','Ein altes Hotel, viel Schnee und eine Geschichte, die seit siebenundzwanzig Jahren auf jemanden wartet, der sie zu Ende erzählt.']];
 const draw=()=>{const open=st.flag[key];b.innerHTML='<div class="blog"><div class="blog-h"><b>Spurenlage</b><span>Unglücke, die nie aufgeklärt wurden · von Sophie Lang</span></div>'+
  '<article class="blog-p lock'+(open?' open':'')+'"><div class="blog-k">'+(open?'Entwurf, nicht veröffentlicht':'Gesperrter Beitrag')+'</div><h3>Die Wahrheit über den Sternwandhang</h3>'+(open?'<figure><img src="a/treffen.jpg" alt=""><figcaption>Bäckerei am Marktplatz, Hochtal. An ihrem freien Tag.</figcaption></figure><p>Heute habe ich es ihr gezeigt. Ich habe das Gutachten auf den Tisch gelegt und das Foto ihrer Tochter daneben. Warnstufe vier. Freigabe auf Anweisung des Betreibers.</p><p>Sie hat kein Wort gesagt. Sie hat das Foto genommen und lange angesehen, und dann hat sie es mir zurückgegeben und gesagt: Danke. Jetzt weiß ich es.</p><p>Ich dachte, die Wahrheit würde ihr helfen. Ich weiß nicht mehr, ob das stimmt.</p>':'<div class="blog-lk"><input id="bl-p" type="password" inputmode="numeric" placeholder="Passwort"><button class="btn sm" id="bl-go">Entsperren</button></div><p class="pt-e">Dieser Beitrag ist durch ein Passwort geschützt.</p>')+'</article>'+
  posts.map(p=>'<article class="blog-p"><div class="blog-k">'+p[1]+'</div><h3>'+p[0]+'</h3><p>'+p[2]+'</p></article>').join('')+'</div>';
  const g=$('#bl-go');if(g){const go=async()=>{S('key');if(await kzSha('sw|bl|'+norm($('#bl-p').value))===BLH){st.flag[key]=1;save();S('lock');draw()}else{SFX.no();toast('Falsches Passwort.')}};g.onclick=go;$('#bl-p').onkeydown=e=>{if(e.key==='Enter')go()}}};draw()};

PC_APPS.bank={n:'Bankauskunft',im:'icon_bank',day:14};
PC_APPS.blog={n:'Blog Spurenlage',im:'icon_notes',day:21};
PC_APPS.lab.im='icon_lab2';
})();
