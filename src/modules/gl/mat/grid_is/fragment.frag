precision highp float;

uniform bool u_id_toggle;

varying vec2 v_uv;
varying vec4 v_color;
varying vec4 v_id;



void main() {
    // # pick
    if (u_id_toggle) {
        gl_FragColor = v_id;
        return;
    }

    gl_FragColor.rgb = vec3(v_id.rgb);
    gl_FragColor.a = 1.0;
}
