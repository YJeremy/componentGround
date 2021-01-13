import * as THREE from 'three';
import * as React from 'react';
import Orbitcontrols from 'three-orbitcontrols';

const Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
}

let scene, camera, fieldOfView, aspectRatio, nearPlane,
    farPlane, HEIGHT, WIDTH, renderer, container;


let hemisphereLight, shadowLight;

class ThreeStudy extends React.Component {

    componentDidMount() {//在 组件装载后， 调用操作 DOM； 其中init()就有操作
        this.init()
    }


    init = () => { //使用this是因为我们需要使用this.mount来渲染数据
        const scene = new THREE.Scene() //

        const camera = new THREE.PerspectiveCamera(75, this.mount.clientWidth / this.mount.clientHeight, 0.1, 1000);
        //创建相机  这些参数在官网中都有指出  第一个参数 75 -> 视野角度（单位：度）  第二个参数是长宽比 第三个是近截面 第四个是远截面
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        //创建渲染器。讲道理我还没有看这个参数是什么意思。 但是官网中有一个测试浏览器是否可以使用WebGL的方法，需要用到的可看一下
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        //这三个赋值是为了方便我们把创建立方体或者其他元素的方法拆分出去，不让代码显得太长

        renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        //将渲染器的长宽 设置为我们要显示的容器长宽
        this.mount.appendChild(renderer.domElement);
        //将整个场景推入我们要显示的元素中
        camera.position.z = 5;
        // 我们生成的元素默认和相机的位置是重复的，我们需要将相机移开，这样我们才可以看到渲染的内容

        this.createCube()
        this.createLine()
        this.createLights()
        this.animate()
    }


    createScene = () => {
        // 获得屏幕的宽和高，
        // 用它们设置相机的纵横比
        // 还有渲染器的大小
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;

        // 创建场景
        scene = new THREE.Scene();

        // 在场景中添加雾的效果；样式上使用和背景一样的颜色
        scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

        // 创建相机
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 60;
        nearPlane = 1;
        farPlane = 10000;
        /**
         * PerspectiveCamera 透视相机
         * @param fieldOfView 视角
         * @param aspectRatio 纵横比
         * @param nearPlane 近平面
         * @param farPlane 远平面
         */
        camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );

        // 设置相机的位置
        camera.position.x = 0;
        camera.position.z = 200;
        camera.position.y = 100;

        // 创建渲染器
        renderer = new THREE.WebGLRenderer({
            // 在 css 中设置背景色透明显示渐变色
            alpha: true,
            // 开启抗锯齿，但这样会降低性能。
            // 不过，由于我们的项目基于低多边形的，那还好 :)
            antialias: true
        });

        // 定义渲染器的尺寸；在这里它会填满整个屏幕
        renderer.setSize(WIDTH, HEIGHT);

        // 打开渲染器的阴影地图
        renderer.shadowMap.enabled = true;

        // 在 HTML 创建的容器中添加渲染器的 DOM 元素
        container = document.getElementById('world');
        container.appendChild(renderer.domElement);

        // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
        window.addEventListener('resize', handleWindowResize, false);
    }

    createLights = () => {
        // 半球光就是渐变的光；
        // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
        hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

        // 方向光是从一个特定的方向的照射
        // 类似太阳，即所有光源是平行的
        // 第一个参数是关系颜色，第二个参数是光源强度
        shadowLight = new THREE.DirectionalLight(0xffffff, .9);

        // 设置光源的方向。
        // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
        shadowLight.position.set(150, 350, 350);

        // 开启光源投影
        shadowLight.castShadow = true;

        // 定义可见域的投射阴影
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;

        // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;

        // 为了使这些光源呈现效果，只需要将它们添加到场景中
        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);
    }
    createSea() {
        let sea = new Sea();

        // 在场景底部，稍微推挤一下
        sea.mesh.position.y = -600;

        // 添加大海的网格至场景
        scene.add(sea.mesh);
    }


    createCube = () => {
        const geometry = new THREE.BoxGeometry(1, 2, 1, 4);//绘制一个立方体，擦书相当于定点位置 （three自带的对象）
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        //定义材质 我们这里用简单的颜色 ， 其他的属性可以写入对象，就可以更改材质
        const cube = new THREE.Mesh(geometry, material);
        //我们用到网格将 定义的材质用到定义的立方题上生成cube
        this.cube = cube //同样 为了方便我们在写方法的时候用到cube做此操作
        this.scene.add(cube);//将我们生成的cube放到场景中
    }



    createLine = () => {
        const material = new THREE.LineBasicMaterial({ color: 0x0f00ff }) //定义线的材质
        const geometry = new THREE.Geometry()
        geometry.vertices.push(new THREE.Vector3(-2, 0, 0))
        geometry.vertices.push(new THREE.Vector3(0, 2, 0)); //相当于是从 将前两个坐标连成一条线
        // geometry.vertices.push(new THREE.Vector3( 2, 0, 0) );
        const line = new THREE.Line(geometry, material)
        this.line = line
        line.position.x = -1
        line.position.y = 2
        this.scene.add(line)
    }

    animate = () => {
        requestAnimationFrame(this.animate);//像计时器一样渲染
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.line.rotation.x += 0.02 //立方体进行 的操作
        this.renderer.render(this.scene, this.camera);
    }






    componentWillUnmount() {
        this.mount.removeChild(this.renderer.domElement)
    }
    render() {
        return (
            <div
                id="world"
                style={{
                    width: '600px',
                    height: '600px',
                    background: '#f7d9aa',
                    //positon: 'absolute',

                }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }

}


function handleWindowResize() {
    // 更新渲染器的高度和宽度以及相机的纵横比
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}


//首先定义一个大海对象
function Sea() {
    // 创建一个圆柱几何体
    // 参数为：顶面半径，底面半径，高度，半径分段，高度分段
    var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

    // 在 x 轴旋转几何体
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // 创建材质
    var mat = new THREE.MeshPhongMaterial({
        color: Colors.blue,
        transparent: true,
        opacity: .6,
        shading: THREE.FlatShading,
    });

    // 为了在 Three.js 创建一个物体，我们必须创建网格用来组合几何体和一些材质
    this.mesh = new THREE.Mesh(geom, mat);

    // 允许大海对象接收阴影
    this.mesh.receiveShadow = true;
}


export default ThreeStudy
