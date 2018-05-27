// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        yun1: {
            default: null,
            type: cc.Prefab,
        },
        yun2: {
            default: null,
            type: cc.Prefab,
        },
        yun3: {
            default: null,
            type: cc.Prefab,
        },

        y1:null,
        y2:null,
        y3:null,

        bg1: {
            default: null,
            type: cc.Node,
        },
        bg2: {
            default: null,
            type: cc.Node,
        },
        y:550,

        bgSpeed:2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.y1 = cc.instantiate(this.yun1);
        this.y2 = cc.instantiate(this.yun2);
        this.y3 = cc.instantiate(this.yun3);
        this.node.addChild(this.y1);
        this.node.addChild(this.y2);
        this.node.addChild(this.y3);
      
        this.createYun1(this.y1);
        this.createYun1(this.y2);
        this.createYun1(this.y3);
        

       // this.runBG();
    },

    createYun1:function(yun){
        let vx = cc.director.getVisibleSize().width*0.5;

        let origin = cc.director.getVisibleOrigin();
        let rx = origin.x + cc.randomMinus1To1()*vx;
        //cc.log("rx " + rx);
        let vy = origin.y + cc.director.getVisibleSize().height*0.5 + 200;

        yun.setPosition(cc.v2(rx, vy));

        let rt = 5+ Math.random()*3;

        let callback = cc.callFunc(this.createYun1,this, this.y1);
        let seq = cc.sequence(cc.moveTo(rt,cc.v2(rx, -vy)),callback);
        // cc.log("pos1 xxx-->" + pos.x);
        yun.runAction(seq);
    },

    // runBG:function() {

    // },

 

    start () {

    },

     update (dt) {
        

        let bg1Y = this.bg1.getPosition().y;
        let bg2Y = this.bg2.getPosition().y;

        if(bg1Y<=-(cc.director.getVisibleSize().height)) {
            this.bg1.setPosition(this.bg1.getPosition().x,bg2Y+cc.director.getVisibleSize().height-this.bgSpeed);
        }else {
            bg1Y -= this.bgSpeed;
            this.bg1.setPosition(this.bg1.getPosition().x,bg1Y);
        }

        

        if(bg2Y<=-(cc.director.getVisibleSize().height)) {
            this.bg2.setPosition(this.bg2.getPosition().x,bg1Y+cc.director.getVisibleSize().height);
        }else {
            bg2Y -= this.bgSpeed;
            this.bg2.setPosition(this.bg2.getPosition().x,bg2Y);
        }

       
     },
});
