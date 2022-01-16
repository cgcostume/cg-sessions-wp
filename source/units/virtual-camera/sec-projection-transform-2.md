
Wir betrachten zunächst nur die obere Hälfte des Sichtvolumens, das wird uns später Rechnungen vereinfachen.

Angenommen, wir kennen also den Abstand der Projektionsebene von der Kamera. Wie ermitteln wir, wie groß ein Objekt mit Abstand $z_o$ auf der Projektionsebene erscheint? Gegeben sind dabei die Objektgröße o, der Abstand des Objekts $z$ und der Abstand der Projektionsebene $z_p$.

![camera-model](./strahlensatz1.png?as=webp){.w-75}

<textarea class = 'notes' rows = '8' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea> 

Wir wissen, dass die Objektgröße $o$ im Verhältnis zu $h_o$ genauso groß ist wie die projizierte Größe $\textit{proj}$ im Verhältnis zu $h_p$.
Demnach gilt 
$$
    \textit{proj}=\frac{o\cdot z_p}{z_o}.
$$

Relevant für uns ist weniger die absolute Größe der Projektion als die Größe der Projektion in Relation zur Projektionsfläche, deren Größe wir mit $h_p$ bezeichnet haben.
Wie zuvor festgestellt, entspricht das Verhältnis von $o$ zu $h_o$ dem Verhältnis von $\textit{proj}$ zu $h_p$, dem gesuchten Verhältnis:
$$
\frac{o}{h_o}=\frac{\textit{proj}}{h_p}
$$

![camera-model](./strahlensatz2.png?as=webp){.w-75}

Könnten wir also $h_o$ mit bekannten Größen beschreiben, hätten wir das gesuchte Verhältnis gefunden. Dabei können wir uns zunutze machen, dass über die Kameraparameter der Winkel $\alpha$ ebenfalls bekannt ist. Dieser entspricht der Hälfte des Sichtwinkels $\theta_y$ in y-Richtung. Damit können wir Beziehungen am rechtwinkligen Dreieck nutzen und erhalten$$
\tan{\alpha}=\tan{(\theta_y}/2)=\frac{h_o}{z_o}
$$ und damit $$
\frac{o}{h_o}=\frac{o}{\tan{(\theta_y}/2)\cdot z_o}.
$$

Wir haben damit also eine Formel, um die Größe eines Objektes in Relation zum Gesamtbild zu beschreiben. Die Skalierung ist dabei abhängig von dem Winkel der beiden Strahlen und von der Entfernung des Objektes. In x-Richtung, also für ein von oben betrachtetes Frustum, funktioniert die Herleitung analog mit $\theta_x$ statt $\theta_y$.

Wie können wir daraus nun eine geometrische Transformation ableiten?
Da wir die Objektgröße, die ja durch x- und y-Koordinate bestimmt ist, durch einen Wert teilen, liegt es nahe, eine Skalierung in x- und y-Richtung durchzuführen. Mit $\tan{(\theta_x}/2)$ bzw. $\tan{(\theta_y}/2)$ ist das ohne weiteres möglich, da diese Terme nicht von den skalierten Koordinaten abhängen. Ein erster Schritt unserer Transformation ist also die




#### **I**&ensp;Winkeländerung des Sichtvolumens (xy-Skalierung)

Durch Eintragen der zuvor berechneten Terme in die Transformationsmatrix erhalten wir
$$
    P_I =
    \begin{pmatrix}
        \frac{1}{\tan(\theta_x/2)} & 0 & 0 & 0 \\
        0 & \frac{1}{\tan(\theta_y/2)} & 0 & 0 \\
        0 & 0 & 1 & 0 \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix}=
    \begin{pmatrix}
        \cot(\theta_x/2) & 0 & 0 & 0 \\
        0 & \cot(\theta_y/2) & 0 & 0 \\
        0 & 0 & 1 & 0 \\
        0 & 0 & 0 & 1 \\
    \end{pmatrix}.
$$

Diese Transformation bewirkt, dass der Sichtwinkel auf 90° transformiert wird. Die Tiefe wird dabei nicht verändert.

![camera-model](./fov_scaling.png?as=webp){.w-75}




#### **II**&ensp;Skalierung des Sichtvolumens

Bevor wir uns mit der Umsetzung der tatsächlichen perspektivischen Verzerrung beschäftigen, müssen wir noch einen weiteren Aspekt berücksichtigen. Denn wie bereits zuvor erwähnt, sollen die Objekte der Szene nicht nur relativ zueinander korrekt skaliert sein, nach der Transformation sollen auch alle Koordinaten im Bereich $[-1, +1]$ liegen. Wir wollen also die gesamte Szene so skalieren, dass die far plane bei 1 liegt.

Die Proportionen sollen dabei erhalten bleiben. Das realisieren wir durch folgende Matrix:$$
                    P_{II}=\begin{pmatrix}
                        \frac{1}{far} & 0 & 0 & 0 \\
                        0 & \frac{1}{far} & 0 & 0 \\
                        0 & 0 & \frac{1}{far} & 0 \\
                        0 & 0 & 0 & 1 \\
                    \end{pmatrix}
$$




#### **III**&ensp;Perspektivische Transformation

Mit dieser Vorbereitung können wir endlich die tatsächliche perspektivische Verzerrung umsetzen.
Dafür müssen wir – wenn wir eine Transformationsmatrix verwenden wollen – homogene Koordinaten verwenden.

Wenn du dich sicher mit der Mathematik fühlst, kannst du versuchen, selbst herzuleiten, warum wir perspektivische Verzerrung nicht ohne homogene Koordinaten realisieren können. Ansonsten scrolle einfach weiter.
<textarea class = 'notes' rows = '8' placeholder = 'Mach Dir ein paar Notizen wenn du magst.'></textarea>

Die Begründung, warum wir homogene Koordinaten benötigen, lässt sich gut anschaulich darstellen. Ohne homogene Koordinaten können wir nur lineare Abbildungen vom $\mathbb{R}^3$ zum $\mathbb{R}^3$-Raum realisieren.

Diese müssen für alle $\lambda\in \mathbb{R},a\in \mathbb{R}^3$ die Eigenschaft $f\left(\lambda a\right)=\lambda f\left(a\right)$ erfüllen. Sehen wir uns den folgenden Vektor an, der zu einer Kante des Frustums verläuft.

|![camera-model](./homogenous1.png?as=webp){.w-75}{.text-middle}|
| :--------------: |


Durch die Anwendung der perspektivischen Projektion wird das pyramidenförmige Frustum zu einem Quader verzerrt. Das Ergebnis sieht folgendermaßen aus:

| ![camera-model](./homogenous2.png?as=webp){.w-75}{.text-middle} |
| :--------------: |

Offensichtlich gilt dabei $f\left(2a\right)\neq2f\left(a\right)$, damit ist die perspektivische Verzerrung keine lineare Abbildung für den $\mathbb{R}^3$.

Doch im Gegensatz zur Translation wird die perspektivische Verzerrung nicht auf einmal linear, wenn wir sie mit den homogenen Koordinaten in den $\mathbb{R}^4$ erweitern. Das lässt sich am besten damit anschaulich erklären, dass mit Matrixmultiplikation nur Multiplikation mit den Koordinaten und Addition der Ergebnisse erlaubt, Dividieren durch eine Koordinate ist also nicht möglich. Wie können wir diese Transformation dann mittels homogener Koordinaten umsetzen?
