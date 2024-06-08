import * as THREE from 'three';

const camera = createCamera();

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(500));
scene.add(createLight());

function createCubeBox() {
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x88aa00 } );
	const cube = new THREE.Mesh( geometry, material );
	return cube
}

function createCamera() {
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

	camera.position.set(10, 20, 30);
	camera.lookAt(0, 0, 0);
	
	camera.position.set(0, 0, 200);
	camera.lookAt(0, 0, 0);

	camera.position.set(30, 30, 30);
	camera.lookAt(0, 0, 0);

	return camera;
}

function createSphere() {
	const R = 100;//半径长度
	const angle = Math.PI/6;//30度
	const x = R * Math.cos(angle);
	const y = R * Math.sin(angle);
	const geometry = new THREE.SphereGeometry(2); 
	const material = new THREE.MeshLambertMaterial({color: 0x0000ff}); 
	const mesh = new THREE.Mesh(geometry, material); 
	mesh.position.set(x,y,0);
	return mesh;
}

function createLight() {	
	const pointLight = new THREE.PointLight(0xffffff, 1.0);
	pointLight.intensity = 10.0;//光照强度
	pointLight.decay = 0.0;//设置光源不随距离衰减
	pointLight.position.set(5, 5, 5);
	scene.add(pointLight);
}

function startAnimation() {
	function animate() {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	}
	animate();
}

function createSmallBallGroup() {
	const geometry = new THREE.SphereGeometry(5); 
	const material = new THREE.MeshLambertMaterial({color: 0x440099}); 

	const R = 100; //圆弧半径
	const N = 10; //分段数量
	const sp = Math.PI / N; //两个相邻点间隔弧度
	const group = new THREE.Group();
	for (let i = 0; i < N + 1; i++) {
		const angle = sp * i;
		// 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
		const x = R * Math.cos(angle);
		const y = R * Math.sin(angle);
		const mesh = new THREE.Mesh(geometry, material); 
		mesh.position.set(x,y,0);
		group.add(mesh);
	}
	return group;
}

function createLine() {
	//create a blue LineBasicMaterial 
	const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const points = []; 
	points.push( new THREE.Vector3( 10, 0, 0 ) ); 
	points.push( new THREE.Vector3( 0, 10, 0 ) ); 
	points.push( new THREE.Vector3( 0, 0, 10 ) );
	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );
	return line;
}

// scene.add(createSphere());
scene.add(createCubeBox());
// scene.add(createSmallBallGroup());
scene.add(createLine());


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight, true);
document.body.appendChild( renderer.domElement );
renderer.render(scene, camera);
