// Dokumente ab Tag 4: gedruckte Blätter und Fundstücke in der App
(function(){
const row=(c,t='td')=>'<tr>'+c.map(x=>'<'+t+'>'+x+'</'+t+'>').join('')+'</tr>';
const tab=(head,rows,cls)=>'<table class="dt '+(cls||'')+'">'+row(head,'th')+rows.map(r=>row(r)).join('')+'</table>';
const hd=(kick,title,meta)=>'<div class="dh"><div class="dk">'+kick+'</div><div class="dtl">'+title+'</div>'+(meta?'<div class="dm">'+meta+'</div>':'')+'</div>';

// Zerrissener Zettel: sechs Stücke mit gemeinsamen Risskanten
function torn(){const W=150,H=96,X=[0,50,100,150],Y=[0,48,96];
 let seed=7;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
 const zig=(a,b,n)=>{const p=[];for(let i=1;i<n;i++){const t=i/n;const x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;const o=(rnd()-.5)*5.2;p.push(a[0]===b[0]?[x+o,y]:[x,y+o])}return p};
 const E={};const edge=(a,b)=>{const k=a+'|'+b,r=b+'|'+a;if(E[k])return E[k];if(E[r])return E[r].slice().reverse();const pts=zig(a,b,9);E[k]=pts;return pts};
 const P=[];for(let r=0;r<2;r++)for(let c=0;c<3;c++){const tl=[X[c],Y[r]],tr=[X[c+1],Y[r]],br=[X[c+1],Y[r+1]],bl=[X[c],Y[r+1]];
  const seg=(a,b)=>{const inner=!(a[0]===b[0]&&(a[0]===0||a[0]===W))&&!(a[1]===b[1]&&(a[1]===0||a[1]===H));return inner?edge(a,b):[]};
  P.push([tl,...seg(tl,tr),tr,...seg(tr,br),br,...seg(br,bl),bl,...seg(bl,tl)])}
 return {W,H,P}}
const NOTE=(W,H)=>'<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="#fbf8ef"/>'+
 Array.from({length:9},(_,i)=>'<line x1="6" x2="'+(W-6)+'" y1="'+(16+i*9)+'" y2="'+(16+i*9)+'" stroke="#c9d6e6" stroke-width=".35"/>').join('')+
 '<image href="a/logo_hotel.png" x="5" y="2" width="7.4" height="8"/><text x="14" y="8.6" font-family="Playfair Display" font-style="italic" font-weight="800" font-size="5" fill="#23392c" letter-spacing=".2">Berghotel Sternwand</text><text x="14" y="11.6" font-family="Barlow, sans-serif" font-size="2.2" fill="#9a7a3a" letter-spacing=".5">NOTIZEN · HOCHTAL 1</text>'+
 '<circle cx="104" cy="52" r="13" fill="none" stroke="#b58a52" stroke-opacity=".35" stroke-width="2.2"/><circle cx="106" cy="50" r="10" fill="#b58a52" fill-opacity=".07"/>'+
 '<text x="14" y="30" font-family="Caveat" font-size="11" fill="#1d2a4a">S Z W</text>'+
 [['324',25,43],['512',75,43],['741',125,43],['263',25,80],['935',75,80],['472',125,80]].map(g=>'<text x="'+g[1]+'" y="'+g[2]+'" text-anchor="middle" font-family="Caveat" font-size="15" fill="#1d2a4a">'+g[0]+'</text>').join('')+
 '<path d="M10 90 q30 -4 60 1" stroke="#1d2a4a" stroke-width=".6" fill="none" opacity=".5"/>';

Object.assign(window.DOCS,{
 // ===== A5 Visitenkarte =====
 visitenkarte:{role:'A',day:4,no:'A5',sealed:1,tab:'Visitenkarte',title:'Visitenkarte aus Zimmer 7',html:()=>
  '<div class="vk-wrap"><div class="vk"><div class="vk-logo"><span>A</span></div><div class="vk-n">Dr. Felix Ahrens</div><div class="vk-r">Geschäftsführer</div><div class="vk-f">Ahrens Alpin Invest GmbH</div><div class="vk-a">Maximilianstraße 14 · 80539 München<br>Erwerb und Entwicklung alpiner Hotels</div></div>'+
  '<div class="vk back"><div class="vk-g"></div><div class="vk-lines"><i></i><i></i><i></i><i></i></div><div class="vk-hl">Falls Sie es wieder vergessen:<br>Koffer = Gründungsjahr<br>Ihrer Firma! &nbsp;N.</div></div></div>'+
  '<p class="dn">Vorderseite und Rückseite der Karte. Auf der Rückseite hat jemand mit hellem Textmarker etwas notiert. Mit bloßem Auge ist es kaum zu lesen, die Spurenlampe in der App macht es sichtbar.</p>'},

 // ===== A6 Papierkorb =====
 schnipsel:{role:'A',day:6,no:'A6',sealed:1,tab:'Papierkorb',title:'Zettel aus dem Papierkorb',html:()=>{const t=torn();
  const pos=[[6,8,-8],[100,4,6],[40,70,12],[118,86,-5],[10,150,4],[92,160,-11]],order=[3,0,5,1,4,2];
  const pieces=order.map((pi,i)=>{const pp=t.P[pi],[px,py,rot]=pos[i];const d='M'+pp.map(p=>p[0].toFixed(2)+' '+p[1].toFixed(2)).join(' L')+' Z';const bb=pp.reduce((a,p)=>[Math.min(a[0],p[0]),Math.min(a[1],p[1])],[999,999]);
   return '<g transform="translate('+px+' '+py+') rotate('+rot+' 25 24) translate('+(-bb[0])+' '+(-bb[1])+')"><clipPath id="cp'+pi+'"><path d="'+d+'"/></clipPath><g clip-path="url(#cp'+pi+')">'+NOTE(t.W,t.H)+'</g><path d="'+d+'" fill="none" stroke="#6b5a40" stroke-width=".5" stroke-dasharray="1.6 1.2"/></g>'}).join('');
  return '<svg class="torn" viewBox="0 0 180 215" xmlns="http://www.w3.org/2000/svg">'+pieces+'</svg><p class="dn">Schneide die sechs Fetzen an der gestrichelten Risskante aus und leg sie wieder zusammen. Die Ränder passen nur auf eine Art.</p>'}},

 // ===== B6 Schaltplan =====
 schaltplan:{role:'B',day:5,no:'B6',sealed:1,tab:'Schaltplan',title:'Schaltplan mit Hausmeisternotiz',html:()=>
  '<div class="fx"><div class="fx-h"><span>06:58</span><span>S.GRUBER HAUSMEISTER</span><span>AN POLIZEI HOCHTAL K1</span><span>S.01/01</span></div>'+
  '<div class="sp"><div class="sp-tt"><b>Berghotel Sternwand</b><span>Unterverteilung Untergeschoss · Technikraum</span></div>'+
  '<div class="sp-d"><div class="sp-hs"><div class="sp-sym"></div><b>Q0</b><span>Hauptschalter</span></div><div class="sp-bus"></div><div class="sp-row">'+
  ['Küche','Flure','1. Stock','2. Stock','Heizung','Spa','Kameras','Bar'].map((n,i)=>'<div class="sp-f"><div class="sp-sw"></div><b>F'+(i+1)+'</b><span>'+n+'</span></div>').join('')+
  '</div></div><div class="sp-tb"><div><span>Plan</span><b>61/98</b></div><div><span>Ausführung</span><b>Elektro Hochtal</b></div><div><span>Stand</span><b>Umbau 1998</b></div></div></div>'+
  '<div class="hn">Nach Sturm IMMER so:<br>1. Hauptschalter <u>AUS</u><br>2. dann F5 (Heizung)<br>3. dann F2 (Flure)<br>4. dann F7 (Kameras)<br>5. erst dann Hauptschalter wieder <u>EIN</u><br><small>Andere Reihenfolge = Überlast, alles fliegt raus!</small><span class="hn-s">Sepp</span></div></div>'},

 // ===== Fundstücke nur in der App =====
 kaufvertrag:{title:'Vorvertrag über das Hotel',html:()=>'<div class="note doc-v"><div class="sl-h">Vorvertrag über den Erwerb</div><div class="sl-s">Notariat Dr. Kessler · Urkunde Nr. 1187/26</div><p>Zwischen der Berghotel Sternwand Wendt KG, vertreten durch Herrn Konrad Wendt, und der Ahrens Alpin Invest GmbH, vertreten durch Herrn Dr. Felix Ahrens, wird der Verkauf des Berghotels Sternwand samt Grundstück und Inventar vereinbart.</p><table class="dt slim"><tr><td>Kaufpreis</td><td><b>4.200.000 EUR</b></td></tr><tr><td>Anzahlung bei Unterzeichnung</td><td>350.000 EUR</td></tr><tr><td>Übergabe</td><td>1. April 2027</td></tr><tr><td>Rücktritt</td><td>bis 30. November 2026 ohne Angabe von Gründen</td></tr></table><div class="sl-f">Unterzeichnet in München am 14. Oktober 2026</div></div>'},
 ruecktritt:{title:'Brief von Konrad Wendt',html:()=>'<div class="note letter"><div class="lt-head">Berghotel Sternwand · Konrad Wendt</div><p class="hwr">30. November 2026</p><p class="hwr">Sehr geehrter Herr Dr. Ahrens,</p><p class="hwr">ich trete hiermit vom Vorvertrag zurück, fristgerecht, wie Sie sehen. Die Anzahlung überweise ich Ihnen zurück. Das Haus bleibt in der Familie. Es gibt Dinge, die man nicht verkauft, und Dinge, die man nicht verkaufen darf, bevor sie in Ordnung gebracht sind.</p><p class="hwr">Mit freundlichen Grüßen<br>K. Wendt</p></div>'},
 kontoauszug:{html:()=>'<div class="note doc-v"><div class="sl-h">Bergbank Hochtal · Kontoauszug 11/2026</div><div class="sl-s">Girokonto Jonas Wendt · Kreditrahmen 10.000 EUR</div>'+tab(['Datum','Vorgang','Betrag'],[['02.11.','Saldo alt','<b>minus 31.240,18</b>'],['04.11.','Lastschrift Wettbüro Nordstern','minus 1.500,00'],['09.11.','Barabhebung Automat Stadtmitte','minus 2.000,00'],['15.11.','Lastschrift Wettbüro Nordstern','minus 3.000,00'],['21.11.','Überweisung an M. Kovac, Betreff: Rate','minus 2.000,00'],['30.11.','Zinsen Überziehung','minus 272,37'],['30.11.','Saldo neu','<b>minus 40.012,55</b>']],'slim')+'<div class="stamp">Kreditrahmen überschritten</div></div>'},
 mahnung:{html:()=>'<div class="note doc-v"><div class="sl-h">M. Kovac · Privatdarlehen</div><div class="sl-s">ohne Absender, mit der Hand adressiert</div><p class="hwr">Jonas, die Frist ist um. 40.000 bis Freitag, sonst reden wir anders. Du weißt, wo wir dich finden. Dein Vater hat genug, frag ihn halt.</p></div>'},
 bons:{html:()=>'<div class="bons" style="background-image:url(a/bons.jpg)">'+[['4','22:58','12,40'],['2','23:14','16,80'],['6','23:31','9,60'],['1','0:12','21,00']].map(b=>'<div class="bon"><div class="bn-h">Hotelbar Sternwand</div><div class="bn-r"><span>Tisch</span><b>'+b[0]+'</b></div><div class="bn-r"><span>Zeit</span><b>'+b[1]+'</b></div><div class="bn-l"></div><div class="bn-r sum"><span>Summe EUR</span><b>'+b[2]+'</b></div><div class="bn-f">Danke und gute Nacht</div></div>').join('')+'</div><p class="v-cap">Auf den Bons steht nur Tisch, Uhrzeit und Betrag.</p>'},
 notiz8:{html:()=>'<div class="note nb8"><div class="sl-h">Notizbuch S. L.</div><p class="hwr">Laptop: Passwort = Titel meiner ersten Reportage. Ohne Leerzeichen! Ich vergesse es sonst immer.</p><p class="hwr">Blog Spurenlage, gesperrter Beitrag: Startnummer plus Jahr.</p><p class="hwr small">Belegschaft 1999? Wer ist noch da? Küche fragen.</p></div>'},
 zeitung8:{html:()=>'<div class="np"><div class="np-mast"><b>Hochtaler Bote</b><span>Heimatzeitung für das Hochtal · gegründet 1887</span><span>Samstag, 28. November 2026 · Nr. 47 · 1,80 Euro</span></div><div class="np-h">Sturmwarnung für das Hochtal</div><div class="np-c"><p>Der Wetterdienst warnt für Montag vor Orkanböen und starkem Schneefall. Die Straße ins Hochtal könnte für mehrere Tage gesperrt werden. Die Seilbahn Sternwand stellt bei Böen über 80 Stundenkilometern den Betrieb ein.</p><p>Im Berghotel Sternwand laufen trotzdem die Vorbereitungen für den Saisonstart am 5. Dezember.</p></div></div><p class="v-cap">Ein ganzer Stapel alter Ausgaben, manche sehr alt. Im Kopf steht bei allen dasselbe.</p>'}
});
})();
