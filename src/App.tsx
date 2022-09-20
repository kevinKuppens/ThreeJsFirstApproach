import { useEffect } from 'react';
import { GUI } from 'dat.gui';
import {Mesh, Scene, BoxGeometry, MeshPhongMaterial, SpotLight } from 'three';


import InitScene from './scene/init.scene';
import MainGui from './gui/main.gui';

function App() {

  useEffect(() => {
    
    // INITIALIZE SCENE
    const mainScene = new InitScene('myThreeJsCanvas');
    mainScene.initialize();
    mainScene.animate();

    
    
    // BOX GEOMETRY
    const boxGeometry = new BoxGeometry( 8,8,8);
    const groundGeometry = new BoxGeometry(60, 4, 60);
    const redBoxMaterial = new MeshPhongMaterial({color: 0xff0000});
    const blueBoxMaterial = new MeshPhongMaterial({color: 0x00ff00});
    const greenBoxMaterial = new MeshPhongMaterial({color: 0x0000ff});
    const whiteBoxMaterial = new MeshPhongMaterial({ color: 0xffffff})
    const redBoxMesh = new Mesh(boxGeometry, redBoxMaterial);
    const blueBoxMesh = new Mesh(boxGeometry, blueBoxMaterial);
    const greenBoxMesh = new Mesh(boxGeometry, greenBoxMaterial);
    const whiteBoxMesh = new Mesh(groundGeometry, whiteBoxMaterial)
    redBoxMesh.position.set(20,16,0);
    greenBoxMesh.position.set(0,16,0);
    blueBoxMesh.position.set(-20, 16, 0);
    blueBoxMesh.castShadow = true;
    redBoxMesh.castShadow = true;
    greenBoxMesh.castShadow = true;
    whiteBoxMesh.position.set(0, 0, 0);
    whiteBoxMesh.receiveShadow = true;
    const meshes = [redBoxMesh, blueBoxMesh, greenBoxMesh, whiteBoxMesh];
    (mainScene.scene as Scene).add(...meshes);
    
    // GUI
    const gui= new GUI();
    const mainGui = new MainGui(gui, mainScene);
    mainGui.initGui();
    
  }, [])

  return (
    <div className='App'>
      <canvas id="myThreeJsCanvas" />
    </div>
  )
}

export default App
