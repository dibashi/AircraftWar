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
        y:550,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.y1 = cc.instantiate(this.yun1);
        this.y2 = cc.instantiate(this.yun2);
        this.y3 = cc.instantiate(this.yun3);
        this.node.addChild(this.y1);
        this.node.addChild(this.y2);
        this.node.addChild(this.y3);
        cc.log("1！");
        cc.log(this.y1);
       // cc.log(yun1);
        //随机一个位置
        // var pos = this.node.getPosition();
          
        // var rx = -300 + Math.random()*320;
        
        
        // pos.x = rx;
        // pos.y = this.y;

        // this.y1.setPosition(pos);
        // pos.y = -this.y;
        // var callback = cc.callFunc(this.yun1Callback,this, this.y1);
        // var seq = cc.sequence(cc.moveTo(1,pos),callback);
        // cc.log("pos1 xxx-->" + pos.x);
        // this.y1.runAction(cc.repeatForever(seq));

        // var pos2 =  cc.v2(-100 + Math.random()*320,pos.y);
        // var callback2 = cc.callFunc(this.yun2Callback,this, this.y2);
        // var seq2 = cc.sequence(cc.moveTo(1,pos2),callback2);
        // cc.log("pos2 xxx-->" + pos2.x);
        // this.y2.runAction(cc.repeatForever(seq2));
       
        this.createYun1(this.y1);
        this.createYun1(this.y2);
        this.createYun1(this.y3);
       // this.yun2.runAction();
        //this.yun3.runAction();
    },

    createYun1:function(yun){
        let vx = cc.director.getVisibleSize().width*0.5;

        let origin = cc.director.getVisibleOrigin();
        let rx = origin.x + cc.randomMinus1To1()*vx;
        //cc.log("rx " + rx);
        let vy = origin.y + cc.director.getVisibleSize().height*0.5 + 200;

        yun.setPosition(cc.v2(rx, vy));

        let rt = 3+ Math.random()*3;

        let callback = cc.callFunc(this.createYun1,this, this.y1);
        let seq = cc.sequence(cc.moveTo(rt,cc.v2(rx, -vy)),callback);
        // cc.log("pos1 xxx-->" + pos.x);
        yun.runAction(seq);
    },

 

    start () {

    },

    // update (dt) {},
});
