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
        effectButton: {
            default: null,
            type: cc.Sprite,
        },

        gameBgButton: {
            default: null,
            type: cc.Sprite,
        },
        onSprite: {
            default: null,
            type: cc.Sprite,
        },
        offSprite: {
            default: null,
            type: cc.Sprite,
        },

        audio: {
            url: cc.AudioClip,
            default: null
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },
        
        onWho:null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let gameSoundBG = cc.sys.localStorage.getItem('gameSoundBG');
        let effectSound = cc.sys.localStorage.getItem('effectSound');
        if (gameSoundBG == 1) {
            this.gameBgButton.spriteFrame = this.onSprite.spriteFrame;
        } else {
            this.gameBgButton.spriteFrame = this.offSprite.spriteFrame;
        }

        if (effectSound == 1) {
            this.effectButton.spriteFrame = this.onSprite.spriteFrame;
        } else {
            this.effectButton.spriteFrame = this.offSprite.spriteFrame;
        }

        this.startFadeIn();
    },

    startFadeIn: function () {
        cc.eventManager.pauseTarget(this.node, true);
        this.node.position = cc.p(0, 0);
        this.node.setScale(2);
        this.node.opacity = 0;

        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.3)), cbFadeIn);
        this.node.runAction(actionFadeIn);
    },
    onFadeInFinish: function () {
        cc.eventManager.resumeTarget(this.node, true);
    },

    onEffectButtonClick: function () {
    
        let effectSound = cc.sys.localStorage.getItem('effectSound');
        cc.audioEngine.playEffect(this.buttonAudio,false);
        if (effectSound == 1) {
            cc.log("offEffectButtonClick");
            cc.sys.localStorage.setItem('effectSound', 0);
            this.effectButton.spriteFrame = this.offSprite.spriteFrame;
            //关闭的实际代码
           // cc.audioEngine.pauseAllEffects();
           cc.audioEngine.setEffectsVolume(0.0);

           cc.audioEngine.setMusicVolume(0.1);
           
        } else {
            cc.log("onEffectButtonClick");
            cc.sys.localStorage.setItem('effectSound', 1);
            this.effectButton.spriteFrame = this.onSprite.spriteFrame;
            //打开的实际代码
            cc.audioEngine.setEffectsVolume(0.1);
        }
    },

    onBgButtonClick: function () {
        cc.log("onBgButtonClick");
        cc.audioEngine.playEffect(this.buttonAudio,false);
        let gameSoundBG = cc.sys.localStorage.getItem('gameSoundBG');
        if (gameSoundBG == 1) {
            cc.sys.localStorage.setItem('gameSoundBG', 0);
            this.gameBgButton.spriteFrame = this.offSprite.spriteFrame;
            //关闭的实际代码
            cc.audioEngine.stopMusic();
        } else {
            cc.sys.localStorage.setItem('gameSoundBG', 1);
            this.gameBgButton.spriteFrame = this.onSprite.spriteFrame;
            //打开的实际代码
            cc.audioEngine.playMusic(this.audio, true);
        }
    },

    onCancelClick: function () {
        cc.log("onCancelClick");
        cc.audioEngine.playEffect(this.buttonAudio,false);
        cc.eventManager.pauseTarget(this.node, true);

        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);


        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);


        this.node.runAction(actionFadeOut);
    },

    onFadeOutFinish: function () {
        cc.eventManager.resumeTarget(this.onWho,true);
        this.node.destroy();
    },


});



