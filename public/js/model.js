let basePath = './source/';
let envMap;
let aroundNumber = 10;
let aroundRadius = 50;

let map = new EM.Map('MapCancas', {
  zoom: 20.29,
  minZoom: 19,
  center: [0, 0, 0],
  pitch: 60,
  bgColor: 'rgb(25, 25, 25)',
});
let modelsInfo = [];
let rotateMeshNames = [
  'Plane002',
  'Plane003',
  'Plane040',
  '管道',
  'Component30',
];
// map.renderer.toneMapping = THREE.LinearToneMapping
// map.renderer.toneMappingExposure = 2;

// map.setLightIntensity(2);

map.on('beforeRender', function () {
  for (let object of rotateObjects) {
    object.rotation.z += Math.PI / 180; //度
  }
});

let modelPromises = []; //保存加载模型的全部promise
let promise = initEnvMap();
promise.then(() => {
  addMain();
  addAround();
  addAircrafts(); //添加飞机
});

function addAircrafts() {
  let flyRadius = 3;
  let index = Math.floor(Math.random() * aroundNumber);
  let coord = modelsInfo[index].coordinate;
}

//添加全部周边
function addAround() {
  //定义周边环绕，因为模型比例不一致，这里微调下
  let aroundArr = [
    {
      model: 'data/1.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#00f',
    },
    {
      model: 'data/2.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#00f',
    },
    {
      model: 'data/3.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#0f0',
    },
    {
      model: 'data/4.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#0f0',
    },
    {
      model: 'data/5.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#fff',
    },
    {
      model: 'data/6.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#0f0',
    },
    {
      model: 'data/7.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#0f0',
    },
    {
      model: 'data/8.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#ff0',
    },
    {
      model: 'data/9.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#f00',
    },
    {
      model: 'data/10.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#fff',
    },
  ];
  let movingInfo = [];
  for (let i = 0; i < aroundNumber; i++) {
    let angle = (i * Math.PI * 2) / aroundNumber;
    let baseX = Math.cos(angle) * aroundRadius,
      baseY = Math.sin(angle) * aroundRadius,
      baseZ = -1;
    let movingCoords = addOneAround([baseX, baseY, baseZ], aroundArr[i]);
    if (movingCoords) {
      let movingPointCoords = movingCoords.map((i) => {
        return [i[0], i[1], i[2] + 0.2];
      });
      movingInfo.push({
        coordinates: movingPointCoords,
        color:
          'rgb(' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 200) +
          ')',
        speed: 10,
      });
    }
  }
  if (movingInfo.length != 0) {
    Promise.all(modelPromises).then(() => {
      let points = new EM.marker.DynamicPoints({
        datas: movingInfo,
        loop: true,
        depthTest: true,
        pointSize: 20,
        blending: 'normal',
      });
      map.addObject(points);
    });
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

  modelsInfo.push({
    index: modelsInfo.length,
    coordinate: posArr,
    rotate: info.rotate,
    scale: info.scale,
  });

  let promise = new Promise((resolve, reject) => {
    around.on('loaded', function () {
      resolve();
      setModelEnvMap(around); //设置物理材质环境光
    });
  });
  modelPromises.push(promise);

  let movingPoints = [];
  return addLink(posArr, info.color);
}

//添加周边与主模仿的链接
function addLink(posArr, color) {
  let linkRaidus = 6;
  let linkPoints = [
    [-linkRaidus, linkRaidus, 0],
    [linkRaidus, linkRaidus, 0],
    [linkRaidus, -linkRaidus, 0],
    [-linkRaidus, -linkRaidus, 0],
    [0, linkRaidus, 0],
    [linkRaidus, 0, 0],
    [0, -linkRaidus, 0],
    [-linkRaidus, 0, 0],
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
      width: 1.5,
      iconUrl: basePath + 'images/link.png',
      color: color,
      iconLength: 80,
      iconSpace: 30,
      sizeAttention: false,
      useAlpha: true,
      isAnimate: false,
      depthTest: true,
      speed: 2.5 + Math.random(),
    });
    map.addLine(track);
    return solidCoords;
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

//添加防护罩
function addDefenseSphere() {
  let index = Math.floor(Math.random() * aroundNumber);
  let coord = modelsInfo[index].coordinate;
  let sphere = new EM.mesh.HalfSphere({
    coordinate: [coord[0], coord[1], 1],
    color: 'rgb(8, 126, 126)',
    radius: 15,
  });
  map.addObject(sphere);
}

function focusOne() {
  let index = Math.floor(Math.random() * aroundNumber),
    modelInfo = modelsInfo[index];
  let position = (modelInfo && modelInfo.coordinate) || [0, 0, 0];
  map.animate(
    {
      zoom: 21.8,
      center: [position[0], position[1], position[2] + 5],
    },
    3000,
  );
}

function returnGlobe() {
  map.animate(
    {
      zoom: 20.29,
      center: [0, 0, 0],
    },
    3000,
  );
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

const rotateObjects = [];
//设置环境光
function setModelEnvMap(model) {
  let object = model.model || model;
  object.traverse((mesh) => {
    if (
      mesh.name != '' &&
      mesh.name.indexOf('Component') != -1 &&
      mesh.parent.name != 'root' &&
      mesh.parent.parent &&
      mesh.parent.parent.name != 'root'
    ) {
      if (mesh.material && !mesh.material.adjustColor) {
        let oriRGB = mesh.material.color;
        mesh.material.color.setRGB(
          oriRGB.r * 0.1,
          oriRGB.g * 0.1,
          oriRGB.b * 0.1,
        );
        mesh.material.adjustColor = true;
      }
    }
    if (mesh.name == 'root.001') {
      debugger;
    }
    if (rotateMeshNames.indexOf(mesh.name) != -1) {
      rotateObjects.push(mesh);
    }
    if (mesh.material && mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.envMap = envMap;
      mesh.material.envMapIntensity = 1;

      mesh.material.transparent = true;
      mesh.material.roughness = Math.min(
        mesh.material.roughness,
        1 - mesh.material.metalness,
      );
    }
  });
}

// around2.on("loaded",function(){
//     around2.model.traverse((mesh)=>{
//         if(mesh.material){
//             mesh.material.transparent = true;
//             mesh.material.opacity = 0.5;
//             mesh.material.blending = THREE.AdditiveBlending;
//         }
//     })
// });

let bloom = new EM.effect.Bloom({
  strength: 0.8,
  radius: 0.5,
  threshold: 0, //阈值
});
map.addEffect(bloom);

// let fxaa = new EM.effect.Fxaa();        //抗锯齿
// map.addEffect(fxaa);
