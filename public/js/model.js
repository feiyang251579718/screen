let basePath = './source/';
let envMap;
let aroundNumber = 9;
let aroundRadius = 50;

let map = new EM.Map('MapCancas', {
  zoom: 20.29,
  minZoom: 19,
  center: [0, 0, 0],
  pitch: 60,
  bgColor: 'rgb(25, 25, 25)',
});

let promise = initEnvMap();
promise.then(() => {
  addMain();
  addAround();
});

//添加全部周边
function addAround() {
  //定义周边环绕，因为模型比例不一致，这里微调下
  let aroundArr = [
    { model: 'data/1.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/2.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/3.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/4.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/5.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/6.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/7.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/8.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
    { model: 'data/9.glb', rotate: [90, 0, 0], scale: [1, 1, 1] },
  ];
  for (let i = 0; i < aroundNumber; i++) {
    let angle = (i * Math.PI * 2) / aroundNumber;
    let baseX = Math.cos(angle) * aroundRadius,
      baseY = Math.sin(angle) * aroundRadius,
      baseZ = 0;
    addOneAround([baseX, baseY, baseZ], aroundArr[i]);
  }
}

//添加一个周边
function addOneAround(posArr, info) {
  //模方底部
  let around = new EM.model.Model({
    url: basePath + info.model,
    coordinate: [posArr[0], posArr[1], posArr[2]],
    rotate: info.rotate,
    scale: info.scale,
  });
  map.addModel(around);

  around.on('loaded', function () {
    setModelEnvMap(around); //设置物理材质环境光
  });

  addLink(posArr);
}

//添加周边与主模仿的链接
function addLink(posArr) {
  let linkRaidus = 10;
  let linkPoints = [
    [-linkRaidus, linkRaidus, 0],
    [linkRaidus, linkRaidus, 0],
    [linkRaidus, -linkRaidus, 0],
    [-linkRaidus, -linkRaidus, 0],
  ];
  let dist = Infinity,
    index;
  for (let i = 0; i < linkPoints.length; i++) {
    let point = linkPoints[i],
      length = Math.hypot(
        posArr[0] - point[0],
        posArr[1] - point[1],
        posArr[2] - point[2],
      );
    if (length < dist) {
      dist = length;
      index = i;
    }
  }
  if (index != null && index != undefined) {
    let linkPoint = linkPoints[index];
    let absX = Math.abs(posArr[0]),
      absY = Math.abs(posArr[1]);
    let midPoint;
    if (absX >= absY) {
      midPoint = [posArr[0], linkPoint[1], 0];
    } else {
      midPoint = [linkPoint[0], posArr[1], 0];
    }
    let solidCoords = [Array.from(posArr), midPoint, Array.from(linkPoint)];
    solidCoords.map((item) => {
      item[2] = -2;
    });
    let track = new EM.line.Track({
      coordinates: solidCoords,
      width: 10,
      iconUrl: basePath + 'images/red_line.png',
      iconLength: 80,
      iconSpace: 30,
      useAlpha: true,
      isAnimate: true,
      depthTest: true,
      speed: 2.5 + Math.random(),
    });
    map.addLine(track);
  }
}

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
    url: basePath + 'data/bottom.glb',
    coordinate: [0, 0, -5],
    rotate: [90, 0, 0],
    scale: [1, 0.5, 1],
  });
  map.addModel(bottom);

  bottom.on('loaded', function () {
    setModelEnvMap(bottom);
  });

  //模仿顶部
  let cube = new EM.model.Model({
    url: basePath + 'data/cube2.glb',
    coordinate: [0, 0, 10],
    rotate: [90, 0, 0],
    scale: [4, 4, 4],
  });
  map.addModel(cube);

  cube.on('loaded', function () {
    setModelEnvMap(cube);
  });

  let modelUp = true;
  map.on('beforeRender', function () {
    if (cube.model) {
      cube.model.rotation.y += (Math.PI * 2) / 180; //度
      if (modelUp) {
        cube.model.position.z += 0.1;
        if (cube.model.position.z > 15) {
          modelUp = false;
        }
      } else {
        cube.model.position.z -= 0.1;
        if (cube.model.position.z < 5) {
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
      mesh.material.envMapIntensity = 1;
    }
  });
}
