import { SCENE_NAME } from "../Utils/GameConfig";
import Util from "../Utils/Util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Preload extends cc.Component {

    onLoad () {
        Util.loadSave();
        cc.director.loadScene(SCENE_NAME.HOME);
    }

    // start () {

    // }

    // update (dt) {}
}
