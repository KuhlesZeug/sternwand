// Dokumente der Akten. Dieselben Seiten werden digital gezeigt und als PDF gedruckt.
(function(){
const row=(c,t='td')=>'<tr>'+c.map(x=>'<'+t+'>'+x+'</'+t+'>').join('')+'</tr>';
const tab=(head,rows,cls)=>'<table class="dt '+(cls||'')+'">'+row(head,'th')+rows.map(r=>row(r)).join('')+'</table>';
const stamp=(t,c)=>'<div class="stamp '+(c||'')+'">'+t+'</div>';
const hd=(kick,title,meta)=>'<div class="dh"><div class="dk">'+kick+'</div><div class="dtl">'+title+'</div>'+(meta?'<div class="dm">'+meta+'</div>':'')+'</div>';

window.DOCS={
 // ===== Rolle B: Fallakte =====
 belegung:{role:'B',day:1,tab:'Belegung',title:'Belegungsplan',html:()=>
  hd('Berghotel Sternwand · Rezeption','Belegungsplan Woche 49','Montag 30.11. bis Sonntag 6.12. · Saisonbeginn 5.12.')+
  tab(['Zimmer','Belegt durch','Bemerkung'],[
   ['5 bis 6','','frei'],
   ['7','Dr. Felix Ahrens','Geschäftsreise, 27.11. bis 3.12.'],
   ['8 bis 11','','frei'],
   ['12','Jonas Wendt','Familie, Dauerzimmer'],
   ['13 bis 14','','frei'],
   ['15','Sophie Lang','Wanderblog, 26.11. bis 4.12.'],
   ['16 bis 17','','frei'],
   ['18','','<b>gesperrt, Wasserschaden</b>'],
   ['19 bis 22','','frei'],
   ['23','Marlene Wendt','Familie'],
   ['24','Konrad Wendt','Suite, Inhaber']
  ])+
  '<p class="dn">Personal wohnt im Personaltrakt (Zimmer 1 bis 4) und hat eigene Schlüssel. Am Schlüsselbrett hängen nur die Gästezimmer 5 bis 24.</p>'+
  '<div class="dsig">Gefaxt 30.11., 23:58 · Marlene Wendt</div>'},

 dienst_kueche:{role:'B',day:3,tab:'Dienstplan',title:'Dienstplan Küche und Service',html:()=>
  hd('Berghotel Sternwand · Personal','Dienstplan Küche und Service','Woche 48 und 49')+
  '<div class="tw">'+tab(['Name','Bereich','Sa 28.11.','So 29.11.','Mo 30.11.','Di 1.12.'],[
   ['Ilse Brandt','Küche','14:00 bis 22:00','frei','14:00 bis 22:00','6:00 bis 14:00'],
   ['Luca Moretti','Bar','18:00 bis 1:00','18:00 bis 1:00','18:00 bis 1:00','frei'],
   ['Alois Gruber','Haustechnik','7:00 bis 16:00','frei','7:00 bis 16:00','Bereitschaft'],
   ['Tom Riedl','Bergschule','nach Buchung','nach Buchung','keine Touren','keine Touren']
  ])+'</div>'+
  '<p class="dn">Die Küche schließt um 22:00. Danach nur Bar und Zimmerservice auf Anfrage.</p>'+
  stamp('Personalabteilung')},

 // ===== Rolle A: Tatortmappe =====
 ausweis:{role:'A',day:1,tab:'Ausweis',title:'Dienstausweis',html:(n)=>
  '<div class="idcard"><div class="idc-top">Kriminalpolizei Hochtal</div><div class="idc-body"><div class="idc-photo"></div><div><div class="idc-lab">Name</div><div class="idc-val">'+(n||'__________________')+'</div><div class="idc-lab">Dienststelle</div><div class="idc-val">K1 Todesermittlung</div><div class="idc-lab">Dienstnummer</div><div class="idc-val big">HT 2412</div></div></div><div class="idc-foot">Frei erfundene Dienststelle. Dieser Ausweis gehört zum Spiel.</div></div>'+
  '<p class="dn">Die Dienstnummer brauchst du, wenn das Präsidium auf Datenbanken zugreifen muss.</p>'},

 tafel:{role:'A',day:1,tab:'Verdächtige',title:'Verdächtigentafel',html:()=>
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
