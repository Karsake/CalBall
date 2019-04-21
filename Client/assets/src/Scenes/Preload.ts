import { SCENE_NAME } from "../Utils/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Preload extends cc.Component {
    onLoad () {
        cc.director.loadScene(SCENE_NAME.GAME);
    }

    // start () {

    // }

    // update (dt) {}
}
