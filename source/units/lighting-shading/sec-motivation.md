

### Motivation und Problemstellung

Ziel dieser Einheit soll es sein, zu verstehen, welche Rolle Beleuchtung in der Computergrafik spielt und wie simple lokale Beleuchtungsverfahren funktionieren.
Bevor wir uns jedoch genauer mit der Umsetzung beschäftigen, müssen wir uns zunächst erarbeiten, welche Eigenschaften Beleuchtung ausmachen.

Wir wollen uns dafür ein paar Aufnahmen aus verschiedenen Spielen ansehen. Welche Eigenschaften, die ein Beleuchtungsmodell charakterisieren, kannst du daraus ableiten? 

| ![camera-model](./fire-life-is-strange.jpg?as=webp) |
| :--------------: |
| :jigsaw: Beispielscreenshots |

<textarea class = 'notes' rows = '8' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea>

Wie auch auf den Screenshots zu erkennen, ist Beleuchtung ein zentrales Ausdrucksmittel und für 3D-Wahrnehmung wichtig. Sie vermittelt Betrachter*innen Informationen über Oberflächenbeschaffenheit und Form von Objekten und trägt dadurch signifikant dazu bei, einen räumlichen Eindruck zu erzeugen.

Um diese Informationen zu vermitteln, muss die Belechtung der Szene also in irgendeiner Form von der Oberfläche, also insbesondere ihrer **Ausrichtung** sowie ihrem **Material und Struktur**. So würde z.B. ein Ball aus Gummi bei gleicher Beleuchtung anders aussehen als eine Kugel aus Metall.

Dabei sind verschiedene Beleuchtungseffekte zu beobachten: Zum einen sind Flächen stärker erleuchtet, je mehr sie dem Licht zugewandt sind. Dieser Bestandteil der Beleuchtung nennt sich **diffuse** Beleuchtung. Zum anderen sind auch


Effekte
-	Richtungsabhängig
-	Materialabhängig - spiegelnd oder nicht
-	-> Minimum, um infos über Form und Oberflächenbeschaffenheit vermitteln zu können
-	Schattenwurf
-	Indirekte Beleuchtung
Wir wollen in dieser Lerneinheit zunächst ein sehr simples Beleuchtungsmodell erarbeiten, das die richtungs- und materialabhängige Schattierung ermöglicht. Techniken, um Schattenwurf und indirekte Beleuchtung zu ermöglichen, werden wir in der Computergrafik II kennenlernen.
Lokale vs globale beleuchtung aka was macht schatten so viel schwieriger als schattierung?
Schattenwurf vs schattierung
