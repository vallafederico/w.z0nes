#define MPI 3.1415926538
#define MTAU 6.28318530718

attribute vec3 position;
attribute vec2 uv;
attribute vec2 a_pos;
attribute vec2 a_rand;
attribute vec4 a_id;
varying vec4 v_id;

uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float u_a_inOut;


uniform float u_time;

varying vec2 v_uv;
varying float v_a_inOut;
// varying vec4 v_id;

void main() {
  vec3 pos = vec3(
    (position.x + a_pos.x + a_rand.x - .5), 
    (position.y + a_pos.y + a_rand.y - .5) , 
    0.03
  );

  // // size
  // vec4 mPos = modelMatrix * vec4(pos, 1.0);
  // vec4 mvPos = viewMatrix * mPos;


  // gl_PointSize = 1000. * (1. - u_a_inOut) / length(mvPos.xyz) ;
  // gl_PointSize = 22.;

  // gl_PointSize = 5.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_uv = uv;
  v_id = a_id;
  v_a_inOut = u_a_inOut;
}
