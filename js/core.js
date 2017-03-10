function init() {
    const size = 10;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;
    camera.position.x = size * 3.5;

    const geometry = new THREE.BoxGeometry(size, size, size);

    let materials = {
        black: new THREE.MeshBasicMaterial({
            color: 0x333333,
        }),
        white: new THREE.MeshBasicMaterial({
            color: 0xffffff,
        })
    }
    const material = materials.white;
    for (let j=0; j<8; j++) {
        for (let i=0; i<8; i++) {
            const box = new THREE.Mesh(geometry, material);
            box.position.x = i * size;
            box.position.y = j * size;
            scene.add(box);
        }
    }

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
}

init();
