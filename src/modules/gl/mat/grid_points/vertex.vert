#define MPI 3.1415926538
#define MTAU 6.28318530718

attribute vec2 position;
// attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float u_time;

varying vec3 v_normal;
varying vec2 v_uv;
// varying vec4 v_id;

void main() {
  vec3 pos = vec3(
    position.x, 
    position.y, 
    0.
  );

  gl_PointSize = 5.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_uv = vec2(0., 0.);
  // v_id = a_id;
}
