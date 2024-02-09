

### Motivation und Problemstellung

Bisher haben wir polygone, dreiecke,.. benutzt um objekte zu modellieren und darzustellen -- ist alles supi, aber was wenn wir smoothe, kontinuierliche!, gekrümmte linien/oberflächen haben wollen, die sich am besten auch noch einfach bearbeiten lassen?
beispiele für kurven (TODO: mehr stuff)
| ![affinity](./affinity_curves.jpg?as=webp){.w-50} |
| :--------------: |
| Beispiel für den Einsatz von Kurven|
z.B.: (swirly) Schrift, Rollercoaster, Trinkflasche, Rutsche!!!!, Gitarre, schlange

wir brauchen ein neues tool: parametrische kurven + flächen. Sie helfen uns beim Design von Objekten mit gekrümmten bestandteilen, bei animationen und kamerafahrten und können für verschiedenste anwendungen als werkzeug verwendet werden.

### Kurven -- what's that?
Unter einer Kurve stellst du dir vermutlich perfekte, smoothe krümmungen vor, wie auch in den obigen Beispielen. Aus mathematischer/computergrafischer Sicht ist eine Kurve aber allgemeiner definiert als irgendeine Linie, ein eindimensionales Objekt also, das in den zwei-, drei- (oder höher-) dimensionalen Raum eingebettet ist.

Wir können solche Kurven auf verschiedene Weisen mathematisch darstellen: als **explizite**, **implizite** oder **parametrische** Darstellung.

#### Explizite und Implizite Darstellung
In der expliziten Darstellung werden die Koordinaten der Kurve $C$ in Abhängigkeit der ersten Koordinate beschrieben. Für eine Kurve im dreidimensionalen Raum (Raumkurve) sieht die allgemeine explizite Darstellung also so aus:
$$C=\{\left( \begin{array}{c}x\\ y\\ z\end{array}\right) \in \mathbb{R}^3\,|\, x\in[a,b], y=f(x), z=g(x)\}$$

In der impliziten Darstellung wird die Kurve stattdessen als Lösungsmenge einer Funktion $F$ beschrieben:
$$C=\{\left( \begin{array}{c}x\\ y\\ z\end{array}\right)\in \mathbb{R}^3\,|\, F(x,y,z) = 0\}$$


Wir können uns zum Beispiel mit $f(x) = sin(x)$ und $g(x)=sin(x)$ eine Kurve explizit definieren und die gleiche Kurve implizit darstellen, indem wir
$$F(x,y,z) = \left(\begin{array}{c}x\\ y \\ z\end{array}\right)-\left(\begin{array}{c}x\\ sin(x) \\ sin(x)\end{array}\right)$$
definieren und in die allgemeine Formel der impliziten Darstellung einsetzen.
Die resultierende Kurve sieht in beiden Fällen so aus:
| ![affinity](./3dSinus.jpg?as=webp){.w-50} |
| :--------------: |
| Grafische Darstellung der definierten Kurve|

Beide Darstellungsformen haben ihre Nachteile: Zum Beispiel lassen sich in der expliziten Darstellung nicht alle Kurven beschreiben (z.B ein Kreis in der x-y-Ebene), während die implizite Darstellung teils schwer auszuwerten ist und keine definierte Richtung hat. Aus diesen Gründen wird in der Praxis üblicherweise die **parametrische Darstellung** genutzt.

#### Parametrische Darstellung von Kurven

Die parametrische Darstellung führt einen zusätzlichen Parameter $t$ in die Kurvendefinition ein. Dieses $t$ beschreibt den Verlauf der Kurve und liegt üblicherweise zwischen $0$ und $1$. Die Kurve wird dann über eine Funktion pro Koordinate beschrieben, die den Verlauf der jeweiligen Koordinate in Abhängigkeit von $t$ beschreibt.

$$C=\{\left( \begin{array}{c}x\\ y\\ z\end{array}\right)\in \mathbb{R}^3\,|\, \exists t \in [a,b]\subset \mathbb{R}: 
\begin{array}{c}
    x = c_x(t),\\
    y = c_y(t),\\
    z = c_z(t)\,\,
\end{array}\}
$$
Die Funktionen $c_i$ lassen sich zu einer einzelnen Funktion $c(t) = \left(\begin{array}{c}c_x(t)\\ c_y(t) \\ c_z(t)\end{array}\right)$ kombinieren und die Kurve damit als $C=\{c(t)\in \mathbb{R}^3\,|\, t \in [a,b]\subset \mathbb{R}\}$ beschreiben. Oft wird die Kurve $C$ auch direkt mit der Funktion $c$ gleichgesetzt.

Durch den Parameter $t$ lässt sich jetzt eindeutig ein Start und Ende der Kurve (bei $t=0$ bzw. $t=1$) sowie ihre Richtung definieren. Das ermöglicht (effiziente) Analysen von Biegungs- und Stetigkeitseigenschaften.

 Wir können nun auch einfach die Ableitung einer Kurve definieren, nämlich als Ableitung der Funktion $c$ nach $t$, die sich zusammensetzt aus den Ableitungen der einzelnen Komponenten:
$$c'(t) = \left( 
\begin{array}{c}
    c_x'(t)\\
    c_y'(t)\\
    c_z'(t)
\end{array}\right)
$$

Die parametrische Darstellung lässt sich folgendermaßen anschaulich vorstellen: Wenn man die Kurve von Anfang bis Ende zeichnen würde, beschreibt die Funktion $c$ an welchem Punkt der Stift zum Zeitpunkt $t$ aufgesetzt ist. Für zweidimensionale Kurven kannst du das hier einmal ausprobieren:

(A/D, um $t$ zu vergrößern/verkleinern, oder in der progress bar ziehen)

<canvas id="demo1" resize></canvas>TODO: make size-independent
<img hidden="true" id="curve_hint" src="./curve_hint.png">

Um weitere Analysen durchführen zu können, ohne zahlreiche Spezialfälle betrachten zu müssen, wird oft gefordert, dass eine Kurve **regulär** ist. Das bedeutet, dass die Ableitung der Kurve für alle $t$ definiert und nicht $0$ ist -- die Kurve stoppt also nie oder dreht abrupt um.

#### Längenbestimmung von Kurven

Für verschiedene Anwendungen ist es relevant, die Länge einer Kurve zu kennen.\<citation needed\> Im Gegensatz zu z.B. einem Polygon, das aus einer begrenzten Menge an Liniensegmenten besteht, und dessen Umfang leicht durch Aufsummieren bestimmt werden kann, benötigen wir für die kontinuierlich definierten Kurven einen anderen Weg, die Länge zu bestimmen.
Wenn wir eine Kurve gegeben haben und deren Länge bestimmen möchten, können wir folgendermaßen vorgehen: Wir wählen zunächst eine **Menge von Samplepunkten** auf der Kurve und verbinden diese durch **gerade Linien**. Die Länge dieser Linien können wir dann messen und aufsummieren, um eine Annäherung der Länge der Kurve zu erhalten. Diese Annäherung ist besser, je mehr die Linien zwischen den Samples der Kurve an dieser Stelle ähneln. In der Regel werden die Ergebnisse deshalb besser, **je mehr Samplepunkte** gewählt werden. In der folgenden Demo könnt ihr erkennen, wie gut die Annäherung durch mehr Samplepunkte wird:
<canvas id="demo2" resize></canvas>

Natürlich möchten wir nicht nur bei der Annäherung bleiben, sondern auch exakt die Länge einer Kurve ermitteln können. Dafür überlegen wir uns, was passiert, wenn wir den Abstand zwischen den Samplepunkten unendlich klein werden lassen: Die Länge eines solchen Liniensegments entspricht dann genau dem Betrag der Ableitung unserer Kurvenfunktion $c$!. Die Summe aller Ableitungswerte über den Verlauf der Kurve können wir dann mit dem Integral beschreiben.
Dadurch ergibt sich für die Länge einer regulären Kurve $c$, die für $t\in[a,b]$ definiert ist:
$$\int_a^b|c'(t)| dt$$

TODO: was ist mit unendlichen Kurven? sind die kein thing? zumindest theoretisch?
TODO: stetig differenzierbar = def auf den folien?
