
### Homogene Koordinaten für Perspektivische Verzerrung

Für die Projektion homogener Koordinaten zurück in den $\mathbb{R}^{3}$-Raum werden alle Koordinaten durch $w$ geteilt und die $w$-Koordinate anschließend vernachlässigt.
D.h., hier wird bereits eine Division durchgeführt, die wir womöglich nutzen könnten um eine tiefenbasierte Verzerrung der Geometrie zu erreichen...

Zur Erinnerung: 

$$
    H^{-1}:
    \begin{pmatrix}
        x \\
        y \\
        z \\
        w \\
    \end{pmatrix}
    \mapsto
    \begin{pmatrix}
        x/w \\
        y/w \\
        z/w \\
    \end{pmatrix}
$$

Statt über eine Transformationsmatrix direkt die gewünschte Verzerrung zu erreichen, sollen alle Koordinaten nach der Umwandlung in den $\mathbb{R}^{3}$-Raum korrekt verzerrt sein.
Dabei werden x- und y-Koordinate durch die Division korrekt in den NDC-Raum transformiert. 
Wir müssen uns zudem aber noch ansehen, wie die z-Koordinate transformiert werden soll.

Bisher liegt weiterhin $z=0$ bei der Kameraposition, $z=-k$ bei der Near-Plane und $z=-1$ bei der Far-Plane. 
Nach unserer Transformation soll jedoch $z=0$ bei der Near-Plane und $z=1$ bei der Far-Plane liegen.

| ![camera-model](../ph-secondary.png?as=webp) |
| :--------------: |
| :jigsaw: Near und Far Clipping Plane |

Dies wird erreicht durch eine Verschiebung der z-Werte, sodass die Near-Plane im Ursprung liegt:

$$
    z'=z+k
$$

Freilich, skalieren wir die z-Koordinate so, dass Near- und Far-Plane exakt eine Einheit voneinander entfernt sind.
Die Division der z-Koordinate durch die bisherige Differenz von Near- und Far-Plane-Position liefert:

$$
    z''=(z+k)/(k-1)
$$

Diese Transformation kann durch folgende Matrix dargestellt werden:

$$
    \begin{pmatrix}
        1 & 0 & 0 & 0 \\
        0 & 1 & 0 & 0 \\
        0 & 0 & \frac{1}{k-1} & \frac{k}{k-1} \\
        0 & 0 & -1 & 0 \\
    \end{pmatrix}
    \begin{pmatrix}
        x \\
        y \\
        z \\
        1 \\
    \end{pmatrix}
    =
    \begin{pmatrix}
        x \\
        y \\
        \frac{z+k}{k-1} \\
        -z \\
    \end{pmatrix}
$$
