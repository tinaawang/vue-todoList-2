import bar from './bar'
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created:function(){
        window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList);
            let todoString = JSON.stringify(this.newTodo);
            window.localStorage.setItem('myTodos', dataString)
            window.localStorage.setItem('Todo', todoString)
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

        let oldTodoString = window.localStorage.getItem('Todo')
        let oldTodo = JSON.parse(oldTodoString)
        this.newTodo = oldTodo || ''
    },
    methods: {

        addTodo: function(){
            /*日期格式化*/
            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };


            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().Format("yyyy-MM-dd"),
                done: false
            })
            this.newTodo ='';
        },
        remove:function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1);/*从index位置开始，删除一个元素*/
        }

    }
})




