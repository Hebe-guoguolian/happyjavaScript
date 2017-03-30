/*
 *  获取scrollTop和scrollLeft
 *  用法: scroll().top;  scroll().left;
 */
function scroll() {
    //ie9+和最新浏览器
    if (window.pageXOffset != null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }
    //符合w3c原则的
    else if (document.compatMode == 'CSS1Compat') {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}
function $(id) {
    return document.getElementById(id);
}


