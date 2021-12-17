
> Homogene Koordinaten für Perspektivische Verzerrung

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

Statt über eine Transformationsmatrix direkt die gewünschte Verzerrung zu erreichen, wollen wir die Koordinaten so transformieren, dass sie nach der Umwandlung in den $\mathbb{R}^{3}$-Raum korrekt verzerrt sind.
Dabei werden x- und y-Koordinate durch die Division korrekt in den NDC-Raum transformiert. 
Wir müssen uns zudem aber noch ansehen, wie die z-Koordinate transformiert werden soll.

Bisher liegt weiterhin $z=0$ bei der Kameraposition, $z=-k$ bei der Near-Plane und $z=-1$ bei der Far-Plane. 
Nach unserer Transformation soll jedoch $z=0$ bei der Near-Plane und $z=1$ bei der Far-Plane liegen.

| ![camera-model](./z-transformation.png?as=webp) |
| :--------------: |
| :jigsaw: Near und Far Clipping Plane |

Dies wird erreicht durch eine Verschiebung der z-Werte, sodass die Near-Plane im Ursprung liegt:

$$
    z'=z-k
$$

Freilich, skalieren wir die z-Koordinate so, dass Near- und Far-Plane exakt eine Einheit voneinander entfernt sind.
Die Division der z-Koordinate durch die bisherige Differenz von Near- und Far-Plane-Position liefert:

$$
    z''=(z-k)/(1-k)
$$

Diese Transformation kann durch folgende Matrix dargestellt werden:

$$
    P_{III}=\begin{pmatrix}
        1 & 0 & 0 & 0 \\
        0 & 1 & 0 & 0 \\
        0 & 0 & \frac{1}{1-k} & \frac{-k}{1-k} \\
        0 & 0 & -1 & 0 \\
    \end{pmatrix}
$$
Dadurch ergibt sich bei der Transformation der Koordinaten
$$
    \begin{pmatrix}
        1 & 0 & 0 & 0 \\
        0 & 1 & 0 & 0 \\
        0 & 0 & \frac{1}{1-k} & \frac{-k}{1-k} \\
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
        \frac{z-k}{1-k} \\
        -z \\
    \end{pmatrix}.
$$



#### Transformationsmatrix der gesamten Projektion

Durch Komposition der Teiltransformation ergibt sich folgende Transformation für die Projektion:

$$
    \begin{align}
        T_{V\rightarrow C}&=P_{III}P_{II}P_{I}\\
        &=\begin{pmatrix}
            1 & 0 & 0 & 0 \\
            0 & 1 & 0 & 0 \\
            0 & 0 & \frac{1}{1-k} & \frac{-k}{1-k} \\
            0 & 0 & -1 & 0 \\
        \end{pmatrix}
        \begin{pmatrix}
            \frac{1}{far} & 0 & 0 & 0 \\
            0 & \frac{1}{far} & 0 & 0 \\
            0 & 0 & \frac{1}{far} & 0 \\
            0 & 0 & 0 & 1 \\
        \end{pmatrix}
        \begin{pmatrix}
            \cot(\theta_x/2) & 0 & 0 & 0 \\
            0 & \cot(\theta_y/2) & 0 & 0 \\
            0 & 0 & 1 & 0 \\
            0 & 0 & 0 & 1 \\
        \end{pmatrix}
    \end{align}
$$
**Achtung** Bei der Umwandlung in nicht-homogene Koordinaten wird auch die z-Koordinate durch w, also durch z geteilt. Dadurch sind die z-Werte in ihrem Wertebereich nicht linear verteilt. Genaueres dazu wird in der Vorlesung zum z-Buffer behandelt.

**Welkoordinaten $\rightarrow$ Clip-Koordinaten**
Zusammengefasst werden die folgenden Transformationen angewandt, um vom Weltkoordinatensystem ins Clip-Koordinatensystem umzuwandeln:
1. **Translation** der Kameraposition in den Ursprung.
2. **Rotation**, sodass der up-Vektor die y-Achse und die Blickrichtung die z-Achse beschreiben.
3. **Skalierung** des Blickwinkels.
4. **Uniforme Skalierung**, um die Far-Clipping-Plane nach $z=1$ zu verschieben.
5. **Verschiebung** des z-Wertebereichs und Kopieren von $z$ in die **homogene Koordinate**.