let basePath = './source/';
let envMap;
let aroundNumber = 0;
let aroundRadius = 50;
let pointLights = [];
let currIndex = null;
let flyingAnimation = null;
let aircraftModels = [];
let darkNames = [
  'Component146',
  'Component148',
  'Component149',
  'Component150',
  'Component151',
  'Component152',
  'Component153',
  'Component154',
  'Component156',
  'Component156',
  'Component158',
  'Component159',
  'Component160',
];
let modelsInfo = [];
let modelPromises = []; //保存加载模型的全部promise
let map = null;

function zoomToTarget(ids, targetsNum, k = 0) {
  let info, num;
  for (let i = 0; i < modelsInfo.length; i++) {
    if (modelsInfo[i].targetId == ids[k]) {
      info = modelsInfo[i];
      num = targetsNum[k];
      break;
    }
  }
  let position = info && info.coordinate;
  map.animate(
    {
      zoom: 21,
      center: [position[0], position[1], position[2] + 5],
    },
    1500,
  );
  aircraftAttack(info);
  k++;
  if (k < ids.length) {
    let time = 3000;
    if (num > 6) time += 10000;
    setTimeout(() => {
      zoomToTarget(ids, targetsNum, k);
    }, time);
  } else {
    setTimeout(() => {
      map.animate(
        {
          zoom: 20.29,
          center: [0, 0, 0],
          pitch: 45,
          roll: 0,
        },
        1500,
      );
    }, 15000);
  }
}

window.g_bus.addListener('ws:refresh:report', (data) => {
  console.log('refreshReport receive data :>> ', data);
  let targets = data.isMatchAreaTargets;
  if (targets.length != 0) {
    let ids = targets.map((item) => {
      return item.targetId;
    });
    let targetsNum = targets.map((item) => {
      return item.subTargets.length;
    });
    zoomToTarget(ids, targetsNum, 0);
  }
  let defaultJSON = {
    teamName: '测试大屏接口防守1',
    reportId: 177,
    id: '32000020240221677X',
    reportName: '测试目标靶标测试发送socket哈',
    teamId: 112896,
    time: '10:03:47',
    isMatchAreaTargets: [
      {
        id: 10,
        isMatch: 1,
        keyOnly: 1709884455747,
        nodeId: 'node1709884456552',
        subTargets: [
          {
            assetName: '服务器共享靶标001',
            identifyByTimestamp: 17098844343731,
            targetId: 2,
            targetType: 3001,
          },
          {
            assetName: '服务器-专用-2',
            identifyByTimestamp: 17098851280537,
            targetId: 1,
            targetType: 3001,
          },
          {
            assetName: '服务器共享靶标003',
            identifyByTimestamp: 17098844434731,
            targetId: 2,
            targetType: 3001,
          },
          {
            assetName: '服务器-专用-默认004',
            identifyByTimestamp: 17098856180537,
            targetId: 1,
            targetType: 3001,
          },
          {
            assetName: '服务器共享靶标005',
            identifyByTimestamp: 17098844333434732,
            targetId: 1,
            targetType: 3001,
          },
          {
            assetName: '服务器-专用-默认006',
            identifyByTimestamp: 17098851820537,
            targetId: 2,
            targetType: 3001,
          },
          {
            assetName: '服务器共享靶标007',
            identifyByTimestamp: 17098844334731,
            targetId: 2,
            targetType: 3001,
          },
          {
            assetName: '服务器-专用-默认008',
            identifyByTimestamp: 17098854180537,
            targetId: 1,
            targetType: 3001,
          },
        ],
        targetId: 101,
      },
      {
        id: 11,
        isMatch: 1,
        keyOnly: 1709885228092,
        nodeId: 'node1709885228109',
        subTargets: [
          {
            assetName: '快照靶标',
            identifyByTimestamp: 1709885404713,
            targetId: 3,
            targetType: 3001,
          },
        ],
        targetId: 103,
      },
    ],
    roleType: 2,
    type: 1,
    content: '测试大屏接口防守1 提交了 测试目标靶标测试发送socket哈 测试大',
  };
});
window.g_bus.addListener('update:basicInfo', (data) => {
  if (!data) return;
  let defaultJSON = {
    rankNum: 1,
    targetRangeName: '韩平',
    openRankStatus: 1,
    attackerTeamNum: 16,
    defenderTeamNum: 5,
    attackerTeamMemberNum: 12,
    defenderTeamMemberNum: 9,
    targetRangeAssetAreas: [
      { areaId: 10, areaName: '银行', targetId: 101 },
      { areaId: 10, areaName: '学校', targetId: 102 },
      { areaId: 10, areaName: '医院', targetId: 103 },
      { areaId: 11, areaName: '民政局', targetId: 104 },
      { areaId: 11, areaName: '公安局', targetId: 105 },
      { areaId: 11, areaName: '住建局', targetId: 106 },
    ],
  };
  let areas = data.targetRangeAssetAreas;
  aroundNumber = areas.length;

  map = new EM.Map('MapCancas', {
    zoom: 20.29,
    minZoom: 19,
    center: [0, 0, 0],
    pitch: 45,
    maxPitch: 60,
    bgColor: 'rgb(25, 25, 25)',
  });
  // addBloom();
  window.map = map;
  addPointLights();

  map.on('beforeRender', function () {
    updateLights();
  });

  let promise = initEnvMap();
  promise.then(() => {
    addMain();
    addAround(areas);
    addAircrafts(); //添加飞机
  });
});

// map.renderer.toneMapping = THREE.LinearToneMapping
// map.renderer.toneMappingExposure = 2;

// map.setLightIntensity(2);

function addAircrafts() {
  let index = Math.floor(Math.random() * aroundNumber);
  currIndex = index;
  let coord = modelsInfo[index].coordinate;

  let coords = [
    [coord[0] - 5, coord[1] + 5, 10],
    [coord[0] + 5, coord[1] + 5, 10],
    [coord[0] + 5, coord[1] - 5, 10],
    [coord[0] - 5, coord[1] - 5, 10],
  ];
  let aircraft = new EM.model.Model({
    url: basePath + 'data/aircraft.gltf',
    coordinate: coords[0],
    rotate: [90, 0, 0],
    scale: [15, 15, 15],
  });
  map.addModel(aircraft);

  aircraft.on('loaded', function () {
    setModelEnvMap(aircraft);
    aircraftModels.push(aircraft.model);
    for (let i = 1; i < coords.length; i++) {
      let aircraftClone = aircraft.model.clone();
      aircraftClone.position.x = coords[i][0];
      aircraftClone.position.y = coords[i][1];
      map.scene.add(aircraftClone);
      aircraftModels.push(aircraftClone);
    }
  });
}

function aircraftAttack(info) {
  if (flyingAnimation) {
    flyingAnimation.stop();
  }
  let des = info.coordinate,
    des0 = [des[0] - 5, des[1] + 5, 10],
    des1 = [des[0] + 5, des[1] + 5, 10],
    des2 = [des[0] + 5, des[1] - 5, 10],
    des3 = [des[0] - 5, des[1] - 5, 10];
  let models = aircraftModels;
  let origin0 = [models[0].position.x, models[0].position.y, 10],
    origin1 = [models[1].position.x, models[1].position.y, 10],
    origin2 = [models[2].position.x, models[2].position.y, 10],
    origin3 = [models[3].position.x, models[3].position.y, 10];
  flyingAnimation = new TWEEN.Tween({ x: 0 })
    .to(
      {
        //动画过渡 y 1.8
        x: 1,
      },
      5000,
    )
    .onUpdate(function (obj, i) {
      let height = 10;
      let prev0 = [
        models[0].position.x,
        models[0].position.y,
        models[0].position.z,
      ];
      let curr0 = [
        origin0[0] + i * (des0[0] - origin0[0]),
        origin0[1] + i * (des0[1] - origin0[1]),
        10 + Math.sin(i * Math.PI) * height,
      ];
      models[0].position.x = curr0[0];
      models[0].position.y = curr0[1];
      models[0].position.z = curr0[2];
      let nextVector0 = new THREE.Vector3(
        2 * curr0[0] - prev0[0],
        2 * curr0[1] - prev0[1],
        2 * curr0[2] - prev0[2],
      );
      models[0].lookAt(nextVector0);

      let prev1 = [
        models[1].position.x,
        models[1].position.y,
        models[1].position.z,
      ];
      let curr1 = [
        origin1[0] + i * (des1[0] - origin1[0]),
        origin1[1] + i * (des1[1] - origin1[1]),
        10 + Math.sin(i * Math.PI) * height,
      ];
      models[1].position.x = curr1[0];
      models[1].position.y = curr1[1];
      models[1].position.z = curr1[2];
      let nextVector1 = new THREE.Vector3(
        2 * curr1[0] - prev1[0],
        2 * curr1[1] - prev1[1],
        2 * curr1[2] - prev1[2],
      );
      models[1].lookAt(nextVector1);

      let prev2 = [
        models[2].position.x,
        models[2].position.y,
        models[2].position.z,
      ];
      let curr2 = [
        origin2[0] + i * (des2[0] - origin2[0]),
        origin2[1] + i * (des2[1] - origin2[1]),
        10 + Math.sin(i * Math.PI) * height,
      ];
      models[2].position.x = curr2[0];
      models[2].position.y = curr2[1];
      models[2].position.z = curr2[2];
      let nextVector2 = new THREE.Vector3(
        2 * curr2[0] - prev2[0],
        2 * curr2[1] - prev2[1],
        2 * curr2[2] - prev2[2],
      );
      models[2].lookAt(nextVector2);

      let prev3 = [
        models[3].position.x,
        models[3].position.y,
        models[3].position.z,
      ];
      let curr3 = [
        origin3[0] + i * (des3[0] - origin3[0]),
        origin3[1] + i * (des3[1] - origin3[1]),
        10 + Math.sin(i * Math.PI) * height,
      ];
      models[3].position.x = curr3[0];
      models[3].position.y = curr3[1];
      models[3].position.z = curr3[2];
      let nextVector3 = new THREE.Vector3(
        2 * curr3[0] - prev3[0],
        2 * curr3[1] - prev3[1],
        2 * curr3[2] - prev3[2],
      );
      models[3].lookAt(nextVector3);
      if (i > 0.9) {
        addDefenseSphere(info);
      }
    })
    .onComplete(function () {
      flyingAnimation = null;
    })
    .start();
}
/**
 * 添加动态点光源
 */
function addPointLights() {
  const sphere = new THREE.SphereGeometry(0.5, 16, 8);
  var light1 = new THREE.PointLight(0x0040ff, 0.2);
  light1.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })),
  );
  map.scene.add(light1);
  light1.position.z = 15;

  var light2 = new THREE.PointLight(0x0040ff, 0.2);
  light2.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })),
  );
  map.scene.add(light2);
  light2.position.z = 15;

  var light3 = new THREE.PointLight(0x0040ff, 0.2);
  light3.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })),
  );
  map.scene.add(light3);
  light3.position.z = 15;

  var light4 = new THREE.PointLight(0x0040ff, 0.2);
  light4.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })),
  );
  map.scene.add(light4);
  light4.position.z = 15;

  var light5 = new THREE.PointLight(0xffaa66, 0.2);
  map.scene.add(light5);
  light5.position.x = 0;
  light5.position.y = 0;
  light5.position.z = 15;

  pointLights.push(light1, light2, light3, light4);
}

/**
 * 更新点光源的位置
 */
function updateLights() {
  if (pointLights.length == 0) return;
  let time = Date.now() * 0.0005;
  pointLights[0].position.x = Math.sin(time * 0.7) * aroundRadius;
  pointLights[0].position.y = Math.cos(time * 0.5) * aroundRadius;

  pointLights[1].position.x = Math.cos(time * 0.3) * aroundRadius;
  pointLights[1].position.y = Math.sin(time * 0.5) * aroundRadius;

  pointLights[2].position.x = Math.sin(time * 0.7) * aroundRadius;
  pointLights[2].position.y = Math.cos(time * 0.3) * aroundRadius;

  pointLights[3].position.x = Math.sin(time * 0.3) * aroundRadius;
  pointLights[3].position.y = Math.cos(time * 0.7) * aroundRadius;
}

//添加全部周边
function addAround(areaInfos) {
  //定义周边环绕，因为模型比例不一致，这里微调下
  let aroundArr = [
    {
      model: 'data/01.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/02.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/03.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/04.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/05.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/06.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/07.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/08.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/09.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
    {
      model: 'data/10.glb',
      rotate: [90, 0, 0],
      scale: [1, 1, 1],
      color: '#rgb(125,230,248)',
    },
  ];
  let movingInfo = [];
  for (let i = 0; i < aroundNumber; i++) {
    let angle = (i * Math.PI * 2) / aroundNumber;
    let baseX = Math.cos(angle) * aroundRadius,
      baseY = Math.sin(angle) * aroundRadius,
      baseZ = -1;
    let movingCoords = addOneAround(
      [baseX, baseY, baseZ],
      aroundArr[i],
      areaInfos[i],
    );
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
      for (let i = 0; i < aroundNumber; i++) {
        addName(areaInfos[i], modelsInfo[i].coordinate);
      }
      addCube();
    });
  }
}

//添加一个周边
function addOneAround(posArr, info, areaInfo) {
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
    areaId: areaInfo.areaId,
    areaName: areaInfo.areaName,
    targetId: areaInfo.targetId,
  });

  let promise = new Promise((resolve, reject) => {
    around.on('loaded', function () {
      around.start();
      resolve();
      setModelEnvMap(around); //设置物理材质环境光
    });
  });
  modelPromises.push(promise);

  return addLink(posArr, info.color);
}

function addName(areaInfo, posArr) {
  // {"areaId":10,"areaName":"银行","targetId":101},
  let areaName = areaInfo.areaName;
  let icon = new EM.marker.SpriteIcon({
    coordinate: posArr,
    size: 128,
    anchor: [0.5, 0.5],
    iconUrl: basePath + 'images/bottom.png',
  });
  map.addMarker(icon);

  let text = new EM.marker.SpriteText({
    text: areaName,
    coordinate: posArr,
    fontSize: 18,
    fontColor: '#fff',
    strokeWidth: null,
    anchor: [0.5, 0.5],
  });
  map.addMarker(text);
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
function addDefenseSphere(info) {
  let coord = info.coordinate;
  let sphere = new EM.mesh.HalfSphere({
    coordinate: [coord[0], coord[1], 1],
    color: 'rgb(8, 126, 126)',
    radius: 15,
    iconUrl: basePath + 'images/sphere.jpg',
  });
  map.addObject(sphere);
  setTimeout(() => {
    map.removeObject(sphere);
  }, 1000);
  // let sphere = new EM.model.Model({
  //     url: basePath + "data/football.glb",
  //     coordinate: [coord[0], coord[1], 1],
  //     rotate: [90, 0, 0],
  //     scale: [10, 10, 10],
  // });
  // map.addModel(sphere);

  // sphere.on("loaded",function(){
  //     // setModelEnvMap(bottom);
  // })
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

function setAround() {
  map.setAutoRotate(true);
}

function stopAround() {
  map.setAutoRotate(false);
}

function addCube() {
  //模仿顶部
  let cube = new EM.model.Model({
    url: basePath + 'data/cube.gltf',
    coordinate: [0, 0, 30],
    rotate: [90, 0, 0],
    scale: [8, 8, 8],
  });
  map.addModel(cube);

  cube.on('loaded', function () {
    cube.model.renderOrder = 999;
    cube.start();
    setModelEnvMap(cube);
  });

  let modelUp = true;
  map.on('beforeRender', function () {
    if (cube.model) {
      cube.model.rotation.y += (0.5 * (Math.PI * 2)) / 180; //度
      if (modelUp) {
        cube.model.position.z += 0.1;
        if (cube.model.position.z > 35) {
          modelUp = false;
        }
      } else {
        cube.model.position.z -= 0.1;
        if (cube.model.position.z < 25) {
          modelUp = true;
        }
      }
    }
  });
}
//添加主体魔方
function addMain() {
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
    if (
      mesh.name != '' &&
      mesh.name.indexOf('Component') != -1 &&
      mesh.parent.name.indexOf('root') == -1 &&
      mesh.parent.parent &&
      mesh.parent.parent.name.indexOf('root') == -1
    ) {
      if (mesh.material && !mesh.material.adjustColor) {
        let oriRGB = mesh.material.color;
        mesh.material.color.setRGB(
          oriRGB.r * 0.2,
          oriRGB.g * 0.2,
          oriRGB.b * 0.2,
        );
        mesh.material.adjustColor = true;
      }
    }
    if (mesh.parent && mesh.parent.name == '平面_RLExtr006_RLExtr001') {
      if (mesh.material) {
        let oriRGB = mesh.material.color;
        mesh.material.color.setRGB(0.0, 0.0, 0.3);
      }
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

function addBloom() {
  let bloom = new EM.effect.Bloom({
    strength: 0.5,
    radius: 0.2,
    threshold: 0.3, //阈值
  });
  map.addEffect(bloom);
}
