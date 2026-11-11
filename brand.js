// Markenauftritt aller Absender: Briefköpfe, Stempel, Unterschriften, Faxkopf, Papier
(function(){
const O={
 hotel:{logo:'a/logo_hotel.png',top:'Familie Wendt · seit 1961',n:'Berghotel Sternwand',sub:'Hochtal · 2.140 m',
  adr:['Hochtal 1','6731 Hochtal','Rezeption 2140 0','Telefax 2140 99'],
  ft:'Berghotel Sternwand Wendt KG · Sitz Hochtal · Firmenbuch FN 41961 h · gegründet 1961 von Alois Wendt · Bergbank Hochtal, Konto 61 0024 77'},
 kripo:{logo:'a/logo_polizei.png',top:'Polizeipräsidium Hochtal',n:'Kriminalpolizei',sub:'Kommissariat 1 · Todesermittlung',
  adr:['Talstraße 12','6731 Hochtal','Telefon 4100 0','Telefax 4100 19'],
  ft:'Polizeipräsidium Hochtal · Talstraße 12 · 6731 Hochtal · Parteienverkehr Montag bis Freitag 8 bis 12 Uhr · Bitte bei Antwort das Aktenzeichen angeben'},
 gemeinde:{logo:'a/wappen.png',top:'Bezirk Hochtal',n:'Gemeinde Hochtal',sub:'Gemeindeamt',
  adr:['Dorfplatz 1','6731 Hochtal','Telefon 2000 0','Amtsstunden Mo bis Fr 8 bis 12'],
  ft:'Gemeinde Hochtal · Dorfplatz 1 · 6731 Hochtal · Bergbank Hochtal, Konto 10 0001 00'},
 bank:{mark:'BH',top:'eingetragene Genossenschaft',n:'Bergbank Hochtal',sub:'Filiale Dorfplatz',
  adr:['Dorfplatz 3','6731 Hochtal','Telefon 3100 0','Bankleitzahl 37 811'],
  ft:'Bergbank Hochtal eG · Dorfplatz 3 · 6731 Hochtal · Genossenschaftsregister FN 2204 b · Einlagensicherung der Bergbanken'},
 klinik:{mark:'+',top:'Akademisches Lehrkrankenhaus',n:'Bergklinik Hochtal',sub:'Zentrallabor · Klinische Toxikologie',
  adr:['Klinikweg 4','6731 Hochtal','Labor 5200 340','Telefax 5200 349'],
  ft:'Bergklinik Hochtal · Zentrallabor · Leitung Dr. med. Miriam Fink · Befunde nur zur Verwendung durch die anfordernde Stelle'},
 gruber:{mark:'SG',top:'seit 1974',n:'Sport Gruber',sub:'Verleih · Service · Bergsport',
  adr:['Talstraße 40','6731 Hochtal','Filiale im Berghotel Sternwand','Telefon 2290'],
  ft:'Sport Gruber · Inhaber Anton Gruber · Talstraße 40 · 6731 Hochtal'},
 notar:{mark:'K',top:'Öffentlicher Notar',n:'Dr. Johannes Kessler',sub:'Notariat Hochtal',
  adr:['Kirchgasse 2','6731 Hochtal','Telefon 2650','Telefax 2651'],
  ft:'Notariat Dr. Johannes Kessler · Kirchgasse 2 · 6731 Hochtal · Termine nach Vereinbarung'},
 bergschule:{mark:'BS',top:'staatlich geprüfte Berg und Skiführer',n:'Bergschule Sternwand',sub:'im Berghotel Sternwand',
  adr:['Hochtal 1','6731 Hochtal'],ft:'Bergschule Sternwand · Leitung Tom Riedl'}
};
window.ORG=O;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const logo=(k,cls)=>{const o=O[k];return o.logo?'<img class="lh-logo '+(cls||'')+'" src="'+o.logo+'" alt="">':'<span class="lh-mark '+(cls||'')+'"><b>'+o.mark+'</b></span>'};
const BR={esc,logo,
 // Briefkopf mit Absender, Adresse und Bezugszeile
 lh(k,p){p=p||{};const o=O[k];
  return '<div class="lh lh-'+k+'"><div class="lh-top">'+logo(k)+'<div class="lh-n"><small>'+(p.top||o.top)+'</small><b>'+o.n+'</b><span>'+(p.dept||o.sub)+'</span></div>'+
   '<div class="lh-a">'+(p.adr||o.adr).map(esc).join('<br>')+'</div></div>'+
   (p.refs?'<div class="lh-refs">'+p.refs.map(r=>'<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>').join('')+'</div>':'')+
   (p.title?'<div class="lh-t">'+p.title+'</div>':'')+(p.meta?'<div class="lh-m">'+p.meta+'</div>':'')+'</div>'},
 ft(k,x){return '<div class="lh-ft lh-'+k+'">'+(x||O[k].ft)+'</div>'},
 // Runder Dienststempel als Vektor mit Tintenstruktur
 seal(p){const id='s'+Math.random().toString(36).slice(2,8);const s=p.size||118;
  return '<svg class="seal-st ink-'+(p.c||'blue')+'" style="width:'+s+'px;height:'+s+'px;transform:rotate('+(p.r||-8)+'deg);'+(p.style||'')+'" viewBox="0 0 200 200" aria-hidden="true">'+
   '<defs><path id="'+id+'t" d="M28 100 A72 72 0 0 1 172 100"/><path id="'+id+'b" d="M22 100 A78 78 0 0 0 178 100"/></defs><g filter="url(#ink)">'+
   '<circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" stroke-width="1.6"/>'+
   '<text font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="19" letter-spacing="2.2" fill="currentColor"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+esc(p.top)+'</textPath></text>'+
   '<text font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="600" font-size="15" letter-spacing="2" fill="currentColor"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+esc(p.bot||'')+'</textPath></text>'+
   '<circle cx="31" cy="100" r="3" fill="currentColor"/><circle cx="169" cy="100" r="3" fill="currentColor"/>'+
   (p.img?'<image href="'+p.img+'" x="62" y="56" width="76" height="76" opacity=".9" style="filter:grayscale(1) contrast(1.6)"/>':
    (p.mid||[]).map((m,i,a)=>'<text x="100" y="'+(100+(i-(a.length-1)/2)*20+6)+'" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="'+(m.length>9?15:19)+'" letter-spacing="1" fill="currentColor">'+esc(m)+'</text>').join(''))+
   '</g></svg>'},
 // Rechteckiger Stempel, z. B. Eingang oder Vermerk
 box(p){return '<div class="box-st ink-'+(p.c||'red')+'" style="transform:rotate('+(p.r||-4)+'deg);'+(p.style||'')+'">'+(p.k?'<i>'+p.k+'</i>':'')+'<b>'+p.t+'</b>'+(p.d?'<span class="bx-d">'+p.d+'</span>':'')+(p.f?'<i>'+p.f+'</i>':'')+'</div>'},
 // Handschriftliche Unterschrift
 sig(name,p){p=p||{};return '<div class="sig-b '+(p.cls||'')+'"><span class="sig ink-'+(p.c||'blue')+'" style="transform:rotate('+(p.r||-4)+'deg)">'+esc(p.s||name)+'</span><div class="sig-l"></div><div class="sig-n">'+esc(name)+(p.role?'<br><small>'+esc(p.role)+'</small>':'')+'</div></div>'},
 // Kopfzeile eines Faxes
 fax(a){return '<div class="fxh">'+a.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>'},
 // Strichcode aus einer Zeichenkette, immer gleich für dieselbe Eingabe
 bar(str,h){let s=0;for(const c of String(str))s=(s*31+c.charCodeAt(0))%9973;let out='',x=0;for(let i=0;i<46;i++){s=(s*9301+49297)%233280;const w=1+s%3;if(i%2===0)out+='<i style="left:'+x+'px;width:'+w+'px"></i>';x+=w+1}
  return '<span class="bc" style="width:'+x+'px;height:'+(h||26)+'px">'+out+'</span>'},
 // Gelochter Rand für Aktenblätter, nur im Druck sichtbar
 holes:'<i class="punch p1"></i><i class="punch p2"></i>',
 coffee:(x,y,s,r)=>'<i class="coffee" style="left:'+x+'%;top:'+y+'%;width:'+s+'px;height:'+s+'px;transform:rotate('+(r||0)+'deg)"></i>',
 // Dienstausweis, Vorderseite und im Druck auch Rückseite
 idcard(role,name,photo,p){p=p||{};const A=role!=='B';const nm=esc(name||'');
  const mrzName=(name||'').toUpperCase().replace(/Ä/g,'AE').replace(/Ö/g,'OE').replace(/Ü/g,'UE').replace(/ß/g,'SS').replace(/[^A-Z]+/g,'<');
  const no=A?'2412':'0712',ausw=A?'HT K1 004 2412':'HT K1 001 0712';
  const mrz=[('IDHTK1<'+no+'<<'+(mrzName||'')+'<'.repeat(40)).slice(0,36),('2909307<HTA<K1<<'+ausw.replace(/ /g,'')+'<'.repeat(30)).slice(0,36)].map(x=>x.replace(/</g,'&lt;')).join('<br>');
  const ph=photo?'<img src="'+photo+'" alt="">':'<span class="idc2-ph0">'+(p.print?'Foto<br><small>hier aufkleben</small>':'Foto')+'</span>';
  const front='<div class="idc2-f"><div class="idc2-g"></div><div class="idc2-hd">'+logo('kripo','id')+'<div class="idc2-o"><small>Polizeipräsidium Hochtal</small><b>Kriminalpolizei</b></div><div class="idc2-ty">Dienst<br>ausweis</div></div>'+
   '<div class="idc2-bd"><div class="idc2-ph">'+ph+'<i class="idc2-holo"></i></div><div class="idc2-fd">'+
   '<div><span>Name</span><b class="nm">'+(nm||'&nbsp;')+'</b></div><div class="idc2-2"><div><span>Funktion</span><b>'+(A?'Ermittlung vor Ort':'Präsidium im Tal')+'</b></div><div><span>Dienststelle</span><b>K1 Todesermittlung</b></div></div>'+
   '<div class="idc2-2"><div><span>Dienstnummer</span><b class="big">HT '+no+'</b></div><div><span>Gültig bis</span><b>30.09.2029</b></div></div></div>'+
   '<div class="idc2-st">'+BR.seal({top:'Polizeipräsidium Hochtal',bot:'Kriminalpolizei',img:'a/logo_polizei.png',c:'blue',r:-14,size:60})+'</div></div>'+
   '<div class="idc2-sg"><span class="sig ink-blue">'+(nm?esc((name||'').split(' ')[0]):'')+'</span><i>Unterschrift Inhaber</i><em>Nr. '+ausw+'</em></div><div class="idc2-mrz">'+mrz+'</div></div>';
  const back='<div class="idc2-b"><div class="idc2-g b"></div><p>Die Inhaberin oder der Inhaber dieses Ausweises gehört der Kriminalpolizei Hochtal an und ist berechtigt, Amtshandlungen im Rahmen der geltenden Bestimmungen vorzunehmen. Alle Behörden und Dienststellen werden ersucht, Unterstützung zu gewähren.</p>'+
   '<div class="idc2-br">'+BR.seal({top:'Polizeipräsidium Hochtal',bot:'Hochtal',img:'a/logo_polizei.png',c:'blue',r:-8,size:66})+'<div><span class="sig ink-blue">Pfeifer</span><i>Der Polizeipräsident · in Vertretung</i></div></div>'+
   '<div class="idc2-bf">'+BR.bar(ausw,22)+'<small>Bei Fund bitte an das Polizeipräsidium Hochtal, Talstraße 12, senden. Frei erfundene Dienststelle, dieser Ausweis gehört zum Spiel.</small></div></div>';
  return '<div class="idc2w'+(p.print?' pr':'')+'">'+front+(p.print?back:'')+'</div>'},
 // Ganzes Blatt mit Papier und optionalem Fuß
 sheet(k,inner,p){p=p||{};return '<div class="sheet pp-'+(p.paper||'office')+' sh-'+k+' '+(p.cls||'')+'">'+inner+(p.ft===false?'':BR.ft(k,p.ft))+'</div>'}
};
window.BR=BR;
// Tintenfilter für Stempel und Unterschriften
function defs(){if(document.getElementById('br-defs'))return;const d=document.createElement('div');d.id='br-defs';d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
 d.innerHTML='<svg width="0" height="0"><filter id="ink" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="11" result="m"/><feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.6" result="ma"/><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="2" result="f"/><feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2 2.2" result="fa"/><feComposite in="ma" in2="fa" operator="arithmetic" k1="1" result="mm"/><feComposite in="d" in2="mm" operator="in"/></filter></svg>';
 (document.body||document.documentElement).appendChild(d)}
if(document.body)defs();else document.addEventListener('DOMContentLoaded',defs);
})();
