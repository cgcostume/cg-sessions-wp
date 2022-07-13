
### Implementierungsaspekte
Diese Überlegungen  bilden die Theorie hinter grundlegenden Beleuchtungstechniken.
Für die Implementierung sind noch weitere Aspekte zu beachten, die wir im folgenden beleuchten wollen.

#### Farben

Bisher war lediglich von Lichtintensitäten die Rede – doch wenn wir Objekte nicht nur in Graustufen darstellen wollen, benötigen wir eine 
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

<div class="col">
    <canvas class="embed-responsive-item w-100" id="canvas"></canvas>
</div>


<script>
var canvas, context, controller, gl, renderer;

class LightingExample extends gloperate.Renderer {

    _defaultFBO; 	// : gloperate:DefaultFramebuffer (inherits gloperate.Framebuffer)
    
    _camera; 		// : gloperate.Camera
    _navigation; 	// : gloperate.Navigation

    _cube;		// : Float32Array
    _cubeBuffer;  // : WebGLBuffer
    _cubeProgram;	// : gloeprate.Program;

    _uEye;

    onInitialize(context, callback, eventProvider) {

        this._defaultFBO = new gloperate.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();


        // setup point rendering

        // refer to https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer for more information

        // >> CHANGE POINT POSITIONS, COLORS, AND SIZES HERE:

        this._cube = new Float32Array([ // x, y, z, r, g, b
            -1.0, +1.0, +1.0,  0.0, 1.0, 1.0,//1
            +1.0, +1.0, +1.0,  1.0, 1.0, 1.0,//2
            -1.0, -1.0, +1.0,  0.0, 0.0, 1.0,//3
            +1.0, -1.0, +1.0,  1.0, 0.0, 1.0,//4
            +1.0, -1.0, -1.0,  1.0, 0.0, 0.0,//5
            +1.0, +1.0, +1.0,  1.0, 1.0, 1.0,//2
            +1.0, +1.0, -1.0,  1.0, 1.0, 0.0,//6
            -1.0, +1.0, +1.0,  0.0, 1.0, 1.0,//1
            -1.0, +1.0, -1.0,  0.0, 1.0, 0.0,//7
            -1.0, -1.0, +1.0,  0.0, 0.0, 1.0,//3
            -1.0, -1.0, -1.0,  0.0, 0.0, 0.0,//8
            +1.0, -1.0, -1.0,  1.0, 0.0, 0.0,//5
            -1.0, +1.0, -1.0,  0.0, 1.0, 0.0,//7
            +1.0, +1.0, -1.0,  1.0, 1.0, 0.0,//6
            ]);

        // would be better to use gloperate.Buffer (VBOs) but requires more knowledge ...

        this._cubeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._cubeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._cube, gl.STATIC_DRAW);

        { 
            var vert = new gloperate.Shader(context, gl.VERTEX_SHADER, 'point.vert');
            vert.initialize(`
                precision lowp float;

                layout(location = 0) in vec3 a_vertex;
                layout(location = 1) in vec3 a_color;

                uniform mat4 u_viewProjection;

                out vec4 v_color;
                out vec4 v_position;

                void main()
                {
                    v_color = vec4(a_color, 1.0);

                    gl_Position = u_viewProjection * vec4(a_vertex * 0.75, 1.0);
                    v_position = vec4(a_vertex, 1.0);
                }
                `);
            
            var frag = new gloperate.Shader(context, gl.FRAGMENT_SHADER, 'point.frag');
            frag.initialize(`
                precision lowp float;

                layout(location = 0) out vec4 fragColor;
                uniform vec3 u_eye;

                in vec4 v_color;
                in vec4 v_position;

                vec3 computeNormalFromPosition(in vec3 position) {

                vec3 N = position;

                if(abs(N.y) < abs(N.z) && abs(N.x) < abs(N.z)) {
                  N = vec3(0.0, 0.0, sign(N.z));
                }
                else if(abs(N.x) < abs(N.y) && abs(N.z) < abs(N.y)) {
                  N = vec3(0.0, sign(N.y), 0.0);
                }
                else if(abs(N.y) < abs(N.x) && abs(N.z) < abs(N.x)) {
                  N = vec3(sign(N.x), 0.0, 0.0);
                }

                /* NVIDIA QUADRO WORKAROUNDS (WS: Pleasers) */
                // return (floor(abs(N) + vec3(2.0)) - vec3(2.0)) * sign(N);
                // return (round(abs(N) - vec3(0.4999))) * sign(N);
                
                return floor(abs(N)) * sign(N);
                return normalize(position);
                }

                const float PI = 3.1415926535897932384626433832795;
                const float DEG2RAD = PI / 180.0;
                
                vec3 phong(in vec3 lightPosition, in vec4 lightColor, in vec3 position, in vec3 normal, in vec3 eye) {

                    // all of the following light computations are done in World Space

                    float intensity = 0.0;
                    float specular = 0.4;
                    float shininess = 32.0;

                    vec3 N = normalize(normal); 
                    vec3 L = normalize(lightPosition - position); // surface position to light
                    vec3 E = normalize(eye - position); // surface position to camera.eye  
                    vec3 R = reflect(-L, N);
                    vec3 H = normalize(L + E);

                    float NdotL = max(dot(N, L), 0.0); // lambert
                    float EdotN = max(dot(E, N), 0.0);
                    float EdotR = max(dot(E, R), 0.0);
                    float NdotH = max(dot(N, H), 0.0);
                    float LdotE = max(dot(L, E), 0.0);

                    float diffuse = NdotL;
                        specular = max(0.0, pow(NdotH, shininess)); // blinn-phong
                    vec3 result = (specular + diffuse*0.5) * lightColor.rgb * lightColor.w;
                    return result;

                }

                void main(void)
                {
                    fragColor = vec4(0.1,0.1,0.1,1.0);
                    vec3 lightPos = vec3(1.0,0.5,-1.5);
                    vec3 light = phong(lightPos, vec4(0.5,1.0,0.8,1.0),v_position.xyz, computeNormalFromPosition(v_position.xyz),u_eye);
                    fragColor += vec4(light.xyz,1.0);// vec4(computeNormalFromPosition(v_position.xyz)*0.5+0.5,0.0);//v_color;
                    lightPos = vec3(1.0,4.5,5.5);
                    light = phong(lightPos, vec4(1.0,0.5,0.8,1.0),v_position.xyz, computeNormalFromPosition(v_position.xyz),u_eye);
                    fragColor += vec4(light.xyz,0.0);// vec4(computeNormalFromPosition(v_position.xyz)*0.5+0.5,1.0);//v_color;
                    lightPos = vec3(4.5,1.0,5.5);
                    light = phong(lightPos, vec4(1.0,0.8,0.5,1.0),v_position.xyz, computeNormalFromPosition(v_position.xyz),u_eye);
                    fragColor += vec4(light.xyz,0.0);// vec4(computeNormalFromPosition(v_position.xyz)*0.5+0.5,1.0);//v_color;
                }
                `);

            this._cubeProgram = new gloperate.Program(context, 'PointProgram');
            this._cubeProgram.initialize([vert, frag], false);

            this._cubeProgram.link();
            this._cubeProgram.bind();

            this._cubeProgram.attribute('a_vertex', 0);
            this._cubeProgram.attribute('a_color', 1);
        }

        this._camera = new gloperate.Camera();
        this._camera.center = gloperate.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gloperate.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gloperate.vec3.fromValues(0.0, 0.0, 4.0);
        this._camera.near = 0.1;
        this._camera.far = 16.0;

        this._navigation = new gloperate.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._navigation.onWheel = ()=>0;

        
        this._uEye = this._cubeProgram.uniform("u_eye");



        return true;
    }

    onUninitialize() {
        super.uninitialize();

        this._defaultFBO.uninitialize();

        gl.deleteBuffer(this._cubeBuffer);
        this._cubeProgram.uninitialize();
    }

    onDiscarded() { 
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
    }

    onUpdate() { 
        this._navigation.update();

        return this._altered.any || this._camera.altered; // update only on change
        // return true; // continuous rendering
    }

    onPrepare() { 
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._camera.viewport = this._canvasSize;
        }

        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }

        this._altered.reset();
        this._camera.altered = false;
        
        this._clearColor=[0,0,0,0];
        this._defaultFBO.clearColor(this._clearColor);
    }

    onFrame() {
    
        // clear previous rendering

        this._defaultFBO.bind(); 
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);

        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);

        gl.enable(gl.DEPTH_TEST);

        // render cube

        this._cubeProgram.bind();
        gl.uniformMatrix4fv(this._cubeProgram.uniform('u_viewProjection'), 
            gl.GL_FALSE, this._camera.viewProjection);
        gl.uniform3fv(this._uEye, this._camera.eye);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._cubeBuffer);

        // refer to https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer for more information

        let stride = 6 * Float32Array.BYTES_PER_ELEMENT;
        gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, stride, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, stride, 3 * Float32Array.BYTES_PER_ELEMENT);	    
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this._cube.length / 6);
        gl.bindBuffer(gl.ARRAY_BUFFER, gloperate.Buffer.DEFAULT_BUFFER);

        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);

        this._cubeProgram.unbind();

        // render more ...
    }

    onSwap() { }

}


function initialize() {

    var canvasElement = document.getElementById('canvas');
    canvas = new gloperate.Canvas(canvasElement, {
        alpha: true, antialias: true, depth: true, failIfMajorPerformanceCaveat: false,
        premultipliedAlpha: false, preserveDrawingBuffer: false, stencil: false,
    });

    var blocker = new gloperate.viewer.EventBlocker(canvas.element);
    blocker.block('contextmenu');

    canvasElement.addEventListener('click', (event) => {
        if (event.ctrlKey) { gloperate.viewer.Fullscreen.toggle(canvasElement); }
    });

    context = canvas.context;
    controller = canvas.controller;
    gl = canvas.context.gl;

    renderer = new LightingExample();
    canvas.renderer = renderer;
}

window.onload = function () {
    initialize();
}

</script>


