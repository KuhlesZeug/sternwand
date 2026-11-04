// Tage 4 bis 8 · Inhalte, Portale, Prospekt
(function(){
const BUERO=(pc)=>({t:'room',img:'a/pb_buero.jpg',label:'Präsidium, Büro K1',spots:[{x:.05,y:.03,w:.20,h:.34,label:'Ermittlungswand',open:{t:'wall'}},{x:.32,y:.34,w:.15,h:.12,label:'Dienstrechner',open:Object.assign({t:'pc'},pc||{})},{x:.25,y:.435,w:.12,h:.06,label:'Telefon',open:{t:'text',cap:'Die Leitung ins Hotel steht. Ruf {P} an und sprecht euch ab. Du hast die Akten, oben hat man die Augen.'}},{x:.83,y:.455,w:.15,h:.10,label:'Faxgerät',open:{t:'text',cap:'Das Faxgerät schweigt. Heute ist noch nichts gekommen.'}},{x:.26,y:.19,w:.16,h:.14,label:'Aktenschrank',open:{t:'text',cap:'Alte Vorgänge aus dem Hochtal, sauber beschriftet. Die Lawine von 1999 hat hier keine Akte. Seltsam eigentlich.'}},{x:.59,y:.05,w:.26,h:.33,label:'Fenster',open:{t:'text',cap:'Draußen fällt der Schnee so dicht, dass du die Berge kaum noch siehst. Irgendwo dort oben liegt das Hotel.'}}]});
const HV=d=>({A:['a/h'+d+'a1.mp3?v=6','a/h'+d+'a2.mp3?v=6'],B:['a/h'+d+'b1.mp3?v=6','a/h'+d+'b2.mp3?v=6']});
const V=(d,x)=>'a/vo_d'+d+x+'.mp3?v=6';

Object.assign(window.DAYS,{
4:{hintVo:HV(4),room:'Zimmer 7',code:'d441df5c6a2af340176d6a25b3f8c9fe713b71d1a9c69b75aa8a7a71b66c8738',
 A:{vo:V(4,'a'),scene:'Dr. Felix Ahrens wohnt in Zimmer 7, dem schönsten Zimmer im ersten Stock. Er sitzt beim Frühstück und hat Marlene ausdrücklich gebeten, dass niemand sein Zimmer betritt. Du gehst trotzdem hinein. Auf dem Bett liegt ein schwarzer Aktenkoffer mit Zahlenschloss. Was trägt ein Investor mitten im Sturm mit sich herum, das niemand sehen soll?',
  mods:[{t:'room',img:'a/zimmer7.jpg',label:'Zimmer 7',spots:[
   {x:.56,y:.62,w:.42,h:.18,label:'Aktenkoffer',open:{t:'lock',k:'koffer',img:'a/koffer_zu.jpg',imgOpen:'a/koffer_auf.jpg',digits:4,hash:'db9f37e62a6b1728475c14e624dc67dbbdc7945f181b1f2000ac3baab836a2fa',show:'2009',tag:'Dr. F. Ahrens · Bei Fund bitte melden',cap:'Vier Zahlenräder aus Messing. Wisch über ein Rad oder tippe oben und unten.',openCap:'Klack. Der Koffer springt auf. Obenauf ein dicker Vertrag mit rotem Siegel und darunter ein Brief auf dem Papier des Hotels.',docs:['kaufvertrag','ruecktritt']}},
   {x:.63,y:.46,w:.23,h:.12,label:'Nachttisch',open:{t:'env',id:'visitenkarte',cap:'Auf dem Nachttisch liegt eine Visitenkarte. Auf der Rückseite schimmert etwas, ein Strich Textmarker, kaum zu sehen. Du steckst die Karte ein.'}},
   {x:.51,y:.08,w:.12,h:.38,label:'Kleiderschrank',open:{t:'text',cap:'Drei Maßanzüge, ein Paar nagelneue Skischuhe. Am linken hängt noch das Preisschild. Herr Ahrens ist nicht zum Skifahren hier.'}},
   {x:0,y:.43,w:.22,h:.12,label:'Schreibtisch',open:{t:'text',cap:'Eine Mappe mit Zeitungsausschnitten über Hotelpreise in den Alpen. Ganz oben ein Foto vom Berghotel Sternwand, mit rotem Filzstift eingekreist. Daneben steht: endlich.'}},
   {x:.02,y:.02,w:.36,h:.36,label:'Fenster',open:{t:'text',cap:'Der Sturm drückt den Schnee gegen die Scheibe. Unten im Tal blinkt ein einzelnes Licht. Das muss das Präsidium sein.'}}]},
  {t:'lamp',note:'Die Visitenkarte aus Umschlag A5 trägt auf der Rückseite eine Notiz in hellem Textmarker. Mit bloßem Auge liest man sie kaum. Halte die Spurenlampe darüber.',cap:'Halte die Rückseite der Visitenkarte nah vor die Kamera, gern unter einer Lampe.'}]},
 B:{vo:V(4,'b'),scene:'Oben im Hotel wohnt ein Investor aus München, Dr. Felix Ahrens. Was will so einer im Dezember in einem Haus ohne Gäste? Am Dienstrechner hast du jetzt Zugang zum Handelsregister. Dort steht jede Firma mit dem Tag ihrer Eintragung. Du brauchst nur den genauen Namen. Den kennt {P}.',
  mods:[BUERO({app:'hr'})]},
 hints:{A:['Die Visitenkarte trägt eine Notiz, die man mit bloßem Auge kaum sieht. Schalte die Spurenlampe ein.','Gesucht ist das Gründungsjahr der Firma auf der Karte. Das steht im Handelsregister, und darauf hat nur dein Präsidium Zugriff.'],B:['Ohne den genauen Firmennamen findest du zu viele Treffer. Frag oben nach der Visitenkarte.','Im Eintrag der richtigen Firma steht der Tag der Ersteintragung. Das Jahr ist die Kombination für den Koffer.']},
 reveal:{vo:V(4,'r'),text:'Im Koffer liegt ein Kaufvertrag: Die Ahrens Alpin Invest übernimmt das Berghotel Sternwand für 4,2 Millionen Euro. Darunter ein Brief von Konrad Wendt, geschrieben am 30. November, dem Tag vor seinem Tod. Er tritt vom Vorvertrag zurück. Ahrens verliert das Hotel und eine Menge Geld. Wer so viel verliert, hat ein Motiv. Tragt es auf eurer Tafel ein.'}},

5:{hintVo:HV(5),room:'Technik',code:'7c35d4d318456473474285f9f23c2cec63bcd88d609bca029d1c09f5ea25924b',
 A:{vo:V(5,'a'),amb:'cellar',scene:'Unten im Technikraum ist es stockdunkel. Seit der Nacht läuft das Haus nur noch auf Notstrom, die Heizung ist aus, die Flure sind kalt. Irgendwo hier unten hängt der Sicherungskasten. Wenn das Licht zurückkommt, verrät dir die Anlage vielleicht, wann es ausgegangen ist. Aber Vorsicht. Der Hausmeister sitzt im Tal fest, und an so einer alten Anlage drückt man nicht einfach irgendwo herum.',
  mods:[{t:'dark',img:'a/technik.jpg',label:'Technikraum im Untergeschoss',spots:[
   {x:.04,y:.05,w:.30,h:.60,label:'Sicherungskasten',open:{t:'fuse',img:'a/sicherungskasten.jpg',names:['Küche','Flure','1. Stock','2. Stock','Heizung','Spa','Kameras','Bar'],trip:[2,5,7],order:[5,2,7],lcd:'LETZTES EREIGNIS · NETZAUSFALL 23:40',cap:'Der Hauptschalter steht auf Ein. Drei Sicherungen hängen unten. Frag dein Präsidium, bevor du etwas umlegst.',fail:'Das war zu viel für die alte Anlage. Hauptschalter wieder ein, drei Sicherungen unten. Noch einmal von vorn.',notAll:'Der Hauptschalter ist ein, aber das Licht bleibt aus. Es hängen noch Sicherungen unten.',win:'Ein tiefes Summen geht durchs Haus. Das Licht flackert an, irgendwo springt die Heizung an. Auf dem Display der Anlage steht das letzte Ereignis.'}},
   {x:.60,y:.63,w:.38,h:.18,label:'Werkbank',open:{t:'text',cap:'Eine Taschenlampe ohne Batterie, eine kalte Thermoskanne, ein Kalender mit Bergbildern. Beim 30. November steht in krakeliger Schrift: Sepp frei, Tal.'}},
   {x:.66,y:.38,w:.26,h:.24,label:'Heizkessel',open:{t:'text',cap:'Der Kessel ist kalt. Ohne Strom keine Heizung, ohne Heizung bald Eis in den Leitungen.'},lit:{t:'text',cap:'Der Brenner faucht und springt an. Bald wird es wieder warm im Haus.'}},
   {x:.70,y:.10,w:.18,h:.16,label:'Fenster',open:{t:'text',cap:'Ein kleines Kellerfenster, halb zugeschneit. Draußen heult der Wind um die Hausecke.'}},
   {x:.51,y:.25,w:.12,h:.10,label:'Display',open:{t:'text',cap:'Ein kleines Display an der Wand. Schwarz, ohne Strom.'},lit:{t:'text',cap:'LETZTES EREIGNIS · NETZAUSFALL 23:40'}}]}]},
 B:{vo:V(5,'b'),scene:'Oben im Hotel ist der Strom weg, und mit ihm die Heizung. {P} steht im dunklen Technikraum vor einem Sicherungskasten, den nur einer wirklich kennt: Sepp Gruber, der Hausmeister. Der sitzt wie du im Tal fest. Er hat dir heute früh seinen Schaltplan geschickt. Geh runter in den Faxraum und ruf ihn an.',
  mods:[{t:'room',img:'a/pb_faxraum.jpg',label:'Faxraum im Erdgeschoss',spots:[{x:.35,y:.37,w:.17,h:.09,label:'Faxgeräte',open:{t:'fax',from:'S. Gruber, Hausmeister · 6:58',pages:1,items:['schaltplan'],cap:'Eine Seite, quer gefaxt, unten etwas von Hand dazugeschrieben.'}},{x:.76,y:.18,w:.10,h:.09,label:'Uhr',open:{t:'text',cap:'Die Uhr im Faxraum tickt laut. Oben im Hotel wird es mit jeder Stunde kälter.'}},{x:.48,y:.11,w:.25,h:.25,label:'Fenster',open:{t:'text',cap:'Im Innenhof hat der Hausdienst Streusalz verteilt. Der Schnee fällt schneller nach, als man streuen kann.'}},{x:.07,y:.45,w:.36,h:.15,label:'Papierstapel',open:{t:'text',cap:'Der Stapel von gestern ist weggeräumt. Ordnung muss sein, auch im Sturm.'}}]},
  {t:'audio',src:'a/sepp_d5.mp3?v=6',who:'Sepp Gruber',img:'a/p_sepp.jpg',label:'Anruf beim Hausmeister',script:'Gruber. Ja, der Plan ist bei Ihnen? Gut. Hören Sie, bei Sturm fliegen da oben immer dieselben raus. Die Anlage ist alt und empfindlich. Wenn einer die Sicherungen einfach wieder reindrückt, bei eingeschaltetem Hauptschalter, dann knallt es, und dann geht gar nichts mehr. Die Reihenfolge hab ich unten auf den Plan geschrieben, nach dem letzten Winter. Lesen Sie sie Ihrem Kollegen genau so vor. Und wenn das Licht wieder da ist, soll er aufs Display schauen. Das merkt sich, wann der Strom weg war.'}]},
 hints:{A:['Sag deinem Präsidium, welche Sicherungen unten hängen, und lass dir den Schaltplan vorlesen.','Erst den Hauptschalter aus, dann die drei Sicherungen in der Reihenfolge vom Plan, dann den Hauptschalter wieder ein. Die Uhrzeit auf dem Display ist der Code.'],B:['Der Hausmeister hat den Plan gefaxt. Lies auch, was er unten von Hand dazugeschrieben hat.','Lass dir sagen, welche Sicherungen unten hängen, und gib die Reihenfolge Schritt für Schritt durch. Der Code erscheint danach oben auf dem Display.']},
 reveal:{vo:V(5,'r'),text:'Netzausfall um 23:40. Ab da waren die Flure dunkel und die Kameras aus. Was nach 23:40 im Haus geschah, hat keine Kamera gesehen. Merkt euch die Uhrzeit. Sie wird noch wichtig.'}},

6:{hintVo:HV(6),room:'Zimmer 12',code:'f8750fdc9e63ffc953d8c30b8d0b74dba6a56e2f8cdc23b3d8ea1e9dcdbc0040',
 A:{vo:V(6,'a'),scene:'Jonas Wendt ist der einzige Sohn des Toten. Er wohnt in Zimmer 12, wenn er nicht gerade in der Stadt ist, und er hat heute noch kein Wort gesagt. Jetzt sitzt er unten beim Frühstück, und sein Zimmer steht offen. Es sieht aus, als hätte hier jemand in großer Eile etwas verschwinden lassen wollen.',
  mods:[{t:'room',img:'a/zimmer12.jpg',label:'Zimmer 12',spots:[
   {x:.54,y:.69,w:.20,h:.20,label:'Papierkorb',open:{t:'env',id:'schnipsel',cap:'Ganz oben im Papierkorb liegen sechs Fetzen eines Zettels. Jemand hat ihn in Stücke gerissen, aber nicht weit genug. Du sammelst alle ein.'}},
   {x:.55,y:.33,w:.14,h:.13,label:'Schreibtisch',open:{t:'doc',id:'kontoauszug',cap:'Unter einer leeren Dose klebt ein Kontoauszug.'}},
   {x:.78,y:.47,w:.22,h:.13,label:'Briefe',open:{t:'doc',id:'mahnung',cap:'Ein Stapel ungeöffneter Briefe. Einer ist aufgerissen.'}},
   {x:.70,y:.33,w:.25,h:.14,label:'Laptop',open:{t:'text',cap:'Gesperrt. Als Hintergrund ein altes Foto: Jonas mit seinem Vater auf dem Gipfel der Sternwand, beide jünger, beide lachen.'}},
   {x:.20,y:.04,w:.38,h:.30,label:'Fenster',open:{t:'text',cap:'Vom Balkon aus sieht man die Lichter im Tal. Auf der Brüstung liegt eine zerdrückte Zigarettenschachtel, dabei raucht hier offiziell niemand.'}},
   {x:.72,y:.05,w:.10,h:.28,label:'Snowboard',open:{t:'text',cap:'Ein teures Board, kaum gefahren. Am Rand klebt ein Aufkleber eines Wettbüros aus der Stadt.'}}]}]},
 B:{vo:V(6,'b'),scene:'Im Medienraum des Präsidiums hat dir die Technik die Website des Hotels auf den großen Bildschirm gelegt. Wer ein Haus kennen will, sollte lesen, wie es sich selbst beschreibt. Und {P} hat oben in Zimmer 12 gerade etwas gefunden, das nach einer geheimen Botschaft aussieht.',
  mods:[{t:'room',img:'a/medienraum.jpg',label:'Medienraum',spots:[
   {x:.28,y:.06,w:.56,h:.40,label:'Großbildschirm',open:{t:'pc2',title:'Medienraum · Großbild',app:'web'}},
   {x:.68,y:.62,w:.12,h:.11,label:'Kaffeetasse',open:{t:'text',cap:'Kalt. Jemand von der Nachtschicht hat sie stehen lassen. Auf der Tasse steht: Bester Kollege der Welt.'}}]}]},
 hints:{A:['Jede Zahlengruppe hat drei Ziffern. Oben auf dem Zettel steht, wofür die drei Ziffern stehen.','S Z W heißt Seite, Zeile, Wort. Den Prospekt des Hotels hat dein Präsidium auf der Website. Das letzte Wort ist der Code.'],B:['Lass dir die sechs Zahlengruppen und die Buchstaben oben auf dem Zettel vorlesen.','Seite, Zeile, Wort im Hausprospekt. Die Überschrift im Bild zählt nicht mit, die erste Textzeile ist Zeile eins.']},
 reveal:{vo:V(6,'r'),text:'Bis Freitag zahlst du oder fliegst. Jemand hat Jonas eine Drohung geschickt, versteckt im Prospekt des eigenen Hotels. Dazu der Kontoauszug: minus 40.000 Euro. Jonas schuldet Leuten Geld, mit denen man nicht spaßt. Und sein Vater hatte genug davon im Safe.'}},

7:{hintVo:HV(7),room:'Hotelbar',code:'bd15f861efb12dffea5f670f86d2f2f2e67eb5da777036eccd19ed28dfee0b47',
 A:{vo:V(7,'a'),amb:'lobby',scene:'In der Hotelbar riecht es nach Zirbe und kaltem Kerzenwachs. Hinter dem Tresen poliert Luca Gläser, die längst sauber sind. Gestern Abend war er bis zum Schluss hier. Ein guter Barkeeper vergisst nichts: wer mit wem getrunken hat, was, und wann gezahlt wurde.',
  mods:[{t:'audio',src:'a/luca_d7.mp3?v=6',who:'Luca Moser',img:'a/p_luca.jpg',label:'Gespräch an der Bar',script:'Tom und die Chefin saßen bis zum Schluss zusammen, hinten am Fenster. Zwei Zirbenschnaps und ein Kräutertee, wie jeden Montag. Der Tee ist für die Chefin, die trinkt keinen Schnaps, und Tom nimmt immer zwei. Sie haben zusammen bezahlt und sind gleich gegangen. Wann genau? Keine Ahnung, ich hab nicht auf die Uhr geschaut. Aber die Bons liegen noch auf dem Tresen. Die räum ich erst morgen weg.'},
   {t:'room',img:'a/hotelbar.jpg',label:'Hotelbar',spots:[
   {x:.44,y:.56,w:.32,h:.10,label:'Tresen',open:{t:'doc',id:'bons',cap:'Vier Bons aus der Kasse, noch nicht abgerechnet.'}},
   {x:.47,y:.42,w:.14,h:.09,label:'Kasse',open:{t:'text',cap:'Die alte Kasse druckt nur Tisch, Uhrzeit und Betrag. Was bestellt wurde, schreibt Luca auf seinen Block, und der Block ist voll und weggeworfen.'}},
   {x:.72,y:.04,w:.27,h:.36,label:'Regal',open:{t:'text',cap:'Ganz vorne eine bauchige Flasche ohne Etikett: Zirbenschnaps nach Hausrezept, angesetzt von Konrad Wendt selbst. Die Flasche ist fast leer.'}},
   {x:0,y:.04,w:.18,h:.40,label:'Fenster',open:{t:'text',cap:'Hinten am Fenster steht ein Tisch mit zwei Stühlen, beide noch zurückgeschoben. Auf dem Tisch ein leeres Teeglas und zwei kleine Schnapsgläser.'}},
   {x:.34,y:.12,w:.10,h:.14,label:'Kuckucksuhr',open:{t:'sfx',k:'tick',cap:'Die Kuckucksuhr ist um 23:40 stehen geblieben, als der Strom ausfiel. Jetzt tickt sie wieder, aber falsch.'}}]}]},
 B:{vo:V(7,'b'),scene:'Zurück im Medienraum, zurück auf der Website des Hotels. Diesmal interessiert dich die Bar. {P} sitzt oben bei Luca, dem Barkeeper, und der erinnert sich genau, was gestern Abend getrunken wurde. Was das kostet, steht auf der Barkarte im Netz. Zusammen findet ihr heraus, wann bezahlt wurde.',
  mods:[{t:'room',img:'a/medienraum.jpg',label:'Medienraum',spots:[
   {x:.28,y:.06,w:.56,h:.40,label:'Großbildschirm',open:{t:'pc2',title:'Medienraum · Großbild',app:'web'}},
   {x:.68,y:.62,w:.12,h:.11,label:'Kaffeetasse',open:{t:'text',cap:'Jemand hat sie gespült. Auf der Tasse steht immer noch: Bester Kollege der Welt.'}}]}]},
 hints:{A:['Luca weiß, was Tom und die Chefin getrunken haben. Was das kostet, steht auf der Barkarte im Präsidium.','Nur ein Bon passt zu genau zwei Zirbenschnaps und einem Kräutertee. Die Uhrzeit darauf ist der Code, vierstellig.'],B:['Frag oben, was Luca über die Bestellung sagt, und schau auf der Website in die Barkarte.','Zweimal Zirbenschnaps und einmal Kräutertee. Rechne den Betrag aus und lass dir die Bons vorlesen.']},
 reveal:{vo:V(7,'r'),text:'16,80 Euro um 23:14. Tom Riedl und Marlene Wendt haben zusammen bezahlt und die Bar gemeinsam verlassen. Der Bergführer und die Frau des Toten, um Viertel nach elf in der Mordnacht. Wohin geht man um diese Zeit in einem eingeschneiten Hotel?'}},

8:{hintVo:HV(8),room:'Zimmer 15',code:'912763ef913582e0d0b40322cfb3f8e61a5a12e897daa857e55635bf322ce8e4',
 A:{vo:V(8,'a'),scene:'Sophie Lang, Zimmer 15, schreibt angeblich einen Wanderblog. Aber hier sieht nichts nach Wandern aus. An der Wand hängen Fotos und eine Karte voller roter Nadeln, auf dem Schreibtisch stapeln sich alte Zeitungen. Ihr Laptop ist gesperrt. Daneben liegt ihr Notizbuch, aufgeschlagen, als hätte sie es eben noch benutzt.',
  mods:[{t:'room',img:'a/zimmer15.jpg',label:'Zimmer 15',spots:[
   {x:.40,y:.42,w:.23,h:.09,label:'Laptop',open:{t:'laptop',user:'Sophie Lang',avatar:'a/p_sophie.jpg',clock:'Di 9:14',hash:'a0409951e28a2c2ca17bd070be661624d2fae8aa7dbfdb80e6a4dfe57da0b8e4',hintLine:'Passworthinweis: meine erste',cap:'Groß und ohne Leerzeichen, so wie im Notizbuch.',desk:'LAPTOP8'}},
   {x:.66,y:.49,w:.20,h:.08,label:'Notizbuch',open:{t:'doc',id:'notiz8'}},
   {x:.44,y:0,w:.18,h:.18,label:'Urkunde',open:{t:'zoom',img:'a/urkunde.jpg',cap:'Nachwuchspreis 2014 des Hochtaler Boten für Sophie Lang, „für ihre erste Reportage“. Der Titel ist zu klein gedruckt, um ihn zu lesen.'}},
   {x:.80,y:.30,w:.20,h:.15,label:'Zeitungen',open:{t:'doc',id:'zeitung8'}},
   {x:0,y:0,w:.25,h:.42,label:'Fenster',open:{t:'text',cap:'Von hier sieht man genau auf den Sternwandhang. Auf dem Fensterbrett liegt ein Fernglas.'}},
   {x:.64,y:0,w:.36,h:.28,label:'Fotowand',open:{t:'text',cap:'Fotos vom Sternwandhang, ein Lawinenkegel von oben, eine Liste mit drei Namen. Zwei davon sind durchgestrichen, der dritte ist eingekreist. Die Nadeln auf der Karte stecken alle an derselben Piste.'}}]}]},
 B:{vo:V(8,'b'),scene:'Sophie Lang, Zimmer 15, Wanderbloggerin. So steht es im Belegungsplan. {P} sagt, ihr Zimmer sehe eher nach Recherche aus, und ihr Laptop sei gesperrt. In der Pressestelle steht ein Rechner mit Zugang zum Archiv des Hochtaler Boten. Die Zugangsdaten liegen in deiner Fallakte, aber nur zur Hälfte.',
  mods:[{t:'room',img:'a/pressestelle.jpg',label:'Pressestelle',spots:[
   {x:.80,y:.40,w:.20,h:.24,label:'Archivrechner',open:{t:'pc2',title:'Pressestelle · Archivrechner',app:'ar'}},
   {x:.34,y:.70,w:.52,h:.20,label:'Zeitungsstapel',open:{t:'text',cap:'Die Ausgaben der letzten Woche. Kein Wort über das Hotel. Noch nicht.'}},
   {x:.66,y:.24,w:.32,h:.18,label:'Pinnwand',open:{t:'text',cap:'Presseerklärungen, ein Dienstplan der Pressestelle und eine Postkarte vom Gardasee. Darauf von Hand: Grüße aus der Sonne, haltet durch.'}}]}]},
 hints:{A:['Dein Präsidium kommt ins Zeitungsarchiv, wenn du ihm das Gründungsjahr der Zeitung nennst. Es steht im Kopf der alten Zeitungen hier im Zimmer.','Gesucht ist der Titel von Sophies erster Reportage, ohne Leerzeichen. Den findet das Präsidium im Archiv.'],B:['Das Passwort fürs Archiv ist das Gründungsjahr der Zeitung. Oben im Zimmer liegen alte Ausgaben, frag danach.','Such nach der Autorin Sophie Lang. Die Liste beginnt mit dem neuesten Artikel, der älteste steht ganz unten. Vorsicht, es gibt eine Autorin mit fast gleichem Namen.']},
 reveal:{vo:V(8,'r'),text:'Sophie Lang ist keine Wanderbloggerin. Auf ihrem Laptop liegt ein Ordner mit dem Namen Sternwand 1999: Fotos einer Lawine, Mails von einem anonymen Informanten und ein gelöschter Entwurf mit dem Titel Die Schuld des Hoteliers. Sophie ist hier, um ein Unglück aufzuklären, das siebenundzwanzig Jahre zurückliegt.'}}
});

// Laptop von Sophie Lang
const LAPTOP8=[
 {n:'Sternwand 1999',ic:'a/icon_folder.jpg',html:'<div class="lt-gal"><figure><img src="a/lawine1999.jpg" alt=""><figcaption>Sternwandhang, 30.11.1999, Nachmittag</figcaption></figure></div><div class="lt-note"><b>Was ich weiß</b><p>Drei Tote. Die Piste war offen, obwohl die Warnstufe hoch war. Im offiziellen Bericht steht: Freigabe nach Prüfung. Wer hat geprüft? Wer hat freigegeben? Die Akte der Lawinenkommission ruht seit 2000.</p></div>'},
 {n:'Mail',ic:'a/icon_mail.jpg',html:'<div class="lt-mail"><details open><summary><b>unbekannt</b><span>Fragen Sie nach dem 30. November</span></summary><p>Frau Lang, fragen Sie, wer am 30. November 1999 die Piste am Sternwandhang freigegeben hat. Die Antwort steht nicht im Amt.</p></details><details><summary><b>unbekannt</b><span>Das Gutachten</span></summary><p>Es gab zwei Gutachten. Eins liegt im Archiv, das andere nicht. Das echte hat jemand mitgenommen, der es nie hätte haben dürfen.</p></details><details><summary><b>unbekannt</b><span>Jahrestag</span></summary><p>Am Jahrestag sitzt er immer allein in seinem Büro. Dann trinkt er. Dann redet er.</p></details></div>'},
 {n:'Fotos',ic:'a/icon_photos.jpg',html:'<div class="lt-gal"><figure><img src="a/hotel.jpg" alt=""><figcaption>Anreise 26.11.</figcaption></figure><figure><img src="a/lawine1999.jpg" alt=""><figcaption>Archivfoto, gescannt</figcaption></figure></div>'},
 {n:'Notizen',ic:'a/icon_notes.jpg',html:'<div class="lt-note"><b>Recherche Sternwand</b><p>Belegschaft 1999 abgleichen. Wer arbeitet heute noch im Haus?</p><p>Sonntag: Treffen. Unterlagen mitnehmen, nicht alles auf einmal zeigen.</p><p>Blog: gesperrten Beitrag erst freigeben, wenn alles bestätigt ist.</p></div>'},
 {n:'Papierkorb',ic:'a/icon_trash.jpg',html:'<div class="lt-note del"><b>Die Schuld des Hoteliers</b><i>Entwurf, gelöscht</i><p>Am 30. November 1999 starben am Sternwandhang drei Menschen, unter ihnen ein Mädchen von sechzehn Jahren. Die Piste war offen. Siebenundzwanzig Jahre lang hat niemand gefragt, warum. Ich frage jetzt.</p><p>[Name erst nennen, wenn das zweite Gutachten vorliegt.]</p></div>'}];
window.LAPTOPS={LAPTOP8};

// Handelsregister
window.HR=[
 {n:'Ahrens Alpin Invest GmbH',k:['ahrens alpin invest'],ort:'München',nr:'HRB 240917',rows:[['Sitz','München'],['Gegenstand','Erwerb, Entwicklung und Betrieb alpiner Hotelimmobilien'],['Geschäftsführer','Dr. Felix Ahrens'],['Prokura','Nina Brandl'],['Stammkapital','250.000 EUR'],['Ersteintragung','14.05.2009'],['Letzte Änderung','02.10.2026']]},
 {n:'Ahrens Bau und Boden GmbH',k:[],ort:'Rosenheim',nr:'HRB 11203',rows:[['Sitz','Rosenheim'],['Gegenstand','Hoch und Tiefbau'],['Geschäftsführer','Hermann Ahrens'],['Ersteintragung','03.03.1996']]},
 {n:'Alpin Invest Tirol AG',k:[],ort:'Innsbruck',nr:'FN 304120',rows:[['Sitz','Innsbruck'],['Gegenstand','Beteiligungen im Tourismus'],['Vorstand','Markus Pichler'],['Ersteintragung','21.06.2012']]},
 {n:'Berghotel Sternwand Wendt KG',k:['sternwand','wendt'],ort:'Hochtal',nr:'HRA 2215',rows:[['Sitz','Hochtal'],['Gegenstand','Betrieb des Berghotels Sternwand'],['Komplementär','Konrad Wendt'],['Kommanditistin','Marlene Wendt'],['Ersteintragung','11.01.1987']]},
 {n:'Hochtal Bergbahnen GmbH',k:['seilbahn','hochtal'],ort:'Hochtal',nr:'HRB 870',rows:[['Sitz','Hochtal'],['Gegenstand','Seilbahn Sternwand und Schlepplifte'],['Ersteintragung','02.12.1972']]}];

// Hausprospekt: jede Zeile fest, damit Seite, Zeile, Wort eindeutig sind
window.PROSPEKT=[
 {h:'Berghotel Sternwand',img:'a/hotel.jpg',l:['Seit 1961 auf 2.140 Metern.','Ein Haus, eine Familie, ein Berg.','Willkommen im Hochtal.']},
 {h:'Ankommen',img:'a/a_kehre.jpg',l:['Die Straße endet hier oben,','und mit ihr der Alltag.','Unsere Seilbahn bringt dich','in sieben Minuten vom Tal','direkt vor die Haustür.','Hier findest du Ruhe,','Schnee und klare Luft.']},
 {h:'Unsere Zimmer',img:'a/zimmer7.jpg',l:['Vierundzwanzig Zimmer in Zirbe.','Ruhe von Sonntag bis Samstag.','Jedes Zimmer hat einen Balkon','mit Blick auf die Sternwand.','Frühstück gibt es ab sieben.']},
 {h:'Winter',img:'a/a_seilbahn.jpg',l:['Im Winter beginnt hier oben','die schönste Zeit des Jahres.','Pisten direkt am Haus,','ein Skikeller mit Schuhtrockner','und Verleih für Ski und Board.','Wer mag, steigt mit Tom auf.','Oder fliegst du lieber?','Dann ab zum Gleitschirmstart.']},
 {h:'Advent',img:'a/a_ofen.jpg',l:['Jeden Freitag im Advent','leuchtet die Kapelle im Kerzenlicht.','Ilse backt dann Zimtsterne','nach dem Rezept ihrer Mutter.']},
 {h:'Kulinarik',img:'a/kueche.jpg',l:['Unsere Küche kocht, was der Berg gibt.','Kräuter aus dem eigenen Garten,','Käse von der Alm nebenan,','Brot aus dem Holzofen.','Seit dreißig Jahren am Herd: Ilse Brandt.']},
 {h:'Spa',img:'a/a_gaeste.jpg',l:['Im Untergeschoss wartet das Spa','mit Zirbensauna und Dampfbad.','Für Sauna und Ruheraum','zahlst du nichts extra.','Private Kabinen auf Anfrage.']},
 {h:'Bar',img:'a/hotelbar.jpg',l:['Am Abend trifft man sich','an der Bar bei Luca.','Probier unseren Zirbenschnaps,','nach altem Hausrezept.']},
 {h:'Anreise',img:'a/a_strasse.jpg',l:['Im Dezember ist das Hochtal','oft tagelang eingeschneit.','Ruf uns kurz an oder schreib uns.','Wir holen dich an der Talstation ab.','Familie Wendt und das ganze Team']}];

window.BARKARTE=[
 ['Warme Getränke',[['Kaffee','3,20'],['Kräutertee','3,80'],['Heiße Schokolade','4,20'],['Glühwein','4,80']]],
 ['Aus dem Haus',[['Zirbenschnaps, Hausrezept','6,50'],['Enzian','6,90'],['Williams','6,90']]],
 ['Bier',[['Helles','4,20'],['Weißbier','4,80']]],
 ['Kleinigkeiten',[['Apfelstrudel','5,90'],['Kaiserschmarrn','9,60']]]];

// Archiv des Hochtaler Boten
window.ARHASH='bd9341a53f453492a3f5c68a0d0c02525446b9c96fbfcc04a0fbbbb2c88ae244';
window.ARCHIV=[
 {a:'Sophie Lang',d:'2023-09-05',dd:'05.09.2023',r:'Reportage',t:'Hütten im Wandel',k:'Almhütten Tourismus',x:'Wie die alten Almhütten im Hochtal zu Ferienhäusern werden und was die Bauern davon halten.'},
 {a:'Sophie Lang',d:'2019-11-30',dd:'30.11.2019',r:'Reportage',t:'Zwanzig Jahre Schweigen',k:'Gedenken Sternwandhang',x:'Am Sternwandhang brennen jedes Jahr am 30. November drei Kerzen. Wer sie anzündet, will niemand sagen.'},
 {a:'Sophie Lang',d:'2016-02-09',dd:'09.02.2016',r:'Reportage',t:'Die letzten Bergbauern',k:'Landwirtschaft',x:'Drei Höfe sind im Hochtal geblieben. Ein Besuch bei Familien, die nicht aufgeben.'},
 {a:'Sophie Lang',d:'2014-11-22',dd:'22.11.2014',r:'Reportage',t:'Wenn der Berg ruft',k:'Bergwacht Rettung',x:'Eine Nacht mit der Bergwacht Hochtal, von der Alarmierung bis zum Morgengrauen.'},
 {a:'Sophie Lang',d:'2014-03-14',dd:'14.03.2014',r:'Reportage',t:'Schnee von gestern',k:'Skilift Dorf',x:'Wie ein Dorf im Hochtal seinen alten Schlepplift rettet, mit Kuchenverkauf, Skibasar und sehr viel Sturheit. Die erste Reportage unserer neuen Mitarbeiterin, ausgezeichnet mit dem Nachwuchspreis des Hochtaler Boten.'},
 {a:'Sophia Lange',d:'2013-01-17',dd:'17.01.2013',r:'Bericht',t:'Nachtschicht im Schneeraupe',k:'Piste',x:'Unterwegs mit einem Pistenfahrer, wenn alle anderen schlafen.'},
 {a:'Sophia Lange',d:'2011-12-08',dd:'08.12.2011',r:'Bericht',t:'Ski heil im Hochtal',k:'Saisonstart',x:'Pünktlich zum zweiten Advent laufen die Lifte. Ein Rundgang zum Saisonstart.'},
 {a:'Redaktion',d:'2026-11-28',dd:'28.11.2026',r:'Lokales',t:'Sturmwarnung für das Hochtal',k:'Wetter Sturm',x:'Der Wetterdienst warnt für Montag vor Orkanböen und starkem Schneefall. Die Straße ins Hochtal könnte gesperrt werden.'}];
})();
