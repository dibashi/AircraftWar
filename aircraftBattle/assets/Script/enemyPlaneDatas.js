var _generateType = cc.Enum({
    jinbi: 0,
    wudichongci: 1,
    xinjiaxue: 2,
    jisushesu: 3,
    huojianpao: 4
});

//敌人子弹发射轨迹 跟机型挂钩？ 目前是这样实现的
var _bulletTrack = cc.Enum({
    zhixianxiangxia: 0, //普通的直线向下
    dingwei: 1,//普通的定位发射
   // xiexian: 2,//斜线 给定角度 逆时针0～180 顺时针 0～-180  以后作为别的弹道的子函数调用，单独使用没有任何意义
   banquan:2, //半圈
   yiquan:3,//一圈
   sanfazhizhixian:4,//三发直线
   sanfasanshe: 5,//普通的三发散射 中间定位 两边一个角度
   // jisushesu: 3,
   // huojianpao: 4
});

//敌人运动轨迹 跟机型挂钩？ 目前是这样实现的
var _enemyTrack = cc.Enum({
    zuoyoushangxia: 0, //左右上下摇动
    guding: 1,//固定不动

});

var _bulletType = cc.Enum({
    jipao:0,
    huopao:1,
    guangshu:2,
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
var _enemyPlaneData = [
    {enemyID:0, planeImage: "enemyPlane0", blood: 20, shootingSpeed: 1, flyingSpeed: 4, bulletType: _bulletType.jipao, damage: 1,dropProbability:0.65,fallingObject:_generateType.jinbi,bulletTrack:_bulletTrack.sanfazhixian,enemyTrack:_enemyTrack.zuoyoushangxia },
    {enemyID:1, planeImage: "enemyPlane1", blood: 25, shootingSpeed: 1, flyingSpeed: 3, bulletType: _bulletType.huopao, damage: 1,dropProbability:0.5,fallingObject:_generateType.wudichongci,bulletTrack:_bulletTrack.banquan,enemyTrack:_enemyTrack.zuoyoushangxia },
    {enemyID:2, planeImage: "enemyPlane2", blood: 30, shootingSpeed: 1, flyingSpeed: 4, bulletType: _bulletType.jipao, damage: 1,dropProbability:1,fallingObject:_generateType.xinjiaxue,bulletTrack:_bulletTrack.dingwei,enemyTrack:_enemyTrack.zuoyoushangxia },
    {enemyID:3, planeImage: "enemyPlane3", blood: 35, shootingSpeed: 1, flyingSpeed: 4, bulletType: _bulletType.huopao, damage: 2,dropProbability:0.9,fallingObject:_generateType.jisushesu,bulletTrack:_bulletTrack.yiquan,enemyTrack:_enemyTrack.zuoyoushangxia },
    {enemyID:4, planeImage: "enemyPlane4", blood: 40, shootingSpeed:1, flyingSpeed: 4, bulletType: _bulletType.huopao, damage: 2,dropProbability:1,fallingObject:_generateType.huojianpao,bulletTrack:_bulletTrack.dingwei,enemyTrack:_enemyTrack.zuoyoushangxia },

];

var _stage = [
    [
        {enemyID:0},{enemyID:0}
    ],
    [
        {enemyID:0},{enemyID:0},{enemyID:0}
    ],
    [
        {enemyID:1},{enemyID:3}
    ],
    [
        {enemyID:0},{enemyID:4},{enemyID:1}
    ],
    [
        {enemyID:2},{enemyID:0},{enemyID:1}
    ],
    [
        {enemyID:4},{enemyID:4},{enemyID:1}
    ],
    [
        {enemyID:0},{enemyID:2},{enemyID:1}
    ],
    [
        {enemyID:2},{enemyID:3},{enemyID:3}
    ],
    [
        {enemyID:4},{enemyID:0},{enemyID:1}
    ],
    [
        {enemyID:0},{enemyID:3},{enemyID:1}
    ],
    [
        {enemyID:2},{enemyID:0},{enemyID:1}
    ],
    [
        {enemyID:0},{enemyID:3},{enemyID:1}
    ]
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