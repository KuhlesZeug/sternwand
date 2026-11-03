// Eigene Linienicons im Stil des Hotels (keine Emojis)
(function(){
const S=d=>'<svg class="ki" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
window.KI={
 sound:S('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>'),
 mute:S('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>'),
 akte:S('<path d="M3 6.5h6.5l1.8 2H21V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 10.5h18" opacity=".6"/><path d="M7 14.5h6M7 17h4" opacity=".75"/>'),
 back:S('<path d="M15 5l-7 7 7 7"/>'),
 close:S('<path d="M6 6l12 12M18 6L6 18"/>'),
 play:S('<path d="M8 5.5v13l10.5-6.5z"/>'),
 pause:S('<path d="M8 5.5v13M16 5.5v13"/>'),
 lock:S('<rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>'),
 key:S('<circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21M17.5 12v3M20 12v2"/>'),
 lamp:S('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>'),
 phone:S('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>'),
 tape:S('<rect x="3" y="6" width="18" height="12" rx="1.5"/><circle cx="8.5" cy="12" r="2.2"/><circle cx="15.5" cy="12" r="2.2"/><path d="M8.5 14.2h7"/>'),
 web:S('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z"/>'),
 doc:S('<path d="M6 3h8.5L19 7.5V21H6z"/><path d="M14 3v5h5M9 12h7M9 15.5h7M9 19h4"/>'),
 eye:S('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'),
 hint:S('<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.8v.4M12 17h.01"/>'),
 check:S('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
 door:S('<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21M4 21h16"/><circle cx="15" cy="12.5" r=".9" fill="currentColor"/>')
};
})();
