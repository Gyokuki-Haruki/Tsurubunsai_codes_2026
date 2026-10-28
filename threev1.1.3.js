import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const schoolmap = new URL(
    "./schoolmap3.glb",
    import.meta.url
).href;
// DOM要素の取得
const container = document.querySelector(".map-content");
const canvas = document.querySelector("#map-canvas");

// レンダラーの作成
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0xFFFFFF); 

// シーン
const scene = new THREE.Scene();

// カメラ
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 150, 50);

// ライト
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(500, 1000, 500); 
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 1.5)); // 全体を明るく

function setRendererSize() {
  if (!container) return;
  // 親要素の幅に合わせる
  const width = container.clientWidth || 800;
  // 高さは画面高さに合わせつつ、最大 600px に制限
  const height = Math.min(window.innerHeight, 600);

  // CSS で canvas のサイズを設定
  renderer.domElement.style.width = width + 'px';
  renderer.domElement.style.height = height + 'px';

  // レンダラーの内部サイズを設定
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(window.devicePixelRatio);

  // カメラのアスペクト比を更新
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// 最初のサイズ設定
setRendererSize();

// ウィンドウリサイズ時
window.addEventListener('resize', setRendererSize);

// GLB ロード（同階層の schoolmap3.glb を指定）
const loader = new GLTFLoader();
let model;
loader.load(schoolmap,
  (gltf) => {
    model = gltf.scene;
    model.scale.set(25,25,25); // 大きさ調整（必要に応じて変更）
    model.position.set(0, 0, 0);
    scene.add(model);
    console.log(model);
  },
  undefined,
  (err) => console.error(err)
);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false; // 平行移動は不可
controls.enableZoom = true; // ズーム有効

// パン移動制限
controls.minDistance = 75;   // ズームの最小距離
controls.maxDistance = 300;  // ズームの最大距離

// 可動域制限
controls.minPolarAngle = Math.PI / 4; // 下限
controls.maxPolarAngle = Math.PI / 2; // 上限

controls.target.set(0, 0, 50); // 注視するポイントを設定
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// aタグのクリックで注視点変更（GSAPが読み込まれている場合動作）
document.querySelectorAll(".location").forEach(a => {
  a.addEventListener("click", function (e) {
    e.preventDefault();

    const x = parseFloat(this.dataset.x);
    const y = parseFloat(this.dataset.y);
    const z = parseFloat(this.dataset.z);

    if (window.gsap) {
      gsap.to(controls.target, {
        duration: 1,
        x, y, z,
        onUpdate: () => controls.update()
      });

      gsap.to(camera.position, {
        duration: 1,
        x: x + 5,
        y: y + 150,
        z: z + 5,
        onUpdate: () => controls.update()
      });
    }
  });
});

// 3dimgフォルダ内の画像をViteで読み込む
const images = new Proxy({}, {
    get: (_, path) => path
});

// テクスチャロード
const textureLoader = new THREE.TextureLoader();

const tex11 = textureLoader.load(images["./3dimg/11.png"]);
const tex12 = textureLoader.load(images["./3dimg/12.png"]);
const tex13 = textureLoader.load(images["./3dimg/13.png"]);
const tex14 = textureLoader.load(images["./3dimg/14.png"]);
const tex15 = textureLoader.load(images["./3dimg/15.png"]);
const tex16 = textureLoader.load(images["./3dimg/16.png"]);
const tex17 = textureLoader.load(images["./3dimg/17.png"]);
const tex18 = textureLoader.load(images["./3dimg/18.png"]);

const tex21 = textureLoader.load(images["./3dimg/21.png"]);
const tex22 = textureLoader.load(images["./3dimg/22.png"]);
const tex23 = textureLoader.load(images["./3dimg/23.png"]);
const tex24 = textureLoader.load(images["./3dimg/24.png"]);
const tex25 = textureLoader.load(images["./3dimg/25.png"]);
const tex26 = textureLoader.load(images["./3dimg/26.png"]);
const tex27 = textureLoader.load(images["./3dimg/27.png"]);
const tex28 = textureLoader.load(images["./3dimg/28.png"]);

const texshodo      = textureLoader.load(images["./3dimg/書道部.png"]);
const texkagaku     = textureLoader.load(images["./3dimg/化学部.png"]);
const texeleve      = textureLoader.load(images["./3dimg/エレベーター.png"]);
const texquiz       = textureLoader.load(images["./3dimg/クイズ研究会.png"]);
const texshogi      = textureLoader.load(images["./3dimg/将棋部.png"]);
const texstairs     = textureLoader.load(images["./3dimg/階段.png"]);
const texyama       = textureLoader.load(images["./3dimg/山岳部.png"]);
const texphoto      = textureLoader.load(images["./3dimg/写真部.png"]);
const texfemale     = textureLoader.load(images["./3dimg/女子トイレ.png"]);
const texmath       = textureLoader.load(images["./3dimg/数学研究.png"]);
const textamokuteki = textureLoader.load(images["./3dimg/多目的.png"]);
const texmale       = textureLoader.load(images["./3dimg/男子トイレ.png"]);
const texsado       = textureLoader.load(images["./3dimg/茶道部.png"]);
const texart        = textureLoader.load(images["./3dimg/美術部.png"]);
const texhyaku      = textureLoader.load(images["./3dimg/百人一首部.png"]);
const texcentence   = textureLoader.load(images["./3dimg/文芸部.png"]);
const texhospital   = textureLoader.load(images["./3dimg/保健室.png"]);
const textigaku     = textureLoader.load(images["./3dimg/地学部.png"]);
const texseibutu    = textureLoader.load(images["./3dimg/生物部.png"]);
const texshokudo    = textureLoader.load(images["./3dimg/食堂.png"]);
const texbreak      = textureLoader.load(images["./3dimg/食事スペース.png"]);
const texkitchencar = textureLoader.load(images["./3dimg/キッチンカー(8台すべて).png"]);
const texhistory    = textureLoader.load(images["./3dimg/歴史研究会.png"]);
const texyukyukan   = textureLoader.load(images["./3dimg/悠久館.png"]);
const texnoenter    = textureLoader.load(images["./3dimg/立入禁止.png"]);
const texhssc        = textureLoader.load(images["./3dimg/生徒会展示.png"]);
const texexhiA      = textureLoader.load(images["./3dimg/活動展示.png"]);
// スプライト作成関数
function createSprite(texture, position) {
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(position.x, position.y, position.z);
  sprite.scale.set(12, 12, 1);
  return sprite;
}

// スプライト作成
const sprite11       = createSprite(tex11,       new THREE.Vector3(65, 33, 48));
const sprite12       = createSprite(tex12,       new THREE.Vector3(65, 33, 33));
const sprite13       = createSprite(tex13,       new THREE.Vector3(65, 33, 18));
const sprite14       = createSprite(tex14,       new THREE.Vector3(65, 33, 3));
const sprite15       = createSprite(tex15,       new THREE.Vector3(65, 33, -29));
const sprite16       = createSprite(tex16,       new THREE.Vector3(65, 33, -44));
const sprite17       = createSprite(tex17,       new THREE.Vector3(65, 33, -59));
const sprite18       = createSprite(tex18,       new THREE.Vector3(65, 33, -74));
const sprite21       = createSprite(tex21,       new THREE.Vector3(65, 59, 48));
const sprite22       = createSprite(tex22,       new THREE.Vector3(65, 59, 33));
const sprite23       = createSprite(tex23,       new THREE.Vector3(65, 59, 18));
const sprite24       = createSprite(tex24,       new THREE.Vector3(65, 59, 3));
const sprite25       = createSprite(tex25,       new THREE.Vector3(65, 59, -29));
const sprite26       = createSprite(tex26,       new THREE.Vector3(65, 59, -44));
const sprite27       = createSprite(tex27,       new THREE.Vector3(65, 59, -59));
const sprite28       = createSprite(tex28,       new THREE.Vector3(65, 59, -74));
const spriteShodo    = createSprite(texshodo,    new THREE.Vector3(29, 7, -70));
const spriteKagaku   = createSprite(texkagaku,   new THREE.Vector3(65, 7, 3));
const spriteQuiz     = createSprite(texquiz,     new THREE.Vector3(65, 59, 105));
const spriteShogi    = createSprite(texshogi,    new THREE.Vector3(65, 33, 105));
const spriteYama     = createSprite(texyama,     new THREE.Vector3(65, 33, 76));
const spritePhoto    = createSprite(texphoto,    new THREE.Vector3(70, 7, 127));
const spriteMath     = createSprite(texmath,     new THREE.Vector3(65, 59, 65));
const spriteTamokuteki = createSprite(textamokuteki, new THREE.Vector3(-102, 7, 124));
const spriteSado     = createSprite(texsado,     new THREE.Vector3(116, 7, 103));
const spriteArt      = createSprite(texart,      new THREE.Vector3(70, 85, 127));
const spriteHyaku    = createSprite(texhyaku,    new THREE.Vector3(100, 7, 72));
const spriteCentence = createSprite(texcentence, new THREE.Vector3(75, 59, 84));
const spriteHospital = createSprite(texhospital, new THREE.Vector3(-10, 7, -19));
const spritetigaku   = createSprite(textigaku,   new THREE.Vector3(65, 7, 65));
const spriteseibutu  = createSprite(texseibutu,  new THREE.Vector3(65, 7, 105));
const spriteshokudo  = createSprite(texshokudo,  new THREE.Vector3(-195, 7, 165));
const spritekichencar= createSprite(texkitchencar,new THREE.Vector3(0, 7, 160));
const spriteHistory  = createSprite(texhistory,  new THREE.Vector3(40, 7, 127));
const spriteyukyukan = createSprite(texyukyukan, new THREE.Vector3(-195, 59, 165));
const noenterE       = createSprite(texnoenter,  new THREE.Vector3(75, 85, 79));
const noenterW       = createSprite(texnoenter,  new THREE.Vector3(75, 85, -12));
const spritehssc     = createSprite(texhssc,     new THREE.Vector3(65, 33, 105));
const spriteexhiA    = createSprite(texexhiA,    new THREE.Vector3(65, 33, 65));

// 階段
const stairsSE1 = createSprite(texstairs, new THREE.Vector3(65, 7, 84));
const stairsSE2 = createSprite(texstairs, new THREE.Vector3(65, 33, 84));
const stairsSE3 = createSprite(texstairs, new THREE.Vector3(65, 59, 84));
const stairsSW1 = createSprite(texstairs, new THREE.Vector3(65, 7, -7));
const stairsSW2 = createSprite(texstairs, new THREE.Vector3(65, 33, -7));
const stairsSW3 = createSprite(texstairs, new THREE.Vector3(65, 59, -7));
const stairsN1  = createSprite(texstairs, new THREE.Vector3(25, 7, -17));
const stairsH1  = createSprite(texstairs, new THREE.Vector3(8, 7, 76));
const stairsH2  = createSprite(texstairs, new THREE.Vector3(8, 33, 76));
const stairsH3  = createSprite(texstairs, new THREE.Vector3(8, 59, 76));
const stairsT1  = createSprite(texstairs, new THREE.Vector3(-83, 7, 76));
const stairsT2  = createSprite(texstairs, new THREE.Vector3(-83, 33, 76));
const stairsD1  = createSprite(texstairs, new THREE.Vector3(-170, 7, 150));
const stairsD2  = createSprite(texstairs, new THREE.Vector3(-170, 33, 150));

// エレベーター
const elev1 = createSprite(texeleve, new THREE.Vector3(-83, 7, 92));
const elev2 = createSprite(texeleve, new THREE.Vector3(-83, 33, 92));

// トイレ
const toiletSE1 = createSprite(texfemale, new THREE.Vector3(65, 7, 92));
const toiletSE2 = createSprite(texmale, new THREE.Vector3(65, 33, 92));
const toiletSE3 = createSprite(texfemale, new THREE.Vector3(65, 59, 92));
const toiletSE4 = createSprite(texmale, new THREE.Vector3(65, 85, 92));
const toiletSW1 = createSprite(texmale, new THREE.Vector3(65, 7, -17));
const toiletSW2 = createSprite(texfemale, new THREE.Vector3(65, 33, -17));
const toiletSW3 = createSprite(texmale, new THREE.Vector3(65, 59, -17));
const toiletTF  = createSprite(texfemale, new THREE.Vector3(-102, 7, 113));
const toiletTM  = createSprite(texmale, new THREE.Vector3(-102, 7, 105));

// 休憩・多目的スペース
const tamokutekiroom = createSprite(texbreak, new THREE.Vector3(-150, 7, 105));
const fujidana       = createSprite(texbreak, new THREE.Vector3(-58, 20, 10));

const logos = [
  sprite11, sprite12, sprite13, sprite14, sprite15, sprite16, sprite17, sprite18,
  sprite21, sprite22, sprite23, sprite24, sprite25, sprite26, sprite27, sprite28,
  spriteShodo, spriteKagaku, spriteQuiz, spriteShogi, spriteYama,
  spritePhoto, spriteMath, spriteTamokuteki, spriteHistory,
  spriteSado, spriteArt, spriteHyaku, spriteCentence, spriteHospital,
  spritetigaku, spriteseibutu, spriteshokudo, spritekichencar,
  stairsSE1, stairsSE2, stairsSE3, stairsSW1, stairsSW2, stairsSW3, stairsN1,
  stairsH1, stairsH2, stairsH3, stairsT1, stairsT2, stairsD1, stairsD2, elev1, elev2,
  toiletSE1, toiletSE2, toiletSE3, toiletSE4, toiletSW1, toiletSW2, toiletSW3, toiletTF, toiletTM,
  spriteyukyukan, noenterE, noenterW, spritehssc, spriteexhiA, tamokutekiroom, fujidana
];

// まとめて追加
logos.forEach(obj => scene.add(obj));
