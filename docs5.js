// Gestaltete Fassungen aller Unterlagen: Briefköpfe, Stempel, Unterschriften und Papier
(function(){
const D=window.DOCS,B=window.BR,hw=window.HW;
const row=(c,t='td')=>'<tr>'+c.map(x=>'<'+t+'>'+x+'</'+t+'>').join('')+'</tr>';
const tab=(head,rows,cls)=>'<table class="dt '+(cls||'')+'">'+row(head,'th')+rows.map(r=>row(r)).join('')+'</table>';
const line='<span class="wl"></span>';
const ini=(t,c)=>'<span class="para ink-'+(c||'blue')+'">'+t+'</span>';
const keep=(k,f)=>{const o=D[k].html;D[k].html=(...a)=>f(o(...a),...a)};
const hotelSeal=(r,c,bot)=>B.seal({top:'Berghotel Sternwand',bot:bot||'Hochtal · seit 1961',img:'a/logo_hotel.png',c:c||'violet',r:r||-9,size:108});
const kripoSeal=(r,c,bot)=>B.seal({top:'Polizeipräsidium Hochtal',bot:bot||'Kriminalpolizei · K1',img:'a/logo_polizei.png',c:c||'blue',r:r||-7,size:112});
const gemSeal=(top,bot,r)=>B.seal({top:top||'Gemeinde Hochtal',bot:bot||'Bezirk Hochtal',img:'a/wappen.png',c:'black',r:r||-6,size:112});
const AZ='K1 2412/26';
// Faxkopfzeilen
const fxHotel=(t,p)=>B.fax([t,'BERGHOTEL STERNWAND','TEL 2140 99','AN POLIZEI HOCHTAL K1','S.'+(p||'01/01')]);
const fxSepp=t=>B.fax([t,'S.GRUBER PRIVAT','AN POLIZEI HOCHTAL K1','S.01/01']);

Object.assign(D,{
 // ===== B1 Deckblatt =====
 deckblatt:Object.assign(D.deckblatt,{org:'kripo',paper:'akte',html:()=>B.sheet('kripo',
  B.lh('kripo',{refs:[['Aktenzeichen',AZ],['Eingang','1.12.2026, 7:15'],['Art','Todesermittlung'],['Verschluss','nur für den Dienstgebrauch']]})+
  '<div class="cv2"><div class="cv2-k">Ermittlungsakte</div><div class="cv2-no">2412/26</div><div class="cv2-b">Todesermittlung im Berghotel Sternwand, Hochtal 1</div>'+
  '<div class="cv2-g"><div><span>Verstorben</span><b>Konrad Alois Wendt</b><i>geb. 3.5.1957, Hotelier</i></div><div><span>Aufgefunden</span><b>1.12.2026, am frühen Morgen</b><i>Suite 24, 4. Stock</i></div><div><span>Lage vor Ort</span><b>Passstraße verschüttet</b><i>Seilbahn außer Betrieb, keine Anfahrt möglich</i></div><div><span>Meldung durch</span><b>Berghotel Sternwand</b><i>telefonisch, 7:15</i></div></div>'+
  '<div class="cv2-r"><div><span>Sachbearbeitung im Präsidium</span>'+line+'</div><div><span>Ermittlung vor Ort</span>'+line+'</div></div>'+
  '<div class="cv2-i"><span>Inhalt dieser Akte</span><p>Alle Blätter mit B in der Ecke gehören hierher. Faxe aus dem Hotel werden in der Reihenfolge ihres Eingangs abgeheftet.</p></div>'+
  '<div class="cv2-f">'+B.box({k:'Polizeipräsidium Hochtal',t:'Eingang',d:'01. DEZ. 2026',f:'K1 · Nr. 2412',c:'red',r:-5})+B.box({t:'Vertraulich',c:'red',r:6,style:'font-size:1.25em'})+'<div class="cv2-bc">'+B.bar('2412/26',34)+'<small>VG 2412 26 K1</small></div></div></div>'+B.holes,{paper:'akte'})}),

 // ===== B2 Zugänge =====
 zugang:Object.assign(D.zugang,{org:'kripo',html:()=>B.sheet('kripo',B.coffee(74,64,130,60)+
  B.lh('kripo',{dept:'Referat Informationstechnik',refs:[['Blatt','IT 07/26'],['Gültig','Notfallbetrieb'],['Für',AZ]],title:'Zugangsblatt Dienstliche Portale',meta:'Nicht weitergeben. Nach Abschluss des Vorgangs vernichten.'})+
  '<div class="acc"><div class="acc-h">Kripo Datenbank Hochtal</div><div class="acc-r"><span>Benutzer</span><b>Dienstnummer der Ermittlung vor Ort, ohne Leerzeichen</b></div><div class="acc-r"><span>Passwort</span><b>im Notfallbetrieb nicht erforderlich</b></div><p class="hwr small">Die Dienstnummer steht auf dem Ausweis. Den hat nur, wer oben ist.</p></div>'+
  '<div class="acc"><div class="acc-h">Handelsregister online</div><div class="acc-r"><span>Zugang</span><b>öffentlich, ohne Anmeldung</b></div></div>'+
  '<div class="acc"><div class="acc-h">Archiv Hochtaler Bote</div><div class="acc-r"><span>Benutzer</span><b>praesidium</b></div><div class="acc-r"><span>Passwort</span><b>Gründungsjahr der Zeitung</b></div><p class="hwr small">Steht im Kopf jeder Ausgabe. Hier im Büro liegt leider keine.</p></div>'+
  '<div class="acc"><div class="acc-h">Laborportal Bergklinik</div><div class="acc-r"><span>Benutzer</span><b>Dienstnummer der Ermittlung vor Ort</b></div><div class="acc-r"><span>Passwort</span><b>Probennummer der jeweiligen Probe</b></div></div>'+
  '<div class="sig-row">'+B.sig('Kriminaloberrat Hans Pfeifer',{s:'Pfeifer',role:'Leiter K1'})+B.box({t:'Vertraulich',c:'red',r:-3})+'</div>'+B.holes)}),

 // ===== B3 Belegung =====
 belegung:Object.assign(D.belegung,{org:'hotel',html:()=>B.sheet('hotel',fxHotel('01.12.26 07:42','01/02')+
  B.lh('hotel',{dept:'Rezeption',refs:[['Woche','49'],['Zeitraum','30.11. bis 6.12.'],['Saisonbeginn','5.12.'],['Stand','1.12., 7:30']],title:'Belegungsplan'})+
  tab(['Zimmer','Belegt durch','Bemerkung'],[['5 bis 6','','frei'],['7','Dr. Felix Ahrens','Geschäftsreise, 27.11. bis 3.12.'],['8 bis 11','','frei'],['12','Jonas Wendt','Familie, Dauerzimmer'],['13 bis 14','','frei'],['15','Sophie Lang','Wanderblog, 26.11. bis 4.12.'],['16 bis 17','','frei'],['18','','<b>gesperrt, Wasserschaden</b>, Schlüssel am Brett'],['19 bis 22','','frei'],['23','Marlene Wendt','Familie'],['24','Konrad Wendt','Suite, Inhaber']],'hotel')+
  '<p class="dn">Turmzimmer (gehört nicht zu den 24 Zimmern): Gast, Anreise 30.11., Schlüssel beim Gast.<br>Personal wohnt im Personaltrakt (Zimmer 1 bis 4) und hat eigene Schlüssel. Am Schlüsselbrett hängen nur die Gästezimmer 5 bis 24.</p>'+
  '<div class="sig-row">'+B.sig('Marlene Wendt',{s:'M. Wendt',role:'Hotelleitung'})+hotelSeal(-11)+'</div>',{paper:'hotel'})}),

 // ===== B4 Schlüsselbuch =====
 schluesselbuch:Object.assign(D.schluesselbuch,{org:'hotel',html:()=>B.sheet('hotel',fxHotel('01.12.26 07:44','02/02')+
  '<div class="kb"><div class="kb-h">'+B.logo('hotel','sm')+'<div><b>Schlüsselbuch</b><span>Ausgabe und Rückgabe der Zimmerschlüssel · Rezeption</span></div><i>Seite 112</i></div>'+
  tab(['Datum','Zimmer','an','aus','zurück','Kürzel'],[
   ['24.11.','18','Fa. Moser, Installateur','8:10','17:05',ini('AG')],['25.11.','18','Fa. Moser, Installateur','8:05','16:40',ini('AG')],['26.11.','15','S. Lang, Gast','15:20','',ini('AW')],['27.11.','7','Dr. F. Ahrens, Gast','18:45','',ini('AW')],['27.11.','18','Fa. Moser, Installateur','8:00','16:30',ini('AG')]
  ],'book hwt')+
  '<p class="hwr small">Familie Wendt (12, 23, 24) hat ihre Schlüssel dauerhaft bei sich und trägt sich nicht ein.</p></div>'+
  '<div class="postit"><p class="hwr">Zimmer 18 bleibt zu, bis alles trocken ist! Schlüssel hängt am Brett und wird an NIEMANDEN rausgegeben. Nur ich oder Fa. Moser.</p><p class="hwr small">A. Gruber, 27.11.</p></div>',{paper:'hotel',ft:false})}),

 // ===== B5 Dienstplan =====
 dienst_kueche:Object.assign(D.dienst_kueche,{org:'hotel',html:()=>B.sheet('hotel',fxHotel('09:20')+B.coffee(62,46,150,30)+
  B.lh('hotel',{dept:'Personalabteilung',refs:[['Wochen','48 und 49'],['Bereich','Küche, Bar, Haustechnik'],['Aushang','Personaltrakt']],title:'Dienstplan Küche und Service'})+
  '<div class="tw">'+tab(['Name','Bereich','Sa 28.11.','So 29.11.','Mo 30.11.','Di 1.12.'],[['Ilse Brandt','Küche','14:00 bis 22:00','frei','14:00 bis 22:00','6:00 bis 14:00'],['Luca Moretti','Bar','18:00 bis 1:00','18:00 bis 1:00','18:00 bis 1:00','frei'],['Sepp Gruber','Haustechnik','7:00 bis 16:00','frei','7:00 bis 16:00','Bereitschaft'],['Tom Riedl','Bergschule','nach Buchung','nach Buchung','keine Touren','keine Touren']],'hotel')+'</div>'+
  '<p class="dn">Die Küche schließt um 22:00. Danach nur Bar und Zimmerservice auf Anfrage.</p>'+
  '<div class="sig-row">'+B.sig('Marlene Wendt',{s:'M. Wendt',role:'für die Personalabteilung'})+B.box({k:'Berghotel Sternwand',t:'Personalabteilung',f:'ausgehängt 27.11.',c:'violet',r:-6})+'</div>',{paper:'hotel'})}),

 // ===== A1 Willkommensbrief =====
 willkommen:Object.assign(D.willkommen,{org:'hotel',html:()=>B.sheet('hotel',
  '<div class="lh-c">'+B.logo('hotel','big')+'<b>Berghotel Sternwand</b><span>Familie Wendt · seit 1961 · Hochtal 1 · 2.140 m</span></div>'+
  '<div class="letter2"><p class="l2-d">Hochtal, am 30. November 2026</p>'+
  '<p>Liebe Frau, lieber Herr '+line+',</p>'+
  '<p>herzlich willkommen bei uns auf 2.140 Metern. Schön, dass Sie noch vor dem Saisonstart am 5. Dezember zu uns gefunden haben.</p>'+
  '<p>Bis dahin sind unsere Gästezimmer nur teilweise geheizt. Deshalb haben wir Ihnen das <b>Turmzimmer</b> hergerichtet, mit eigenem Kachelofen und dem schönsten Blick auf die Sternwand. Es gehört nicht zu den 24 Zimmern des Hauses, Ihren Schlüssel behalten Sie also einfach bei sich.</p>'+
  '<div class="lt-info"><div><b>Frühstück</b> 7 bis 10 Uhr im Speisesaal</div><div><b>Küche</b> bis 22 Uhr</div><div><b>Hotelbar</b> 18 bis 1 Uhr</div><div><b>Spa</b> bis 23 Uhr, Kabinen auch später auf Buchung</div><div><b>Empfang</b> 7 bis 21 Uhr, nachts der Portier</div><div><b>Rezeption</b> am Zimmertelefon die 9</div></div>'+
  '<p>Für heute Nacht ist Sturm angesagt. Bitte bleiben Sie im Haus. Wenn die Straße zugeht, sind wir hier oben für ein paar Tage unter uns.</p>'+
  '<p>Mit herzlichen Grüßen aus dem Hochtal</p><div class="sig-row">'+B.sig('Marlene Wendt',{s:'Marlene Wendt',role:'Gastgeberin'})+B.sig('Konrad Wendt',{s:'K. Wendt',c:'black',r:-7,role:'freut sich auf ein Gespräch am Kamin'})+'</div>'+
  '<p class="l2-ps">PS: Den Tee am Abend bringt Ihnen gern unsere Küche. Frau Brandt kocht ihn seit dreißig Jahren für das ganze Haus.</p></div>',{paper:'hotel'})}),

 // ===== A4 Lageplan =====
 lageplan:Object.assign(D.lageplan,{org:'hotel',html:()=>{const fl=(n,c)=>'<div class="lp-fl"><div class="lp-n">'+n+'</div><div class="lp-r">'+c.map(x=>'<div class="lp-c'+(x[1]?' '+x[1]:'')+'">'+x[0]+'</div>').join('')+'</div></div>';
  return B.sheet('hotel',B.lh('hotel',{dept:'Hausplan für unsere Gäste',title:'Lageplan des Hauses',meta:'Bitte mitnehmen, die Gänge sind verwinkelt'})+
  '<div class="lp">'+fl('Turm',[['Turmzimmer · Sie wohnen hier','me']])+fl('4. Stock',[['Suite 24','big'],['Büro K. Wendt'],['Treppenhaus','tr']])+fl('3. Stock',[['18'],['19'],['20'],['21'],['22'],['23'],['Treppe','tr']])+fl('2. Stock',[['12'],['13'],['14'],['15'],['16'],['17'],['Treppe','tr']])+fl('1. Stock',[['5'],['6'],['7'],['8'],['9'],['10'],['11']])+fl('Erdgeschoss',[['Rezeption'],['Hotelbar'],['Speisesaal'],['Küche'],['Telefonzentrale'],['Kapelle']])+fl('Untergeschoss',[['Technik'],['Spa'],['Skikeller'],['Personaltrakt 1 bis 4','big']])+
  '</div><div class="lp-out"><b>Hinter dem Haus</b> Kräutergarten und Gewächshaus, Zugang durch die Küche</div>'+
  '<p class="dn">Kein Aufzug. Das Haus wurde 1961 gebaut und 1998 aufgestockt. Die Kameras hängen nur in den Fluren.</p>',{paper:'hotel'})}}),

 // ===== A3 Verdächtigentafel =====
 tafel:Object.assign(D.tafel,{org:'kripo',html:()=>B.sheet('kripo',
  B.lh('kripo',{dept:'Ermittlung vor Ort',refs:[['Formblatt','K1 · 7'],['Vorgang',AZ],['Blatt','1 von 1']],title:'Personenübersicht',meta:'Trage ein, was du erfährst'})+
  '<div class="tafel">'+['marlene','jonas','ilse','ahrens','tom','sophie'].map((k,i)=>'<div class="tf"><div class="tf-p"><img src="a/p_'+k+'.jpg" alt=""><span>P '+(i+1)+'</span></div><div class="tf-l"><span>Name</span><i></i><span>Zimmer</span><i></i><span>Motiv</span><i></i><i></i></div></div>').join('')+'</div>'+
  '<p class="dn">Die Namen und Zimmer bekommst du vom Präsidium. Dort liegt der Belegungsplan.</p>')}),

 // ===== A2 Dienstausweis =====
 ausweis:Object.assign(D.ausweis,{org:'kripo',html:(n,opt)=>B.idcard('A',n,(opt&&opt.selfie)||'',{print:opt&&opt.print})+(opt&&opt.print?'':'<p class="dn">Die Dienstnummer brauchst du, wenn das Präsidium auf Datenbanken zugreifen muss.</p>')}),

 // ===== B6 Schaltplan, Faxkopf neu =====
 // ===== B7 Heiratsurkunde =====
 heirat:Object.assign(D.heirat,{org:'gemeinde',html:()=>
  '<div class="urk2"><div class="urk2-in"><div class="urk2-h"><img src="a/wappen.png" alt=""><div><small>Bezirk Hochtal</small><b>Standesamt Hochtal</b><span>Dorfplatz 1 · 6731 Hochtal</span></div></div>'+
  '<div class="urk-t">Heiratsurkunde</div><div class="urk-s">Beglaubigte Abschrift aus dem Heiratsregister Nr. 47/1986</div>'+
  '<div class="urk-g"><div><span>Ehemann</span><b>Konrad Alois Wendt</b><i>geboren am 3. Mai 1957 in Hochtal</i></div><div><span>Ehefrau</span><b>Marlene Wendt, geb. Huber</b><i>geboren am 22. September 1962 in Innsbruck</i></div></div>'+
  '<div class="urk-d"><span>Tag der Eheschließung</span><b>14. Februar 1986</b><i>Ort der Eheschließung: Hochtal</i></div>'+
  '<div class="urk2-v">Die Übereinstimmung dieser Abschrift mit dem Eintrag im Heiratsregister wird beglaubigt.<br>Hochtal, den 9. Oktober 2026</div>'+
  '<div class="urk2-f">'+gemSeal('Standesamt Hochtal','Gemeinde Hochtal',-4)+B.sig('Die Standesbeamtin',{s:'A. Steiner',c:'blue'})+'<div class="urk2-fee"><span>Gebühr</span><b>9,80 EUR</b><span>bezahlt</span>'+ini('St')+'</div></div>'+
  '<div class="urk2-no">Urkunde Nr. 0047 1986 · Abschrift 3</div></div></div>'}),

 // ===== B8 Wartung =====
 wartung:Object.assign(D.wartung,{org:'hotel',html:()=>B.sheet('hotel',fxSepp('14:12')+B.coffee(70,58,170,-20)+
  '<div class="wb"><div class="wb-h2">'+B.logo('hotel','sm')+'<div><b>Wartungsbuch</b><span>Berghotel Sternwand · Haustechnik · S. Gruber</span></div><i>Band 7 · 2026</i></div>'+
  tab(['Datum','Gerät','Befund','Erledigt'],[['02.10.','Kamera 1 · Erdgeschoss','Objektiv gereinigt','<span class="hk">ja</span>'],['15.10.','Kamera 3 · 2. Stock','Wackelkontakt am Kabel','<span class="hk">ja</span>'],['03.11.','Hauptverteiler UG','Sicherung F7 getauscht','<span class="hk">ja</span>'],['12.11.','Kamera 4 · 4. Stock','<span class="hk">Uhr geht 12 Minuten vor!</span>','<span class="hk">nach Saisonbeginn umstellen</span>'],['20.11.','Kamera 2 · 1. Stock','Uhr geprüft, stimmt','<span class="hk">ja</span>'],['26.11.','Notstrom','Probelauf 10 Min, in Ordnung','<span class="hk">ja</span>']],'wbt')+
  '<p class="hn sm">Kamera 4 nicht vergessen! Nach dem 5.12., vorher ist zu viel los. S.</p>'+B.box({k:'Elektro Hochtal',t:'Geprüft',d:'03. NOV. 2026',f:'Prüfer: R. Mair',c:'blue',r:5,style:'float:right;margin-top:-6px'})+'</div>',{paper:'office',ft:false})}),

 // ===== B9 Telefonliste =====
 telefonliste:Object.assign(D.telefonliste,{org:'hotel',html:()=>B.sheet('hotel',fxSepp('11:03')+
  B.lh('hotel',{dept:'Telefonzentrale',refs:[['Stand','Saison 2026/27'],['Anlage','Nebenstellen 200 bis 290'],['Abgetippt','S. Gruber']],title:'Nebenstellen'})+
  tab(['Nebenstelle','Anschluss'],[['200','Rezeption'],['201 bis 204','Personal, Zimmer 1 bis 4 im Personaltrakt'],['205 bis 223','Gästezimmer 5 bis 23, Nebenstelle = 200 plus Zimmernummer'],['240','Suite 24 und Büro K. Wendt'],['250','Küche'],['260','Hotelbar'],['270','Spa'],['280','Technik'],['290','Telefonzentrale, Anrufbeantworter']],'hotel')+
  '<p class="hn sm">Die Suite geht nachts auf den Anrufbeantworter in der Zentrale, Herr Wendt will nicht geweckt werden. S.</p>',{paper:'hotel'})}),

 // ===== B10 Giftpflanzen =====
 giftpflanzen:Object.assign(D.giftpflanzen,{org:'klinik',html:()=>B.sheet('klinik',B.fax(['16:40','BERGKLINIK HOCHTAL LABOR','TEL 5200 349','AN POLIZEI HOCHTAL K1','S.01/01'])+
  '<div class="gp">'+B.lh('klinik',{refs:[['Anforderung',AZ],['Bearbeitung','Dr. M. Fink'],['Blatt','Bestimmungshilfe 3']],title:'Giftpflanzen in Kräutergärten der Alpen',meta:'Bestimmungshilfe nach Blattform · per Fax an K1'})+
  '<div class="gp-g">'+LEAVES.map((L,i)=>'<div class="gp-c"><div class="gp-i"><img src="a/leaf_'+L[0]+'.jpg" alt=""><span>'+(i+1)+'</span></div><div class="gp-t"><b>'+L[1]+'</b><i>'+L[2]+'</i><p>'+L[3]+'</p><p class="gp-w">Wirkstoff: '+L[4]+'</p></div></div>').join('')+'</div>'+
  '<p class="hn sm">Für den Fall Sternwand: Wenn Sie wissen, welche Pflanze es ist, geben Sie den deutschen Namen im Laborportal ein. Dr. M. Fink</p></div>',{paper:'office'})}),

 // ===== B11 Bericht 1999, Kopie =====
 bericht_kopie:Object.assign(D.bericht_kopie,{org:'gemeinde',html:()=>B.sheet('gemeinde',
  '<div class="rp"><div class="rp-st">KOPIE · FREIGEGEBEN DURCH GEMEINDE HOCHTAL</div>'+
  '<div class="lh99"><img src="a/wappen.png" alt=""><div><b>GEMEINDE HOCHTAL</b><span>LAWINENKOMMISSION</span><span>Dorfplatz 1 · 6731 Hochtal · Telefon 2000 14</span></div></div>'+
  '<div class="t99"><b>Bericht zum Lawinenabgang am Sternwandhang</b><span>vom 30. November 1999 · Fassung für den Gemeinderat</span></div>'+
  '<div class="rp-b"><p>Aktenzeichen: <span class="rd"><span class="ink-y">LK 0411</span></span></p>'+
  '<p>Am Dienstag, dem 30. November 1999, löste sich gegen 14:10 Uhr am Sternwandhang ein Schneebrett von etwa 300 Metern Breite. Zum Zeitpunkt des Abgangs befand sich eine Gruppe von Teilnehmenden und Betreuern des Jugendrennens auf der Abfahrt. Drei Personen wurden verschüttet und konnten nur noch tot geborgen werden.</p>'+
  '<p>Die Lawinenwarnstufe für den Bereich Sternwand lag an diesem Tag bei <span class="rd"><span class="ink-y">Stufe 4, groß</span></span>.</p>'+
  '<p>Die Piste wurde am Morgen des 30. November <span class="rd"><span class="ink-y">trotz Warnstufe 4 auf Anweisung des Betreibers K. Wendt</span></span> freigegeben.</p>'+
  '<p>Die Kommission sieht <span class="rd"><span class="ink-y">ein schweres Versäumnis des Betreibers</span></span> und empfiehlt, die Akte bis zum Abschluss weiterer Prüfungen ruhen zu lassen.</p>'+
  '<div class="rp-f"><span>Hochtal, 1. Dezember 1999</span><span class="rd w"><span class="ink-y">Dr. A. Pichler, Vorsitz</span></span></div>'+
  '<div class="rp-ss">'+gemSeal('Gemeinde Hochtal','Lawinenkommission',-14)+B.box({k:'Gemeindeamt Hochtal',t:'Abschrift',d:'02. DEZ. 1999',c:'black',r:4})+'</div></div>'+
  '<p class="dn">Durchschlag auf dünnem Papier. Die Schwärzungen sind mit Abdeckfarbe gemacht, darunter schimmert die Schreibmaschine gelblich durch. Halt die Spurenlampe darüber.</p></div>',{paper:'thin',ft:false})}),

 // ===== B12 Personalakten =====
 personalakten:Object.assign(D.personalakten,{org:'hotel',html:()=>{
  const P=[['P 004','Luca Moretti','Bar',{z:1}],['P 009','Sepp Gruber','Haustechnik',{z:1,i:1}],['P 011','Anna Weber','Rezeption',{u:1,i:1}],['P 017','Ilse Brandt','Küche',{z:1,i:1,u:1}],['P 021','Maria Hofer','Zimmerservice',{u:1}]];
  return B.sheet('hotel',fxSepp('10:31')+'<div class="pa">'+B.lh('hotel',{dept:'Personalabteilung',refs:[['Vorgang','Kenntnisnahme'],['Woche','49'],['Ablage','Personalakten P 001 bis P 024']],title:'Kenntnisnahme Dienstplan Woche 49',meta:'Jede Person schreibt den Satz von Hand ab und unterschreibt'})+
  P.map(p=>'<div class="pa-r"><div class="pa-l"><b>'+p[0]+'</b><span>'+p[1]+'</span><i>'+p[2]+'</i></div><div class="pa-h">'+hw('Dienstplan gelesen und zur Kenntnis genommen.',p[3])+'</div></div>').join('')+
  '<div class="sig-row">'+B.box({k:'Berghotel Sternwand',t:'Personalabteilung',f:'abgelegt',c:'violet',r:-4})+'</div>'+
  '<p class="dn">Gefaxt von S. Gruber. Vergleiche die Schrift genau: die z, die Punkte über den i und die u.</p></div>',{paper:'hotel'})}}),

 // ===== A9 Brief von Sophie Lang =====
 brief_sophie:Object.assign(D.brief_sophie,{org:'sophie',html:()=>
  '<div class="br9"><div class="br9-h2"><b>Spurenlage</b><span>Sophie Lang · Recherche und Reportage · München</span></div><div class="br9-d">München, 25. November 2026</div><div class="br9-a">Herrn<br>Konrad Wendt<br>Berghotel Sternwand<br>Hochtal</div>'+
  B.box({k:'Berghotel Sternwand',t:'Eingang',d:'27. NOV. 2026',f:'Post · Rezeption',c:'violet',r:7,style:'float:right;margin:2px 0 8px 10px'})+
  '<p class="br9-s">Persönlich. Das Gutachten der Lawinenkommission vom 1. Dezember 1999</p>'+
  '<p>Sehr geehrter Herr Wendt,</p><p>anbei finden Sie die Kopie eines Gutachtens, das es offiziell nicht gibt. Sie kennen es. Sie haben es selbst unterschrieben, als Sie die Piste am Sternwandhang an jenem Morgen trotz Warnstufe vier freigegeben haben.</p><p>Am 30. November 1999 starben drei Menschen. Einer davon war mein Onkel, Markus Lang. Siebenundzwanzig Jahre lang hat niemand gefragt, wer die Verantwortung trägt. Ich frage jetzt.</p><p>Ich gebe Ihnen bis Montag, den 30. November, Zeit, die Wahrheit selbst zu sagen. Ich werde ab dem 26. im Haus sein. Danach veröffentliche ich, was ich weiß.</p><p>Mit freundlichen Grüßen</p><p class="br9-sig">Sophie Lang</p>'+
  '<div class="br9-n">Unten am Rand, mit Bleistift, in anderer Schrift: <i>nicht antworten. Anwalt anrufen. K.</i></div><div class="br9-f">Anlage: Kopie Gutachten LK 0411</div></div>'}),

 // ===== A10 Verhörkarten =====
 verhoer:Object.assign(D.verhoer,{org:'kripo',html:()=>{
  const C=(who,img,qs,n)=>'<div class="vk10"><div class="vk10-k">'+B.logo('kripo','xs')+'<span>Kriminalpolizei Hochtal · Vernehmungsbogen '+n+'</span><i>'+AZ+'</i></div><div class="vk10-h"><img src="a/'+img+'" alt=""><div><b>'+who+'</b><span>Vernehmung · Ermittlung vor Ort</span></div></div><ol>'+qs.map(q=>'<li><span>'+q+'</span><i></i></li>').join('')+'</ol><div class="vk10-b"><b>Beweis vorgelegt</b><span>Nr. ________</span><span>Nr. ________</span><span>Nr. ________</span></div></div>';
  return '<div class="vk10-w">'+C('Jonas Wendt','p_jonas.jpg',['Wo waren Sie in der Nacht?','Wann haben Sie Ihren Vater zuletzt gesehen?','Wussten Sie vom neuen Testament?','Waren Sie draußen im Schnee?'],'V 1')+C('Ilse Brandt','p_ilse.jpg',['Sie haben Herrn Wendt jeden Abend Tee gebracht?','Wie lange waren Sie in der Suite?','Was wissen Sie über Eisenhut?','Wo waren Sie am Sonntag?'],'V 2')+'</div><p class="dn">Karte 1 gehört zu Tür 22, Karte 2 zu Tür 23. Notiere, was die Befragten sagen, und welche Beweise du vorlegst.</p>'}}),

 // ===== A11 und B13 Anklage =====
 anklage_a:Object.assign(D.anklage_a,{org:'kripo'}),anklage_b:Object.assign(D.anklage_b,{org:'kripo'}),
 _ank:(who)=>B.sheet('kripo',B.lh('kripo',{dept:who,refs:[['Aktenzeichen',AZ],['Vorlage','Staatsanwaltschaft Hochtal'],['Formblatt','K1 · 24']],title:'Anklageschrift im Fall Sternwand',meta:'Zuerst hier ankreuzen, dann in der App eintragen'})+
  '<div class="ak">'+[['Wer hat Konrad Wendt getötet?',['Tom Riedl','Marlene Wendt','Jonas Wendt','Ilse Brandt','Dr. Felix Ahrens','Sophie Lang']],['Womit?',['Mit dem Eispickel','Mit Eisenhut im Tee','Mit Schlaftabletten','Mit einem Kissen']],['Warum?',['Wegen des Erbes','Wegen der Affäre','Wegen Lena und der Lawine','Wegen des Hotelkaufs']],['Wer hat den Tatort verfälscht?',['Niemand','Tom Riedl','Jonas Wendt','Marlene Wendt']]].map((q,i)=>'<div class="ak-q"><b>'+(i+1)+'. '+q[0]+'</b>'+q[1].map(o=>'<span><i></i>'+o+'</span>').join('')+'</div>').join('')+
  '<div class="ak-f"><div><span>Unterschrift</span><i></i></div><div><span>Ort, Datum</span><i></i></div><div class="ak-st"><span>Dienststempel</span></div></div></div>'+B.holes),

 // ===== Fundstücke in der App =====
 inventar:{html:()=>'<div class="sheet pp-office sh-bergschule slipw">'+B.lh('bergschule',{dept:'Ausrüstung Bergführer · T. Riedl'})+tab(['Gegenstand','Inventarnummer'],[['Eispickel','ES 4471'],['Steigeisen','ES 4472'],['Lawinenschaufel','ES 4475'],['Lawinensonde','ES 4478'],['Lawinenpiepser','ES 4479'],['Seil 60 m','ES 4483']],'slim')+'<div class="sig-row">'+B.box({k:'Bergschule Sternwand',t:'Geprüft',d:'10. OKT. 2026',f:'A. Gruber',c:'green',r:-5})+'</div></div>'},
 kaufvertrag:{title:'Vorvertrag über das Hotel',html:()=>B.sheet('notar',B.lh('notar',{refs:[['Urkunde','Nr. 1187/26'],['Beurkundet','München, 14.10.2026']],title:'Vorvertrag über den Erwerb'})+
  '<p>Zwischen der Berghotel Sternwand Wendt KG, vertreten durch Herrn Konrad Wendt, und der Ahrens Alpin Invest GmbH, vertreten durch Herrn Dr. Felix Ahrens, wird der Verkauf des Berghotels Sternwand samt Grundstück und Inventar vereinbart.</p><table class="dt slim"><tr><td>Kaufpreis</td><td><b>4.200.000 EUR</b></td></tr><tr><td>Anzahlung bei Unterzeichnung</td><td>350.000 EUR</td></tr><tr><td>Übergabe</td><td>1. April 2027</td></tr><tr><td>Rücktritt</td><td>bis 30. November 2026 ohne Angabe von Gründen</td></tr></table>'+
  '<div class="sig-row">'+B.sig('Konrad Wendt',{s:'K. Wendt',c:'black'})+B.sig('Dr. Felix Ahrens',{s:'F. Ahrens',r:-2})+'</div><div class="sig-row">'+B.seal({top:'Notariat Dr. Kessler',bot:'Hochtal',mid:['Öffentliche','Notarin'],c:'violet',r:-12,size:100})+B.sig('Dr. Johanna Kessler',{s:'Kessler',role:'Notarin'})+'</div>')},
 ruecktritt:{title:'Brief von Konrad Wendt',html:()=>'<div class="sheet pp-hotel sh-hotel"><div class="lh-c sm">'+B.logo('hotel')+'<b>Konrad Wendt</b><span>Berghotel Sternwand · Hochtal 1</span></div><p class="hwr">30. November 2026</p><p class="hwr">Sehr geehrter Herr Dr. Ahrens,</p><p class="hwr">ich trete hiermit vom Vorvertrag zurück, fristgerecht, wie Sie sehen. Die Anzahlung überweise ich Ihnen zurück. Das Haus bleibt in der Familie. Es gibt Dinge, die man nicht verkauft, und Dinge, die man nicht verkaufen darf, bevor sie in Ordnung gebracht sind.</p><p class="hwr">Mit freundlichen Grüßen</p>'+B.sig('Konrad Wendt',{s:'K. Wendt',c:'black'})+'</div>'},
 kontoauszug:{html:()=>B.sheet('bank',B.lh('bank',{refs:[['Konto','61 0388 12'],['Inhaber','Jonas Wendt'],['Kreditrahmen','10.000 EUR'],['Auszug','11/2026 · Blatt 1']],title:'Kontoauszug Girokonto'})+
  tab(['Datum','Vorgang','Betrag'],[['02.11.','Saldo alt','<b>minus 31.240,18</b>'],['04.11.','Lastschrift Wettbüro Nordstern','minus 1.500,00'],['09.11.','Barabhebung Automat Stadtmitte','minus 2.000,00'],['15.11.','Lastschrift Wettbüro Nordstern','minus 3.000,00'],['21.11.','Überweisung an M. Kovac, Betreff: Rate','minus 2.000,00'],['30.11.','Zinsen Überziehung','minus 272,37'],['30.11.','Saldo neu','<b>minus 40.012,55</b>']],'slim bank')+
  '<div class="sig-row">'+B.box({t:'Kreditrahmen überschritten',f:'Bitte umgehend Kontakt aufnehmen',c:'red',r:-3})+'</div>')},
 notar:{title:'Terminbestätigung Notariat',html:()=>B.sheet('notar',B.lh('notar',{refs:[['Ihr Zeichen','Testament Wendt'],['Datum','23.11.2026']],title:'Terminbestätigung'})+
  '<p>Sehr geehrter Herr Wendt,</p><p>hiermit bestätigen wir Ihren Termin zur Beurkundung Ihres Testaments am <b>Mittwoch, 2. Dezember 2026, um 9:00 Uhr</b> in unserer Kanzlei. Bitte bringen Sie Ihren Ausweis und den besprochenen Entwurf mit.</p><p>Mit freundlichen Grüßen</p>'+B.sig('Dr. Johanna Kessler',{s:'i. A. Huber',role:'Kanzlei'}))},
 ausleihe:{title:'Ausleihbuch Skikeller',html:()=>B.sheet('gruber',B.lh('gruber',{dept:'Verleih im Berghotel Sternwand',refs:[['Buch','Stiefel'],['Saison','2026/27']],title:'Ausleihbuch'})+
  tab(['Paar','Name','Zimmer','Größe','Profil','Marke'],[['11','Tom Riedl','Personal','44','Wabe','Bergwerk'],['12','Marlene Wendt','23','39','Rillen','Alpina'],['14','Dr. F. Ahrens','7','46','Rillen','Bergwerk'],['15','Konrad Wendt','24','45','Wabe','Bergwerk'],['17','Jonas Wendt','12','46','Wabe','Bergwerk'],['19','Sophie Lang','15','38','Wabe','Bergwerk']],'slim')+
  '<div class="sl-f">Rückgabe bitte bis Saisonende</div><div class="sig-row">'+B.box({k:'Polizeipräsidium Hochtal',t:'Beschlagnahmt',d:'24. NOV. 2026',f:'Az. 2311/26',c:'red',r:-5})+'</div>')},
 generalbuch:{title:'Schlüsselbuch Generalschlüssel',html:()=>B.sheet('hotel','<div class="kb"><div class="kb-h">'+B.logo('hotel','sm')+'<div><b>Schlüsselbuch</b><span>Generalschlüssel · Rezeption · Schublade 2</span></div><i>Seite 9</i></div>'+
  tab(['Datum','Zeit','Entnommen von','Zurück'],[['28.11.','9:10','S. Gruber','9:40'],['29.11.','14:00','A. Weber','14:20'],['30.11.','7:30','S. Gruber','8:05'],['1.12.','<span class="hk">0:10</span>','<span class="hk">J. W.</span>','<span class="hk">nicht eingetragen</span>']],'book hwt')+
  '<p class="hn sm">Die Schublade mit dem Generalschlüssel klemmt seit Jahren und schließt nicht ab.</p></div>',{paper:'hotel',ft:false})},
 gutachten:{title:'Gutachten der Lawinenkommission, Original',html:()=>B.sheet('gemeinde','<div class="rp orig"><div class="lh99"><img src="a/wappen.png" alt=""><div><b>GEMEINDE HOCHTAL</b><span>LAWINENKOMMISSION</span><span>Dorfplatz 1 · 6731 Hochtal · Telefon 2000 14</span></div></div>'+
  '<div class="t99"><b>Gutachten zum Lawinenabgang am Sternwandhang</b><span>Az. LK 0411 · Original · nicht zur Weitergabe</span></div>'+
  '<div class="rp-b"><p>Die Lawinenwarnstufe lag am 30. November 1999 bei Stufe 4, groß. Die Kommission hat am Morgen um 7:30 Uhr telefonisch und schriftlich empfohlen, die Abfahrt am Sternwandhang gesperrt zu halten.</p><p>Die Piste wurde dennoch um 8:15 Uhr <b>auf Anweisung des Betreibers K. Wendt</b> für das Jugendrennen freigegeben. Der Betreiber begründete dies mit dem ausgebuchten Haus und der Anreise der Teams.</p><p>Die Kommission sieht ein schweres Versäumnis des Betreibers.</p>'+
  '<div class="rp-f"><span>Hochtal, 1. Dezember 1999</span></div><div class="sig-row">'+gemSeal('Gemeinde Hochtal','Lawinenkommission',-10)+B.sig('Dr. A. Pichler',{s:'Pichler',role:'Vorsitz der Lawinenkommission'})+B.sig('Konrad Wendt',{s:'K. Wendt',c:'black',r:-6,role:'zur Kenntnis, Betreiber'})+'</div>'+
  '<div class="rp-k">Darunter, in Konrads Schrift: <i>Fassung für den Gemeinderat ändern lassen. Original zu mir.</i></div></div></div>',{paper:'old',ft:false})},
 _as:(R)=>B.sheet('kripo',B.lh('kripo',{dept:'Asservatenkammer',refs:[['Vorgang',AZ],['Liste','fortlaufend'],['Lagerort','Regal K1 · 24']],title:'Asservatenliste'})+
  '<table class="dt slim as2"><tr><th>Nr.</th><th>Gegenstand</th><th>Fund</th><th>Etikett</th></tr>'+R.map(r=>'<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+B.bar(r[0],18)+'</td></tr>').join('')+'</table>'+
  '<p class="hn sm">Beweise im Verhör nur mit Nummer vorlegen lassen.</p>'+'<div class="sig-row">'+kripoSeal(-6,'blue','Asservatenkammer')+B.sig('KHK Wolf',{s:'Wolf',role:'Asservatenverwaltung'})+'</div>')
});
const LEAVES=window.LEAVES;
// Schaltplan: Faxkopf mit Absender
keep('schaltplan',h=>h.replace(/<div class="fx-h">.*?<\/div>/,fxSepp('06:58')).replace('<div class="sp-tt"><b>Berghotel Sternwand</b>','<div class="sp-tt">'+B.logo('hotel','xs')+'<b>Berghotel Sternwand</b>'));
D.schaltplan.org='hotel';
// Banderole mit Bankzeichen
keep('banderole',h=>h.replace('<div class="bd-l">Bergbank Hochtal</div>','<div class="bd-l">'+B.logo('bank','xs')+'Bergbank Hochtal</div>'));
})();
