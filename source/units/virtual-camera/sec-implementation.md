
### Umsetzung und Mathematisches Modell

**Ziel:** Die virtuelle Kamera soll genutzt werden, um die Weltkoordinaten der Szenegeometrie derart zu transformieren, dass im Viewport alle von der Kamera sichtbaren Geometrien abgebildet und (im Falle einer Perspektivischen Projektion) perspektivisch verzerrt sind.
Die Fragmentprozessierung während des Renderings soll dabei nur auf Fragmenten rasterisierter Szeneobjekten erfolgen, die auch tatsächlich im gerenderten Bild auftauchen &ndash; also Objekte verwerfen, die über oder hinter der Kamera liegen, oder zu weit weg sind.

![camera-model](./coordinates-sketch-trimmed.png?as=webp){.img-fluid}

Koordinatenräume und entsprechende Transforms für ein Rendering mit virtueller Kamera.{.text-center}{.text-small}

Rasterisiert und anschließend mittels Fragment-Shader prozessiert werden nur Dreiecke, bei denen mindestens ein Vertex nach den vorherigen Renderingstufen (z.&thinsp;B. Vertexprozessierung mittels Vertex-Shader) im Intervall $[-1,+1]$ liegt. 
Zur Erinnerung, die Positionierung der Vertices erfolgt im Normalfall über die Zuweisung einer **homogenen** Koordinate auf `gl_Position` im Vertex-Shader:

``` glsl
attribute vec3 a_position; // attribute that receives data from a vertex buffer

void main() {
    gl_Position = T * vec4(a_position, 1.0);
}
```

Die $x$ und $y$ Koordinaten beschreiben die zweidimensionale Position in einem sogenannten **Clip Space**, die $z$-Koordinate die Tiefe.
Im Fragment-Shader liegen die Koordinaten danach als **nicht-homogene**, **normalisierte Gerätekoordinaten** vor (**Normalized Device Coordinates**, kurz **NDC**), die Fragmente sind über `gl_FragCoord` in Fensterkoordinaten (**Screen Space**)  in Pixel verfügbar.

Wie lassen sich Weltkoordinaten mithilfe der virtuellen Kamera in **Clip Space**, **NDC** und **Screen Space** überführen? Und wie kann man diese Transformationen definieren und implementieren?


> :brain: Schauen wir uns dazu die üblichen Koordinatenräume an!

| ![camera-model](../ph-secondary.png?as=webp) |
| :--------------: |
| :jigsaw: Koordinatenräume |

Über die folgende Sequenz von Transformationen lassen sich Modellkoordinaten in Bildschirmkoordinaten überführen:


$T_{L\rightarrow{}W}$<br><small>von Modellkoordinaten<br>zu Weltkoordinaten</small>{.text-muted}
: Vertices sind meist im lokalen Koordinatensystem des Objektes, zu dem sie gehören, gegeben. Das Modell eines Hauses beispielsweise wird, womöglich mehrfach in einer Szene, an verschiedenen Orten instanziiert. Dabei wird beispielsweise die Position des Dachs in Relation zum Rest des Hauses beschrieben und nicht als globale Position in der Szene.  Die Transformation von Modellkoordinaten ($L$) in Weltkoordinaten ($W$) ist nicht Bestandteil der Kameratransformation und hier nicht weiter ausgeführt.

---

$T_{W\rightarrow{}V}$<br><small>von Weltkoordinaten<br>zu Kamerakoordinaten</small>
: Ziel ist es, die Szene aus Sicht der Kamera darzustellen. Dazu müssen als erstes alle Positionen in Relation zur Kamera angegeben werden. Dies wird erreicht durch die Transformation der Weltkoordinaten ($W$) in Kamera- oder auch Sichtkoordinaten (View, $V$).

$T_{V\rightarrow{}C}$<br><small>von Kamerakoordinaten<br>zu Clip-Koordinaten</small>
: In diesem Schritt erfolgt die perspektivische Transformation. Dabei werden u.&thinsp;a. Sichtwinkel und Clippingebenen mit einbezogen. Nach dieser Transformation liegen alle Koordinaten im *Clip Space* ($C$), welcher dem Sichtvolumens der Kamera entspricht. Alle Objekte bzw. deren Dreiecke die ausserhalb dieses Volumens liegen, werden verworfen (*clipping*). 


$T_{C\rightarrow{}\textit{NDC}}$<br><small>von Clip-Koordinaten<br>zu norm. Gerätekoord.</small>
: Hier werden die homogenen Koordinaten wieder in Koordinaten im $\mathbb{R}^3$ umgewandelt und liegen schließlich mit allen Komponenten in $[-1,+1]$.

---

$T_{\textit{NDC}\rightarrow{}S}$<br><small>von norm. Gerätekoord.<br>zu Bildschirmkoordinaten</small>{.text-muted}
: Abschließende Abbildung in das Bildkoordinatensystem, definiert durch Position, Breite und Höhe eines Sichtfensters in Pixeln (`gl.viewport`).

Diese Transformationen können jeweils mithilfe [linearer Abbildungen](https://www.youtube.com/watch?v=YDDQE45PZLs) ausgedrückt werden.
Im folgenden wollen wir die Transformationen $T_{W\rightarrow{}V}$, $T_{V\rightarrow{}C}$ und $T_{C\rightarrow{}\textit{NDC}}$ herleiten.
