
### Umsetzung und Mathematisches Modell

**Ziel:** Die virtuelle Kamera soll genutzt werden, um die Weltkoordinaten der Szenegeometrie derart zu transformieren, dass im Viewport alle von der Kamera sichtbaren Geometrien abgebildet und (im Falle einer Perspektivischen Projektion) perspektivisch verzerrt sind.
Die Fragmentprozessierung während des Renderings soll dabei nur auf Fragmenten rasterisierter Szeneobjekten erfolgen, die auch tatsächlich im gerenderten Bild auftauchen &ndash; also Objekte verwirft, die über oder hinter der Kamera liegen, oder zu weit weg sind.

| ![camera-model](../ph-secondary.png?as=webp) |
| :--------------: |
| :jigsaw: Rendering Pipeline WebGL2 |

Rasterisiert und anschließend mittels Fragment-Shader prozessiert werden nur Dreiecke, deren Vertices nach den vorherigen Renderingstufen (z.&thinsp;B. Vertexprozessierung mittels Vertex-Shader) im Intervall $[-1,+1]$ liegen. 
Zur Erinnerung, die Positionierung der Vertices erfolgt im Normalfall über die Zuweisung einer **homogenen** Koordinate auf `gl_Position` im Vertex-Shader:

``` glsl
attribute vec3 a_position; // attribute that receives data from a vertex buffer

void main() {
    gl_Position = T * vec4(a_position, 1.0);
}
```

Die $x$ und $y$ Koordinaten beschreiben die zweidimensionale Position im **Clip Space**, die $z$-Koordinate die Tiefe.
Alle drei Werte werden in normalisierten Gerätekoordinaten erwartet (**Normalized Device Coordinates**, kurz *NDC*).

Unser Ziel ist demnach die Transformation der Koordinaten aller Objekte vom Weltkoordinatensystem in Normalized Device Coordinates über mehrere Zwischenschritte.
Über folgende Transformationen wollen wir unser Endergebnis erreichen:
