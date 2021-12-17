
### Modell einer virtuellen Kamera

Folgende Parameter haben einen maßgeblichen Einfluss auf die Aufnahme einer Kamera:

Kamerastandpunkt<br><small class = 'text-muted'>View Position</small>
: Der Standpunkt der Kamera bestimmt die genaue Position, von der aus die Szene abgebildet wird. Bei einer First-Person-Ansicht wäre das z.&thinsp;B. die Kopfmitte des gesteuerten Charakters, bei einer Vogelperspektive ein Punkt über dem Geschehen.

Kamerablickrichtung<br><small class = 'text-muted'>View Direction</small>
: Die Blickrichtung der Kamera legt fest, in welche Richtung die Kamera gedreht ist. Sie legt den Mittelpunkt der Aufnahme fest.
          
Sichtwinkel<br><small class = 'text-muted'>Field of View</small>
: Der Sichtwinkel beschreibt die Größe des Sichtfeldes in vertikaler und horizontaler Richtung. Er wird meist als vertikaler Öffnungswinkel angegeben. Der horizontale Öffnungswinkel wird nicht explizit spezifiziert, sondern mithilfe des Seitenverhältnisses ermittelt.

Seitenverhältnis<br><small class = 'text-muted'>Aspect Ratio</small>
: Das Seitenverhältnis beschreibt das Verhältnis von Breite zu Höhe des durch die Kamera erzeugten, rechteckigen Bildes.

Aufwärtsrichtung<br><small class = 'text-muted'>Up Direction</small>
: Die Aufwärtsrichtung beschreibt, in welcher Richtung aus Sicht der Kamera  &bdquo;oben&rdquo; ist?

Die Kamerablickrichtung kann auch implizit durch ein Sichtzentrum festgelegt werden. Dabei wird eine Position beschrieben, zu der vom Kamerastandpunkt aus geschaut werden soll. Aus einem Kamerastandpunkt (**eye**) und einem Sichtzentrum (**center**) lässt sich die Kamerablickrichtung einfach ermitteln. 

Neben diesen Eigenschaften, gibt es noch zwei weitere Parameter, die sich nicht ohne weiteres in den Abbildungen erkennen lassen:


Clippingebenen<br><small class = 'text-muted'>Clipping Planes</small>
: Die Clipping Planes, *Near Plane* und *Far Plane*, beschreiben ab bzw. bis zu welcher Tiefe (dem Abstand zur Kamera) Objekte gerendert werden. Das kann unter anderem dazu verwendet werden, Objekte außerhalb dieses Intervalls früh im Renderingprozess zu verwerfen und dadurch den nötigen Aufwand deutlich zu verringern.


| ![camera-model](./cameramodel.PNG?as=webp) |
| :--------------: |
| :jigsaw: Illustration des Kameramodells|

Unser Modell der virtuellen Kamera soll also eine 3D-Szene aus einer bestimmten Perspektive darstellen und die dafür nötigen geometrischen Transformationen beinhalten.

> :jigsaw: ToDo: Einschub Kameramodelle (first person etc.) 

Bei &bdquo;realen&rdquo;, physischen Kameras gibt weitere Parameter die vorrangig durch die Wahl des Objektivs bestimmt werden und beispielsweise die Beleuchtung oder Schärfe einer Aufnahme bedingen. Derartige Parameter sind vorerst nicht Teil unserer virtuellen Kamera. Wir schließen dazu u.&thinsp;A. folgende Parameter vorerst aus:

- Brennweite einer Linse (z.&thinsp;B. um Tiefenunschärfe zu erzeugen)
- Krümmungen einer Linse, also Verzerrung die durch die Linsenform entstehen
- Chromatische und Sphärische Aberrationen
- Vignettierungen
- Verschlusszeit und Lichtstärke (maximale Blendenöffnung)
- Optische Auflösung (vergleichbar mit der Renderingauflösung)
- ...

Die Einflüsse dieser Parameter auf das Renderingergebnis können häufig durch geeignetes Post-Processing angenähert werden. Dies ist jedoch nicht Teil dieser Lehreinheit. Für weitere Informationen zu Linseneffekten und den physikalischen Grundlagen von Kameras empfehlen wir [Cameras and Lenses, von Bartosz Ciechanowski](https://ciechanow.ski/cameras-and-lenses/).
