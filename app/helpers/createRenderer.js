export default function createRenderer() {
  const win = window;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    win.innerWidth / win.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(win.innerWidth, win.innerHeight);

  renderer.setSize(
    (win.innerWidth * win.devicePixelRatio) | 0,
    (win.innerHeight * win.devicePixelRatio) | 0,
    false
  );

  return { renderer, scene, camera };
}
