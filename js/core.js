const size = 10;


function init() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;
    camera.position.x = 35;
    camera.position.y = -50;
    camera.lookAt(new THREE.Vector3(35, 60, 0));

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position = camera.position;
    scene.add(light);

    renderBoard(scene);

    for(let i in moves) {
        renderLayer(scene, moves[i], Number(i)+1);
    }

    //const renderer = new THREE.WebGLRenderer();

    // See: view-source:https://threejs.org/examples/raytracing_sandbox.html
    const renderer = new THREE.RaytracingRenderer( {
        workers: 4,
        workerPath: 'js/RaytracingWorker.js',
        randomize: true,
        blockSize: 64
    });
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
}

function renderBoard(scene) {
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

function renderLayer(scene, state, elevation) {
    const colors = [
        new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.1}),
        new THREE.MeshBasicMaterial({color: 0x0000dd, transparent: true, opacity: 0.6}),
        new THREE.MeshBasicMaterial({color: 0xdd0000, transparent: true, opacity: 0.6})
    ];

    const geometry = new THREE.BoxGeometry(size, size, size);
    for (let j=0; j<8; j++) {
        for (let i=0; i<8; i++) {
            const s = state[i][j];
            //if (s == 0) continue;

            const box = new THREE.Mesh(geometry, colors[s]);
            box.position.x = i * size;
            box.position.y = j * size;
            box.position.z = elevation * size;
            scene.add(box);
        }
    }
}

init();
