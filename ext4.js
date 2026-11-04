// Dienstausweis mit Selfie, gestaltete Urkunde
(function(){
const B=window.BR;
const name=()=>st.me||'';
const card=()=>B.idcard(ROLE,name(),st.selfie||'');
MODS.idcard=function(x){const w=el('div','mod idm','<div class="idm-h">'+x.h+'</div><div class="idm-c"></div><div class="idm-b"></div><p class="idm-n">'+T(x.note||'')+'</p>');
 const draw=()=>{w.querySelector('.idm-c').innerHTML=card();const bb=w.querySelector('.idm-b');
  bb.innerHTML='<button class="btn sm">'+(st.selfie?'Neues Foto machen':'Foto für den Ausweis machen')+'</button>'+(st.selfie?'<button class="btn ghost sm idm-del">Foto entfernen</button>':'')+'<p class="idm-priv">Dein Foto bleibt nur auf diesem Gerät. Es wird nicht hochgeladen und nicht an uns gesendet.</p>';bb.firstChild.onclick=()=>{ac();selfie(()=>draw())};const del=bb.querySelector('.idm-del');if(del)del.onclick=()=>{delete st.selfie;save();toast('Foto entfernt.');draw()}};
 draw();return w};
function selfie(done){
 viewer('<div class="idc-cam"><p class="v-cap top">Schau in die Kamera und halte dein Gesicht in den Rahmen.</p><div class="cv"><video id="cam-v" playsinline autoplay muted></video><div class="ov"></div></div><div class="fe-b"><button class="btn" id="cam-go">Auslösen</button><label class="btn ghost" id="cam-f">Bild wählen<input type="file" accept="image/*" capture="user" hidden></label></div><p class="v-cap" id="cam-msg"></p><p class="idm-priv">Das Foto wird nur auf diesem Gerät gespeichert und nirgendwohin übertragen. Du kannst es jederzeit wieder entfernen.</p></div>');
 const v=$('#cam-v');let stream=null;
 const stop=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());stream=null};
 const fin=src=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=240;c.height=300;const g=c.getContext('2d');
   const W=im.naturalWidth||im.videoWidth,H=im.naturalHeight||im.videoHeight;const r=Math.max(240/W,300/H);const w=W*r,h=H*r;
   g.translate(240,0);g.scale(-1,1);g.filter='contrast(1.06) saturate(.75)';g.drawImage(im,(240-w)/2,(300-h)/2,w,h);
   st.selfie=c.toDataURL('image/jpeg',.72);save();stop();SFX.paper&&SFX.paper();$('#viewer').classList.remove('on');toast('Foto eingeklebt. Dein Ausweis ist jetzt vollständig.');done&&done()};im.src=src};
 if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
  navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:720},height:{ideal:900}},audio:false}).then(s=>{stream=s;v.srcObject=s}).catch(()=>{$('#cam-msg').textContent='Die Kamera ist nicht freigegeben. Du kannst auch ein vorhandenes Bild wählen.'})
 }else $('#cam-msg').textContent='Diese Kamera lässt sich hier nicht öffnen. Du kannst ein vorhandenes Bild wählen.';
 $('#cam-go').onclick=()=>{if(!stream||!v.videoWidth){$('#cam-msg').textContent='Die Kamera läuft noch nicht.';return}
  const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);
  // Video ist gespiegelt angezeigt, Bild wird beim Einkleben gespiegelt
  fin(c.toDataURL('image/jpeg',.9))};
 $('#cam-f input').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>fin(r.result);r.readAsDataURL(f)};
 const vw=$('#viewer');const obs=new MutationObserver(()=>{if(!vw.classList.contains('on')){stop();obs.disconnect()}});obs.observe(vw,{attributes:true,attributeFilter:['class']})}
window.selfieOpen=selfie;
// Ausweis in den Tagen: Hotel Tag 2, Präsidium Tag 1
if(DAYS[2]&&DAYS[2].A)DAYS[2].A.mods=DAYS[2].A.mods.map(m=>m.t==='paper'&&m.items&&m.items.includes('ausweis')?{t:'idcard',h:'Aus deiner Jackentasche',note:'Das Präsidium wird nach deiner Dienstnummer fragen. Den Ausweis gibt es auch ausgedruckt, Blatt A2.'}:m);
if(DAYS[1]&&DAYS[1].B&&!DAYS[1].B.mods.some(m=>m.t==='idcard'))DAYS[1].B.mods.push({t:'idcard',h:'Auf deinem Schreibtisch',note:'Dein eigener Ausweis. Für die Portale brauchst du aber die Dienstnummer von oben aus dem Hotel.'});
// Urkunde mit Logo, Stempel, Unterschrift und eigenem Foto
window.urkunde2=function(){const me=esc(st.me||''),pa=esc(st.pa||'');const a=(ROLE==='A'?me:pa)||'Ermittlung vor Ort',b=(ROLE==='A'?pa:me)||'Präsidium';
 const ph=st.selfie?'<img class="ur2-ph" src="'+st.selfie+'" alt="">':'';
 viewer('<div class="ur2" id="ur"><div class="ur2-in"><img class="ur2-logo" src="a/logo_polizei.png" alt=""><div class="ur2-k">Polizeipräsidium Hochtal · Kriminalpolizei</div><div class="ur-t">Urkunde</div><div class="ur-s">Ermittlerteam des Jahres</div><p>Für die Aufklärung des Falls Sternwand im Advent 2026 wird diese Urkunde verliehen an</p>'+
  '<div class="ur2-ns"><div class="ur-n">'+(ROLE==='A'?ph:'')+'<b>'+a+'</b><span>Ermittlung vor Ort</span></div><div class="ur-and">und</div><div class="ur-n">'+(ROLE==='B'?ph:'')+'<b>'+b+'</b><span>Präsidium im Tal</span></div></div>'+
  '<div class="ur2-f">'+B.seal({top:'Polizeipräsidium Hochtal',bot:'Kriminalpolizei · K1',img:'a/logo_polizei.png',c:'red',r:-10,size:120})+B.sig('Hans Pfeifer',{s:'Pfeifer',role:'Kriminaloberrat, Leiter K1'})+'</div><div class="ur2-az">Az. K1 2412/26 · Hochtal, 24. Dezember 2026</div></div></div>'+
  '<div class="fe-b"><button class="btn" id="ur-dl">Als Bild speichern</button><button class="btn ghost" id="ur-pr">Drucken</button>'+(st.selfie?'':'<button class="btn ghost" id="ur-cam">Foto hinzufügen</button>')+'</div>');$('#v-body').classList.add('wide');
 $('#ur-pr').onclick=()=>window.print();if($('#ur-cam'))$('#ur-cam').onclick=()=>selfie(()=>window.urkunde2());
 $('#ur-dl').onclick=async()=>{const L=s=>new Promise(r=>{if(!s)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s});
  const [logo,face,paper]=await Promise.all([L('a/logo_polizei.png'),L(st.selfie),L('a/paper_amt.jpg')]);
  const c=document.createElement('canvas');c.width=1600;c.height=2000;const g=c.getContext('2d');
  g.fillStyle='#f4eedd';g.fillRect(0,0,1600,2000);if(paper){g.globalAlpha=.55;g.drawImage(paper,0,0,1600,2000);g.globalAlpha=1}
  g.strokeStyle='#1b3046';g.lineWidth=12;g.strokeRect(60,60,1480,1880);g.lineWidth=3;g.strokeRect(92,92,1416,1816);g.strokeStyle='#a8823c';g.lineWidth=2;g.strokeRect(104,104,1392,1792);
  if(logo){const h=230,w=logo.width/logo.height*h;g.drawImage(logo,800-w/2,150,w,h)}
  g.fillStyle='#1b3046';g.textAlign='center';g.font='700 40px "Barlow Condensed", sans-serif';g.fillText('POLIZEIPRÄSIDIUM HOCHTAL · KRIMINALPOLIZEI',800,440);
  g.fillStyle='#2a1d10';g.font='800 150px "Playfair Display", serif';g.fillText('Urkunde',800,610);g.font='italic 60px Lora, serif';g.fillText('Ermittlerteam des Jahres',800,710);
  g.font='38px Lora, serif';g.fillText('Für die Aufklärung des Falls Sternwand',800,830);g.fillText('im Advent 2026 wird diese Urkunde verliehen an',800,885);
  const nA=ROLE==='A'?(st.me||'Ermittlung vor Ort'):(st.pa||'Ermittlung vor Ort'),nB=ROLE==='A'?(st.pa||'Präsidium'):(st.me||'Präsidium');
  const own=ROLE==='A'?0:1;const ys=[1060,1350];
  [[nA,'Ermittlung vor Ort'],[nB,'Präsidium im Tal']].forEach((n,i)=>{let x=800;if(face&&i===own){g.save();g.beginPath();g.rect(250,ys[i]-150,150,188);g.clip();g.drawImage(face,250,ys[i]-150,150,188);g.restore();g.strokeStyle='#1b3046';g.lineWidth=3;g.strokeRect(250,ys[i]-150,150,188);x=880}
   g.fillStyle='#2a1d10';g.font='700 88px "Playfair Display", serif';g.fillText(n[0],x,ys[i]);g.font='32px Lora, serif';g.fillText(n[1],x,ys[i]+54)});
  g.font='italic 44px Lora, serif';g.fillText('und',800,1220);
  // Stempel
  g.save();g.translate(480,1680);g.rotate(-.17);g.strokeStyle='rgba(163,36,43,.85)';g.fillStyle='rgba(163,36,43,.85)';g.lineWidth=8;g.beginPath();g.arc(0,0,140,0,7);g.stroke();g.lineWidth=3;g.beginPath();g.arc(0,0,124,0,7);g.stroke();g.beginPath();g.arc(0,0,80,0,7);g.stroke();
  const ring=(t,r,top)=>{g.font='700 26px "Barlow Condensed", sans-serif';const st2=0.11,n=t.length;[...t].forEach((ch,k)=>{const a=top?(-Math.PI/2-(n-1)*st2/2+k*st2):(Math.PI/2+(n-1)*st2/2-k*st2);g.save();g.rotate(top?a+Math.PI/2:a-Math.PI/2);g.fillText(ch,0,top?-r:r+18);g.restore()})};
  ring('POLIZEIPRÄSIDIUM HOCHTAL',100,true);ring('KRIMINALPOLIZEI K1',96,false);g.font='700 44px "Barlow Condensed", sans-serif';g.fillText('K1',0,16);g.restore();
  g.fillStyle='#26407c';g.font='110px "Herr Von Muellerhoff", cursive';g.fillText('Pfeifer',1110,1690);g.fillStyle='#2a1d10';g.fillRect(860,1710,500,3);g.font='30px Lora, serif';g.fillText('Hans Pfeifer, Kriminaloberrat, Leiter K1',1110,1760);
  g.font='26px "Courier Prime", monospace';g.fillStyle='#55697d';g.fillText('Az. K1 2412/26 · Hochtal, 24. Dezember 2026',800,1860);
  const a=document.createElement('a');a.download='Urkunde_Fall_Sternwand.png';a.href=c.toDataURL('image/png');a.click()}};
})();
