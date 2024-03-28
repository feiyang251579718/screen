let basePath = './source/';
let envMap;
let aroundNumber = 6;
let aroundRadius = 30;

let map = new EM.Map('MapCancas', {
  zoom: 21.5,
  center: [0, 0, 0],
  pitch: 60,
  bgColor: 'rgb(25, 25, 25)',
  // bgColor: "rgb(255, 255, 255)",
});
map.renderer.toneMapping = THREE.LinearToneMapping;
map.renderer.toneMappingExposure = 2;

// map.setLightIntensity(2);

//定义周边环绕，因为模型比例不一致，这里微调下
let aroundArr = [
  { model: 'data/16.gltf', rotate: [90, 0, 0], scale: [1, 1, 1] },
  { model: 'data/14.gltf', rotate: [90, 0, 0], scale: [0.4, 0.4, 0.4] },
  { model: 'data/7.gltf', rotate: [90, 0, 0], scale: [1, 1, 1] },
  { model: 'data/8.gltf', rotate: [90, 0, 0], scale: [1, 1, 1] },
  { model: 'data/11.gltf', rotate: [90, 0, 0], scale: [1, 1, 1] },
  { model: 'data/15.gltf', rotate: [90, 0, 0], scale: [10, 10, 10] },
];

let promise = initEnvMap();
promise.then(() => {
  addMain();
  addAround();
});

//添加全部周边
function addAround() {
  for (let i = 0; i < aroundNumber; i++) {
    let angle = (i * Math.PI * 2) / aroundNumber;
    let baseX = Math.cos(angle) * aroundRadius,
      baseY = Math.sin(angle) * aroundRadius,
      baseZ = 0;
    addOneAround([baseX, baseY, baseZ], i);
  }
}

//添加一个周边
function addOneAround(posArr, index) {
  let info = aroundArr[index];
  if (!info) return;
  //模方底部
  let bottom = new EM.model.Model({
    url: basePath + info.model,
    coordinate: [posArr[0], posArr[1], posArr[2]],
    rotate: info.rotate,
    scale: info.scale,
  });
  map.addModel(bottom);
}

//添加周边与主模仿的链接
function addLink(posArr, index) {}

//测试接口，攻击
function attack() {
  let aroundMain = new EM.mesh.Board({
    iconUrl: basePath + 'images/circular.png',
    width: 20,
    height: 20,
    coordinate: [0, 0, 0],
  });
  map.addMesh(aroundMain);

  map.on('beforeRender', function () {
    aroundMain.rotate[2] += 1; //度
  });
}

//添加主体魔方
function addMain() {
  let mainlayer = new EM.layer.Layer();
  map.addLayer(mainlayer);

  //模方底部
  let bottom = new EM.model.Model({
    url: basePath + 'data/4.gltf',
    coordinate: [0, 0, 0],
    rotate: [90, 0, 0],
    scale: [15, 15, 15],
  });
  map.addModel(bottom);

  bottom.on('loaded', function () {
    setModelEnvMap(bottom);
  });

  //模仿顶部
  let top = new EM.model.Model({
    url: basePath + 'data/19.gltf',
    coordinate: [0, 0, 7],
    rotate: [90, 0, 0],
    scale: [1, 1, 1],
  });
  map.addModel(top);

  top.on('loaded', function () {
    setModelEnvMap(top);
  });

  let modelUp = true;
  map.on('beforeRender', function () {
    if (top.model) {
      top.model.rotation.y += (Math.PI * 2) / 180; //度
      if (modelUp) {
        top.model.position.z += 0.02;
        if (top.model.position.z > 10) {
          modelUp = false;
        }
      } else {
        top.model.position.z -= 0.02;
        if (top.model.position.z < 7) {
          modelUp = true;
        }
      }
    }
  });
}

/**
 * 初始化环境光贴图
 */
function initEnvMap() {
  return new Promise((resolve) => {
    var urls = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];
    var loader = new THREE.CubeTextureLoader().setPath(basePath + 'cloud/');
    loader.load(urls, function (texture) {
      envMap = texture;
      resolve();
    });
  });
}

//设置环境光
function setModelEnvMap(model) {
  let object = model.model || model;
  object.traverse((mesh) => {
    if (mesh.material && mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.envMap = envMap;
      mesh.material.envMapIntensity = 2;
    }
  });
}
