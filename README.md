# Text Adventure

Eine statische, deutschsprachige Sammlung von sieben spielbaren Schüler-Textabenteuern. Auswählen über die Vornamen; jeder Entscheidungsschauplatz besitzt eine eigene, mit Imagegen erzeugte Pixelillustration im gemeinsamen Stil. Enden verwenden den letzten Schauplatz. Die Sprache des ursprünglichen Dungeon-Spiels bleibt Englisch.

## Lokal starten

`python3 -m http.server 4173`

Dann http://localhost:4173 öffnen. Keine Installation, keine externen Laufzeitdienste, kein Tracking. Schrift und Bilder werden lokal geladen. Tamilo-Spielstände bleiben nach explizitem Speichern ausschließlich im Browser des jeweiligen Geräts.

## Umsetzung

Die Vorlagen wurden in klickbare Verzweigungen übertragen, sprachlich leicht geglättet und von Eingabe-/Formatierungsfehlern bereinigt. Bei Mirac ist die Fensterwahl erreichbar; das Schlüssel-Ende bleibt wie in der Vorlage offen. Bei Neha wurde eine ethnisierende Gegnerbeschreibung zu „Unbekannte“ neutralisiert. Mystery Escape behält den Code 472 und die Punktelogik. Der Todesmarsch beschreibt Gefahren ohne grafische Details.

Im Dungeon bleiben Gegner, 15–25 Gold, Händler, Werte, Inventar und Drachenkampf erhalten. Für ein gewinnbares Browser-Spiel verursacht Drachenfeuer 15 statt 25 Schaden. Das gekaufte Schwert verursacht 35 Schaden; der Feuertrank reduziert drei Feuerangriffe auf jeweils 5 Schaden. Heiltränke heilen wie in der Vorlage bis zu 40 HP (Maximum 100). Die ursprünglich wirkungslosen Ausrüstungsgegenstände sind damit benutzbar. Speichern bewahrt auch Spielphase und Inventar. Fehleingaben ersetzen keine Entscheidungen und verbrauchen keinen Zug.

Originalabgaben, iServ-Kontaktdaten und interne Verwaltungsinformationen gehören nicht zu diesem Repository. Die Geschichten und Autorennamen stammen aus den abgegebenen Vorlagen. Aus Datenschutzgründen zeigt die Sammlung nur Vornamen.

## Bildstil

Der detaillierte globale Prompt steht in `bildstil.txt`. Alle Entscheidungsszenen wurden einzeln mit dem eingebauten Imagegen-Werkzeug erzeugt; `castle-start` ist die gemeinsame visuelle Stilreferenz. Ein Prompt kann kein pixelgenau identisches Raster garantieren. Die Bildserie wird visuell auf stilistische Konsistenz geprüft.

Schrift: VT323 von Peter Hull, SIL Open Font License, siehe `assets/fonts/OFL.txt`. Keine weitergehende Lizenz für Schülertexte wird hier erteilt.
