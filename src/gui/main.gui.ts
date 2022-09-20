import { GUI } from "dat.gui";

export default class MainGui{
    gui: GUI;
    mainScene!: any;
    constructor(globalGui: GUI, mainScene: any){
        this.gui = globalGui;
        this.mainScene = mainScene;
    }

    initGui(){
        if(this.mainScene.ambiantLight){
            const alForlder = this.gui.addFolder('Ambiant Light');
            const alSettings = { color: this.mainScene.ambiantLight.color.getHex()};
            alForlder.add(this.mainScene.ambiantLight, 'visible');
            alForlder.add(this.mainScene.ambiantLight, 'intensity', 0, 1, 0.25);
            alForlder.addColor(alSettings, 'color').onChange((value)=> this.mainScene.ambiantLight?.color.set(value));
            alForlder.open();
          }
          if(this.mainScene.spotLight){
            const spotLightFolder = this.gui.addFolder('SpotLight');
      
            const spotLightGlobalProperty = spotLightFolder.addFolder('Global settings');
            spotLightGlobalProperty.add(this.mainScene.spotLight, 'visible');
            spotLightGlobalProperty.add(this.mainScene.spotLight, 'castShadow');
            spotLightGlobalProperty.add(this.mainScene.spotLight, 'intensity', 0, 1, 0.25);
            spotLightGlobalProperty.add(this.mainScene.spotLight,'angle', 0, Math.PI).name('Angle x');
            const spotLightSettings = { color: this.mainScene.spotLight.color.getHex()};
            spotLightGlobalProperty.addColor(spotLightSettings, 'color').onChange((value) => this.mainScene.spotLight?.color.set(value));
      
            const spotLightPosition = spotLightFolder.addFolder('Position');
            spotLightPosition.add(this.mainScene.spotLight.position, 'x').name('Position x');
            spotLightPosition.add(this.mainScene.spotLight.position, 'y').name('Position y');
            spotLightPosition.add(this.mainScene.spotLight.position, 'z').name('Position z');
        }
    }


}