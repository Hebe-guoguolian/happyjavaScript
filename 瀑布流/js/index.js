
window.onload = function () {
   waterFall('main','box')

var timers;
//滚动的时候触发事件
window.onscroll = function () {
    clearTimeout(timers);
    //主要是为了节流,设置定时器
    timers = setTimeout(function () {
        if(check()){
            //模拟数据
            var dataArr = [{src:'30.jpg'},{src:'31.jpg'},{src:'32.jpg'},{src:'33.jpg'},{src:'34.jpg'},{src:'35.jpg'},{src:'36.jpg'},{src:'37.jpg'}]
            for(var i =0;i<dataArr.length;i++){
                //在页面中增加节点,用来展示图片
                var newBox = document.createElement('div');
                var main = document.getElementById('main');
                main.appendChild(newBox);
                newBox.className = 'box';
                var newPic = document.createElement('div');
                newBox.appendChild(newPic);
                newPic.className = 'pic';
                var newImg = document.createElement('img');
                newImg.src = 'images/'+dataArr[i].src;
                newPic.appendChild(newImg);
            }
            //再次调用瀑布流的函数
            waterFall('main','box')
        }

    },200)
}
}

//节流模式
var timer
window.onresize = function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
        waterFall('main','box') ;
    },200)
}

//封装瀑布流的函数
function waterFall (parent,box){
    //获取所有的图片所在的盒子
    var allBox = $(parent).getElementsByClassName(box);
    //取出第一个盒子的高度
    var boxWidth = allBox[0].offsetWidth;
    //获取屏幕的宽度,以下主要的目的是为了父盒子居中
    var screenW = document.documentElement.clientWidth;
    var cols = parseInt(screenW / boxWidth);
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = '0 auto';
//定义一个高度数组
    var heightArr =[];
    for(var i =0;i<allBox.length;i++){
        //获取每一个照片盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        //把第一行的照片盒子的高度放入高度数组中
        if(i<cols){
            heightArr.push(boxHeight);
            allBox[i].style = '';
        }else{
            //获取第一行盒子的最小高度
            var minBoxHeight = _.min(heightArr);
             //获取第一行盒子的最小高度盒子的索引值
            var minBoxHeightIndex =getminBoxIndex(heightArr,minBoxHeight);
            //并把所有的剩下的照片盒子定位到第一行中最小高度的下面
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxHeightIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';
            //不断的更新最小高度
            heightArr [minBoxHeightIndex] +=boxHeight;

        }


    }
}
function getminBoxIndex(arr,minBoxHeight){
    for(var i= 0;i<arr.length;i++){
        if(arr[i]==minBoxHeight){
            return i;
        }
    }
}
//该函数是为了判断是否到达需要加载图片
function check() {
    var allBox = document.getElementsByClassName('box');
    //获取到最后一个盒子
    var lastBox = allBox[allBox.length-1];
    //获取到该盒子的高度到窗口最上面的距离
    var lastBoxDis = lastBox.offsetHeight*0.5+lastBox.offsetTop;
    //获取窗口的高度
    var screenH = document.documentElement.clientHeight;
    //获取滚到上面的高度
    var scrollDis = scroll().top;
    //两者作比较,当最后一个盒子的一半露出来的时候,则需要加载数据
    return lastBoxDis <= screenH+scrollDis;
}
