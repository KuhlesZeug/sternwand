// Tage 9 bis 13
(function(){
const HV=d=>({A:['a/h'+d+'a1.mp3?v=6','a/h'+d+'a2.mp3?v=6'],B:['a/h'+d+'b1.mp3?v=6','a/h'+d+'b2.mp3?v=6']});
const V=(d,x)=>'a/vo_d'+d+x+'.mp3?v=6';
const BUERO=(pc)=>({t:'room',img:'a/pb_buero.jpg',label:'Präsidium, Büro K1',spots:[{x:.05,y:.03,w:.20,h:.34,label:'Ermittlungswand',open:{t:'wall'}},{x:.32,y:.34,w:.15,h:.12,label:'Dienstrechner',open:Object.assign({t:'pc'},pc||{})},{x:.25,y:.435,w:.12,h:.06,label:'Telefon',open:{t:'text',cap:'Die Leitung ins Hotel steht. Ruf {P} an und sprecht euch ab. Du hast die Akten, oben hat man die Augen.'}},{x:.83,y:.455,w:.15,h:.10,label:'Faxgerät',open:{t:'text',cap:'Das Faxgerät schweigt. Heute ist noch nichts gekommen.'}},{x:.26,y:.19,w:.16,h:.14,label:'Aktenschrank',open:{t:'text',cap:'Alte Vorgänge aus dem Hochtal, sauber beschriftet. Die Lawine von 1999 hat hier keine Akte. Seltsam eigentlich.'}},{x:.59,y:.05,w:.26,h:.33,label:'Fenster',open:{t:'text',cap:'Die Räumfahrzeuge stehen still. Bis zum Hotel kommt heute keiner.'}}]});

// Rückweg: Zettel im Technikraum ab Tag 11
DAYS[5].A.mods[0].spots.push({after:10,x:.36,y:.42,w:.12,h:.14,label:'Zettel an der Tür',open:{t:'env',id:'kamerazettel',cap:'An der Innenseite der Tür klebt ein Zettel in Sepps krakeliger Schrift. Gestern hing der noch nicht da, oder du hast ihn im Dunkeln übersehen. Du nimmst ihn mit.'}});

Object.assign(window.DAYS,{
9:{hintVo:HV(9),room:'Spa',code:'bfe7265ecffee12796fae71fbd67e0a31686b1644f1aa3061e662389baf8c3e4',
 A:{vo:V(9,'a'),amb:'room',scene:'Das Spa im Untergeschoss ist warm und feucht, die Sauna läuft noch auf Restwärme. Hier unten hört man den Sturm nicht. Auf dem großen Spiegel neben der Kabine liegt ein feiner Beschlag. Manchmal hinterlässt jemand darauf mehr als nur einen Fingerabdruck.',
  mods:[{t:'room',img:'a/spa.jpg',label:'Spa im Untergeschoss',spots:[
   {x:.01,y:.05,w:.17,h:.36,label:'Spiegel',open:{t:'fog',img:'a/spiegel.jpg',msg:'Mo · Kabine 2<br>wie immer &nbsp;M.',cap:'Der Spiegel ist beschlagen. Wisch mit dem Finger darüber. Der Dampf kommt langsam zurück.',done:'Unter dem Beschlag stand etwas, mit dem Finger geschrieben, von innen. Darum liest du es spiegelverkehrt.'}},
   {x:.20,y:.05,w:.24,h:.46,label:'Saunakabine',open:{t:'text',cap:'Kabine 2, die kleine mit dem Fenster zum Schnee. Auf der oberen Bank liegen noch zwei Handtücher, ordentlich gefaltet. Hier war man nicht allein.'}},
   {x:.02,y:.50,w:.30,h:.16,label:'Liegen',open:{t:'text',cap:'Auf einer Liege ein Paar Damenhausschuhe mit Monogramm M. W. Daneben ein Glas mit einem Rest Kräutertee.'}},
   {x:.22,y:.72,w:.36,h:.17,label:'Handtücher',open:{t:'text',cap:'Frisch gefaltete Handtücher mit eingesticktem Stern. Das Personal arbeitet weiter, als wäre nichts geschehen.'}}]}]},
 B:{vo:V(9,'b'),scene:'Das Hotel hat dem Präsidium einen Gastzugang zu seinem Buchungssystem geschickt. Dort steht, wer wann die Sauna, das Dampfbad und die Ruheräume gebucht hat. Bei Gästen mit Geheimnissen ist so ein Kalender oft ehrlicher als jede Aussage.',
  mods:[BUERO({app:'spa'})]},
 hints:{A:['Wisch den Spiegel frei. Die Schrift ist spiegelverkehrt, so wie man sie von der anderen Seite auf eine Scheibe schreibt.','Dein Präsidium sieht im Buchungssystem, wer am Montag die Kabine gebucht hat und um wie viel Uhr.'],B:['Frag oben, welcher Tag und welche Kabine auf dem Spiegel stehen.','Montag, Kabine 2. Die Anfangszeit der Buchung, vierstellig, ist der Code.']},
 reveal:{vo:V(9,'r'),text:'Kabine 2, Montag, 23:20 bis 0:10, gebucht von Zimmer 23, mit Begleitung. M. ist Marlene Wendt, und die Begleitung kam direkt aus der Bar: Tom Riedl. Die Frau des Toten und der Bergführer haben eine Affäre. Für die Mordnacht geben sie sich gegenseitig ein Alibi.'}},

10:{hintVo:HV(10),room:'Zimmer 23',code:'9bfd3ade7d3516fc42ed314928577abd0d0c2339d053601455f1bef0112b1ec8',
 A:{vo:V(10,'a'),scene:'Zimmer 23 gehört Marlene Wendt. Hier riecht es nach teurem Parfum und frischen Blumen, obwohl seit Tagen keine Lieferung mehr den Berg heraufkommt. Hinter einem Ölbild an der Wand steckt ein kleiner Safe. Marlene steht in der Tür und sieht dir zu. Sie sagt, sie habe den Code nie gekannt.',
  mods:[{t:'audio',src:'a/marlene_d10.mp3?v=6',who:'Marlene Wendt',img:'a/p_marlene.jpg',label:'Marlene in der Tür',script:'Den Hochzeitstag hat er nie vergessen. Das muss man ihm lassen. Blumen, jedes Jahr, sogar als wir uns längst nichts mehr zu sagen hatten. Der Safe ist für seine Papiere, was drin ist, hat er mir nie erzählt. Und wo ich gestern Abend war? Das geht Sie nichts an.'},
   {t:'room',img:'a/zimmer23.jpg',label:'Zimmer 23',spots:[
   {x:.74,y:.02,w:.14,h:.18,label:'Wandsafe',open:{t:'keypad',img:'a/safe.jpg',digits:4,hash:'f8b8283664ee2f299f236e2c15c36ec7518cca2e943a2125ea985812c28cd562',note:'<span>Code: unser Hochzeitstag, TTMM. K.</span>',cap:'Ein Tastenfeld mit vier Stellen. Am Rahmen klebt ein gelber Zettel.',openCap:'Mit einem satten Klacken springt die Tür auf. Darin zwei Umschläge, beide vom Notariat Kessler.',docs:['notar','testament']}},
   {x:.68,y:.27,w:.10,h:.12,label:'Hochzeitsfoto',open:{t:'zoom',img:'a/hochzeit.jpg',cap:'Hochzeit im Winter, auf der Treppe des Standesamts Hochtal. Marlene lacht, Konrad hält ihre Hand. Auf der Rückseite kein Datum.'}},
   {x:.00,y:.30,w:.26,h:.24,label:'Schminktisch',open:{t:'text',cap:'Parfum, ein Schmuckkästchen, eine Packung Schlaftabletten, unangebrochen. Und ein Saunatuch mit eingesticktem Stern, noch feucht.'}},
   {x:.18,y:.02,w:.30,h:.30,label:'Fenster',open:{t:'text',cap:'Von hier aus sieht man direkt auf die Kapelle. Auf dem Weg dorthin sind im Schnee nur alte, verwehte Spuren.'}}]}]},
 B:{vo:V(10,'b'),scene:'Im Standesamt Hochtal brennt noch Licht. Die Standesbeamtin hat dir den Schlüssel zum Archiv dagelassen, bevor sie nach Hause gefahren ist. Hier liegt jede Ehe des Tals seit 1900 auf einer kleinen Karteikarte. Auch die von Konrad und Marlene Wendt.',
  mods:[{t:'room',img:'a/standesamt.jpg',label:'Standesamt Hochtal, Archiv',spots:[
   {x:.00,y:.10,w:.30,h:.62,label:'Karteikasten',open:{t:'kartei',img:'a/kartei.jpg',start:'W',cap:'Ehen im Hochtal, alphabetisch nach dem Familiennamen. Tippe auf eine Karte.',cards:'KARTEI'}},
   {x:.48,y:.46,w:.50,h:.22,label:'Lesetisch',open:{t:'text',cap:'Unter der grünen Lampe ein Zettel der Standesbeamtin: Schlüssel bitte in den Briefkasten. Urkunden nur gegen Unterschrift. Ich vertraue Ihnen.'}},
   {x:.42,y:.06,w:.30,h:.38,label:'Fenster',open:{t:'text',cap:'Auf dem Marktplatz steht ein einzelner Weihnachtsbaum. Die Lichterkette flackert im Wind.'}}]}]},
 hints:{A:['Auf dem Zettel am Safe steht, welches Datum gemeint ist und in welcher Form.','Das Hochzeitsdatum findet dein Präsidium im Standesamt. Tag und Monat, vierstellig.'],B:['Such im Karteikasten unter W. Die Karte sagt dir, wo die Urkunde liegt.','Auf der Heiratsurkunde steht das Datum. Frag oben, in welcher Form der Safe den Code will.']},
 reveal:{vo:V(10,'r'),text:'Der Safe springt auf. Darin ein Termin beim Notar am 2. Dezember und der Entwurf eines neuen Testaments. Konrad Wendt wollte seinen Sohn Jonas enterben. Zwei Tage vor dem Termin war er tot. Wer davon wusste, hatte allen Grund, diesen Termin zu verhindern.'}},

11:{hintVo:HV(11),room:'Kameraraum',code:'6193e960e839f3099dc7f9441a3bd45f302613f932b3e5d5c3d6919a8b125b7d',
 A:{vo:V(11,'a'),amb:'cellar',scene:'Im Keller neben dem Technikraum steht der Rechner der Kameraanlage. Vier Kameras, eine in jedem Flur. Die vom vierten Stock zeigt direkt auf die Tür der Suite, und was sie gestern Abend gesehen hat, ist gespeichert, bis der Strom ausfiel. Aber der Rechner will eine PIN. Sepp hängt seine Zugangsdaten gern irgendwo im Technikraum auf.',
  mods:[{t:'room',img:'a/kameraraum.jpg',label:'Kameraraum im Keller',spots:[
   {x:.28,y:.18,w:.44,h:.26,label:'Monitore',open:{t:'cctv',hash:'65e582fb0b0705106b3f3962eb045b54ec9082232d7b7f330041d241ed8996d9',cam:'CAM 4 · 4. STOCK',date:'30.11.',from:1350,to:1436,frames:[{t:1350,img:'a/cam_leer.jpg'},{t:1363,img:'a/cam_hin.jpg'},{t:1365,img:'a/cam_leer.jpg'},{t:1382,img:'a/cam_zur.jpg'},{t:1384,img:'a/cam_leer.jpg'},{t:1432,img:null}],cap:'Zieh den Regler, spiel ab oder geh Minute für Minute. Die Zeit oben rechts ist die Zeit der Kamera.'}},
   {x:.80,y:.24,w:.18,h:.18,label:'Wandkalender',open:{t:'text',cap:'Ein Kalender der Bergwacht. Beim 5. Dezember steht in Sepps Schrift: Saisonstart, Kamerauhr!'}},
   {x:.25,y:.48,w:.32,h:.28,label:'Stuhl',open:{t:'text',cap:'Auf dem Stuhl liegt eine Strickjacke, die nach Küche riecht. Wer sitzt hier sonst?'}}]}]},
 B:{vo:V(11,'b'),scene:'Im Videoraum des Präsidiums hängt die Funkuhr, die auf die Sekunde genau geht. In deinem Postfach liegt seit heute früh ein dicker Umschlag vom Hausmeister des Hotels. Sepp Gruber schreibt alles auf. Auch das, was an seinen Geräten nicht stimmt.',
  mods:[{t:'room',img:'a/videoraum.jpg',label:'Videoraum',spots:[
   {x:.00,y:.55,w:.28,h:.12,label:'Postfach',open:{t:'env',id:'wartung',cap:'In deinem Postfach ein brauner Umschlag mit Sepps Handschrift: Für die Kommissarin, falls es hilft.'}},
   {x:.60,y:.04,w:.16,h:.16,label:'Funkuhr',open:{t:'text',cap:'Die Funkuhr gleicht sich jede Nacht mit der Atomuhr ab. Sie geht auf die Sekunde genau. Die Kameras im Hotel tun das sicher nicht.'}},
   {x:.00,y:.05,w:.55,h:.40,label:'Monitorwand',open:{t:'text',cap:'Auf den Bildschirmen laufen die Verkehrskameras des Tals. Auf der Passstraße steht ein Räumfahrzeug quer, dahinter nur Weiß.'}}]}]},
 hints:{A:['Im Technikraum ist eine neue Spur aufgetaucht. Geh noch einmal hin.','Notier dir, wann Ilse zur Suite geht und wann sie zurückkommt, und frag dein Präsidium, ob die Kamerauhr stimmt.'],B:['Lies das Wartungsprotokoll. Bei einer Kamera steht ein Vermerk zur Uhrzeit.','Die Kamera im vierten Stock geht vor. Zieh die Minuten von der Zeit ab, zu der Ilse die Suite verlässt.']},
 reveal:{vo:V(11,'r'),text:'Ilse Brandt ging um 22:31 in die Suite und kam um 22:50 zurück, mit leerer Tasse. Neunzehn Minuten, nicht nur kurz. Und der Bildausfall um 23:52 Kamerazeit ist in Wahrheit 23:40, genau wie der Netzausfall. Bis dahin war außer Ilse niemand oben.'}},

12:{hintVo:HV(12),room:'Flur',code:'444510cdec23f0afbf3aad45c1209abfe569caa0f0e7b0dca242ac3a17ec9c1b',
 A:{vo:V(12,'a'),scene:'Der Flur vor der Suite im vierten Stock liegt im Dunkeln, nur das Notlicht brennt. Auf dem dunklen Teppich sieht man nichts. Aber der Schnee von gestern Nacht war nass, und wer von draußen kam, hat Spuren hinterlassen. Aus dem Technikraum hast du Sepps Döschen mit Graphitpulver mitgenommen. Das tut es auch.',
  mods:[{t:'room',img:'a/flur.jpg',label:'Flur vor der Suite',spots:[
   {x:.22,y:.58,w:.56,h:.36,label:'Teppich',open:{t:'powder',img:'a/abdruck.jpg',label:'<b>46</b><span>BERGWERK</span>',cap:'Streu das Pulver mit dem Finger über den Teppich vor der Tür.',done:'Ein Stiefelabdruck, deutlich: Wabenprofil. Auf der Sohle eingeprägt die Größe 46 und der Hersteller Bergwerk.'}},
   {x:.40,y:.18,w:.20,h:.24,label:'Tür der Suite',open:{t:'text',cap:'Die Tür der Suite ist versiegelt. Auf der Klinke, kaum zu sehen, ein feuchter dunkler Fleck. Morgen weißt du mehr.'}},
   {x:.10,y:.10,w:.16,h:.14,label:'Wandleuchte',open:{t:'text',cap:'Die Wandleuchten sind seit dem Stromausfall nur halb angegangen. Eine Glühbirne ist herausgedreht. Mit Absicht?'}}]}]},
 B:{vo:V(12,'b'),scene:'Der Skikeller des Hotels gehört zum Verleih Sport Gruber im Tal. Deren Ausleihbuch wurde letzte Woche wegen einer Betrugsanzeige beschlagnahmt und liegt jetzt in eurer Asservatenkammer, zwischen Fundfahrrädern und Kisten voller Akten. Wer im Hotel Ski oder Stiefel geliehen hat, steht darin.',
  mods:[{t:'room',img:'a/asservate.jpg',label:'Asservatenkammer',spots:[
   {x:.52,y:.46,w:.26,h:.14,label:'Karton',open:{t:'doc',id:'ausleihe',cap:'Ein Karton mit der Aufschrift Sport Gruber. Obenauf das Ausleihbuch des Skikellers.'}},
   {x:.00,y:.05,w:.42,h:.70,label:'Regal',open:{t:'text',cap:'Fundsachen aus dem ganzen Tal: Handschuhe, ein Rodel, eine Kuckucksuhr mit gebrochenem Vogel. Alles mit Etikett und Datum.'}},
   {x:.86,y:.05,w:.14,h:.80,label:'Gittertür',open:{t:'text',cap:'Die Gittertür klemmt. Wer hier herauskommt, muss ins Buch eintragen, was er mitnimmt.'}}]}]},
 hints:{A:['Verteil das Pulver mit dem Finger auf dem Teppich, bis der Abdruck ganz zu sehen ist.','Profil, Größe und Hersteller stehen auf dem Abdruck. Dein Präsidium hat die Liste der geliehenen Stiefel.'],B:['Im Karton liegt das Ausleihbuch des Skikellers. Frag oben nach Profil und Größe des Abdrucks.','Nur ein Paar passt in Größe und Profil. Die Nummer dieses Paares ist der Code.']},
 reveal:{vo:V(12,'r'),text:'Paar 17, Größe 46, Wabenprofil, ausgeliehen an Jonas Wendt. In der Nacht stand Jonas in nassen Stiefeln vor der Tür seines Vaters. Er war draußen gewesen. Und dann ist er hinaufgegangen.'}},

13:{hintVo:HV(13),room:'Zentrale',code:'f8111038ff8bb8f031fc5e8f2a4c6142e76f158bea51b2a5eb3421e4e5a5d639',
 A:{vo:V(13,'a'),amb:'lobby',scene:'In der Telefonzentrale neben der Rezeption laufen alle Leitungen des Hauses zusammen. Die alte Anlage merkt sich jeden Anruf. Auf dem Schreibtisch steht der Anrufbeantworter der Suite, den Konrad Wendt nachts auf die Zentrale umgeleitet hat. Das Lämpchen blinkt. Eine Nachricht. Aber das Band klemmt.',
  mods:[{t:'room',img:'a/zentrale.jpg',label:'Telefonzentrale',spots:[
   {x:.05,y:.12,w:.36,h:.52,label:'Telefonanlage',open:{t:'doc',id:'anrufliste',cap:'Das Display der Anlage zeigt die letzten Anrufe der Nacht.'}},
   {x:.62,y:.44,w:.20,h:.12,label:'Anrufbeantworter',open:{t:'tape',img:'a/abm.jpg',rev:'a/notar_rev.mp3?v=6',fwd:'a/notar_d13.mp3?v=6',cap:'Das Band läuft, aber die Stimme klingt verdreht. Irgendetwas stimmt mit der Laufrichtung nicht. Das Gerät hängt wie die Telefonanlage am Notstrom, deshalb hat es auch nach dem Stromausfall noch aufgezeichnet.',done:'Jetzt versteht man jedes Wort.',script:'Guten Abend, Herr Wendt, Kessler hier, Notariat Kessler. Entschuldigen Sie die späte Stunde, ich komme gerade aus München zurück. Ich bestätige Ihren Termin am Mittwoch, dem 2. Dezember, um neun Uhr. Bringen Sie bitte den Entwurf des neuen Testaments mit. Wie besprochen erfährt Ihr Sohn davon erst, wenn alles unterschrieben ist. Gute Nacht.'}},
   {x:.68,y:.12,w:.14,h:.18,label:'Liste an der Wand',open:{t:'text',cap:'Hinter dem Glas hing einmal die Liste der Nebenstellen. Der Rahmen ist leer. Sepp hat sie zum Kopieren mitgenommen und ins Tal gefaxt.'}}]}]},
 B:{vo:V(13,'b'),scene:'In der Zentrale des Präsidiums spuckt der Drucker seit dem Morgen alles aus, was das Hotel schickt. Heute ist es die Liste der Nebenstellen. Ohne sie ist eine Anrufliste nur ein Haufen Zahlen.',
  mods:[{t:'room',img:'a/zentrale_b.jpg',label:'Zentrale des Präsidiums',spots:[
   {x:.04,y:.58,w:.28,h:.22,label:'Drucker',open:{t:'env',id:'telefonliste',cap:'Aus dem Drucker hängt ein Blatt mit dem Briefkopf des Hotels: Nebenstellen, von Sepp sauber abgetippt.'}},
   {x:.58,y:.00,w:.42,h:.30,label:'Wandkarte',open:{t:'text',cap:'Die Karte des Hochtals. Auf dem Pass steckt ein rotes Fähnchen: gesperrt. Darunter von Hand: frühestens Freitag.'}},
   {x:.36,y:.60,w:.16,h:.08,label:'Headset',open:{t:'text',cap:'Die Kollegin aus der Zentrale hat einen Zettel hingelegt: Wenn das Hotel anruft, sofort durchstellen. Egal wann.'}}]}]},
 hints:{A:['Das Band läuft verkehrt herum. Probier den Knopf Rückwärts.','Lies deinem Präsidium die Anrufe nach Mitternacht vor. Welche Nebenstelle hat um 0:05 in der Suite angerufen?'],B:['In der Liste der Nebenstellen steht, welche Nummer zu welchem Zimmer gehört.','Gesucht ist die Nebenstelle, die um 0:05 in der Suite angerufen hat, dreistellig.']},
 reveal:{vo:V(13,'r'),text:'Um 0:05 hat die Nebenstelle 212 in der Suite angerufen, Zimmer 12. Jonas wollte seinen Vater sprechen, und niemand hob ab. Auf dem Band bestätigt der Notar den Termin, bei dem Jonas enterbt werden sollte. Wenn Konrad um 0:05 nicht mehr ans Telefon ging, war er da vielleicht schon tot.'}}
});

window.KARTEI=[
 {n:'Wendt, Alois',s:'⚭ Rosa Wendt, geb. Pichler',b:'Eheschließung Standesamt Hochtal<br>Heiratsregister Nr. 12/1958<br>Gründer des Berghotels Sternwand 1961'},
 {n:'Wendt, Konrad',s:'⚭ Marlene Wendt, geb. Huber',b:'Eheschließung Standesamt Hochtal<br>Heiratsregister Nr. 47/1986<br>Beglaubigte Abschrift der Urkunde liegt der Akte bei.',env:'heirat'},
 {n:'Wendt, Theresa',s:'⚭ Franz Moser',b:'Eheschließung Standesamt Hochtal<br>Heiratsregister Nr. 3/1964<br>Name nach der Ehe: Moser'},
 {n:'Weber, Johann',s:'⚭ Anna Weber, geb. Gruber',b:'Heiratsregister Nr. 31/1979'},
 {n:'Winkler, Paul',s:'⚭ Lisa Winkler, geb. Brandt',b:'Heiratsregister Nr. 9/2004'},
 {n:'Brandt, Ilse',s:'⚭ Georg Brandt',b:'Heiratsregister Nr. 22/1981<br>Ehe geschieden 1994'},
 {n:'Riedl, Thomas',s:'ledig',b:'Keine Eintragung im Heiratsregister'},
 {n:'Gruber, Josef',s:'⚭ Maria Gruber, geb. Hofer',b:'Heiratsregister Nr. 18/1988'},
 {n:'Huber, Marlene',s:'siehe Wendt, Konrad',b:'Verweis auf Heiratsregister Nr. 47/1986'}];

window.SPA={res:['Kabine 1','Kabine 2','Dampfbad','Ruheraum'],days:[
 {d:'Samstag, 28.11.',b:[{r:'Kabine 1',t:'17:00 bis 18:00',w:'Zimmer 7'},{r:'Dampfbad',t:'19:00 bis 19:30',w:'Zimmer 15'}]},
 {d:'Sonntag, 29.11.',b:[{r:'Kabine 1',t:'16:30 bis 17:30',w:'Zimmer 15'},{r:'Kabine 2',t:'21:00 bis 21:45',w:'Zimmer 12'},{r:'Ruheraum',t:'21:30 bis 22:30',w:'Zimmer 7'}]},
 {d:'Montag, 30.11.',b:[{r:'Kabine 1',t:'18:00 bis 19:00',w:'Zimmer 15'},{r:'Kabine 2',t:'20:00 bis 20:45',w:'Zimmer 7'},{r:'Dampfbad',t:'21:30 bis 22:00',w:'Zimmer 12'},{r:'Kabine 2',t:'23:20 bis 0:10',w:'Zimmer 23',n:'privat, mit Begleitung',p:1}]},
 {d:'Dienstag, 1.12.',b:[]}]};

MAILS.push({d:9,f:'Berghotel Sternwand',s:'Gastzugang Buchungssystem',b:'Sehr geehrte Damen und Herren, wie gewünscht erhalten Sie Lesezugriff auf unser Buchungssystem für Spa und Ruheräume. Das Programm finden Sie auf Ihrem Dienstrechner unter Spa. Mit freundlichen Grüßen, Marlene Wendt'});
PC_APPS.spa={n:'Spa Buchungen',im:'icon_spa',day:9};
})();
