var _generateType = cc.Enum({
    jinbi: 0, //金币
    wudichongci: 1, //护盾
    xinjiaxue: 2, //废除
    jisushesu: 3,//jisu
    huojianpao: 4 //dazhao
});

//敌人子弹发射轨迹 跟机型挂钩？ 目前是这样实现的
var _bulletTrack = cc.Enum({
    zhixianxiangxia: 0, //普通的直线向下
    dingwei: 1,//普通的定位发射
    // xiexian: 2,//斜线 给定角度 逆时针0～180 顺时针 0～-180  以后作为别的弹道的子函数调用，单独使用没有任何意义
    banquan: 2, //半圈
    yiquan: 3,//一圈
    sanfazhizhixian: 4,//三发直线
    wufasanshe: 5,//普通的五发散射 中间定位 两边一个角度 

    // jisushesu: 3,
    // huojianpao: 4
});

//敌人运动轨迹 跟机型挂钩？ 目前是这样实现的
var _enemyTrack = cc.Enum({
    zuoyoushangxia: 0, //左右上下摇动
    guding: 1,//固定不动

});

var _bulletType = cc.Enum({
    jipao: 0,
    huopao: 1,
    guangshu: 2,
});

var _dropJinBiCount = 1;//默认一个金币加1数值
var _jinBiCount = 100;//默认金币数
//激素提速多少速度 不在提速 而是数值上直接加上去 以前的实现到最后会逼近无穷
var _jiSuTiSu = 0.2;

//激素与无敌的持续时间
var _jiSuTime = 8;
var _wuDiTime = 8;

//bullet type 0:机炮 1:火炮
//gid从1开始
//bulletType 已失效！！！这个数据暂时先不做，无论如何设置都是根据当前敌机bullet0预制体来设置的！
var _enemyPlaneData = [
    { enemyID: 0, blood: 5, shootingSpeed: 0.5, flyingSpeed: 7, damage: 1, dropProbability: 0.5, fallingObject: _generateType.jinbi },
    { enemyID: 1, blood: 100, shootingSpeed: 0.5, flyingSpeed: 7, damage: 1, dropProbability: 0.1, fallingObject: _generateType.wudichongci },
    { enemyID: 2, blood: 5, shootingSpeed: 0.5, flyingSpeed: 7, damage: 1, dropProbability: 0.5, fallingObject: _generateType.jinbi },
    { enemyID: 3, blood: 5, shootingSpeed: 0.5, flyingSpeed: 7, damage: 1, dropProbability: 0.3, fallingObject: _generateType.jisushesu },
    { enemyID: 4, blood: 5, shootingSpeed: 0.5, flyingSpeed: 7, damage: 1, dropProbability: 0.1, fallingObject: _generateType.huojianpao },

    { enemyID: 5, blood: 50, shootingSpeed: 1, flyingSpeed: 9, damage: 1, dropProbability: 1, fallingObject: _generateType.jinbi },
    { enemyID: 6, blood: 120, shootingSpeed: 0.5, flyingSpeed: 9, damage: 1, dropProbability: 1, fallingObject: _generateType.jinbi },

];



var _stage = [
    //1
    [
        { enemyID: 2, beginX: 0, beginY: 800, endX: 0, endY: 360 },


    ],
    //2
    [
        { enemyID: 2, beginX: 0, beginY: 800, endX: 0, endY: 360 },


    ],
    //3
    [
        { enemyID: 2, beginX: 0, beginY: 800, endX: 0, endY: 360 },


    ],
    //4
    [
        { enemyID: 0, beginX: 120, beginY: 800, endX: 120, endY: 420 },
        { enemyID: 0, beginX: -120, beginY: 800, endX: -120, endY: 420 },
        { enemyID: 0, beginX: 240, beginY: 800, endX: 240, endY: 300 },
        { enemyID: 0, beginX: -240, beginY: 800, endX: -240, endY: 300 }
    ],

    //5
    [
        { enemyID: 0, beginX: 120, beginY: 800, endX: 120, endY: 300 },
        { enemyID: 0, beginX: -120, beginY: 800, endX: -120, endY: 300 },
        { enemyID: 0, beginX: 240, beginY: 800, endX: 240, endY: 420 },
        { enemyID: 0, beginX: -240, beginY: 800, endX: -240, endY: 420 },
        { enemyID: 1, beginX: 0, beginY: 800, endX: 0, endY: 360 }//这个是中间
    ],
    //6
    [
        { enemyID: 5, beginX: 0, beginY: 800, endX: 0, endY: 360 },


    ],
    //7
    [
        { enemyID: 2, beginX: 180, beginY: 800, endX: 180, endY: 300 },
        { enemyID: 2, beginX: -180, beginY: 800, endX: -180, endY: 300 },

        { enemyID: 2, beginX: 0, beginY: 800, endX: 0, endY: 360 }//这个是中间
    ],
    //8
    [
        { enemyID: 5, beginX: 180, beginY: 800, endX: 180, endY: 420 },
        { enemyID: 5, beginX: -180, beginY: 800, endX: -180, endY: 360 }

    ],

    //9
    [
        { enemyID: 3, beginX: 180, beginY: 800, endX: 180, endY: 360 },
        { enemyID: 3, beginX: -180, beginY: 800, endX: -180, endY: 420 }

    ],









];

export const generateType = _generateType;
export const bulletType = _bulletType;
export const enemyPlaneData = _enemyPlaneData;
export const stageData = _stage;

export const dropJinBiCount = _dropJinBiCount;
export const jinBiCount = _jinBiCount;

export const jiSuTiSu = _jiSuTiSu;

export const jiSuTime = _jiSuTime;
export const wuDiTime = _wuDiTime;

export const bulletTrack = _bulletTrack;
export const enemyTrack = _enemyTrack;