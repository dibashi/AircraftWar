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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // enemys : [],
        //Radius:33,
        flyingSpeed: 0,//一帧飞行像素 目前只是Y轴的移动速度
        damage: 0,
        trackOpen: false, //是否为追踪弹

        p:0,//上边界 超出就销毁子弹

        bulletPool:null,

        isPause:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
       // this.p = this.node.parent.getContentSize().height / 2 + this.node.getContentSize().height / 2;
       
     

       this.p = this.node.parent.getContentSize().height / 2 + this.node.getBoundingBox().height / 2;
       
    },

    pauseAction: function () {
        this.isPause = true;
      
      
    },

    resumeAction:function() {
        this.isPause = false;
    },

    update(dt) {


        if(this.isPause) {
            return;
        }
        
        // this.node.x += this.flyingSpeed;
        if (this.trackOpen == true) {
           
            let gameNode = this.node.parent;
            let gameJS = gameNode.getComponent('Game');
            let cs = gameNode.children;
            let cc = gameNode.childrenCount;
            let i = 0;
            for (i = 0; i < cc; i++) {
                if (cs[i].group === 'enemy' && cs[i].getComponent(cs[i]._name).blood>0) {
                    break;
                }
            }
            if(i!=cc) {
                let ePos = cs[i].getPosition();
                let bPos = this.node.getPosition();
                let dx = ePos.x - bPos.x;
                let dy = ePos.y - bPos.y;
                let ndx = dx / (Math.sqrt(dx * dx + dy * dy));
                let ndy = dy / (Math.sqrt(dx * dx + dy * dy));


                let rdx = ndx * this.flyingSpeed*dt*60;
                let rdy = ndy * this.flyingSpeed*dt*60;
                this.node.setPosition(bPos.x + rdx, bPos.y + rdy);
            } else {
                this.node.y += this.flyingSpeed*dt*60;
            }
           
            //获得敌机，然后追踪


        } else {
            this.node.y += this.flyingSpeed*dt*60;
        }

        if (this.node.getPosition().y > this.p) {
           // this.node.destroy();
           this.bulletPool.put(this.node);
        }

    },

    getEnemyDistance: function (enemy) {

        var enemy = enemy.getPosition();

        var dist = cc.pDistance(this.node.position, enemy);
        return dist;
    },

    onCollisionEnter: function (other, self) {

        this.node.destroy();
    },
});
