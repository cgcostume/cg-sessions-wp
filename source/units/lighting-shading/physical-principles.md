

### Physikalische Grundlagen

*Für eine detailliertere Einführung in die physikalischen Grundlagen des Lichts empfehlen wir die Seite von Bartosz Ciechanowski **\<insert link\>**. Für diese Einheit werden wir jedoch ein einfaches **Strahlenmodell** annehmen.*

Wir nehmen die Welt um uns darüber wahr, wie Licht mit ihr interagiert. Wir können Objekte nur sehen, wenn sie mit Licht in Kontakt kommen und dieses entweder in Richtung Betrachter*in zurückwerfen (**Reflexion**), durchlassen (**Transmission**) oder verschlucken (**Absorption**). Diese Erscheinungen nehmen Einfluss darauf wie hell oder dunkel ein Objekt wahrgenommen wird und bewirken dadurch Schattierung und Schattenwurf.

| ![camera-model](./ray_types.png?as=webp) |
| :--------------: |
| Strahlentypen |


Weitere Phänomene, die bei der Interaktion von Licht mit Objekten einer Szene auftreten können, sind z.B. Lichtbeugung und -brechung sowie Interferenzerscheinungen. Unser grundlegendes Beleuchtungsmodell wird jedoch hauptsächlich durch **Reflexion** (im Zusammenspiel mit Absorption) bestimmt.

### Reflexion

Wie bereits erwähnt unterscheiden wir zwischen **diffuser** und **spekularer** Reflexion, die zusammen unser (sehr simples) Beleuchtungsmodell bilden.
Welche physikalischen Grundlagen bzw. welche Modellannahmen stecken dahinter?

#### Diffuse Reflexion
* gleichmäßige Reflexion in alle Richtungen
* basiert auf geringen Unebenheiten in der Oberfläche
* Lambertsches Gesetz

| ![camera-model](./diffuse.png?as=webp) |
| :--------------: |
| Diffuse Reflexion |

#### Spekulare Reflexion
* Reflexion hauptsächlich in eine Richtung
* Blickrichtungsunabhängig
* besonders glatte Oberfläche -> besonders spiegelnd 

| ![camera-model](./specular.png?as=webp) |
| :--------------: |
| Spekulare Reflexion |

**Scattering etc Teilmenge Reflexion?? (vgl. Folie 4)**
* (Strahlenmodell und seine Grenzen)
* why Reflexion is so important (wahrscheinlich kein extra abschnitt)
    * Materialabhängigkeit
    * wie bekommen wir daraus Farben?
* 1) diffus aka lambert
* 2) spekular aka ...idk hat das nen extra namen?

* (neuer Abschnitt) Diffus + spekular in more detail aka GIVE ME FORMELN
* = how do we berechen this?

