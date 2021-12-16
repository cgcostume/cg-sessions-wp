

### Motivation und Problemstellung

Bei der Bildsynthese von 2D Szenen kann der anzuzeigenden Ausschnitt, den es zu Rendern gilt, beispielsweise über ein Rechteck spezifiziert werden.
Dieses Rechteck, im Folgenden *viewport* (Sichtfenster) genannt, kann mittels Offset und Ausdehnung eindeutig definiert werden (siehe [WebGLRenderingContext.viewport](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport)):

``` typescript

// viewport(x: GLint, y: GLint, width: GLint, height: GLint);
gl.viewport(0, 0, 3840, 2160); // offset and extent in px

```

In dieser Einheit wollen wir untersuchen, wie für 3D Szenen in ähnlicher Weise zu rendernde Ausschnitte spezifiziert werden können.
Bei der Modellierung von 3D Szenen, werden typischerweise Geometrien (z.&thinsp;B. Gelände und Vegetation) und weitere Bestandteile wie Lichter und Audioquellen positioniert und räumlich zueinander angeordnet.
Nun liegt es nahe, für die Spezifikation des Renderingausschnittes, eine vergleichbar greifbare und nahbare Modellierung oder auch Metapher zu wählen: die **virtuelle Kamera**.

Bevor wir uns jedoch genauer mit der Umsetzung dieser Metapher beschäftigen, überlegen wir zunächst, was eine virtuelle Kamera ausmacht.
Welche Form der Parameterisierung ist geeignet, welche Effekte gilt es zu berücksichtigen und welche können oder müssen wir an dieser Stelle vorerst vernachlässigen.
Dazu wollen wir uns ein paar Aufnahmen einer Szene aus dem Spiel Portal 2 ansehen. 

> :brain: Welche Eigenschaften einer virtuellen Kamera kannst du aus den Bildern ableiten?

![third-person](portal-camera-thirdp.png?as=webp){.w-50}{.pe-1}{.mb-2}![first-person](portal-camera-firstp.png?as=webp){.w-50}{.ps-1}{.mb-2}
![third-person](portal-camera-bird.png?as=webp){.w-50}{.pe-1}![first-person](portal-camera-static.png?as=webp){.w-50}{.ps-1}
<!-- Ansicht aus der dritten Person (*Third-Person*) und eine Ansicht aus der ersten Person (*First-Person*). -->
<!-- Personenfokusierte Ansicht von Oben und eine schwenkbare Ansicht an einer festen Position. -->

Bevor du weiterscrollst,  überlege vorerst selbst, in welchen Eigenschaften sich die Kameras der gegebenen Ansichten unterscheiden. Du kannst dazu das folgende Notizfeld verwenden:

<textarea class = 'notes' rows = '8' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea>