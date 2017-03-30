/**
 * Created by Administrator on 2016/12/20.
 */

//构造一个函数
function ColorBall (option) {
    this._init(option);
}

//小球的原型
ColorBall.prototype = {
    //指向小球
    constructor:ColorBall,
//创建对象的固有属性
    _init:function (option) {
        var option = option||{};
        this.parentId = option.parentId;
        //位置属性
        this.left = option.left||0;
        this.top= option.top||0;
        this.r = 80;
        this.bgColor = option.bgColor||'blue';

        //创建渐变的属性
        this.dx = _.random(-5,5);
        this.dy = _.random(-5,5);
        this.dr = _.random(1,3);
    },
    //绘制方法
    render:function () {
        var parentNode = document.getElementById(this.parentId);
        var childNode = document.createElement('div');
        parentNode.appendChild(childNode);

        childNode.style.position = 'absolute';
        parentNode.style.position = 'relative';
        childNode.style.left = this.left +'px';
        childNode.style.top = this.top +'px';
        childNode.style.width = this.r+'px';
        childNode.style.height = this.r +'px';
        childNode.style.borderRadius = '50%';
        childNode.style.background = this.bgColor;

    },
    //小球不断的变小
    update:function () {
        this.left += this.dx;
        this.top += this.dy;
        this.r -= this.dr;
        if(this.r<0){
            this.r= 0;
            ballArr = _.without(ballArr,this);
        }
    }
}