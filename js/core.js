function init() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;
    camera.position.x = 35;

    renderBoard(scene);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
}

function renderBoard(scene) {
    const size = 10;

    const colors = [
        new THREE.MeshBasicMaterial({
            color: 0x333333,
        }),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
        })
    ];

    const geometry = new THREE.BoxGeometry(size, size, size);
    for (let j=0; j<8; j++) {
        for (let i=0; i<8; i++) {
            const box = new THREE.Mesh(geometry, colors[(i+j) % 2]);
            box.position.x = i * size;
            box.position.y = j * size;
            scene.add(box);
        }
    }

}

init();
