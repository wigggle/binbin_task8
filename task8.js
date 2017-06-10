/**
 * Created by mshuang on 2017/6/9.
 */
var btn1 = document.getElementsByTagName('button')[0];
var btn2 = document.getElementsByTagName('button')[1];
var btn3 = document.getElementsByTagName('button')[2];
var btn4 = document.getElementsByTagName('button')[3];
var input = document.getElementsByTagName('input')[0];
var container = document.getElementsByClassName('container')[0];

var text;//Ҫ������Ӣ��
var list = [];//����һ����������洢�Ѿ������Ľڵ�
var result = [];//�洢��ѯ���Ľڵ�������ʾ
var treedepth;//�������
var mode = 1; //��ʾ�������Ǳ�����1�Ǳ�����0������

//Ϊ��ť���¼���addEventListener���click�¼����ô��������һ���¼�ע����������
btn1.addEventListener('click',function(){
    reset();
    depth_first(container);
    change_color();
},false);//��ȱ���

btn2.addEventListener('click',function(){
    reset();
    breadth_first(container);
    change_color();
},false);//��ȱ���

btn3.addEventListener('click',function(){
    reset();
    mode=0;
    text = input.value;
    depth_first(container);
    change_color();
},false);//�������

btn4.addEventListener('click',function(){
    reset();
    mode=0;
    text = input.value;
    breadth_first(container);
    change_color();
},false);//�������

//��������㷨
function depth_first(node){
    if(!node || node.length == 1){
        return;
    }
    list.push(node);
    for(var index = 0; index<node.children.length;index++){
        depth_first(node.children[index]);
    }
}

//��������㷨
function breadth_first(node){
    if(node){
        list.push(node);
        breadth_first(node.nextElementSibling);
        node = list[treedepth++];
        breadth_first(node.firstElementChild);
    }
}

//���ú���
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

//��ɫ�仯
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