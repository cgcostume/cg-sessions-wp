

### Motivation und Problemstellung

Ziel dieser Einheit soll es sein, zu verstehen, welche Rolle Beleuchtung in der Computergrafik spielt und wie simple lokale Beleuchtungsverfahren funktionieren.
Bevor wir uns jedoch genauer mit der Umsetzung beschäftigen, müssen wir uns zunächst erarbeiten, welche Eigenschaften Beleuchtung ausmachen.

Wir wollen uns dafür ein paar Aufnahmen aus verschiedenen Spielen ansehen. Welche Eigenschaften, die ein Beleuchtungsmodell charakterisieren, kannst du daraus ableiten? 

| ![camera-model](../ph-secondary.png?as=webp) |
| :--------------: |
| :jigsaw: Beispielscreenshots |

<textarea class = 'notes' rows = '8' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea>

Allgemein Beleuchtung zentrales Ausdrucksmittel und für 3D-Wahrnehmung wichtig -> vermittelt Informationen über Oberflächenbeschaffenheit und Form von Objekten
Effekte
-	Richtungsabhängig
-	Materialabhängig - spiegelnd oder nicht
-	-> Minimum, um infos über Form und Oberflächenbeschaffenheit vermitteln zu können
-	Schattenwurf
-	Indirekte Beleuchtung
Wir wollen in dieser Lerneinheit zunächst ein sehr simples Beleuchtungsmodell erarbeiten, das die richtungs- und materialabhängige Schattierung ermöglicht. Techniken, um Schattenwurf und indirekte Beleuchtung zu ermöglichen, werden wir in der Computergrafik II kennenlernen.
Lokale vs globale beleuchtung aka was macht schatten so viel schwieriger als schattierung?
Schattenwurf vs schattierung
