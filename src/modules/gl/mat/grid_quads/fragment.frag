precision highp float;

uniform sampler2D u_t1;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_state;

// varying vec4 v_id;



void main() {

    // state based uvs
    vec2 state_uv = (v_uv * .5);
    state_uv.x += 1. - v_state;
    state_uv.y += .5;


    vec4 img = texture2D(u_t1, state_uv);

    gl_FragColor.rgb = img.rgb;
    gl_FragColor.a = 1.0;
}





/* Notes

UV POSITIONS
0., .5 -> FULL
.5, .5 -> WIP

0 | 1

*/