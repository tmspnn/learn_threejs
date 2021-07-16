THREE.Cache.enabled = true;

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
camera.position.set(0, 0, 1000);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const light = new THREE.DirectionalLight(0xff0000);
light.position.set(100, 100, 100).normalize();
scene.add(light);

const light1 = new THREE.DirectionalLight(0x00ffff);
light1.position.set(-100, 100, 100).normalize();
scene.add(light1);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

new THREE.FontLoader().load("FZLanTingHeiS-L-GB_Regular.json", (font) => {
    const color = 0xffffff;
    const group = new THREE.Group();
    group.position.y = 0;
    scene.add(group);

    textGeo = new THREE.TextGeometry("中文的3D渲染\n@ Three.js", {
        font: font,
        size: 60,
        height: 15,
        curveSegments: 4
    });

    textGeo.computeBoundingBox();

    const centerOffset =
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    materials = [
        new THREE.MeshPhongMaterial({ color, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color }) // side
    ];

    textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 0;
    textMesh1.position.z = 0;

    group.add(textMesh1);

    animate();

    document.body.appendChild(renderer.domElement);

    function animate() {
        camera.position.z += 4;

        if (camera.position.z > 1000) {
            camera.position.z = 0;
        }

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }
});
