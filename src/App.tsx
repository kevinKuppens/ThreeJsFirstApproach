import { useEffect } from 'react';
import { GUI } from 'dat.gui';
import {Mesh, Scene, BoxGeometry, MeshPhongMaterial } from 'three';


import InitScene from './scene/init.scene';

function App() {

  useEffect(() => {
    
    // INITIALIZE SCENE
    const mainScene = new InitScene('myThreeJsCanvas');
    mainScene.initialize();
    mainScene.animate();

    
    // BOX GEOMETRY
    const boxGeometry = new BoxGeometry(24,24,24);
    const boxMaterial = new MeshPhongMaterial({color: 0xff0000});
    const boxMesh = new Mesh(boxGeometry, boxMaterial);
    (mainScene.scene as Scene).add(boxMesh);
    
    // GUI
    const gui= new GUI();
    
    const geometryFolder = gui.addFolder('Mesh Geometry');
    geometryFolder.open();
    const rotationFolder = geometryFolder.addFolder('Rotation');
    rotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X axis');
    rotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y axis');
    rotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z axis');
    const scaleFolder = geometryFolder.addFolder('Scale');
    scaleFolder.add(boxMesh.scale, 'x', 0, 2).name('Scale x axis');
    scaleFolder.add(boxMesh.scale, 'y', 0, 2).name('Scale Y axis');
    scaleFolder.add(boxMesh.scale, 'z', 0, 2).name('Scale Z axis');
    
    const materialFolder = gui.addFolder('Mesh Material');
    materialFolder.open();
    const materialParams = {
      boxMeshColor : boxMesh.material.color.getHex()
    }
    materialFolder.add(boxMesh.material, 'wireframe');
    materialFolder.addColor(materialParams, 'boxMeshColor').onChange((value)=> boxMesh.material.color.set(value))
    
    
  }, [])

  return (
    <div className='App'>
      <canvas id="myThreeJsCanvas" />
    </div>
  )
}

export default App
