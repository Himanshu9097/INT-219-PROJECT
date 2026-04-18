export function initThreeBackground() {
  if (!window.THREE) {
    console.error('Three.js not loaded!');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'webgl-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const scene = new THREE.Scene();
  // Using a light fog to blend out particles into the background
  scene.fog = new THREE.FogExp2(0xF8FAFC, 0.001);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 1000;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background

  // Create particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const particleCount = 1500;

  for ( let i = 0; i < particleCount; i ++ ) {
    const x = 2000 * Math.random() - 1000;
    const y = 2000 * Math.random() - 1000;
    const z = 2000 * Math.random() - 1000;
    vertices.push( x, y, z );
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  // Material tailored for light mode
  const material = new THREE.PointsMaterial({
    color: 0x94A3B8, // Slate color for particles in light mode
    size: 4,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.5;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.5;
  });

  // Animation Loop
  const animate = function () {
    requestAnimationFrame(animate);

    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
