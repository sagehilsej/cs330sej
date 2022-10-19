var canvas;
var gl;

var positions;

var numTimesToSubdivide = 0;

var bufferId;

init();

function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three positions.


    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 6), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    document.getElementById("slider").onchange = function (event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
    };


    render();
};

function triangle(a, b) {
    positions.push(a, b);
}

function makeTriangle(a, b, count) {

    // check for end of recursion

    if (count == 0) {
        triangle(a, b);
    } else {

        //bisect the sides
        var sqrt3d2 = 0.87;
        var pos1 = mix(a, b, 0.33);
        var pos2 = mix(a, b, 0.67);
        // alert(pos1)

        // var ab = mix(a, b, 0.5);
        // var ac = mix(a, c, 0.5);
        // var bc = mix(b, c, 0.5);

        var len = pos2[0] - pos1[0];
        var top = vec2(pos1[0] + len / 2, len * sqrt3d2);
        --count;

        // alert(top)



        // three new triangles

        makeTriangle(a, pos1, count);
        positions.push(top);


        makeTriangle(pos2, b, count)


    }
}

function render() {
    var vertices = [
        vec2(-1.00, 0.00),

        vec2(1.00, 0.00)
    ];

    positions = [];
    makeTriangle(vertices[0], vertices[1],
        numTimesToSubdivide);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, positions.length);
    positions = [];
}