
### Projection Transform

Kamerakoordinaten 🡪 Clip-Koordinaten

Mit diesem Transformationsschritt wollen wir Perspektivische Projektion unter Beachtung von Blickwinkeln sowie near und far clipping plane realisieren.
Dafür müssen wir uns zunächst überlegen, wie sich perspektivische Verzerrung auf das Bild auswirkt und wie wir den Effekt mathematisch beschreiben können. Unsere Intuition sagt uns bereits, dass nähere Objekte größer erscheinen als weit entfernte Objekte.

Mit dem Strahlensatz können wir beschreiben, wie groß genau ein Objekt auf einer Projektionsebene erscheint.
