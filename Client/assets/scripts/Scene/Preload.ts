import { SCENE_NAME } from "../Utils/Define";
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
