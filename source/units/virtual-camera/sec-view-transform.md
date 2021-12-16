
### View Transform 

**$T_{W\rightarrow{}V}$&ensp;|&ensp;Weltkoordinaten $\rightarrow$ Kamerakoordinaten**

Mit dieser Transformation soll die Szene so transformiert werden, dass sich die Kamera im Ursprung befindet und die z-Achse der Blickrichtung (look-to) entspricht, um damit die Szene aus Sicht der Kamera zu beschreiben. 

Welche Basistransformationen kannst du dafür mit welchen Parametern nutzen? Überlege dir, welche Schritte dafür nötig sind. Du kannst das folgende Feld für Notizen nutzen.
<textarea class = 'notes' rows = '8' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea> 

Wir wollen die Transformation aus zwei Teiltransformationen zusammensetzen:

(1) Der Translation des Kamerastandpunkts (eye) in den Koordinatenursprung und

(2) der Rotation in das Kamerakoordinatensystem.

| ![camera-model](./view-transform.png?as=webp) |
| :--------------: |
| :jigsaw: Illustration der View Transform |

Den Parameter für die Translation haben wir mit $-eye$ gegeben. Damit wird der Punkt $eye$ in den Koordinatenursprung verschoben.

Für die Rotation können wir ausnutzen, dass es sich um eine orthogonale Transformation handelt: Wir transformieren eine Orthonormalbasis (Aufwärtsvektor $up$, Kamerablickrichtung $look-to$ und das Kreuzprodukt der beiden $up\times look-to$) in eine andere (y-, z- und x-Achse). Damit gilt für diese Transformation $R$ und ihre Inverse $R^{-1}=R^T$, die Inverse entspricht also der transponierten Matrix.
Finden wir also eine Transformationsmatrix, die die x-, y- und z-Achse in ihre äquivalenten Achsen des Kamerakoordinatensystems rotiert, können wir daraus einfach deren Inverses rekonstruieren – dies entspricht dann genau der Matrix, die wir suchen.

Wie erhalten wir also eine solche Matrix? Versuche, sie dir herzuleiten. Bekannt ist, dass sie die y-Basis $\left(0,1,0\right)$ auf $up$ abbilden soll, die z-Basis $\left(0,0,\ 1\right)$ auf $look-to$ und die x-Basis $\left(1,0,0\right)$ auf $up\times look-to$.
<textarea class = 'notes' rows = '12' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea> 

Die erste Spalte der Matrix gibt an, worauf $\left(1,0,0,0\right)$ abgebildet wird, die zweite worauf $\left(0,1,0,0\right)$ abgebildet wird etc. Wir können unsere gegebenen Beziehungen also einfach einsetzen und erhalten unsere gesuchte Matrix. 

Seien $n=look\text{-}to$, $v=up$ und $u=n\times v$. Damit erhalten wir für $R^{-1}$:
$$
    R^{-1} =
    \begin{pmatrix}
        u_x & v_x & n_x & 0 \\
        u_y & v_y & n_y & 0 \\
        u_z & v_z & n_z & 0 \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix} = R^T
$$

Transponieren wir diese Matrix, erhalten wir also unsere gewünschte Rotationsmatrix:

$$
    R =
    \begin{pmatrix}
        u_x & v_x & n_x & 0 \\
        u_y & v_y & n_y & 0 \\
        u_z & v_z & n_z & 0 \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix}^T=
    \begin{pmatrix}
        u_x & u_y & u_z & 0 \\
        v_x & v_y & v_z & 0 \\
        n_x & n_y & n_z & 0 \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix}
$$

Die gesamte View Transform entspricht also folgender Matrix:

$$
    T_{W\rightarrow V} =
    \begin{pmatrix}
        u_x & u_y & u_z & 0 \\
        v_x & v_y & v_z & 0 \\
        n_x & n_y & n_z & 0 \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix}
    \begin{pmatrix}
        1 & 0 & 0 & -eye.x \\
        0 & 1 & 0 & -eye.y \\
        0 & 0 & 1 & -eye.z \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix}
$$
