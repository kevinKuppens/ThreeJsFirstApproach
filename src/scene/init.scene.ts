import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class InitScene {

    public ambiantLight: THREE.AmbientLight | undefined;
    public spotLight: THREE.SpotLight | undefined;

    // Variable def and default value assignement

    fov:number = 45;
    canvasId:string;
    scene:THREE.Scene | undefined;
    canvas: HTMLCanvasElement | undefined;
    stats:  Stats | undefined;
    camera: THREE.PerspectiveCamera | undefined;
    controls: OrbitControls | undefined;
    renderer: THREE.WebGLRenderer | undefined;
    clock: THREE.Clock | undefined;

    constructor(canvasId:string){
        this.canvasId = canvasId;
    }

    initialize():void{
        // USEFULL VARIABLES
        const { innerWidth, innerHeight} = window;

        // CAMERA DEFINITION
        this.camera = new THREE.PerspectiveCamera( 50, innerWidth / innerHeight , 1, 1000 );
        this.camera.position.z = 96;

        // CLOCK DEFINITION
        this.clock = new THREE.Clock();

        // SCENE DEFINITION 
        this.scene = new THREE.Scene();

        // CANVAS DEFINITION
        this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;

        // RENDERER DEFINITION
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias : true});
        this.renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // CONTROLS DEFINITION
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.stats = Stats();
        document.body.appendChild(this.stats.dom);


        // LIGHTS DEFINITION
        this.ambiantLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambiantLight.castShadow = true;
        this.scene.add(this.ambiantLight);

        this.spotLight =  new THREE.SpotLight(0xffffff, 1);
        this.spotLight.castShadow = true;
        this.spotLight.position.set(0,62,32);
        const spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        this.scene.add(this.spotLight, spotLightHelper);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        // RESIZING WINDOW
        window.addEventListener('resize', () => this.onWindowResize, false);
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats?.update();
        this.controls?.update();
    }

    render(){
        this.renderer?.render(this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera);
    }

    onWindowResize(){
        const { innerWidth, innerHeight } = window;
        (this.camera as THREE.PerspectiveCamera).aspect = innerWidth/innerHeight;
        (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();
        this.renderer?.setSize(innerWidth, innerHeight);
    }
}