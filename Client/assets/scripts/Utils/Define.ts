export enum BallScore{
    lv0=0,
    lv1=2,
    lv2=4,
    lv3=8,
    lv4=16,
    lv5=32,
    lv6=64,
    lv7=128,
    lv8=256,
    lv9=512,
    lv10=1024,
    lv11=2048
}

export enum BallColor{
    lv0="#FFFFFF",
    lv1="#FF6666",
    lv2="#FFCC99",
    lv3="#FF9900",
    lv4="#96E949",
    lv5="#FFFF66",
    lv6="#FF6699",
    lv7="#CCFF66",
    lv8="#B45DDD",
    lv9="#99CCFF",
    lv10="#0099FF",
    lv11="#FF99CC"
}

export class GameSave{
    lastScore:number = 0;
    maxScore:number = 0;
}

export enum CLIENT_EVENT{
    SCORE_UPDATE = "SCORE_UPDATE",
    RESET_BALL = "RESET_BALL",
    DROP_BALL = "DROP_BALL",
    GAME_OVER = "GAME_OVER"
}

export enum SCENE_NAME{
    PRELOAD="Preload",
    GAME="Game",
    HOME="Home",
}