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
        var pos = this.node.getPosition();
          
        var rx = -300 + Math.random()*320;
        
        
        pos.x = rx;
        pos.y = this.y;

        this.y1.setPosition(pos);
        pos.y = -this.y;
        var callback = cc.callFunc(this.yun1Callback,this);
        var seq = cc.sequence(cc.moveTo(1,pos),callback);
        this.y1.runAction(cc.repeatForever(seq));
       // this.yun2.runAction();
        //this.yun3.runAction();
    },

    yun1Callback:function() {
        var rx = -480 + Math.random()*320;
        cc.log(rx);
        //cc.log(posy);
      // cc.log(this.yun1);
        //cc.log(this.getPosition());
         this.y1.setPosition(rx,this.y);
    },

    start () {

    },

    // update (dt) {},
});
