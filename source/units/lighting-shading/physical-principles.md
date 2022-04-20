

### Physikalische Grundlagen

*Für eine detailliertere Einführung in die physikalischen Grundlagen des Lichts empfehlen wir die Seite von Bartosz Ciechanowski **\<insert link\>**. Für diese Einheit werden wir jedoch ein einfaches **Strahlenmodell** annehmen.*

Wir nehmen die Welt um uns darüber wahr, wie Licht mit ihr interagiert. Wir können Objekte nur sehen, wenn sie mit Licht in Kontakt kommen und dieses entweder in Richtung Betrachter*in zurückwerfen (**Reflexion**), durchlassen (**Transmission**) oder verschlucken (**Absorption**). Diese Erscheinungen nehmen Einfluss darauf wie hell oder dunkel ein Objekt wahrgenommen wird und bewirken dadurch Schattierung und Schattenwurf. Damit bilden sie auch die Grundlage für unser Beleuchtungsmodell.

| ![camera-model](./ray_types.png?as=webp) |
| :--------------: |
| Strahlentypen |


Weitere Phänomene, die bei der Interaktion von Licht mit Objekten einer Szene auftreten können, sind z.B. Lichtbeugung und -brechung sowie Interferenzerscheinungen, diese spielen jedoch in den Lichtausbreitungsmodellen der Computergrafik in der Regel eine untergeordnete Rolle. Den Hauptfaktor bildet die **Reflexion**.

### Reflexion

Wie bereits erwähnt unterscheiden wir zwischen **diffuser** und **spekularer** Reflexion, die zusammen unser (sehr simples) Beleuchtungsmodell bilden.
Welche physikalischen Grundlagen bzw. welche Modellannahmen stecken dahinter?

#### Diffuse Reflexion
Als diffuse Reflexion wird der Effekt bezeichnet, dass Flächen heller wirken, je mehr sie dem Licht zugewandt sind.
Sie ist vollständig unabhängig vom Betrachtungswinkel und nur von Oberflächenausrichtung und Lichtposition bzw. Lichtrichtung abhängig.

Es steht die Modellannahme dahinter, dass das auf die Oberfläche auftreffende Licht gleichmäßig in alle Richtungen reflektiert wird. Dieses Phänomen ist stärker, je rauer die Oberfläche ist. 

| ![camera-model](./diffuse.png?as=webp) |
| :--------------: |
| Diffuse Reflexion - modelliertes Verhalten |

Physikalisch lässt sich dieses Phänomen damit begründen, dass raue Flächen viele kleine Unebenheiten beinhalten. Wir können uns die Wirkung einer Lichtquelle als viele dicht nebeneinanderliegende Lichtstrahlen vorstellen (**modellieren?**).- Treffen diese auf die Fläche, werden sie in praktisch zufällige Richtungen reflektiert. Durch dieses Verhalten der einzelnen Lichtstrahlen wird das Licht insgesamt annähernd gleichmäßig in alle verschiedenen Richtungen reflektiert.

| ![camera-model](./diffuse_zoom.png?as=webp) |
| :--------------: |
| Reflexion an Unebenheiten in der Oberfläche |

Wie viel Licht genau in Abhängigkeit vom Lichteinfallswinkel reflektiert wird, lässt sich mithilfe des **Lambertschen Gesetzes** berechnen.
Dieses besagt, dass die reflektierte Lichtmenge, also die Lichtintensität $I$, proportional zum Kosinus des Winkels zwischen der **(invertierten)** Einfallsrichtung des Lichtes und der Flächennormale ist.

| ![camera-model](./lambert.png?as=webp)|
| :--------------: |
| Lambertsches Gesetz |

Dieser Zusammenhang lässt sich auch aus folgender Überlegung herleiten. Wir können uns das Licht als ein Bündel paralleler Lichtstrahlen mit gleichem Abstand vorstellen. Je größer der Winkel der Lichtstrahlen zur Flächennormale ist, umso größer ist der Abstand, mit dem die Lichtstrahlen auf der Oberfläche aufkommen. Die gleiche Fläche wird also bei einem größeren Winkel von weniger Lichtstrahlen getroffen.
<div align="center">
    <canvas class="zdog-canvas" width="760" height="340"></canvas>
</div>

<div align="center">
    <img alt="Nach links und rechts ziehen, um Winkel zu ändern" src="./drag.png" height="50"/>
</div>
<br/>

Damit können wir also die Abhängigkeit der diffusen Reflexion von sowohl der Oberflächenbeschaffenheit als auch von der Lichtrichtung begründen.

#### Spekulare Reflexion
Im Gegensatz zur Diffusen Reflexion ist die Spekulare Reflexion (auch *spiegelnde Reflexion* oder *Spiegellicht*) nicht nur von der Oberflächenbeschaffenheit und Lichtrichtung, sondern auch der Blickrichtung abhängig.

Hier ist die Modellannahme, dass sich das Licht (im Gegensatz zur gleichmäßigen diffusen Reflexion) ungleichmäßig und besonders konzentriert in eine Richtung spiegelt. Daraus ergibt sich auch die Abhängigkeit von der Blickrichtung: Der Punkt erscheint umso heller, je ähnlicher Blick- und Spiegelrichtung sind.

Spekulare Reflexion ist stärker auf sehr glatten (z.B. polierten) Oberflächen. Die Oberflächenbeschaffenheit bestimmt dabei sowohl, wie stark die spekulare Reflexion ist, als auch wie schnell die Helligkeit mit zunehmender Abweichung zwischen Blick- und Spiegelrichtung abnimmt.

| ![camera-model](./specular.png?as=webp) |
| :--------------: |
| Spekulare Reflexion |

Sei $\alpha$ der Winkel zwischen Blick-und Reflexionsrichtung. Dann ist die Intensität der Spekularen Reflexion proportional zu $cos^n \alpha$, wobei $n$ materialspezifisch ist.

| ![camera-model](./specular_formula.png?as=webp) |
| :--------------: |
| Spekulare Reflexion |

**\<Berechnung der Spiegelrichtung\>**

| ![camera-model](./specular_formula2.png?as=webp) |
| :--------------: |
| Berechnung der Spiegelrichtung|



* why Reflexion is so important (wahrscheinlich kein extra abschnitt)
    * Materialabhängigkeit
    * wie bekommen wir daraus Farben?
* 1) diffus aka lambert
* 2) spekular aka ...idk hat das nen extra namen?

* (neuer Abschnitt) Diffus + spekular in more detail aka GIVE ME FORMELN
* = how do we berechen this?

