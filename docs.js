// Dokumente der Akten. Dieselben Seiten werden digital gezeigt und als PDF gedruckt.
(function(){
const row=(c,t='td')=>'<tr>'+c.map(x=>'<'+t+'>'+x+'</'+t+'>').join('')+'</tr>';
const tab=(head,rows,cls)=>'<table class="dt '+(cls||'')+'">'+row(head,'th')+rows.map(r=>row(r)).join('')+'</table>';
const stamp=(t,c)=>'<div class="stamp '+(c||'')+'">'+t+'</div>';
const hd=(kick,title,meta)=>'<div class="dh"><div class="dk">'+kick+'</div><div class="dtl">'+title+'</div>'+(meta?'<div class="dm">'+meta+'</div>':'')+'</div>';

const line='<span class="wl"></span>';
window.DOCS={
 // ===== Rolle B: Fallakte =====
 deckblatt:{role:'B',day:0,no:'B1',tab:'Deckblatt',title:'Deckblatt Vorgang 2412/26',html:()=>
  '<div class="cover"><div class="cv-crest">Kriminalpolizei Hochtal</div><div class="cv-sub">K1 Todesermittlung · Talstraße 12 · 6731 Hochtal</div>'+
  '<div class="cv-box"><div class="cv-lab">Vorgang</div><div class="cv-no">2412/26</div><div class="cv-lab">Betreff</div><div class="cv-val">Todesermittlung im Berghotel Sternwand</div>'+
  '<div class="cv-row"><div><div class="cv-lab">Sachbearbeitung im Präsidium</div>'+line+'</div><div><div class="cv-lab">Ermittlung vor Ort</div>'+line+'</div></div>'+
  '<div class="cv-row"><div><div class="cv-lab">Eingang</div><div class="cv-val">1.12., 7:15, telefonisch</div></div><div><div class="cv-lab">Lage</div><div class="cv-val">Straße verschüttet, Seilbahn außer Betrieb</div></div></div></div>'+
  '<div class="cv-inhalt"><div class="cv-lab">Inhalt dieser Akte</div><p>Alle Blätter mit B in der Ecke gehören hierher. Faxe aus dem Hotel werden in der Reihenfolge ihres Eingangs abgeheftet.</p></div>'+
  stamp('Vertraulich')+'</div>'},

 zugang:{role:'B',day:0,no:'B2',tab:'Zugänge',title:'Dienstliche Portale',html:()=>
  hd('Kriminalpolizei Hochtal · IT','Zugangsblatt Dienstliche Portale','Nicht weitergeben. Nach Abschluss des Vorgangs vernichten.')+
  '<div class="acc"><div class="acc-h">Kripo Datenbank Hochtal</div><div class="acc-r"><span>Benutzer</span><b>Dienstnummer der Ermittlung vor Ort, ohne Leerzeichen</b></div><div class="acc-r"><span>Passwort</span><b>im Notfallbetrieb nicht erforderlich</b></div><p class="hw">Die Dienstnummer steht auf dem Ausweis. Den hat nur, wer oben ist.</p></div>'+
  '<div class="acc"><div class="acc-h">Handelsregister online</div><div class="acc-r"><span>Zugang</span><b>öffentlich, ohne Anmeldung</b></div></div>'+
  '<div class="acc"><div class="acc-h">Archiv Hochtaler Bote</div><div class="acc-r"><span>Benutzer</span><b>praesidium</b></div><div class="acc-r"><span>Passwort</span><b>Gründungsjahr der Zeitung</b></div><p class="hw">Steht im Kopf jeder Ausgabe. Hier im Büro liegt leider keine.</p></div>'+
  '<div class="acc"><div class="acc-h">Laborportal Bergklinik</div><div class="acc-r"><span>Benutzer</span><b>Dienstnummer der Ermittlung vor Ort</b></div><div class="acc-r"><span>Passwort</span><b>Probennummer der jeweiligen Probe</b></div></div>'},

 belegung:{role:'B',day:1,no:'B3',sealed:1,tab:'Belegung',title:'Belegungsplan',html:()=>
  hd('Berghotel Sternwand · Rezeption','Belegungsplan Woche 49','Montag 30.11. bis Sonntag 6.12. · Saisonbeginn 5.12.')+
  tab(['Zimmer','Belegt durch','Bemerkung'],[
   ['5 bis 6','','frei'],
   ['7','Dr. Felix Ahrens','Geschäftsreise, 27.11. bis 3.12.'],
   ['8 bis 11','','frei'],
   ['12','Jonas Wendt','Familie, Dauerzimmer'],
   ['13 bis 14','','frei'],
   ['15','Sophie Lang','Wanderblog, 26.11. bis 4.12.'],
   ['16 bis 17','','frei'],
   ['18','','<b>gesperrt, Wasserschaden</b>, Schlüssel am Brett'],
   ['19 bis 22','','frei'],
   ['23','Marlene Wendt','Familie'],
   ['24','Konrad Wendt','Suite, Inhaber']
  ])+
  '<p class="dn">Turmzimmer (gehört nicht zu den 24 Zimmern): Gast, Anreise 30.11., Schlüssel beim Gast.<br>Personal wohnt im Personaltrakt (Zimmer 1 bis 4) und hat eigene Schlüssel. Am Schlüsselbrett hängen nur die Gästezimmer 5 bis 24.</p>'+
  '<div class="dsig">Gefaxt 1.12., 7:42 · Marlene Wendt</div>'},

 schluesselbuch:{role:'B',day:1,no:'B4',sealed:1,tab:'Schlüsselbuch',title:'Schlüsselbuch der Rezeption',html:()=>
  hd('Berghotel Sternwand · Rezeption','Schlüsselbuch','Ausgabe und Rückgabe der Zimmerschlüssel')+
  tab(['Datum','Zimmer','an','aus','zurück'],[
   ['24.11.','18','Fa. Moser, Installateur','8:10','17:05'],
   ['25.11.','18','Fa. Moser, Installateur','8:05','16:40'],
   ['26.11.','15','S. Lang, Gast','15:20',''],
   ['27.11.','7','Dr. F. Ahrens, Gast','18:45',''],
   ['27.11.','18','Fa. Moser, Installateur','8:00','16:30']
  ])+
  '<p class="hw">Familie Wendt (12, 23, 24) hat ihre Schlüssel dauerhaft bei sich und trägt sich nicht ein.</p>'+
  '<div class="note" style="margin-top:12px"><div class="sl-h">Zettel am Buch</div><p class="hw">Zimmer 18 bleibt zu, bis alles trocken ist! Schlüssel hängt am Brett und wird an NIEMANDEN rausgegeben. Nur ich oder Fa. Moser. A. Gruber, 27.11.</p></div>'},

 dienst_kueche:{role:'B',day:3,no:'B5',sealed:1,tab:'Dienstplan',title:'Dienstplan Küche und Service',html:()=>
  hd('Berghotel Sternwand · Personal','Dienstplan Küche und Service','Woche 48 und 49')+
  '<div class="tw">'+tab(['Name','Bereich','Sa 28.11.','So 29.11.','Mo 30.11.','Di 1.12.'],[
   ['Ilse Brandt','Küche','14:00 bis 22:00','frei','14:00 bis 22:00','6:00 bis 14:00'],
   ['Luca Moretti','Bar','18:00 bis 1:00','18:00 bis 1:00','18:00 bis 1:00','frei'],
   ['Sepp Gruber','Haustechnik','7:00 bis 16:00','frei','7:00 bis 16:00','Bereitschaft'],
   ['Tom Riedl','Bergschule','nach Buchung','nach Buchung','keine Touren','keine Touren']
  ])+'</div>'+
  '<p class="dn">Die Küche schließt um 22:00. Danach nur Bar und Zimmerservice auf Anfrage.</p>'+
  stamp('Personalabteilung')},

 // ===== Rolle A: Hotelmappe =====
 willkommen:{role:'A',day:0,no:'A1',tab:'Willkommen',title:'Willkommensbrief',html:()=>
  '<div class="letter"><div class="lt-h">Berghotel Sternwand</div><div class="lt-s">Familie Wendt · seit 1961 · Hochtal 1</div>'+
  '<p>Liebe Frau, lieber Herr '+line+',</p>'+
  '<p>herzlich willkommen bei uns auf 2.140 Metern. Schön, dass Sie noch vor dem Saisonstart am 5. Dezember zu uns gefunden haben.</p>'+
  '<p>Bis dahin sind unsere Gästezimmer nur teilweise geheizt. Deshalb haben wir Ihnen das <b>Turmzimmer</b> hergerichtet, mit eigenem Kachelofen und dem schönsten Blick auf die Sternwand. Es gehört nicht zu den 24 Zimmern des Hauses, Ihren Schlüssel behalten Sie also einfach bei sich.</p>'+
  '<div class="lt-info"><div><b>Frühstück</b> 7 bis 10 Uhr im Speisesaal</div><div><b>Küche</b> bis 22 Uhr</div><div><b>Hotelbar</b> 18 bis 1 Uhr</div><div><b>Spa</b> bis 23 Uhr, Kabinen auch später auf Buchung</div><div><b>Empfang</b> 7 bis 21 Uhr, nachts der Portier</div><div><b>Rezeption</b> am Zimmertelefon die 9</div></div>'+
  '<p>Für heute Nacht ist Sturm angesagt. Bitte bleiben Sie im Haus. Wenn die Straße zugeht, sind wir hier oben für ein paar Tage unter uns.</p>'+
  '<p class="lt-sig">Ihre Marlene Wendt<br><i>und Konrad Wendt, der sich auf ein Gespräch am Kamin freut</i></p></div>'},

 lageplan:{role:'A',day:1,no:'A4',sealed:1,tab:'Lageplan',title:'Lageplan des Hauses',html:()=>{
  const fl=(n,c)=>'<div class="lp-fl"><div class="lp-n">'+n+'</div><div class="lp-r">'+c.map(x=>'<div class="lp-c'+(x[1]?' '+x[1]:'')+'">'+x[0]+'</div>').join('')+'</div></div>';
  return hd('Berghotel Sternwand','Lageplan des Hauses','Bitte mitnehmen, die Gänge sind verwinkelt')+
  '<div class="lp">'+
  fl('Turm',[['Turmzimmer','me']])+
  fl('4. Stock',[['Suite 24','big'],['Büro K. Wendt'],['Treppenhaus','tr']])+
  fl('3. Stock',[['18'],['19'],['20'],['21'],['22'],['23'],['Treppe','tr']])+
  fl('2. Stock',[['12'],['13'],['14'],['15'],['16'],['17'],['Treppe','tr']])+
  fl('1. Stock',[['5'],['6'],['7'],['8'],['9'],['10'],['11']])+
  fl('Erdgeschoss',[['Rezeption'],['Hotelbar'],['Speisesaal'],['Küche'],['Telefonzentrale'],['Kapelle']])+
  fl('Untergeschoss',[['Technik'],['Spa'],['Skikeller'],['Personaltrakt 1 bis 4','big']])+
  '</div><div class="lp-out"><b>Hinter dem Haus</b> Kräutergarten und Gewächshaus, Zugang durch die Küche</div>'+
  '<p class="dn">Kein Aufzug. Das Haus wurde 1961 gebaut und 1998 aufgestockt. Die Kameras hängen nur in den Fluren.</p>'}},

 ausweis:{role:'A',day:0,no:'A2',tab:'Ausweis',title:'Dienstausweis',html:(n)=>
  '<div class="idcard"><div class="idc-top">Kriminalpolizei Hochtal</div><div class="idc-body"><div class="idc-photo"></div><div><div class="idc-lab">Name</div><div class="idc-val">'+(n||'__________________')+'</div><div class="idc-lab">Dienststelle</div><div class="idc-val">K1 Todesermittlung</div><div class="idc-lab">Dienstnummer</div><div class="idc-val big">HT 2412</div></div></div><div class="idc-foot">Frei erfundene Dienststelle. Dieser Ausweis gehört zum Spiel.</div></div>'+
  '<p class="dn">Die Dienstnummer brauchst du, wenn das Präsidium auf Datenbanken zugreifen muss.</p>'},

 tafel:{role:'A',day:0,no:'A3',tab:'Verdächtige',title:'Verdächtigentafel',html:()=>
  hd('Ermittlung vor Ort','Verdächtigentafel','Trage ein, was du erfährst')+
  '<div class="tafel">'+['marlene','jonas','ilse','ahrens','tom','sophie'].map(k=>'<div class="tf"><img src="a/p_'+k+'.jpg" alt=""><div class="tf-l"><span>Name</span><i></i><span>Zimmer</span><i></i><span>Motiv</span><i></i><i></i></div></div>').join('')+'</div>'+
  '<p class="dn">Die Namen und Zimmer bekommst du vom Präsidium. Dort liegt der Belegungsplan.</p>'},

 // ===== Fundstücke in Räumen (nur digital, als Einblendung) =====
 inventar:{html:()=>
  '<div class="note slip"><div class="sl-h">Bergschule Sternwand</div><div class="sl-s">Ausrüstung Bergführer · T. Riedl</div>'+
  tab(['Gegenstand','Inventarnummer'],[
   ['Eispickel','ES 4471'],['Steigeisen','ES 4472'],['Lawinenschaufel','ES 4475'],['Lawinensonde','ES 4478'],['Lawinenpiepser','ES 4479'],['Seil 60 m','ES 4483']
  ],'slim')+'<div class="sl-f">Jährliche Prüfung: 10.10. · A. Gruber</div></div>'},
 tourenbuch:{html:()=>
  '<div class="note"><div class="sl-h">Tourenbuch</div><p class="hw">Mi 25.11. · Sternwandgrat mit 2 Gästen · 6:30 bis 15:10</p><p class="hw">Do 26.11. · Sturmwarnung, keine Touren</p><p class="hw">Fr 27.11. · abgesagt</p><p class="hw">ab Sa · Lawinenwarnstufe 4, alles gesperrt</p></div>'},
 gaestebuch:{html:()=>
  '<div class="note"><div class="sl-h">Gästebuch</div><p class="hw">„Wieder ein Traum hier oben. Danke, Familie Wendt!“ · Ehepaar Kurz, 22.11.</p><p class="hw">„Ich komme wieder. Es gibt hier noch so viel zu entdecken.“ · S. Lang, 28.11.</p></div>'},
 regal:{html:()=>
  '<div class="note"><div class="sl-h">Kräuterregal</div><p>Dutzende Gläser, sorgfältig beschriftet, die Etiketten lateinisch: Melissa, Mentha, Matricaria, Salvia, Thymus … Im dritten Fach von oben ist eine Lücke. Der Staub zeigt einen sauberen Kreis, als hätte dort bis vor Kurzem ein Glas gestanden.</p></div>'},
 tablett:{html:()=>
  '<div class="note"><div class="sl-h">Teetablett</div><p>Eine silberne Kanne, frisch gespült. Eine Tasse mit Unterteller, leer und sauber. Am Rand der Zuckerdose klebt noch etwas Honig. Wer hat das Tablett aus der Suite zurück in die Küche gebracht? Davon hat Ilse nichts erzählt.</p></div>'}
};
})();
