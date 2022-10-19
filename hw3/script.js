"use strict";
let gl;
let tParameter = 0.0;
let tLoc;
let dt = 0.01;
let color = vec4(1.0,0.65,0.0,1.0);
//let vec4 color;
let Ucolor = vec4(1.0,0.65,0.0,1.0);
let Icolor = vec4(0.0,1.0,1.0,1.0);
let colorLoc;
let delay = 100;
let morph = true;
init();
function init()
{
    let canvas = document.getElementById(
"gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn'tavailable");

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width,
canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //  Load shaders and initializeattribute buffers
    let program = initShaders(gl,
"vertex-shader", "fragment-shader");
    gl.useProgram(program);
    let I = [
        vec2( -0.75 ,  0.75 ),
        vec2(  0.75 ,  0.75 ),
        vec2(  0.75 ,  0.50 ),
        vec2(  0.25 ,  0.50 ),
        vec2(  0.25 , -0.50 ),
        vec2(  0.75 , -0.50 ),
        vec2(  0.75 , -0.75 ),
        vec2( -0.75 , -0.75 ),
        vec2( -0.75 , -0.50 ),
        vec2( -0.25 , -0.50 ),
        vec2( -0.25 ,  0.50 ),
        vec2( -0.75 ,  0.50 ),
        vec2( -0.75 ,  0.75 )

];
    let U = [
        vec2( -0.75 ,  0.75 ),
        vec2( -0.38 ,  0.75 ),
        vec2( -0.38 , -0.38 ),
        vec2(  0.38 , -0.38 ),
        vec2(  0.38 ,  0.75 ),
        vec2(  0.75 ,  0.75 ),
        vec2(  0.75 ,  0.00 ),
        vec2(  0.75 , -0.38 ),
        vec2(  0.75 , -0.75 ),
        vec2( -0.75 , -0.75 ),
        vec2( -0.75 , -0.38 ),
        vec2( -0.75 ,  0.00 )
];
    // Load the I into the GPU
    let vBufferI = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,
vBufferI);
    gl.bufferData(gl.ARRAY_BUFFER,
flatten(I), gl.STATIC_DRAW);
    // Associate out shader letiables with our data buffer
    let ipositionLoc =gl.getAttribLocation( program,"iPosition");
    gl.vertexAttribPointer(ipositionLoc,
2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(ipositionLoc);
    // Load the U into the GPU
    let vBufferU = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,
vBufferU);
    gl.bufferData(gl.ARRAY_BUFFER,
flatten(U), gl.STATIC_DRAW);
    // Associate out shader letiables withour data buffer
    let upositionLoc =gl.getAttribLocation( program,"uPosition");
    gl.vertexAttribPointer(upositionLoc,
2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(upositionLoc);
    tLoc = gl.getUniformLocation( program,
"t" );
    colorLoc = gl.getUniformLocation(

program, "inColor" );
    // Initialize event handlers
document.getElementById("Morph").onclick =
function () {
        morph = !morph;
    };
    window.onkeydown = function(event) {
        let key =
String.fromCharCode(event.keyCode);
        switch(key) {
          case '1':
            morph = !morph;
            break;
          case '2':
            dt /= 2.0;
            break;
          case '3':
            dt *= 2.0;
            break;
} };
render(); };

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (morph) tParameter += dt;
    if (tParameter>=1.0 || tParameter<= 0.0)
dt = -dt;
    gl.uniform1f(tLoc, tParameter);
    color = mix(Icolor,Ucolor,tParameter);
    gl.uniform4fv(colorLoc, color);
    gl.drawArrays(gl.LINE_LOOP, 0, 12);
    setTimeout(
        function
(){requestAnimationFrame(render);}, delay
    );
}
