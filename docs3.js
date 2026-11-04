// Dokumente Tag 9 bis 13
(function(){
const row=(c,t='td')=>'<tr>'+c.map(x=>'<'+t+'>'+x+'</'+t+'>').join('')+'</tr>';
const tab=(head,rows,cls)=>'<table class="dt '+(cls||'')+'">'+row(head,'th')+rows.map(r=>row(r)).join('')+'</table>';
const hd=(kick,title,meta)=>'<div class="dh"><div class="dk">'+kick+'</div><div class="dtl">'+title+'</div>'+(meta?'<div class="dm">'+meta+'</div>':'')+'</div>';
Object.assign(window.DOCS,{
 // ===== B7 Heiratsurkunde =====
 heirat:{role:'B',day:10,no:'B7',sealed:1,tab:'Heiratsurkunde',title:'Heiratsurkunde Wendt',html:()=>
  '<div class="urk"><div class="urk-in"><div class="urk-k">Standesamt Hochtal</div><div class="urk-t">Heiratsurkunde</div><div class="urk-s">Beglaubigte Abschrift aus dem Heiratsregister Nr. 47/1986</div>'+
  '<div class="urk-g"><div><span>Ehemann</span><b>Konrad Alois Wendt</b><i>geboren am 3. Mai 1957 in Hochtal</i></div><div><span>Ehefrau</span><b>Marlene Wendt, geb. Huber</b><i>geboren am 22. September 1962 in Innsbruck</i></div></div>'+
  '<div class="urk-d"><span>Tag der Eheschließung</span><b>14. Februar 1986</b><i>Ort der Eheschließung: Hochtal</i></div>'+
  '<div class="urk-f"><div class="urk-seal"><span>Standesamt<br>Hochtal</span></div><div class="urk-sig"><i>A. Steiner</i><span>Die Standesbeamtin</span></div></div></div></div>'},

 // ===== B8 Wartungsprotokoll =====
 wartung:{role:'B',day:11,no:'B8',sealed:1,tab:'Wartung',title:'Wartungsprotokoll Kameras und Technik',html:()=>
  '<div class="wb"><div class="wb-h"><b>Wartungsbuch</b><span>Berghotel Sternwand · Hausmeister S. Gruber</span></div>'+
  tab(['Datum','Gerät','Befund','Erledigt'],[
   ['02.10.','Kamera 1 · Erdgeschoss','Objektiv gereinigt','<span class="hk">ja</span>'],
   ['15.10.','Kamera 3 · 2. Stock','Wackelkontakt am Kabel','<span class="hk">ja</span>'],
   ['03.11.','Hauptverteiler UG','Sicherung F7 getauscht','<span class="hk">ja</span>'],
   ['12.11.','Kamera 4 · 4. Stock','<span class="hk">Uhr geht 12 Minuten vor!</span>','<span class="hk">nach Saisonbeginn umstellen</span>'],
   ['20.11.','Kamera 2 · 1. Stock','Uhr geprüft, stimmt','<span class="hk">ja</span>'],
   ['26.11.','Notstrom','Probelauf 10 Min, in Ordnung','<span class="hk">ja</span>']],'wbt')+
  '<p class="hn sm">Kamera 4 nicht vergessen! Nach dem 5.12., vorher ist zu viel los. S.</p></div>'},

 // ===== A7 Zettel mit Kamerazugang =====
 kamerazettel:{role:'A',day:11,no:'A7',sealed:1,tab:'Zettel',title:'Zettel aus dem Technikraum',html:()=>
  '<div class="nz"><div class="nz-p"><div class="nz-tape"></div><p>Kamera PC im Keller</p><p>Benutzer: sepp</p><p>PIN: <b>3108</b></p><p class="s">Geburtstag Mama, nicht wegwerfen!! S.</p></div></div><p class="dn">Ausschneiden, wenn du magst. Den Zettel brauchst du am Kamerarechner im Keller.</p>'},

 // ===== B9 Telefonliste =====
 telefonliste:{role:'B',day:13,no:'B9',sealed:1,tab:'Nebenstellen',title:'Liste der Nebenstellen',html:()=>
  hd('Berghotel Sternwand · Telefonzentrale','Nebenstellen','Stand Saison 2026/27 · von S. Gruber abgetippt')+
  tab(['Nebenstelle','Anschluss'],[
   ['200','Rezeption'],['201 bis 204','Personal, Zimmer 1 bis 4 im Personaltrakt'],['205 bis 223','Gästezimmer 5 bis 23, Nebenstelle = 200 plus Zimmernummer'],['240','Suite 24 und Büro K. Wendt'],['250','Küche'],['260','Hotelbar'],['270','Spa'],['280','Technik'],['290','Telefonzentrale, Anrufbeantworter']])+
  '<p class="hn sm">Die Suite geht nachts auf den Anrufbeantworter in der Zentrale, Herr Wendt will nicht geweckt werden. S.</p>'},

 // ===== Fundstücke nur in der App =====
 notar:{title:'Terminbestätigung Notariat',html:()=>'<div class="note doc-v"><div class="sl-h">Notariat Dr. Kessler · Hochtal</div><div class="sl-s">Terminbestätigung</div><p>Sehr geehrter Herr Wendt, hiermit bestätigen wir Ihren Termin zur Beurkundung Ihres Testaments am <b>Mittwoch, 2. Dezember 2026, um 9:00 Uhr</b> in unserer Kanzlei. Bitte bringen Sie Ihren Ausweis und den besprochenen Entwurf mit.</p><div class="sl-f">Hochtal, 23. November 2026</div></div>'},
 testament:{title:'Entwurf eines Testaments',html:()=>'<div class="note letter"><div class="lt-head">Entwurf · nicht unterschrieben</div><p class="hwr">Mein letzter Wille.</p><p class="hwr">Mein Sohn Jonas erhält nur das, was ihm das Gesetz zwingend zusteht. Er hat genug genommen.</p><p class="hwr">Meine Frau Marlene behält ihr Wohnrecht im Haus auf Lebenszeit.</p><p class="hwr">Das Berghotel Sternwand vermache ich einer Stiftung für die Familien der Lawine vom 30. November 1999. Es ist zu spät, um es gutzumachen. Aber es ist nicht zu spät, es zuzugeben.</p><p class="hwr">K. W.</p></div>'},
 ausleihe:{title:'Ausleihbuch Skikeller',html:()=>'<div class="note doc-v"><div class="sl-h">Sport Gruber · Verleih im Berghotel Sternwand</div><div class="sl-s">Ausleihbuch Stiefel, Saison 2026/27</div>'+tab(['Paar','Name','Zimmer','Größe','Profil','Marke'],[['11','Tom Riedl','Personal','44','Wabe','Bergwerk'],['12','Marlene Wendt','23','39','Rillen','Alpina'],['14','Dr. F. Ahrens','7','46','Rillen','Bergwerk'],['15','Konrad Wendt','24','45','Wabe','Bergwerk'],['17','Jonas Wendt','12','46','Wabe','Bergwerk'],['19','Sophie Lang','15','38','Wabe','Bergwerk']],'slim')+'<div class="sl-f">Rückgabe bitte bis Saisonende · Beschlagnahmt am 24.11., Az. 2311/26</div></div>'},
 anrufliste:{title:'Anrufliste der Telefonanlage',html:()=>'<div class="lcdl"><div class="lcdl-h">ANRUFE 30.11. BIS 1.12.</div>'+[['21:48','EXTERN','207','4:12 MIN'],['22:20','223','270','0:40 MIN'],['22:58','260','250','0:22 MIN'],['23:51','EXTERN','240','NICHT ANGENOMMEN · AB 0:48'],['0:05','212','240','NICHT ANGENOMMEN'],['7:14','200','EXTERN','3:05 MIN']].map(r=>'<div class="lcdl-r"><span>'+r[0]+'</span><span>'+r[1]+'</span><span>›</span><span>'+r[2]+'</span><span>'+r[3]+'</span></div>').join('')+'</div><p class="v-cap">Links die anrufende Nebenstelle, rechts die angerufene.</p>'}
});
})();
