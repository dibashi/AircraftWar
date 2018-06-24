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

        p: 0,//上边界 超出就销毁子弹

        bulletPool1: null, //主机子弹
        bulletPool2: null,//僚机子弹
        bulletPool3: null,//跟踪子弹

        bulletPoolType: -1, //1 主机 2 僚机 3跟踪

        isPause: false,

        shoujiAni: null,

        shoujiAniPre: {
            default: null,
            type: cc.Prefab,
        },

        shoujiAudio:{
            default:null,
            url:cc.AudioClip,
        },

        isPoolBullet: false,//子弹是否是子弹池的 
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

    resumeAction: function () {
        this.isPause = false;
    },

    update(dt) {


        if (this.isPause) {
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
                if (cs[i].group === 'enemy' && cs[i].getComponent(cs[i]._name).blood > 0) {
                    break;
                }
            }
            if (i != cc) {
                let ePos = cs[i].getPosition();
                let bPos = this.node.getPosition();
                let dx = ePos.x - bPos.x;
                let dy = ePos.y - bPos.y;
                let ndx = dx / (Math.sqrt(dx * dx + dy * dy));
                let ndy = dy / (Math.sqrt(dx * dx + dy * dy));


                let rdx = ndx * this.flyingSpeed * dt * 60;
                let rdy = ndy * this.flyingSpeed * dt * 60;
                this.node.setPosition(bPos.x + rdx, bPos.y + rdy);
            } else {
                this.node.y += this.flyingSpeed * dt * 60;
            }

            //获得敌机，然后追踪


        } else {
            this.node.y += this.flyingSpeed * dt * 60;
        }

        if (this.node.getPosition().y > this.p) {

            if (this.bulletPoolType == 1) {
                if (this.isPoolBullet) {
                    this.bulletPool1.put(this.node);
                } else {
                    this.node.destroy();
                }
            } else if (this.bulletPoolType == 2) {
                this.bulletPool2.put(this.node);
            } else if (this.bulletPoolType == 3) {
                this.bulletPool3.put(this.node);
            }


        }

    },

    getEnemyDistance: function (enemy) {

        var enemy = enemy.getPosition();

        var dist = cc.pDistance(this.node.position, enemy);
        return dist;
    },

    onCollisionEnter: function (other, self) {

        //如果在这里做一个受击动画池，会不会提高性能？ 
        //由子弹类维护显然不合适，因为这些子弹消亡的很快
        //算了 我怕引入bug，以后再说
        let sjPool = cc.find("Canvas").getComponent("Game").shoujiPool;
        this.shoujiAni = null;
        if (sjPool.size() > 0) {
            this.shoujiAni = sjPool.get();

        } else {
            this.shoujiAni = cc.instantiate(this.shoujiAniPre);
        }

        if (this.shoujiAni != null) {
            if(this.node.parent!=null) {
                this.node.parent.addChild(this.shoujiAni);
            }
            
            var anim = this.shoujiAni.getComponent(cc.Animation);
            this.shoujiAni.setPosition(this.node.getPosition().x, this.node.getPosition().y + this.node.getContentSize().height / 2);

            cc.audioEngine.playEffect(this.shoujiAudio,false);

            anim.play();
        }


        //this.node.destroy();


        if (this.bulletPoolType == 1) {
            if (this.isPoolBullet) {
                this.bulletPool1.put(this.node);
            } else {
                this.node.destroy();
            }
        } else if (this.bulletPoolType == 2) {
            this.bulletPool2.put(this.node);
        } else if (this.bulletPoolType == 3) {
            this.bulletPool3.put(this.node);
        }


    },
});
