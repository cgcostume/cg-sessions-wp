
### Implementierungsaspekte

#### Farben

Diese
* wie bekommen wir daraus Farben?
-> das ist erstmal nur intensität, die kann in farbberechnung eingebaut werden
-> einfacher phong shader
-> auf artefakte bei 90° hinweisen
->
* half vector -> gegenüberstellung

* implementierungsaspekte
-> pro objekt, primitiv, vertex, fragment
* invertiertes L -> was anderes? S?


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

<!--<iframe src="https://codesandbox.io/embed/amazing-sun-27mwhg?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;"
     title="amazing-sun-27mwhg"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     scrolling = "no"
   ></iframe>-->
