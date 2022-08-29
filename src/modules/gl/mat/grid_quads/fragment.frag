precision highp float;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_state;

// varying vec4 v_id;



void main() {

    gl_FragColor.rgb = vec3(v_uv, v_state);
    gl_FragColor.a = 1.0;
}
