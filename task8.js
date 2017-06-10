/**
 * Created by mshuang on 2017/6/9.
 */
var btn1 = document.getElementsByTagName('button')[0];
var btn2 = document.getElementsByTagName('button')[1];
var btn3 = document.getElementsByTagName('button')[2];
var btn4 = document.getElementsByTagName('button')[3];
var input = document.getElementsByTagName('input')[0];
var container = document.getElementsByClassName('container')[0];

var text;//要搜索的英雄
var list = [];//定义一个数辅助组存储已经遍历的节点
var result = [];//存储查询到的节点用于显示
var treedepth;//树的深度
var mode = 1; //表示搜索还是遍历，1是遍历，0是搜索

//为按钮绑定事件用addEventListener添加click事件：好处是允许给一个事件注册多个监听器
btn1.addEventListener('click',function(){
    reset();
    depth_first(container);
    change_color();
},false);//深度遍历

btn2.addEventListener('click',function(){
    reset();
    breadth_first(container);
    change_color();
},false);//广度遍历

btn3.addEventListener('click',function(){
    reset();
    mode=0;
    text = input.value;
    depth_first(container);
    change_color();
},false);//深度搜索

btn4.addEventListener('click',function(){
    reset();
    mode=0;
    text = input.value;
    breadth_first(container);
    change_color();
},false);//广度搜索

//深度优先算法
function depth_first(node){
    if(!node || node.length == 1){
        return;
    }
    list.push(node);
    for(var index = 0; index<node.children.length;index++){
        depth_first(node.children[index]);
    }
}

//广度优先算法
function breadth_first(node){
    if(node){
        list.push(node);
        breadth_first(node.nextElementSibling);
        node = list[treedepth++];
        breadth_first(node.firstElementChild);
    }
}

//重置函数
function reset(){
    list = [];
    result = [];
    mode = 1;
    treedepth = 0;
    var div = document.getElementsByTagName('div');
    for(var i=0; i<div.length; i++){
        div[i].style.backgroundColor = '#fff';
    }
}

//颜色变化
function change_color(){
    var i=0;
    list[i].style.backgroundColor='#ccc000';
    var timer = setInterval(function(){
        i++;
        if(i<list.length){
            list[i-1].style.backgroundColor = '#fff';

            if(mode == 0 && list[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"") == text){
                list[i].style.backgroundColor = 'red';
                result.push(i);
            }else{
                list[i].style.backgroundColor = '#ccc000';
            }
        }else{
            clearInterval(timer);
            list[list.length -1].style.backgroundColor = '#fff';
            result.forEach(function(e){
                list[e].style.backgroundColor = 'red';
            })
        }
    },500);
}