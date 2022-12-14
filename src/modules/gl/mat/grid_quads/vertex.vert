#define MPI 3.1415926538
#define MTAU 6.28318530718

attribute vec3 position;
attribute vec2 uv;
attribute vec2 a_offset;
attribute float a_state;
attribute float a_rand;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float u_time;
uniform float u_a_visible;

varying vec2 v_uv;
varying float v_state;
varying float v_rand;
// varying vec4 v_id;

uniform vec3 u_data;

void main() {
  vec3 pos = position * u_a_visible;
  // pos.xy *= a_state; // test state

  // position
  // pos.x += u_data.x;
  // pos.y += u_data.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_uv = uv;
  // v_state = a_state;
  // v_rand = a_rand;
}
