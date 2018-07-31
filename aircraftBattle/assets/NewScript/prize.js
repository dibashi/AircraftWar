// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var generateType = require("enemyPlaneDatas").generateType;

cc.Class({
    extends: cc.Component,
    properties: {

        prizeType: -1,//决定其是什么类型的奖品
        t: 1.0,

        jinbiRunFlag: true,//由于有些敌机会掉落金币，需要先将金币炸开，
        //然后飞向本方飞机，做 一个标记 ,正常飞机都可以飞，这种飞机需要先炸开之后飞

        prizeAudio: {
            default: null,
            url: cc.AudioClip
        },

        prizePool: null,

        isPause: false,
    },

    onLoad() {
        this.jinbiRunFlag = true;
    },



    update(dt) {

        if (this.node.getPosition().y < -this.node.parent.height / 2 - 50) {
            this.node.destroy();
        }

        if (this.isPause) {
            return;
        }

        if (this.prizeType == generateType.jinbi && this.jinbiRunFlag == false) {
            return;
        }

        let ePos = this.node.parent.getComponent('Game').player.getPosition();
        let bPos = this.node.getPosition();
        let dx = ePos.x - bPos.x;
        let dy = ePos.y - bPos.y;

        let dis = Math.sqrt(dx * dx + dy * dy);
        let ndx = dx / dis;
        let ndy = dy / dis;

        if (this.prizeType != generateType.jinbi && this.prizeType != 10) {

           
          //  let speed = 5;
           // this.node.setPosition(bPos.x, bPos.y - speed);

        } else if (this.prizeType == generateType.jinbi) {

            let speed = 15;

            let rdx = ndx * speed * dt * 60;
            let rdy = ndy * speed * dt * 60;
            this.node.setPosition(bPos.x + rdx, bPos.y + rdy);

        } else if (this.prizeType == 10) {//掉落金币阶段
            let speed = 25;
            this.node.setPosition(bPos.x, bPos.y - speed);
        }


    },

    normalizeVector: function (x, y) {

    },

    pauseAction: function () {
        this.isPause = true;
        cc.log("子弹暂停");
        this.node.pauseAllActions();

        if (this.node.getComponent(cc.Animation) != null && this.node.getComponent(cc.Animation) != undefined) {
            this.node.getComponent(cc.Animation).pause();
        }
    },

    resumeAction: function () {
        this.isPause = false;
        this.node.resumeAllActions();

        if (this.node.getComponent(cc.Animation) != null && this.node.getComponent(cc.Animation) != undefined) {
            this.node.getComponent(cc.Animation).resume();
        }
    },



    onCollisionEnter: function (other, self) {
        if (other.node.group === "hero") {

            //根据奖品类型来触发属性，game中的引用较多，直接传给game让其处理。
            switch (this.prizeType) {
                case generateType.jinbi:
                    this.node.parent.getComponent("Game").getJinBi();
                   // cc.audioEngine.playEffect(this.prizeAudio,false);
                    break;
                case 10:
                    this.node.parent.getComponent("Game").getJinBi();
                    cc.audioEngine.playEffect(this.prizeAudio,false);
                    break;
                case generateType.wudichongci:
                    this.node.parent.getComponent("Game").getShield();
                    cc.audioEngine.playEffect(this.prizeAudio, false);
                    break;
                case generateType.xinjiaxue:
                    cc.log("get xinjiaxue!");
                    other.node.getComponent("Player").addBlood();
                    cc.audioEngine.playEffect(this.prizeAudio, false);
                    break;
                case generateType.jisushesu:
                    cc.log("get jisushesu!");
                    // other.node.getComponent("Player").raiseTheSpeedOfFire();
                    //播放火力提升动画
                    this.node.parent.getComponent("Game").fireBoostAni();
                    other.node.getComponent("Player").upgradePlane();
                    cc.audioEngine.playEffect(this.prizeAudio, false);
                    break;
                case generateType.huojianpao:
                    cc.log("get huojianpao!");
                    this.node.parent.getComponent("Game").getHuoJianPao();
                    cc.audioEngine.playEffect(this.prizeAudio, false);
                    break;
            }

            // this.node.destroy();
            if (this.prizePool != undefined && this.prizePool != null) { //掉落金币那一块 没有使用对象池，所以这里添加了代码
                this.prizePool.put(this.node);
            } else {
                this.node.destroy();
            }

        }

    },
});
