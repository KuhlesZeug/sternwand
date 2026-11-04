// Tage 14 bis 24
(function(){
const X=TX4,CH=CH4;
const HV=d=>({A:['a/h'+d+'a1.mp3?v=7','a/h'+d+'a2.mp3?v=7'],B:['a/h'+d+'b1.mp3?v=7','a/h'+d+'b2.mp3?v=7']});
const V=(d,x)=>'a/vo_d'+d+x+'.mp3?v=8';
const C=k=>'a/'+k+'.mp3?v=7';
const base=(d,o)=>Object.assign({hintVo:HV(d),hints:{A:X[d].hA,B:X[d].hB},reveal:{vo:V(d,'r'),text:X[d].r}},o);
const LAB={t:'room',img:'a/b_labor.jpg',label:'Labor der Bergklinik',spots:[]};

// Rückwege
DAYS[1].A.mods.forEach(m=>{if(m.t==='room')m.spots.push({after:14,x:.30,y:.62,w:.26,h:.12,label:'Schlüsselbuch',open:{t:'doc',id:'generalbuch',cap:'Unter der Theke liegt das Schlüsselbuch für den Generalschlüssel. Der letzte Eintrag ist hastig, die Rückgabe fehlt.'}})});
DAYS[3].A.mods.forEach(m=>{if(m.t==='room')m.spots.push({after:16,x:.64,y:.40,w:.34,h:.14,label:'Gewürzregal',open:{t:'text',cap:'Unten im Regal, direkt unter der Lücke, klebt ein abgerissener Etikettenrest am Holz. In Ilses Schrift steht noch: …hut, getr. Nov. Daneben liegen ihre Gartenhandschuhe, mit grünen Flecken an den Fingerspitzen.'}})});

Object.assign(window.DAYS,{
14:base(14,{room:'Zimmer 18',code:'7ea9ce8554b0d7778472a3da61063b70d1ebb1a6dc9fcd44f8a5bb145a19ee00',
 A:{vo:V(14,'a'),scene:X[14].a,mods:[{t:'room',img:'a/zimmer18.jpg',label:'Zimmer 18, in Renovierung',spots:[
  {x:.30,y:.38,w:.66,h:.30,label:'Matratze',open:{t:'lift',img:'a/matratze.jpg',cap:'Die Matratze liegt schief auf dem Lattenrost. Fass sie an und zieh sie nach oben.',done:'Darunter ein dickes Bündel Geldscheine mit Banderole und ein Lederhandschuh mit dunklen Flecken. Jemand hat es eilig versteckt.',docs:['banderole']}},
  {x:.00,y:.44,w:.22,h:.16,label:'Bautrockner',open:{t:'text',cap:'Die Bautrockner laufen seit Tagen. Der Wassertank des linken ist randvoll. Seit gestern Nacht hat ihn niemand geleert, aber jemand hat das Gerät verschoben, die Rollen haben Spuren im Staub gezogen.'}},
  {x:.55,y:.04,w:.40,h:.26,label:'Tapete',open:{t:'text',cap:'Unter der abgezogenen Tapete kommen Bleistiftstriche zum Vorschein, mit Jahreszahlen daneben. Jemand hat hier einmal ein Kind gemessen. Der letzte Strich ist von 1999.'}},
  {x:.00,y:.12,w:.26,h:.24,label:'Fenster',open:{t:'text',cap:'Das Fenster geht auf den Hof hinter der Küche. Unten im Schnee sieht man das Dach des kleinen Gewächshauses.'}}]}]},
 B:{vo:V(14,'b'),scene:X[14].b,mods:[{t:'room',img:'a/bank.jpg',label:'Bergbank Hochtal, nach Schalterschluss',spots:[
  {x:.00,y:.36,w:.18,h:.16,label:'Terminal',open:{t:'pc',app:'bank',title:'Terminal · Bergbank Hochtal'}},
  {x:.68,y:.22,w:.18,h:.40,label:'Tresortür',open:{t:'text',cap:'Die schwere Tresortür steht einen Spalt offen. Darin Regale mit Geldkassetten, jede mit Nummer. Der Filialleiter hat gesagt: Bei uns geht kein Schein ohne Banderole raus.'}},
  {x:.30,y:.44,w:.30,h:.12,label:'Zettel',open:{t:'text',cap:'Auf dem Schalter ein Zettel in ordentlicher Schrift: Banderolen prüfen Sie unter Auskunft. Bitte nichts verändern. Gute Nacht, Huber.'}}]}]}}),

15:base(15,{room:'Suite 24',code:'822edd9154b87c9bd37aeeaddf011c222d6dbbf5e37eddbc3e9d319620f50d6c',
 A:{vo:V(15,'a'),scene:X[15].a,mods:[{t:'gallery',label:'Tatortfotos auf deinem Handy',note:'Vier Fotos vom ersten Morgen',start:0,items:[
   {img:'a/tat_sessel.jpg',t:'07:02',cap:'Der Sessel am Fenster. Die Decke ist heruntergerutscht, die Lesebrille liegt auf dem Teppich. Am Kopfteil ein kleiner, dunkler Fleck. Erstaunlich wenig Blut.'},
   {img:'a/tat_pickel.jpg',t:'07:04',cap:'Der Eispickel neben dem Sessel. Am Schaft eingebrannt die Initialen T. R.'},
   {img:'a/tat_safe.jpg',t:'07:06',cap:'Der Safe in der Wandverkleidung steht offen. Bis auf ein paar Papiere ist er leer.'},
   {img:'a/thermo.jpg',t:'07:10',cap:'Das Fieberthermometer aus der Hausapotheke, nach der Messung unter dem Arm. Du hast das Foto direkt danach gemacht.',ov:'<div class="th-lcd"><span>°C</span><b>29,3</b></div><div class="th-tag">Messung 07:10</div>'}]},
  {t:'room',img:'a/suite24.jpg',label:'Suite 24, durch die versiegelte Tür',spots:[
   {x:.30,y:.40,w:.30,h:.30,label:'Sessel',open:{t:'tatort',start:0,items:null}},
   {x:.00,y:.35,w:.24,h:.32,label:'Kamin',open:{t:'text',cap:'Im Kamin nur noch kalte Asche. In der Nacht hat es niemand nachgelegt.'}},
   {x:.54,y:.24,w:.18,h:.14,label:'Siegel an der Tür',open:{t:'text',cap:'Dein eigenes Siegel, mit Datum und Uhrzeit: 1.12., 7:25. Seitdem war niemand drin.'}}]}]},
 B:{vo:V(15,'b'),scene:X[15].b,mods:[{t:'call',img:'a/p_hagen.jpg',who:'Dr. Lea Hagen',from:'Rechtsmedizin Innsbruck',src:C('hagen_d15'),script:CH.hagen_d15,delay:9000},
  {t:'room',img:'a/bereitschaft.jpg',label:'Bereitschaftsraum',spots:[
   {x:.80,y:.38,w:.18,h:.08,label:'Diensthandy',open:{t:'call',img:'a/p_hagen.jpg',who:'Dr. Lea Hagen',from:'Rechtsmedizin Innsbruck',src:C('hagen_d15'),script:CH.hagen_d15}},
   {x:.78,y:.27,w:.13,h:.09,label:'Rotes Telefon',open:{t:'text',cap:'Das rote Telefon ist die Direktleitung zur Leitstelle. Heute Nacht hat es zweimal geklingelt, beide Male wegen Lawinengefahr auf der Passstraße.'}},
   {x:.00,y:.40,w:.36,h:.26,label:'Liege',open:{t:'text',cap:'Eine Wolldecke, ein Kissen, ein Krimi mit Eselsohr. Wer hier Bereitschaft hat, schläft selten.'}},
   {x:.10,y:.14,w:.16,h:.16,label:'Kaffeemaschine',open:{t:'text',cap:'Die Kanne ist halb voll und seit Stunden kalt. Jemand hat einen Zettel drangeklebt: Wer die letzte Tasse nimmt, kocht neu.'}}]}]}}),

16:base(16,{room:'Gewächshaus',code:'658757c4a4a4c2cc9da5911f00011936761f6cb8dcc2369bae14b84cdcf44f34',
 A:{vo:V(16,'a'),scene:X[16].a,mods:[{t:'room',img:'a/gewaechshaus.jpg',label:'Gewächshaus hinter der Küche',spots:[
  {x:.00,y:.44,w:.64,h:.52,label:'Beete',open:{t:'lupe',img:'a/gewaechshaus.jpg',cap:'Fahr mit dem Finger über das Bild. Unter der Lupe kannst du die Schilder lesen.',done:'Hier fehlt das Schild. Am abgeschnittenen Stängel hängt noch ein einziges Blatt.',keyImg:'a/blatt.jpg',keyCap:'Ein dunkelgrünes Blatt, tief eingeschnitten, wie eine gespreizte Hand mit fünf schmalen Fingern. Die Schnittstelle am Stängel ist frisch, ein paar Tage alt.',items:[
   {x:.15,y:.55,n:'Salbei'},{x:.42,y:.62,n:'Thymian'},{x:.22,y:.80,n:'Liebstöckel'},{x:.84,y:.48,n:'Zitronenmelisse'},{x:.50,y:.86,n:'Minze'},{x:.95,y:.56,n:'Rosmarin'},{x:.60,y:.72,n:'kein Schild, abgeschnitten',key:1}]}},
  {x:.66,y:.56,w:.34,h:.22,label:'Pflanztisch',open:{t:'text',cap:'Unter dem Pflanztisch stehen Kisten mit Tontöpfen und Erde. Dahinter ist es zu dunkel, um etwas zu erkennen.'}},
  {x:.52,y:.26,w:.16,h:.16,label:'Ofen',open:{t:'text',cap:'Der alte Ofen glüht noch. Auf der Ablage daneben liegen Kräuter zum Trocknen, sauber in Bündeln. Ilse arbeitet ordentlich.'}}]}]},
 B:{vo:V(16,'b'),scene:X[16].b,mods:[Object.assign({},LAB,{spots:[
  {x:.78,y:.44,w:.22,h:.18,label:'Faxablage',open:{t:'env',id:'giftpflanzen',cap:'In der Faxablage liegt das Fax der Botanikerin: sechs Blätter, sechs Giftpflanzen, sauber beschrieben.'}},
  {x:.36,y:.56,w:.32,h:.10,label:'Arbeitsplatz',open:{t:'pc',app:'lab',title:'Labor · Bergklinik Hochtal'}},
  {x:.55,y:.36,w:.24,h:.20,label:'Mikroskop',open:{t:'text',cap:'Unter dem Mikroskop liegt noch ein Präparat vom Nachmittag. Ein Zettel daneben: Für die Kripo bitte immer zuerst den Namen der Pflanze.'}}]})]}}),

17:base(17,{room:'Zimmer 3',code:'c92278fe6ce5198e9f540dc24e4514392ddfcd656980b1bccaba1dffdd3429d7',
 A:{vo:V(17,'a'),scene:X[17].a,mods:[{t:'room',img:'a/zimmer3.jpg',label:'Zimmer 3, Personaltrakt',spots:[
  {x:.00,y:.00,w:.50,h:.48,label:'Fotowand',open:{t:'zoom',img:'a/foto_lena.jpg',cap:'Ein Mädchen im roten Rennanzug, sechzehn vielleicht, mit der Startnummer 117. Es lacht in die Kamera. Das Foto hängt in der Mitte, alle anderen sind darum herum angeordnet.'}},
  {x:.44,y:.18,w:.14,h:.10,label:'Grablicht',open:{t:'text',cap:'Ein rotes Grablicht, frisch angezündet. Daneben ein kleiner Zweig Latschenkiefer und ein Paar winzige Skier aus Holz.'}},
  {x:.54,y:.30,w:.16,h:.18,label:'Kalender',open:{t:'text',cap:'Ein Kalender vom Bäcker im Dorf. Der 30. November ist rot eingekreist. Kein Name, nur ein kleines Kreuz. Der 29. ist mit Bleistift markiert: frei.'}},
  {x:.84,y:.44,w:.16,h:.20,label:'Nachttisch',open:{t:'env',id:'foto_rueck',cap:'Auf dem Nachttisch liegt ein Foto mit der Bildseite nach unten, abgegriffen, als würde es oft in die Hand genommen. Auf der Rückseite ist etwas mit Bleistift geschrieben, fast verblasst.'}}]},
  {t:'lamp',note:'Auf der Rückseite des Fotos aus Umschlag A8 ist eine Bleistiftnotiz fast verblasst. Halte die Spurenlampe darüber.',cap:'Halte die Rückseite des Fotos in den Lichtkreis.'}]},
 B:{vo:V(17,'b'),scene:X[17].b,mods:[{t:'dark',img:'a/archivkeller.jpg',label:'Archivkeller des Präsidiums',spots:[
  {x:.62,y:.10,w:.30,h:.45,label:'Jahrgang 1999',open:{t:'doc',id:'bote1999',cap:'Ganz hinten im Regal der Jahrgang 1999 des Hochtaler Boten, in Leinen gebunden. Bei der Ausgabe vom 2. Dezember klafft der Band auf, als hätte ihn schon jemand oft aufgeschlagen.'}},
  {x:.38,y:.48,w:.22,h:.14,label:'Kartons',open:{t:'text',cap:'Umzugskartons mit alten Fundsachen. Auf einem steht mit Filzstift: Lawine 99, Kleidung, an Angehörige zurück. Der Karton ist leer.'}},
  {x:.70,y:.02,w:.12,h:.11,label:'Glühbirne',open:{t:'text',cap:'Die Glühbirne ist durchgebrannt, der Glaskolben schwarz. Der Hausmeister kommt erst nach den Feiertagen.'}}]}]}}),

18:base(18,{room:'Büro',code:'313f76cebcab18bbe30850bb5d57267912d007882539e2c2dac88ba6718a2e55',
 A:{vo:V(18,'a'),scene:X[18].a,mods:[{t:'room',img:'a/buero_k.jpg',label:'Konrad Wendts Büro',spots:[
  {x:.40,y:.18,w:.18,h:.34,label:'Aktenschrank',open:{t:'lock',k:'schrank',img:'a/schrank_zu.jpg',imgOpen:'a/schrank_auf.jpg',digits:4,hash:'df8af5616f37da264c2881e0a2ccd3b9a782f23a187cfc3486b75922518feb82',show:'0411',tag:'Lawinenkommission · Akte ruht',cap:'Vier Zahlenräder aus Messing. Dreh sie, bis das Schloss aufspringt.',openCap:'Die Schublade gleitet auf. Ganz vorne der Ordner der Lawinenkommission mit dem Original des Gutachtens. Dahinter, zwischen zwei Mappen, ein Brief.',docs:['gutachten'],env:['brief_sophie']}},
  {x:.05,y:.60,w:.80,h:.24,label:'Schreibtisch',open:{t:'text',cap:'Eine Zigarrenkiste, ein Füller, ein gerahmtes Foto: Konrad Wendt mit dem Bürgermeister bei der Eröffnung der neuen Piste, Winter 1998. Beide lachen.'}},
  {x:.68,y:.02,w:.32,h:.28,label:'Pistenplan',open:{t:'text',cap:'Ein alter Pistenplan unter Glas. Die Abfahrt am Sternwandhang ist mit rotem Stift durchgestrichen, darunter steht in Konrads Schrift: nie wieder.'}}]}]},
 B:{vo:V(18,'b'),scene:X[18].b,mods:[{t:'room',img:'a/spurenlabor.jpg',label:'Spurenlabor',spots:[
  {x:.10,y:.48,w:.88,h:.26,label:'Leuchttisch',open:{t:'env',id:'bericht_kopie',cap:'Auf dem Leuchttisch liegt die Kopie des Berichts, die die Gemeinde herausgegeben hat. Ganze Zeilen sind unter grauer Abdeckfarbe verschwunden.'}},
  {x:.08,y:.38,w:.26,h:.10,label:'UV Lampe',open:{t:'text',cap:'Die violette Lampe surrt leise. Ein Schild daneben: Bei Durchschlägen und Kopien mit gelbem Licht arbeiten, nicht mit UV.'}}]},
  {t:'lamp',note:'Die Kopie aus Umschlag B11 ist mit grauer Abdeckfarbe überdeckt. Darunter schimmert die Schreibmaschine gelblich durch. Halte die Spurenlampe darüber.',cap:'Halte die Kopie in den Lichtkreis.'}]}}),

19:base(19,{room:'Kapelle',code:'d0f80b249603c3e49881d001bc5798f9cc5f922f7563db359faa96d5a18675b9',
 A:{vo:V(19,'a'),scene:X[19].a,mods:[{t:'room',img:'a/kapelle.jpg',label:'Hauskapelle',spots:[
  {x:.05,y:.54,w:.92,h:.26,label:'Kerzen und Gedenkbuch',open:{t:'candles',img:'a/gedenkbuch.jpg',n:5,need:4,doc:'gedenkbuch',cap:'Es ist zu dunkel zum Lesen. Zünde die Kerzen an, von links nach rechts.',done:'Jetzt reicht das Licht. Das Gedenkbuch liegt aufgeschlagen beim letzten Eintrag.'}},
  {x:.00,y:.05,w:.18,h:.40,label:'Fenster',open:{t:'text',cap:'Durch das vereiste Fenster sieht man den Hang hinauf zur Sternwand. Bei Mondlicht wirkt er friedlich.'}},
  {x:.00,y:.80,w:.40,h:.18,label:'Kirchenbank',open:{t:'text',cap:'In der ersten Bank liegt ein Gesangbuch. Vorne steht mit Kinderschrift ein Name: Lena. Und darunter, später dazugeschrieben, ein Kreuz.'}}]}]},
 B:{vo:V(19,'b'),scene:X[19].b,mods:[{t:'room',img:'a/besprechung.jpg',label:'Besprechungsraum',spots:[
  {x:.05,y:.55,w:.85,h:.25,label:'Personalakten',open:{t:'env',id:'personalakten',cap:'Fünf Personalbögen, frisch aus dem Fax, noch warm. Jeder mit demselben Satz in einer anderen Handschrift.'}},
  {x:.00,y:.04,w:.36,h:.32,label:'Whiteboard',open:{t:'text',cap:'Auf dem Whiteboard steht noch die Zeitleiste von gestern: 22:31 Tee, 22:50 leere Tasse, 23:30 Tod, 23:40 Strom weg, 0:05 Anruf, 0:15 Jonas.'}}]}]}}),

20:base(20,{room:'Suite 24',code:'78252129932f2070d2ba9fe43e14183adbc844b75c697a0676bb18e2bd2f2a62',
 A:{vo:V(20,'a'),scene:X[20].a,mods:[{t:'room',img:'a/suite_bad.jpg',label:'Badezimmer der Suite',spots:[
  {x:.32,y:.62,w:.14,h:.22,label:'Mülleimer',open:{t:'bag',img:'a/teesieb.jpg',no:'HT 20 114',what:'Teesieb mit nassen Pflanzenresten',where:'Suite 24, Bad, Mülleimer',cap:'Unter zerknüllten Taschentüchern ein kleines Teesieb aus Metall, noch feucht, voller dunkelgrüner Krümel. Das gehört ins Labor.',done:'Versiegelt. Die Probennummer steht auf dem Etikett: HT 20 114. Dein Präsidium braucht sie für das Laborportal.'}},
  {x:.24,y:.08,w:.16,h:.36,label:'Bademantel',open:{t:'text',cap:'Ein weißer Bademantel mit dem Monogramm K. W. In der Tasche ein Zettel in Ilses Schrift: Ihr Tee, Herr Wendt. Wie jeden Abend.'}},
  {x:.04,y:.05,w:.20,h:.30,label:'Spiegelschrank',open:{t:'text',cap:'Blutdrucktabletten, ein Rasierpinsel, Schlaftabletten, unangebrochen. Nichts davon fehlt.'}},
  {x:.00,y:.46,w:.30,h:.12,label:'Waschbecken',open:{t:'text',cap:'Im Abfluss des Waschbeckens ein grünlicher Rand, als hätte jemand ein Sieb ausgeklopft und nachgespült.'}}]}]},
 B:{vo:V(20,'b'),scene:X[20].b,mods:[Object.assign({},LAB,{spots:[
  {x:.36,y:.56,w:.32,h:.10,label:'Arbeitsplatz',open:{t:'pc',app:'lab',title:'Labor · Bergklinik Hochtal'}},
  {x:.78,y:.44,w:.22,h:.18,label:'Probenfach',open:{t:'text',cap:'Im Probenfach liegt schon der Eingangsschein aus dem Hotel: Probe angemeldet, Nummer siehe Beutel. Das Labor arbeitet bereits daran.'}}]})]}}),

21:base(21,{room:'Bibliothek',code:'5c00962bbf045f17a90fc8d3566fdced337562d62922bf99a83c931099ddfdc0',
 A:{vo:V(21,'a'),scene:X[21].a,mods:[{t:'audio',src:C('sophie_d21'),who:'Sophie Lang',img:'a/p_sophie.jpg',label:'Befragung in der Bibliothek',script:CH.sophie_d21},
  {t:'room',img:'a/bibliothek.jpg',label:'Bibliothek',spots:[
   {x:.40,y:.02,w:.28,h:.50,label:'Bücherregal',open:{t:'text',cap:'Zwischen alten Bergbüchern steht das Gipfelbuch der Sternwand. Ein Eintrag vom 28. November 1999, in runder Kinderschrift: Lena B., Startnummer 117, morgen fahr ich das Rennen. Drück mir die Daumen, Mama.'}},
   {x:.70,y:.40,w:.28,h:.34,label:'Kamin',open:{t:'text',cap:'Im Kamin knistert ein frisches Feuer. Sophie hat sich daneben gesetzt, die Hände um eine Tasse Tee. Sie hat ihn nicht angerührt.'}},
   {x:.00,y:.08,w:.28,h:.40,label:'Fenster',open:{t:'text',cap:'Draußen fällt der Schnee langsamer. Zum ersten Mal seit Tagen sieht man die Lichter im Tal.'}}]}]},
 B:{vo:V(21,'b'),scene:X[21].b,mods:[{t:'room',img:'a/pressestelle.jpg',label:'Pressestelle',spots:[
  {x:.80,y:.40,w:.20,h:.24,label:'Rechner',open:{t:'pc',app:'blog',title:'Pressestelle · Recherche'}},
  {x:.66,y:.24,w:.32,h:.18,label:'Pinnwand',open:{t:'text',cap:'An der Pinnwand hängt ein Ausdruck aus dem Blog Spurenlage. Mit Kugelschreiber hat jemand daneben geschrieben: Die Frau weiß mehr, als sie schreibt.'}}]}]}}),

22:base(22,{room:'Verhörraum',code:'1cf194c18aa6848b8f264c8be95d13230e0e835c9c9347aed2ecc28a5e25eb11',
 A:{vo:V(22,'a'),scene:X[22].a,mods:[{t:'verhoer',who:'Jonas Wendt',img:'a/p_jonas.jpg',label:'Sohn des Toten, Zimmer 12',need:3,
   intro:'Jonas lehnt sich zurück und verschränkt die Arme. Stell deine erste Frage.',
   qs:[{q:'Wo waren Sie in der Nacht?',a:CH.j_q1,src:C('j_q1')},{q:'Wann haben Sie Ihren Vater zuletzt gesehen?',a:CH.j_q2,src:C('j_q2')},{q:'Wussten Sie vom neuen Testament?',a:CH.j_q3,src:C('j_q3')},{q:'Waren Sie draußen im Schnee?',a:CH.j_q4,src:C('j_q4')}],
   ev:{'5146':{t:CH.j_e_stiefel,src:C('j_e_stiefel')},'6212':{t:CH.j_e_anruf,src:C('j_e_anruf')},'3381':{t:CH.j_e_geld,src:C('j_e_geld')},'4096':{t:CH.j_e_hand,src:C('j_e_hand')},'7020':{t:CH.j_e_schluessel,src:C('j_e_schluessel')}},
   wrong:{t:CH.j_wrong,src:C('j_wrong')},conf:{t:CH.j_conf,src:C('j_conf')}},
  {t:'room',img:'a/verhoer.jpg',label:'Verhörraum',spots:[
   {x:.10,y:.49,w:.78,h:.16,label:'Tisch',open:{t:'env',id:'verhoer',cap:'Auf dem Tisch liegen deine Verhörkarten bereit. Karte 1 für Jonas Wendt, Karte 2 für morgen.'}},
   {x:.42,y:.46,w:.14,h:.08,label:'Aufnahmegerät',open:{t:'text',cap:'Das kleine Gerät zeichnet alles auf. Das rote Lämpchen leuchtet.'}}]}]},
 B:{vo:V(22,'b'),scene:X[22].b,mods:[{t:'room',img:'a/asservate.jpg',label:'Asservatenkammer',spots:[
  {x:.48,y:.54,w:.34,h:.16,label:'Asservatenliste',open:{t:'doc',id:'asserv22',cap:'Auf dem Tisch die aktuelle Liste aller Beweise im Fall. Oben ruft man gleich nach Nummern.'}},
  {x:.00,y:.05,w:.42,h:.70,label:'Regal',open:{t:'text',cap:'Die Tüte mit dem Eispickel, der Karton aus dem Skikeller, das Geldbündel in einer Klarsichttüte. Alles mit Etikett.'}}]}]}}),

23:base(23,{room:'Verhörraum',code:'290accef5debacccfa7a2e0a6b64adbd1d26653a35b9bd01c2009113bb32bad5',
 A:{vo:V(23,'a'),scene:X[23].a,mods:[{t:'verhoer',who:'Ilse Brandt',img:'a/p_ilse.jpg',label:'Köchin, seit dreißig Jahren im Haus',need:3,
   intro:'Ilse sitzt ganz still. Sie wartet auf deine Frage.',
   qs:[{q:'Sie haben Herrn Wendt jeden Abend Tee gebracht?',a:CH.i_q1,src:C('i_q1')},{q:'Wie lange waren Sie in der Suite?',a:CH.i_q2,src:C('i_q2')},{q:'Was wissen Sie über Eisenhut?',a:CH.i_q3,src:C('i_q3')},{q:'Wo waren Sie am Sonntag?',a:CH.i_q4,src:C('i_q4')}],
   ev:{'9250':{t:CH.i_e_kamera,src:C('i_e_kamera')},'1416':{t:CH.i_e_labor,src:C('i_e_labor')},'3099':{t:CH.i_e_zeitung,src:C('i_e_zeitung')},'4411':{t:CH.i_e_gutachten,src:C('i_e_gutachten')},'5017':{t:CH.i_e_gedenk,src:C('i_e_gedenk')}},
   wrong:{t:CH.i_wrong,src:C('i_wrong')},conf:{t:CH.i_conf,src:C('i_conf')}},
  {t:'room',img:'a/verhoer.jpg',label:'Verhörraum',spots:[
   {x:.10,y:.49,w:.78,h:.16,label:'Tisch',open:{t:'text',cap:'Die zweite Verhörkarte aus Umschlag A10 liegt vor dir. Ilse hat ein Glas Wasser bekommen. Sie trinkt nicht.'}}]}]},
 B:{vo:V(23,'b'),scene:X[23].b,mods:[{t:'room',img:'a/asservate.jpg',label:'Asservatenkammer',spots:[
  {x:.48,y:.54,w:.34,h:.16,label:'Asservatenliste',open:{t:'doc',id:'asserv23',cap:'Die Fortsetzung der Liste, mit allem, was in den letzten Tagen dazugekommen ist.'}},
  {x:.86,y:.05,w:.14,h:.80,label:'Gittertür',open:{t:'text',cap:'Die Gittertür klemmt wie immer. Draußen auf dem Gang ist es still. Alle warten auf den Anruf von oben.'}}]}]}}),

24:{finale:1,room:'Suite 24',codes:{A:'30f51df927da7cc6c01671a3314007e54cf062b42b12337aa84856f4fd41ed1c',B:'7866117e4cd03a099c75a851858783fcb7dfb14f6d1719e7d8d156614cd208ca'},hintVo:HV(24),hints:{A:X[24].hA,B:X[24].hB},reveal:{vo:null,text:''},
 A:{vo:V(24,'a'),scene:X[24].a,mods:[{t:'room',img:'a/suite24.jpg',label:'Suite 24, entsiegelt',spots:[
   {x:.30,y:.40,w:.30,h:.30,label:'Sessel',open:{t:'text',cap:'Der Sessel, in dem er saß. Ein Tisch daneben, leer. Hier hat Ilse jeden Abend das Tablett abgestellt.'}},
   {x:.00,y:.35,w:.24,h:.32,label:'Kamin',open:{t:'env',id:'anklage_a',cap:'Auf dem Sims über dem Kamin hast du dir die Anklageschrift zurechtgelegt.'}}]},{t:'anklage'}]},
 B:{vo:V(24,'b'),scene:X[24].b,mods:[{t:'room',img:'a/lagezentrum.jpg',label:'Lagezentrum',spots:[
   {x:.42,y:.00,w:.58,h:.48,label:'Bildschirme',open:{t:'text',cap:'Auf dem großen Bildschirm die Karte des Hochtals. Ein grüner Punkt kriecht die Passstraße hinauf: die Bergwacht. Am Hotel blinkt ein Landeplatz.'}},
   {x:.25,y:.62,w:.70,h:.20,label:'Schreibtisch',open:{t:'env',id:'anklage_b',cap:'Auf deinem Platz liegt die Anklageschrift bereit.'}}]},{t:'anklage'}]}}
});
// Sessel auf Tag 15 öffnet die Fotos
DAYS[15].A.mods[1].spots[0].open.items=DAYS[15].A.mods[0].items;
PC_APPS.lab.day=16;
})();
