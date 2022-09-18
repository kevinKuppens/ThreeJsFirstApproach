import { useEffect } from 'react'
import * as Three from 'three';
import './App.css'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { render } from 'react-dom';
import InitScene from './scene/init.scene';

function App() {

  useEffect(() => {
    
    // INITIALIZE SCENE
    const mainScene = new InitScene('myThreeJsCanvas');
    mainScene.initialize();
    mainScene.animate();

    // ADD A BOX GEOMETRY
    const boxGeometry = new Three.BoxGeometry(16,16,16);
    const boxMaterial = new Three.MeshNormalMaterial();
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
    (mainScene.scene as Three.Scene).add(boxMesh);
  }, [])

  return (
    <div className='App'>
      <canvas id="myThreeJsCanvas" />
    </div>
  )
}

export default App
