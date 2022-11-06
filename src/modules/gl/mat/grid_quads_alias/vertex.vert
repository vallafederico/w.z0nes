#define MPI 3.1415926538
#define MTAU 6.28318530718

attribute vec3 position;
attribute vec2 a_offset;
attribute vec4 a_id;
varying vec4 v_id;


uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main() {
  vec3 pos = position * 1.;

  // position
  pos.x += a_offset.x;
  pos.y += a_offset.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_id = a_id;
}
