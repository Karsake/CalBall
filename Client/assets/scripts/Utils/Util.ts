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
    /**
     * 展示一个toast
     * 展示时间dration默认2000毫秒
     * 消失延时fadeDelay默认500毫秒
     * TODO 这玩意没做完
     */
    showToast(text:string,success:Function,duration?:number,fadeDelay?:number) {
        if(typeof(text) != "string") {
            return
        }
        var fadeInterval = 100;//每次消失间隔100毫秒
        var startOpacity = 0.5;
        if(!duration || duration < 0) {
            duration = 2000;
        }
        if(!fadeDelay || fadeDelay < 0) {
            fadeDelay = 500;
        }
        let newToast:HTMLElement = new HTMLElement();
        
        let backImage = document.createElement("canvas");
        newToast.appendChild(backImage);
        backImage.width = 10;
        backImage.height = 10;
        let ctx:CanvasRenderingContext2D = backImage.getContext("2d");
        ctx.fillStyle = "gray";
        ctx.fillRect(0,0,10,10);

        let newLabel:HTMLElement = document.createElement("LABEL");
        newToast.appendChild(newLabel);
        newLabel.style.overflow =  "visible";
        newLabel.style.verticalAlign = "middle";
        newLabel.style.textAlign = "center";
        newLabel.style.width = "380";
        newLabel.innerText = text;

        newToast.style.width = newLabel.style.width + 30;
        newToast.style.height = newLabel.style.height + 30;
        newToast.style.verticalAlign = "middle";
        newToast.style.textAlign = "center";
        newToast.style.opacity = startOpacity + "";
        
        document.body.appendChild(newToast);

        window.setTimeout(function(){
            var id = window.setInterval(() => {
                newToast.style.opacity = parseInt(newToast.style.opacity) - startOpacity * fadeInterval / fadeDelay + "";
                if(parseInt(newToast.style.opacity) <= 0) {
                    window.clearTimeout(id);
                    newToast.remove();
                    if(typeof(success) == "function") {
                        success();
                    }
                }
            }, fadeInterval)
        },duration)
        
    }
}
export default new Util();


