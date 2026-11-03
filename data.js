// Inhalte: 24 Türen, je Rolle A (vor Ort) und B (Präsidium)
window.ROOMS=['Rezeption','Zimmer 2','Küche','Zimmer 7','Technik','Zimmer 12','Hotelbar','Zimmer 15','Spa','Zimmer 23','Kameras','Skikeller','Telefon','Zimmer 18','Obduktion','Garten','Zimmer 3','Büro','Kapelle','4. Stock','Notizbuch','Verhör','Verhör','Suite 24'];

window.ROOMS_B=['Büro','Rechner','Faxraum','Register','Hausmeister','Website','Barkarte','Archiv','Spa','Standesamt','Videoraum','Asservate','Telefone','Bank','Anruf','Labor','Keller','Spurenlampe','Akten','Funkraum','Blog','Asservate','Asservate','Finale'];
window.DAYS={
1:{room:'Rezeption',roomB:'Büro K1',code:'9d8c72a4ae58c82c5b7a5ad571e8be21f5632d10f204a4648e7e8662d12c3a27',
 A:{vo:'a/vo_d1a.mp3',scene:'In der Nacht zum ersten Dezember hat der Sturm das Berghotel Sternwand eingeschlossen. Die Straße ist verschüttet, die Seilbahn steht still. Um zehn nach sieben hallt ein Schrei durch das Haus. Oben in Suite 24 liegt Konrad Wendt, der Hotelier. Tot. Eigentlich bist du hier im Urlaub. Jetzt bist du die einzige Polizei auf diesem Berg, und das Präsidium im Tal erreichst du nur am Telefon. Fang an der Rezeption an. Wer war heute Nacht im Haus?',
  mods:[{t:'room',img:'a/rezeption.jpg',label:'Rezeption',spots:[
   {x:.70,y:.23,w:.28,h:.28,label:'Schlüsselbrett',open:{t:'zoom',img:'a/schluesselbrett.jpg',cap:'Das Schlüsselbrett hinter dem Tresen'}},
   {x:.55,y:.54,w:.25,h:.07,label:'Gästebuch',open:{t:'doc',id:'gaestebuch'}},
   {x:.13,y:.50,w:.16,h:.07,label:'Beistelltisch',open:{t:'env',id:'lageplan',cap:'Auf dem kleinen Tisch unter der Lampe liegt ein Stapel gefalteter Lagepläne für die Gäste. Du steckst einen ein.'}},
   {x:.80,y:.53,w:.08,h:.08,label:'Glocke',open:{t:'sfx',k:'bell',cap:'Niemand kommt. Der Nachtportier ist wegen des Sturms gar nicht erst heraufgekommen.'}},
   {x:.01,y:.04,w:.46,h:.44,label:'Fenster',open:{t:'text',cap:'Draußen nur Weiß. Der Schnee liegt bis an die Fensterbank. Hier kommt heute niemand weg.'}}
  ]}]},
 B:{vo:'a/vo_d1b.mp3',scene:'Kurz nach sieben reißt dich das Telefon aus dem Schlaf. Ein Toter im Berghotel Sternwand, ganz oben im Hochtal. Die Straße ist dicht. Wer oben ermittelt, sitzt mit dem Täter fest, wer auch immer das ist. Du bist die einzige Verbindung nach draußen. Das Hotel hat dir heute früh die ersten Unterlagen gefaxt: den Belegungsplan und das Schlüsselbuch der Rezeption. Fang damit an.',
  mods:[{t:'room',img:'a/pb_buero.jpg',label:'Präsidium, Büro K1',spots:[{x:.05,y:.03,w:.20,h:.34,label:'Ermittlungswand',open:{t:'wall'}},{x:.32,y:.34,w:.15,h:.12,label:'Dienstrechner',open:{t:'pc'}},{x:.25,y:.435,w:.12,h:.06,label:'Telefon',open:{t:'text',cap:'Die Leitung ins Hotel steht. Ruf {P} an und sprecht euch ab. Du hast die Akten, oben hat man die Augen.'}},{x:.83,y:.455,w:.15,h:.10,label:'Faxgerät',open:{t:'fax',from:'Berghotel Sternwand · 7:42',pages:2,items:['belegung','schluesselbuch'],cap:'Zwei Seiten aus dem Hotel. Heft sie in deine Fallakte.'}},{x:.26,y:.19,w:.16,h:.14,label:'Aktenschrank',open:{t:'text',cap:'Alte Vorgänge aus dem Hochtal, sauber beschriftet. Die Lawine von 1999 hat hier keine Akte. Seltsam eigentlich.'}},{x:.59,y:.05,w:.26,h:.33,label:'Fenster',open:{t:'text',cap:'Draußen fällt der Schnee so dicht, dass du die Berge kaum noch siehst. Irgendwo dort oben liegt das Hotel.'}}]}]},
 hints:{A:['Hast du an der Rezeption alles angesehen? Frag dein Präsidium, wer in welchem Zimmer wohnt und wer welchen Schlüssel haben darf.','Fünf leere Haken lassen sich erklären. Einer nicht.'],B:['Lass dir von oben sagen, welche Schlüssel am Brett fehlen.','Welcher Schlüssel müsste laut Schlüsselbuch und Zettel am Brett hängen?']},
 reveal:{vo:'a/vo_d1r.mp3',text:'Fünf Schlüssel sind bei ihren Gästen. Aber der Schlüssel zu Zimmer 18 darf das Brett nicht verlassen. Der Installateur hat ihn am Freitag zurückgebracht, seitdem durfte ihn niemand haben. Heute Nacht hat ihn trotzdem jemand genommen. Wer braucht in einer Mordnacht ein leeres Zimmer? Tragt die Verdächtigen auf eurer Tafel ein. Morgen klopft ihr beim Bergführer. Neben der Leiche lag sein Werkzeug.'}},

2:{room:'Zimmer 2',roomB:'Dienstrechner',code:'716b267e594a9da6e43b9649ba1880ee41d99771495bd1aabfe1972e1cdae301',
 A:{vo:'a/vo_d2a.mp3',scene:'Neben Konrad Wendt lag ein Eispickel, an der Spitze dunkle Flecken. Im ganzen Haus gibt es nur einen, der so etwas braucht: Tom Riedl, den Bergführer. Er wohnt unten im Personaltrakt, Zimmer 2. Verschlafen öffnet er dir die Tür und lässt dich herein. Sieh dich um. Und hör dir an, was er zu sagen hat.',
  mods:[{t:'paper',h:'Aus deiner Jackentasche',title:'Dein Ausweis',items:['ausweis'],note:'Das Präsidium wird danach fragen.'},{t:'audio',src:'a/tom_d2.mp3',who:'Tom Riedl',img:'a/p_tom.jpg',label:'Vernehmung in Zimmer 2',script:'Was? Nein. Mein Pickel hängt im Spind, wie immer. Ich war seit Mittwoch nicht mehr am Berg, bei dem Wetter geht da keiner hoch. Gestern Abend? An der Bar, bis kurz nach elf. Fragen Sie Luca. Konrad und ich, wir hatten unsere Differenzen, ja. Aber ich bring doch niemanden um. Schauen Sie selbst nach. Der Spind ist offen.'},
   {t:'room',img:'a/zimmer2.jpg',label:'Zimmer 2',spots:[
   {x:.26,y:.03,w:.26,h:.65,label:'Spind',open:{t:'doc',id:'inventar',cap:'Innen an der Spindtür klebt ein Zettel.'}},
   {x:.10,y:.13,w:.15,h:.19,label:'Halterung',open:{t:'text',cap:'Eine Wandhalterung aus Stahl, genau für einen Eispickel gemacht. Sie ist leer. Kein Staub darunter, hier hing bis vor Kurzem etwas.'}},
   {x:.58,y:.49,w:.42,h:.12,label:'Schreibtisch',open:{t:'doc',id:'tourenbuch'}},
   {x:.72,y:.03,w:.24,h:.38,label:'Fenster',open:{t:'text',cap:'Am Fensterrahmen Eisblumen von innen. Hier stand heute Nacht niemand am offenen Fenster.'}}
  ]}]},
 B:{vo:'a/vo_d2b.mp3',scene:'Die Spurensicherung kommt nicht auf den Berg, aber die ersten Tatortfotos sind schon in der Kripo Datenbank. Hinein kommt nur, wer am Fall arbeitet. Dafür brauchst du die Dienstnummer der Ermittlung vor Ort. Frag danach und melde dich an.',
  mods:[{t:'room',img:'a/pb_buero.jpg',label:'Präsidium, Büro K1',spots:[{x:.05,y:.03,w:.20,h:.34,label:'Ermittlungswand',open:{t:'wall'}},{x:.32,y:.34,w:.15,h:.12,label:'Dienstrechner',open:{t:'pc',app:'db'}},{x:.25,y:.435,w:.12,h:.06,label:'Telefon',open:{t:'text',cap:'Die Leitung ins Hotel steht. Ruf {P} an und sprecht euch ab. Du hast die Akten, oben hat man die Augen.'}},{x:.83,y:.455,w:.15,h:.10,label:'Faxgerät',open:{t:'text',cap:'Das Faxgerät schweigt. Heute ist noch nichts gekommen.'}},{x:.26,y:.19,w:.16,h:.14,label:'Aktenschrank',open:{t:'text',cap:'Alte Vorgänge aus dem Hochtal, sauber beschriftet. Die Lawine von 1999 hat hier keine Akte. Seltsam eigentlich.'}},{x:.59,y:.05,w:.26,h:.33,label:'Fenster',open:{t:'text',cap:'Draußen fällt der Schnee so dicht, dass du die Berge kaum noch siehst. Irgendwo dort oben liegt das Hotel.'}}]},{t:'paper',h:'Auf deinem Schreibtisch',title:'Zugangsdaten',items:['zugang'],note:'Wie du dich am Dienstrechner anmeldest, steht auf deinem Zugangsblatt.'}]},
 hints:{A:['Im Präsidium braucht man deine Dienstnummer. Sie steht auf deinem Ausweis.','Welcher Gegenstand auf Toms Zettel passt zu der halben Seriennummer aus der Datenbank?'],B:['Ohne Dienstnummer kein Login. Frag oben danach.','Lass dir Toms Inventarzettel vorlesen und vergleiche mit der Seriennummer.']},
 reveal:{vo:'a/vo_d2r.mp3',text:'Die Nummer passt. Der Eispickel aus der Suite gehört Tom Riedl. Und Tom schwört, er hänge in seinem Spind. Lügt er, oder hat ihn jemand genommen? Wer wusste, wo Tom seine Ausrüstung aufbewahrt?'}},

3:{room:'Küche',roomB:'Faxraum',code:'7c44fc2c196edfba5c504ba22dbbc211ce224f3242c8ed85a145f5cc678b982d',
 A:{vo:'a/vo_d3a.mp3',scene:'In der Küche brennt schon Licht. Ilse Brandt, die Köchin, kocht Kaffee für ein Haus voller Menschen, die einander nicht mehr in die Augen sehen. Seit dreißig Jahren arbeitet sie hier. Ihre Hände zittern, als sie dir eine Tasse hinstellt. Gestern Abend war sie noch bei Herrn Wendt, sagt sie. Hör ihr zu. Und sieh dir die Küche an.',
  mods:[{t:'audio',src:'a/ilse_d3.mp3',who:'Ilse Brandt',img:'a/p_ilse.jpg',label:'Aussage in der Küche',script:'Jeden Abend bringe ich Herrn Wendt seinen Tee. Kräutertee, mit einem Löffel Honig. Immer eine halbe Stunde nach meinem Dienstschluss, seit dreißig Jahren, da können Sie die Uhr nach stellen. Gestern auch. Er saß am Schreibtisch und hat kaum aufgesehen. Da hat er noch gelebt. Mehr weiß ich nicht. Entschuldigen Sie, ich muss das Frühstück machen.'},
   {t:'room',img:'a/kueche.jpg',label:'Küche',spots:[
   {x:.49,y:.61,w:.46,h:.13,label:'Teetablett',open:{t:'doc',id:'tablett'}},
   {x:.62,y:.20,w:.38,h:.37,label:'Kräuterregal',open:{t:'doc',id:'regal'}},
   {x:.33,y:.17,w:.23,h:.31,label:'Fenster',open:{t:'text',cap:'Hinter dem Haus liegt der Kräutergarten unter einem halben Meter Schnee. Ein Trampelpfad führt zum Gewächshaus.'}}
  ]}]},
 B:{vo:'a/vo_d3b.mp3',scene:'Unten im Faxraum blinkt das Gerät. Das Hotel hat in der Nacht die Dienstpläne geschickt, aber der Sturm hat den Strom schwanken lassen, und jetzt liegt alles durcheinander. Wer gestern Abend wann gearbeitet hat, steht irgendwo in diesem Stapel. Such es heraus.',
  mods:[{t:'room',img:'a/pb_faxraum.jpg',label:'Faxraum im Erdgeschoss',spots:[{x:.35,y:.37,w:.17,h:.09,label:'Faxgeräte',open:{t:'text',cap:'Beide Geräte blinken. Speicher voll, Papier leer. Was in der Nacht ankam, liegt jetzt irgendwo auf dem Tisch.'}},{x:.76,y:.18,w:.10,h:.09,label:'Uhr',open:{t:'text',cap:'Kurz nach acht. Oben im Hotel ist jetzt Frühstückszeit. Ob Ilse Brandt trotzdem in der Küche steht?'}},{x:.48,y:.11,w:.25,h:.25,label:'Fenster',open:{t:'text',cap:'Der Innenhof des Präsidiums liegt unter Schnee. Die Straßenlaterne flackert.'}},{x:.07,y:.45,w:.36,h:.15,label:'Papierstapel',open:{t:'pile',cap:'Das Gerät hat in der Nacht alles durcheinander ausgedruckt. Irgendwo hier liegt das Fax aus dem Hotel.',found:'Da ist es: Kopfzeile Berghotel Sternwand, Personal.',items:['dienst_kueche'],sheets:[{h:'Wetterdienst · 5:10',t:'Unwetterwarnung Stufe 4'},{h:'Molkerei Hochtal',t:'Lieferschein'},{h:'Landratsamt',t:'Straßensperrung B 312'},{h:'Berghotel Sternwand · Personal',t:'Dienstplan Küche und Service',ok:1},{h:'Bergwacht Hochtal',t:'Einsatzbereitschaft'},{h:'Polizeipräsidium',t:'Schichtplan Dezember'},{h:'Berghotel Sternwand · Küche',t:'Speisekarte Adventswoche'},{h:'Seilbahn Sternwand',t:'Betrieb eingestellt'},{h:'Berghotel Sternwand · Rezeption',t:'Anreiseliste 5.12.'}]}}]}]},
 hints:{A:['Ilse nennt keine Uhrzeit, nur einen Bezug. Wann hatte sie Dienstschluss?','Das Präsidium hat den Dienstplan der Küche.'],B:['Wann war Ilses Dienst am Montag zu Ende? Was sagt sie oben aus?','Dienstschluss plus eine halbe Stunde, vierstellig ohne Doppelpunkt.']},
 reveal:{vo:'a/vo_d3r.mp3',text:'Um 22:30 war Ilse bei Konrad Wendt. Eine Köchin, die seit dreißig Jahren jeden Abend dieselbe Tasse Tee bringt. Was sollte daran verdächtig sein? Trotzdem: Schreibt euch die Uhrzeit auf.'}}
};

// Intro Filme: t = Startsekunde im Sprechertext, k = Kamerafahrt
window.INTRO={
 A:{vo:'a/vo_introA.mp3',slides:[
  {img:'a/in_a1.jpg',k:[1.05,1.2,'0,0','-3%,-2%'],t:0,s:'Drei Tage Urlaub. Mehr wolltest du nicht, {N}.'},
  {img:'a/in_a1.jpg',k:[1.2,1.32,'-3%,-2%','-5%,-4%'],t:3.8,s:'Die Straße ins Hochtal windet sich nach oben, und mit jeder Kehre wird der Schnee dichter.'},
  {img:'a/hotel.jpg',k:[1.02,1.14,'0,2%','0,-2%'],t:9.1,s:'Ganz oben wartet das Berghotel Sternwand. Vierundzwanzig Zimmer, ein Kachelofen und Menschen, die einander zu gut kennen.'},
  {img:'a/rezeption.jpg',k:[1.04,1.16,'2%,0','-2%,0'],t:17,s:'An der Rezeption bekommst du deinen Schlüssel und einen Willkommensbrief.'},
  {img:'a/in_a2.jpg',k:[1.03,1.15,'0,0','0,-3%'],t:21.1,s:'Am Abend schließt der Sturm den Berg ein. Die Straße verschwindet unter dem Schnee, die Seilbahn steht still.'},
  {img:'a/in_a2.jpg',k:[1.15,1.26,'0,-3%','2%,-4%'],t:27.6,s:'Was niemand hier weiß: Du bist bei der Kripo. Wenn heute Nacht etwas geschieht, bist du die einzige Polizei auf diesem Berg.'},
  {img:'a/hotel.jpg',k:[1.18,1.3,'0,-4%','0,-7%'],t:35.1,s:'Du siehst, was im Tal niemand sieht: die Zimmer, die Spuren, die Gesichter. Akten, Datenbanken und Labor hat nur das Präsidium.'},
  {img:'a/hotel.jpg',k:[1.3,1.38,'0,-7%','0,-8%'],t:44,s:'Und dort erreichst du nur eine Person: <b>{P}</b>, am Telefon.'},
  {title:1,t:48.3,s:'<b>{N}</b><br>Ermittlung vor Ort<br><span>Halte deine Unterlagen bereit. Und dein Telefon.</span>'}
 ]},
 B:{vo:'a/vo_introB.mp3',slides:[
  {img:'a/in_b1.jpg',k:[1.04,1.16,'0,0','0,-3%'],t:0,s:'Bereitschaft im Präsidium Hochtal. Die Nacht ist ruhig. Draußen tobt der Sturm.'},
  {img:'a/in_b2.jpg',k:[1.05,1.18,'0,0','-2%,-2%'],t:6.3,s:'Auf deinem Schreibtisch, {N}: eine Lampe, ein Telefon und ein leerer Aktendeckel.'},
  {img:'a/in_b4.jpg',k:[1.03,1.15,'0,0','0,2%'],t:11.3,s:'Ganz oben am Berg leuchtet das Berghotel Sternwand. Heute Nacht ist es von der Welt abgeschnitten. Keine Straße, keine Seilbahn.'},
  {img:'a/in_b4.jpg',k:[1.15,1.28,'0,2%','0,4%'],t:19.4,s:'Wenn dort oben etwas passiert, kommt niemand hinauf. Keine Spurensicherung, kein Notarzt, keine Verstärkung.'},
  {img:'a/in_b3.jpg',k:[1.04,1.16,'0,0','2%,-2%'],t:26.2,s:'Dann bist du die Verbindung nach draußen. Du hast die Datenbanken, die Archive und das Labor. Was das Hotel faxt, landet in deiner Fallakte.'},
  {img:'a/in_b2.jpg',k:[1.18,1.3,'-2%,-2%','-3%,-4%'],t:34.9,s:'Aber sehen kannst du nichts. Nicht den Tatort, nicht die Gesichter. Dafür brauchst du jemanden vor Ort.'},
  {img:'a/in_b1.jpg',k:[1.16,1.26,'0,-3%','0,-5%'],t:41.3,s:'Zum Glück macht oben gerade jemand Urlaub, der bei der Kripo ist: <b>{P}</b>.'},
  {title:1,t:45,s:'<b>{N}</b><br>Präsidium im Tal<br><span>Halte deine Fallakte bereit. Und dein Telefon. Es wird bald klingeln.</span>'}
 ]}
};

// Bastelkarte: was vor Tür 1 bereitliegen muss
window.KIT={
 A:{title:'Deine Unterlagen',sub:'Druck alle Blätter mit A in der Ecke aus. Offen liegt nur, was du als Gast schon in der Tasche hast. Alles andere faltest du und versiegelst es mit einer Banderole vom Siegelbogen. Geöffnet wird erst, wenn du es im Hotel findest.',
  open:['willkommen','ausweis','tafel'],tips:{willkommen:'Trag oben deinen Namen ein.',ausweis:'Ausschneiden, Namen eintragen, ein Foto aufkleben, wenn du magst.',tafel:'Mit Bleistift ausfüllen, du wirst radieren.'},
  mat:'Du brauchst: Schere, Kleber, einen Bleistift.'},
 B:{title:'Deine Fallakte',sub:'Druck alle Blätter mit B in der Ecke aus. Offen liegt nur, was schon auf deinem Schreibtisch ist. Alles andere faltest du und versiegelst es mit einer Banderole vom Siegelbogen. Geöffnet wird erst, wenn ein Fax ankommt oder etwas freigegeben wird.',
  open:['deckblatt','zugang'],tips:{deckblatt:'Trag deinen Namen und den Namen vor Ort ein.',zugang:'Deine Zugangsdaten. Nie ganz vollständig.'},
  mat:'Du brauchst: einen Ordner oder eine Mappe, Schere, Kleber, einen Stift.'}
};
