import ScoreController from "../Controller/ScoreController";
import { GameSave } from "./Define";

class Util{
    loadSave() {
        var x:GameSave = JSON.parse(localStorage.getItem("game_save"));
        ScoreController.instance.lastScore = x && isFinite(x.lastScore) && x.lastScore > 0 ? x.lastScore:0;
        ScoreController.instance.maxScore = x && isFinite(x.maxScore) && x.maxScore > 0 ? x.maxScore:0;
        this.setSave();
    }

    private lastSaveTime:Date;
    setSave() {
        if(this.lastSaveTime && new Date().getTime() - this.lastSaveTime.getTime() < 100) {
            // console.log("save too frequent")
            return
        }
        this.lastSaveTime = new Date();
        var x = new GameSave();
        x.maxScore = ScoreController.instance.maxScore;
        x.lastScore = ScoreController.instance.score;
        localStorage.setItem("game_save",JSON.stringify(x));
    }

    /**
     * 禁用多点触控的操作
     */
    dealMulityEventListener() {
        cc.Node["maxTouchNum"] = 1;
        cc.Node["touchNum"] = 0;
        var __dispatchEvent__ = cc.Node.prototype.dispatchEvent;
        cc.Node.prototype.dispatchEvent = function (event) {
            switch (event.type) {
                case 'touchstart':
                    if (cc.Node["touchNum"] < cc.Node["maxTouchNum"]) {
                        cc.Node["touchNum"]++;
                        this._canTouch = true;
                        __dispatchEvent__.call(this, event);
                    }
                    break;
                case 'touchmove':
                    if (!this._canTouch && cc.Node["touchNum"] < cc.Node["maxTouchNum"]) {
                        this._canTouch = true;
                        cc.Node["touchNum"]++;
                    }
    
                    if (this._canTouch) {
                        __dispatchEvent__.call(this, event);
                    }
    
                    break;
                case 'touchend':
                    if (this._canTouch) {
                        this._canTouch = false;
                        cc.Node["touchNum"]--;
                        __dispatchEvent__.call(this, event);
                    }
                    break;
                case 'touchcancel':
                    if (this._canTouch) {
                        this._canTouch = false;
                        cc.Node["touchNum"]--;
                        __dispatchEvent__.call(this, event);
                    }
                    break;
                default:
                    __dispatchEvent__.call(this, event);
            }
        };
    }
}
export default new Util();


