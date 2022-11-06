precision highp float;

uniform sampler2D u_t1;
uniform sampler2D u_t2;

uniform float u_a_inOut;
uniform float u_state;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_state;
varying float v_rand;

// varying vec4 v_id;

void main() {

    // state based uvs
    vec2 state_uv = (v_uv * .5);
    state_uv.x += 1. - u_state;
    state_uv.y += .5;
    vec4 tx = texture2D(u_t1, state_uv);

    // random based uvs
    vec2 rand_uv = (v_uv * .5);
    rand_uv.x += .0;
    rand_uv.y += .5;
    vec4 alt_tx = texture2D(u_t2, rand_uv);

    // final mix
    vec4 final_tx = mix(tx, alt_tx, u_a_inOut);
    

    gl_FragColor.rgb = final_tx.rgb;
    // gl_FragColor.rgb = vec3(1., 0., 0.);
    gl_FragColor.a = 1.0;
}





/* Notes

UV POSITIONS
0., .5 -> FULL
.5, .5 -> WIP

0 | 1


RAND UV POSITION
0., .5 -> #0
.5, .5 -> #1


*/