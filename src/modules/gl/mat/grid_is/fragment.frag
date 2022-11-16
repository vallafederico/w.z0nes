precision highp float;

uniform bool u_id_toggle;
uniform sampler2D u_tx;
// uniform vec3 u_cam;

varying vec2 v_uv;
varying vec4 v_color;
varying vec4 v_id;
varying float v_a_inOut;




void main() {
    // # pick
    if (u_id_toggle) {
        gl_FragColor = v_id;
        return;
    }

    vec4 img = texture2D(u_tx, v_uv);

    gl_FragColor.rgb = img.rgb;
    gl_FragColor.a = (1. - v_a_inOut) * img.a;
}
