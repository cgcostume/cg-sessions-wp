
### Implementierungsaspekte
Diese Überlegungen  bilden die Theorie hinter grundlegenden Beleuchtungstechniken.
Für die Implementierung sind noch weitere Aspekte zu beachten, die wir im folgenden beleuchten wollen.

#### Farben

Bisher war lediglich von Lichtintensitäten die Rede – doch wenn wir Objekte nicht nur in Graustufen darstellen wollen, benötigen wir eine Möglichkeit um aus Licht- und Objektfarbe sowie Intensitätsinformationen die resultierende sichtbare Farbe zu bestimmen.
Klassischerweise werden die Lichtintensität, die Objektfarbe und die Lichtfarbe durch Multiplikation zur resultierenden Gesamtfarbe kombiniert.



#### Half Vector

Die bisherige Berechnung der spekularen Reflexion im Phong-Beleuchtungsmodell ist vergleichsweise intuitiv, da direkt der Zusammenhang zwischen dem Winkel zwischen Reflexions- und Blickrichtung klar ist. Sie besitzt jedoch zum einen den Nachteil, dass sie relativ komplexe Berechnungen benötigt - allein um den Reflexionswinkel zu bestimmen, müssen zwei Skalarprodukte berechnet werden.
Zum anderen weichen die Ergebnisse teils noch von realitätsgetreuen Bildern ab.

Eine Technik, die diese Probleme adressiert, ist **Blinn-Phong-Beleuchtung**.
Hier wird die spekulare Beleuchtung anders berechet:
Statt jedes Mal den Reflexionsvektor zu bestimmen, um anschließend den Winkel zur Blickrichtung zu berechnen, wird stattdessen ein sogenannter Half-Vector $H$ verwendet.
Dieser liegt bei der Hälfte zwischen Lichtrichtung $L$ und Blickrichtung $V$ und kann dementsprechend mit $$H = \dfrac{L+V}{2}$$ bestimmt werden. Statt für $\alpha$ in der Spekularitätsberechnung den Winkel zwischen dem Reflexionsvektor und der Blickrichtung zu verwenden, wird für Blinn-Phong-Beleuchtung der Winkel zwischen Half-Vector und der Oberflächennormale genutzt.


In der folgenden Demo wird visualisiert, wie für verschiedene Licht- und Blickrichtungen in beiden Varianten der entsprechende Winkel und die daraus resultierende Helligkeit aussehen.

<div align="center" id = "canvasContainer" style = "position: relative; width:min(760px,100%)" width="760" height="340" >
    <svg class="zdog-canvas-half-vector" id="zdog-canvas-half-vector" width="760" height="340">
    <div id = "theta" style = "position:absolute; top: 0"><img src = "theta.png" width = 35></div>
    <div id = "alpha" style = "position:absolute; top: 0"><img src = "alpha.png" width = 30></div>
    <div id = "normal" style = "position:absolute; top: 0; font-weight: 900"><b>N</b></div>
    <div id = "light" style = "position:absolute; top: 0; font-weight: 900; color:#d62ea7"><b>L</b></div>
    <div id = "reflection" style = "position:absolute; top: 0; font-weight: 900; color:#d62ea7"><b>R</b></div>
    <div id = "view" style = "position:absolute; top: 0; font-weight: 900; color:#0ceedb"><b>V</b></div>
    <div id = "alphaLabel" style = "position:absolute; top: 0; font-weight: 700; color:#0ceedb"><img src = "alpha.png" width = 25> = <div id = "alphaValue" style = "display: inline; color:#ffffff">123</div>°</div>
</svg>
</div>

<div align="center" id = "canvasHalfVectorContainer" style = "position: relative; width:min(760px,100%)" width="760" height="340" >
    <svg class="zdog-canvas-half-vector2" id="zdog-canvas-half-vector2" width="760" height="340">
    <div id = "theta2" style = "position:absolute; top: 0"><img src = "theta.png" width = 35></div>
    <div id = "alpha2" style = "position:absolute; top: 0"><img src = "alpha.png" width = 30></div>
    <div id = "normal2" style = "position:absolute; top: 0; font-weight: 900"><b>N</b></div>
    <div id = "light2" style = "position:absolute; top: 0; font-weight: 900; color:#d62ea7"><b>L</b></div>
    <!--<div id = "reflection2" style = "position:absolute; top: 0; font-weight: 900; color:#d62ea7"><b>R</b></div>-->
    <div id = "view2" style = "position:absolute; top: 0; font-weight: 900; color:#0ceedb"><b>V</b></div>
    <div id = "halfVector" style = "position:absolute; top: 0; font-weight: 900; color:#06776b"><b>H</b></div>
    <div id = "alphaLabel2" style = "position:absolute; top: 0; font-weight: 700; color:#0ceedb"><img src = "alpha.png" width = 25> = <div id = "alphaValue2" style = "display: inline; color:#ffffff">123</div>°</div>
</svg>
</div>

Es ist zu erkennen, dass der Winkel bei Blinn-Phong immer halb so groß ist wie im Phong-Modell. Wer möchte, kann diesen Zusammenhang gerne für sich als Übung beweisen.


<!--<iframe src="https://codesandbox.io/embed/amazing-sun-27mwhg?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;"
     title="amazing-sun-27mwhg"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     scrolling = "no"
   ></iframe>-->
Die folgende Demo zeigt den Unterschied zwischen Phong-Beleuchtung und Blinn-Phong-Beleuchtung am Beispiel einer von drei verschiedenen Lichtquellen beleuchteten Kugel. Mit dem Slider kann zwischen Phong (links) und Blinn-Phong (rechts) gewechselt werden. Zu beachten ist, dass bei Blinn-Phong ein höherer Spekularitäts-Exponent verwendet wurde, um die Ergebnisse anzugleichen.
<div class="col">
    <canvas class="embed-responsive-item w-100" id="canvas"></canvas>
</div>


<div align="center">
    <svg class="zdog-slider" id="zdog-slider" width="760" height="100"></svg>
</div>

#### Gouraud Shading etc.
-> einfacher phong shader
-> auf artefakte bei 90° hinweisen
->
* half vector -> gegenüberstellung

* implementierungsaspekte
-> pro objekt, primitiv, vertex, fragment
* invertiertes L -> was anderes? S?
* bei phong demo max(0,dot) in die Helligkeitsvorschau einbauen