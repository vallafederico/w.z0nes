precision highp float;

uniform bool u_id_toggle;
varying vec4 v_id;

void main() {
    // # pick
    if (u_id_toggle) {
        gl_FragColor = v_id;
        return;
    }

    return;
    // gl_FragColor.rgb = v_id.rgb;
    // gl_FragColor.a = 1.0;
}




