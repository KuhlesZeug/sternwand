// Klangwelt: Raumklang, Musik und Geräusche, komplett im Browser erzeugt
(function(){
const A={};let C=null,out=null,ambBus=null,musBus=null,cur=null,mus=null;
function ctx(){if(typeof ac==='function'){C=ac();out=master}return C}
function bus(v){const g=C.createGain();g.gain.value=v;g.connect(out);return g}
function nbuf(sec,type){const n=Math.floor(C.sampleRate*sec),b=C.createBuffer(1,n,C.sampleRate),x=b.getChannelData(0);let l=0,b0=0,b1=0,b2=0;
 for(let i=0;i<n;i++){const w=Math.random()*2-1;if(type==='brown'){l=(l+.02*w)/1.02;x[i]=l*3.5}else if(type==='pink'){b0=.997*b0+.029591*w;b1=.985*b1+.032534*w;b2=.95*b2+.048056*w;x[i]=(b0+b1+b2+w*.1)*.6}else x[i]=w}return b}
function loopNoise(type,f,q,v,dest,ft){const s=C.createBufferSource();s.buffer=nbuf(4,type);s.loop=true;const fl=C.createBiquadFilter();fl.type=ft||'lowpass';fl.frequency.value=f;fl.Q.value=q||.7;const g=C.createGain();g.gain.value=v;s.connect(fl);fl.connect(g);g.connect(dest);s.start();return {s,g,f:fl}}
function osc(f,type,v,dest){const o=C.createOscillator();o.type=type||'sine';o.frequency.value=f;const g=C.createGain();g.gain.value=v;o.connect(g);g.connect(dest);o.start();return {o,g}}
function env(g,t,a,peak,d){g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)}
function blip(f,d,type,v,t0,dest){const t=C.currentTime+(t0||0),o=C.createOscillator(),g=C.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);o.connect(g);g.connect(dest||out);env(g,t,.005,v,d);o.start(t);o.stop(t+d+.1);return o}
function burst(d,f,q,v,t0,type,ft,dest){const t=C.currentTime+(t0||0),s=C.createBufferSource();s.buffer=nbuf(Math.max(.05,d),type||'white');const fl=C.createBiquadFilter();fl.type=ft||'bandpass';fl.frequency.value=f;fl.Q.value=q||1;const g=C.createGain();s.connect(fl);fl.connect(g);g.connect(dest||out);env(g,t,.004,v,d);s.start(t);s.stop(t+d+.1)}

// Raumklänge
const AMB={
 wind(d){const w=loopNoise('brown',420,.6,.05,d);const l=osc(.07,'sine',.035,w.g.gain);const h=loopNoise('pink',1400,3,.006,d,'bandpass');return [w,l,h]},
 fire(d){const base=loopNoise('brown',260,.7,.035,d);const iv=setInterval(()=>{if(Math.random()<.55)burst(.03+Math.random()*.05,1800+Math.random()*2500,2,.05+Math.random()*.06,Math.random()*.2,'white','bandpass',d)},180);return [base,{iv}]},
 clock(d){let k=0;const iv=setInterval(()=>{burst(.02,k++%2?3200:2600,6,.05,0,'white','bandpass',d)},1000);return [{iv}]},
 hum(d){return [osc(50,'sine',.012,d),osc(100,'sine',.006,d),loopNoise('pink',180,.7,.008,d)]},
 tube(d){const b=osc(120,'sawtooth',.0035,d);const z=loopNoise('white',6000,8,.002,d,'bandpass');const iv=setInterval(()=>{if(Math.random()<.12){const t=C.currentTime;b.g.gain.setValueAtTime(.0005,t);b.g.gain.setValueAtTime(.0035,t+.06+Math.random()*.15)}},400);return [b,z,{iv}]},
 fridge(d){return [osc(58,'triangle',.01,d),loopNoise('brown',300,.6,.012,d)]},
 kettle(d){const iv=setInterval(()=>{for(let i=0;i<3;i++)blip(500+Math.random()*900,.04,'sine',.012,Math.random()*.3,d)},260);return [loopNoise('pink',900,.9,.006,d),{iv}]},
 drip(d){const iv=setInterval(()=>{if(Math.random()<.5){const t=C.currentTime,o=C.createOscillator(),g=C.createGain();o.frequency.setValueAtTime(1500,t);o.frequency.exponentialRampToValueAtTime(600,t+.08);o.connect(g);g.connect(d);env(g,t,.002,.04,.12);o.start(t);o.stop(t+.2)}},900);return [{iv}]},
 rain(d){return [loopNoise('pink',2600,.5,.02,d,'highpass')]},
 traffic(d){return [loopNoise('brown',160,.5,.02,d)]}
};
const SCAPES={lobby:['wind','fire','clock'],room:['wind','clock'],kitchen:['wind','fridge','kettle'],office:['hum','clock','traffic'],faxroom:['tube','hum'],storm:['wind','rain'],cellar:['hum','drip'],quiet:['hum']};
function stopAmb(){if(!cur)return;const t=C.currentTime;cur.g.gain.setTargetAtTime(0,t,.4);const c=cur;setTimeout(()=>{c.parts.flat().forEach(p=>{if(p.iv)clearInterval(p.iv);try{p.s&&p.s.stop();p.o&&p.o.stop()}catch(e){}});c.g.disconnect()},2500);cur=null}
A.scape=function(name){if(!ctx())return;if(cur&&cur.name===name)return;stopAmb();if(!name||!SCAPES[name])return;const g=C.createGain();g.gain.value=0;g.connect(out);g.gain.setTargetAtTime(1.8,C.currentTime,.8);cur={name,g,parts:SCAPES[name].map(k=>AMB[k](g))}};
A.stop=stopAmb;

// Musik: dunkler Winterteppich mit Spieluhr, Moll, langsam
A.music=function(on,lvl){if(!ctx())return;if(!on){if(mus){const m=mus;mus=null;m.g.gain.setTargetAtTime(0,C.currentTime,1);setTimeout(()=>{clearInterval(m.iv);m.vo.forEach(o=>{try{o.stop()}catch(e){}});m.g.disconnect()},4000)}return}
 if(mus){mus.g.gain.setTargetAtTime(lvl||.5,C.currentTime,1);return}
 const g=C.createGain();g.gain.value=0;g.connect(out);g.gain.setTargetAtTime(lvl||.5,C.currentTime,2);
 const rv=C.createConvolver();const ir=C.createBuffer(2,C.sampleRate*3,C.sampleRate);for(let ch=0;ch<2;ch++){const x=ir.getChannelData(ch);for(let i=0;i<x.length;i++)x[i]=(Math.random()*2-1)*Math.pow(1-i/x.length,3)}rv.buffer=ir;const wet=C.createGain();wet.gain.value=.5;rv.connect(wet);wet.connect(g);
 const lp=C.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;lp.connect(g);lp.connect(rv);
 const chords=[[146.83,174.61,220],[116.54,146.83,174.61],[130.81,164.81,196],[110,138.59,164.81]];const vo=[];const pads=[0,1,2].map(i=>{const o=C.createOscillator();o.type='sawtooth';const o2=C.createOscillator();o2.type='sawtooth';o2.detune.value=8;const pg=C.createGain();pg.gain.value=.018;o.connect(pg);o2.connect(pg);pg.connect(lp);o.start();o2.start();vo.push(o,o2);return [o,o2]});
 const bass=C.createOscillator();bass.type='sine';const bg=C.createGain();bg.gain.value=.05;bass.connect(bg);bg.connect(g);bass.start();vo.push(bass);
 const mel=[587.33,698.46,880,698.46,659.25,587.33,523.25,587.33];let step=0,ci=0;
 function setChord(){const ch=chords[ci%chords.length],t=C.currentTime;pads.forEach((p,i)=>p.forEach(o=>o.frequency.setTargetAtTime(ch[i],t,.8)));bass.frequency.setTargetAtTime(ch[0]/2,t,.8);ci++}
 setChord();
 const iv=setInterval(()=>{if(step%8===0)setChord();if(Math.random()<.7){const f=mel[(step+ci)%mel.length]*(Math.random()<.2?2:1);const t=C.currentTime;[1,2.76,5.4].forEach((h,k)=>{const o=C.createOscillator(),og=C.createGain();o.type='sine';o.frequency.value=f*h;o.connect(og);og.connect(lp.frequency.value?g:g);og.connect(rv);env(og,t,.004,.03/(k+1),1.6-k*.4);o.start(t);o.stop(t+2)})}step++},1100);
 mus={g,iv,vo}};

// Geräusche für Geräte und Handgriffe
A.sfx={
 key(){burst(.03,2500+Math.random()*1500,3,.05,0,'white');burst(.02,500,1,.04,.01,'brown','lowpass')},
 type(n){for(let i=0;i<(n||8);i++){const t=i*.07+Math.random()*.04;burst(.025,2800+Math.random()*1200,3,.05,t);burst(.02,400,1,.03,t+.01,'brown','lowpass')}},
 click(){burst(.015,4000,4,.06);burst(.02,900,2,.03,.012)},
 tear(){for(let i=0;i<14;i++)burst(.03+Math.random()*.03,1500+Math.random()*3000,1.5,.08,i*.025)},
 pin(){blip(1800,.05,'triangle',.05);burst(.03,700,2,.08,.02,'brown','lowpass')},
 string(){const t=C.currentTime,o=C.createOscillator(),g=C.createGain();o.type='triangle';o.frequency.setValueAtTime(180,t);o.frequency.exponentialRampToValueAtTime(90,t+.25);o.connect(g);g.connect(out);env(g,t,.005,.05,.3);o.start(t);o.stop(t+.4)},
 stamp(){burst(.12,150,.8,.35,0,'brown','lowpass');burst(.05,2200,2,.06,.02)},
 drawer(){burst(.45,350,.8,.1,0,'brown','bandpass');burst(.08,900,3,.08,.42)},
 pickup(){burst(.06,600,2,.12);burst(.12,180,1,.1,.04,'brown','lowpass');blip(425,.6,'sine',.03,.25)},
 ring(){for(let r=0;r<2;r++)for(let i=0;i<20;i++){blip(i%2?2100:1700,.05,'square',.03,r*1.2+i*.05)}},
 fax(){const t=0;[1100,1100,1100].forEach((f,i)=>blip(f,.35,'sine',.07,t+i*.45));blip(2100,.5,'sine',.05,1.4);
  for(let i=0;i<10;i++){blip(1300+Math.random()*900,.08,'square',.025,1.9+i*.09)}burst(.8,2400,1.5,.05,1.9);
  for(let i=0;i<18;i++)burst(.05,1800,3,.04,2.8+i*.12);burst(1.6,500,.7,.05,2.8,'brown','lowpass')},
 boot(){blip(220,.15,'square',.03);blip(440,.2,'square',.03,.15);burst(1.2,300,.6,.03,.1,'pink','lowpass')},
 paperSlide(){burst(.35,2600,.8,.06,0,'pink','highpass')},
 lock(){burst(.04,1200,3,.1);burst(.06,500,2,.08,.05)},
 creak(){const t=C.currentTime,o=C.createOscillator(),g=C.createGain(),fl=C.createBiquadFilter();o.type='sawtooth';o.frequency.setValueAtTime(110,t);o.frequency.linearRampToValueAtTime(160,t+.6);fl.type='bandpass';fl.frequency.value=700;fl.Q.value=6;o.connect(fl);fl.connect(g);g.connect(out);env(g,t,.1,.03,.6);o.start(t);o.stop(t+.8)}
};
let duckLvl=1,baseLvl=.5;const _m=A.music;A.music=function(on,l){if(l!=null)baseLvl=l;return _m(on,l!=null?l*duckLvl:l)};A.duck=function(on){duckLvl=on?.35:1;if(mus&&C)mus.g.gain.setTargetAtTime(baseLvl*duckLvl,C.currentTime,.3);if(cur&&C)cur.g.gain.setTargetAtTime(on?.9:1.8,C.currentTime,.3)};
window.AMBI=A;
})();
