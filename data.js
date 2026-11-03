// Inhalte: 24 Türen, je Rolle A (vor Ort) und B (Präsidium)
window.ROOMS=['Rezeption','Zimmer 2','Küche','Zimmer 7','Technik','Zimmer 12','Hotelbar','Zimmer 15','Spa','Zimmer 23','Kameras','Skikeller','Telefon','Zimmer 18','Obduktion','Garten','Zimmer 3','Büro','Kapelle','4. Stock','Notizbuch','Verhör','Verhör','Suite 24'];

window.DAYS={
1:{room:'Rezeption',code:'9d8c72a4ae58c82c5b7a5ad571e8be21f5632d10f204a4648e7e8662d12c3a27',
 A:{vo:'a/vo_d1a.mp3',scene:'In der Nacht zum ersten Dezember hat der Sturm das Berghotel Sternwand eingeschlossen. Die Straße ist verschüttet, die Seilbahn steht still. Um zehn nach sieben hallt ein Schrei durch das Haus. Oben in Suite 24 liegt Konrad Wendt, der Hotelier. Tot. Eigentlich bist du hier im Urlaub. Jetzt bist du die einzige Polizei auf diesem Berg, und das Präsidium im Tal erreichst du nur am Telefon. Fang an der Rezeption an. Wer war heute Nacht im Haus?',
  mods:[{t:'room',img:'a/rezeption.jpg',label:'Rezeption',spots:[
   {x:.70,y:.23,w:.28,h:.28,label:'Schlüsselbrett',open:{t:'zoom',img:'a/schluesselbrett.jpg',cap:'Das Schlüsselbrett hinter dem Tresen'}},
   {x:.55,y:.54,w:.25,h:.07,label:'Gästebuch',open:{t:'doc',id:'gaestebuch'}},
   {x:.80,y:.53,w:.08,h:.08,label:'Glocke',open:{t:'sfx',k:'bell',cap:'Niemand kommt. Der Nachtportier ist wegen des Sturms gar nicht erst heraufgekommen.'}},
   {x:.01,y:.04,w:.46,h:.44,label:'Fenster',open:{t:'text',cap:'Draußen nur Weiß. Der Schnee liegt bis an die Fensterbank. Hier kommt heute niemand weg.'}}
  ]}]},
 B:{vo:'a/vo_d1b.mp3',scene:'Kurz nach sieben reißt dich das Telefon aus dem Schlaf. Ein Toter im Berghotel Sternwand, ganz oben im Hochtal. Die Straße ist dicht. Wer oben ermittelt, sitzt mit dem Täter fest, wer auch immer das ist. Du bist die einzige Verbindung nach draußen. Das Hotel hat dir heute früh die ersten Unterlagen gefaxt: den Belegungsplan und das Schlüsselbuch der Rezeption. Fang damit an.',
  mods:[{t:'doc',id:'belegung'},{t:'doc',id:'schluesselbuch'}]},
 hints:{A:['Frag dein Präsidium, wer in welchem Zimmer wohnt und wer welchen Schlüssel haben darf.','Fünf leere Haken lassen sich erklären. Einer nicht.'],B:['Lass dir von oben sagen, welche Schlüssel am Brett fehlen.','Welcher Schlüssel müsste laut Schlüsselbuch und Zettel am Brett hängen?']},
 reveal:{vo:'a/vo_d1r.mp3',text:'Fünf Schlüssel sind bei ihren Gästen. Aber der Schlüssel zu Zimmer 18 darf das Brett nicht verlassen. Der Installateur hat ihn am Freitag zurückgebracht, seitdem durfte ihn niemand haben. Heute Nacht hat ihn trotzdem jemand genommen. Wer braucht in einer Mordnacht ein leeres Zimmer? Tragt die Verdächtigen auf eurer Tafel ein. Morgen klopft ihr beim Bergführer. Neben der Leiche lag sein Werkzeug.'}},

2:{room:'Zimmer 2',code:'716b267e594a9da6e43b9649ba1880ee41d99771495bd1aabfe1972e1cdae301',
 A:{vo:'a/vo_d2a.mp3',scene:'Neben Konrad Wendt lag ein Eispickel, an der Spitze dunkle Flecken. Im ganzen Haus gibt es nur einen, der so etwas braucht: Tom Riedl, den Bergführer. Er wohnt unten im Personaltrakt, Zimmer 2. Verschlafen öffnet er dir die Tür und lässt dich herein. Sieh dich um. Und hör dir an, was er zu sagen hat.',
  mods:[{t:'audio',src:'a/tom_d2.mp3',who:'Tom Riedl',img:'a/p_tom.jpg',label:'Vernehmung in Zimmer 2',script:'Was? Nein. Mein Pickel hängt im Spind, wie immer. Ich war seit Mittwoch nicht mehr am Berg, bei dem Wetter geht da keiner hoch. Gestern Abend? An der Bar, bis kurz nach elf. Fragen Sie Luca. Konrad und ich, wir hatten unsere Differenzen, ja. Aber ich bring doch niemanden um. Schauen Sie selbst nach. Der Spind ist offen.'},
   {t:'room',img:'a/zimmer2.jpg',label:'Zimmer 2',spots:[
   {x:.26,y:.03,w:.26,h:.65,label:'Spind',open:{t:'doc',id:'inventar',cap:'Innen an der Spindtür klebt ein Zettel.'}},
   {x:.10,y:.13,w:.15,h:.19,label:'Halterung',open:{t:'text',cap:'Eine Wandhalterung aus Stahl, genau für einen Eispickel gemacht. Sie ist leer. Kein Staub darunter, hier hing bis vor Kurzem etwas.'}},
   {x:.58,y:.49,w:.42,h:.12,label:'Schreibtisch',open:{t:'doc',id:'tourenbuch'}},
   {x:.72,y:.03,w:.24,h:.38,label:'Fenster',open:{t:'text',cap:'Am Fensterrahmen Eisblumen von innen. Hier stand heute Nacht niemand am offenen Fenster.'}}
  ]}]},
 B:{vo:'a/vo_d2b.mp3',scene:'Die Spurensicherung kommt nicht auf den Berg, aber die ersten Tatortfotos sind schon in der Kripo Datenbank. Hinein kommt nur, wer am Fall arbeitet. Dafür brauchst du die Dienstnummer der Ermittlung vor Ort. Frag danach und melde dich an.',
  mods:[{t:'web',url:'db/',label:'Kripo Datenbank Hochtal',note:'Anmeldung mit der Dienstnummer von vor Ort'}]},
 hints:{A:['Im Präsidium braucht man deine Dienstnummer. Sie steht auf deinem Ausweis.','Welcher Gegenstand auf Toms Zettel passt zu der halben Seriennummer aus der Datenbank?'],B:['Ohne Dienstnummer kein Login. Frag oben danach.','Lass dir Toms Inventarzettel vorlesen und vergleiche mit der Seriennummer.']},
 reveal:{vo:'a/vo_d2r.mp3',text:'Die Nummer passt. Der Eispickel aus der Suite gehört Tom Riedl. Und Tom schwört, er hänge in seinem Spind. Lügt er, oder hat ihn jemand genommen? Wer wusste, wo Tom seine Ausrüstung aufbewahrt?'}},

3:{room:'Küche',code:'7c44fc2c196edfba5c504ba22dbbc211ce224f3242c8ed85a145f5cc678b982d',
 A:{vo:'a/vo_d3a.mp3',scene:'In der Küche brennt schon Licht. Ilse Brandt, die Köchin, kocht Kaffee für ein Haus voller Menschen, die einander nicht mehr in die Augen sehen. Seit dreißig Jahren arbeitet sie hier. Ihre Hände zittern, als sie dir eine Tasse hinstellt. Gestern Abend war sie noch bei Herrn Wendt, sagt sie. Hör ihr zu. Und sieh dir die Küche an.',
  mods:[{t:'audio',src:'a/ilse_d3.mp3',who:'Ilse Brandt',img:'a/p_ilse.jpg',label:'Aussage in der Küche',script:'Jeden Abend bringe ich Herrn Wendt seinen Tee. Kräutertee, mit einem Löffel Honig. Immer eine halbe Stunde nach meinem Dienstschluss, seit dreißig Jahren, da können Sie die Uhr nach stellen. Gestern auch. Er saß am Schreibtisch und hat kaum aufgesehen. Da hat er noch gelebt. Mehr weiß ich nicht. Entschuldigen Sie, ich muss das Frühstück machen.'},
   {t:'room',img:'a/kueche.jpg',label:'Küche',spots:[
   {x:.49,y:.61,w:.46,h:.13,label:'Teetablett',open:{t:'doc',id:'tablett'}},
   {x:.62,y:.20,w:.38,h:.37,label:'Kräuterregal',open:{t:'doc',id:'regal'}},
   {x:.33,y:.17,w:.23,h:.31,label:'Fenster',open:{t:'text',cap:'Hinter dem Haus liegt der Kräutergarten unter einem halben Meter Schnee. Ein Trampelpfad führt zum Gewächshaus.'}}
  ]}]},
 B:{vo:'a/vo_d3b.mp3',scene:'In der Fallakte stecken auch die Dienstpläne. Wer gestern Abend wann gearbeitet hat, steht hier schwarz auf weiß. Vielleicht hilft das, die Aussagen von oben einzuordnen.',
  mods:[{t:'doc',id:'dienst_kueche'}]},
 hints:{A:['Ilse nennt keine Uhrzeit, nur einen Bezug. Wann hatte sie Dienstschluss?','Das Präsidium hat den Dienstplan der Küche.'],B:['Wann war Ilses Dienst am Montag zu Ende? Was sagt sie oben aus?','Dienstschluss plus eine halbe Stunde, vierstellig ohne Doppelpunkt.']},
 reveal:{vo:'a/vo_d3r.mp3',text:'Um 22:30 war Ilse bei Konrad Wendt. Eine Köchin, die seit dreißig Jahren jeden Abend dieselbe Tasse Tee bringt. Was sollte daran verdächtig sein? Trotzdem: Schreibt euch die Uhrzeit auf.'}}
};
