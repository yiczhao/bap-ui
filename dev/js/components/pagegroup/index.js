!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var a=e();for(var r in a)("object"==typeof exports?exports:t)[r]=a[r]}}(this,function(){return function(t){function e(r){if(a[r])return a[r].exports;var s=a[r]={exports:{},id:r,loaded:!1};return t[r].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}(function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))switch(typeof t[e]){case"function":break;case"object":t[e]=function(e){var a=e.slice(1),r=t[e[0]];return function(t,e,s){r.apply(this,[t,e,s].concat(a))}}(t[e]);break;default:t[e]=t[t[e]]}return t}([function(t,e,a){t.exports=a(8)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{total:{type:Number,"default":0},pages:{type:Number,"default":7},page_current:{type:Number,"default":1},page_size:{type:Number,"default":10}},data:function(){return{pages_array:[],pages_count:this.pages}},methods:{init:function(){this.total&&(this.pages%2==0&&(this.pages=this.pages-1,console.error("分页中的参数 pages 请传入奇数 , 自动转为："+this.pages)),this.total_count=this.get_total_count(this.total,this.page_size),this.pages_array=this.get_page_array(1,this.pages,this.total_count))},get_total_count:function(t,e){var a=t%e;return(t-a)/e+(a&&1)},get_cur_count:function(t,e){return t>e?e:t},get_pure_array:function(t,e,a){var r,s,n=[];if(e>a)e=a,s=a,r=a-1;else{r=e-1;var s=t+r/2;t<=r/2&&(s=e),s>a&&(s=a)}for(var i=r;i>=0;i--)n.push(s-i);return n},has_fold:function(t,e){var a=e.length-1;return e=[].concat(e),e[0]>1&&(e[0]=1,e[1]="···"),e[a]<t&&(e[a]=t,e[a-1]="···"),e},click_page_mian:function(t){var e=t.target.innerHTML.trim();switch(console.log(e),!0){case"&lt;"===e:--this.page_current,this.page_current<1&&(this.page_current=1);break;case"&gt;"===e:++this.page_current,this.page_current=this.get_cur_count(this.page_current,this.total_count);break;case"···"===e:break;case!isNaN(e):this.page_current=+e}},get_page_array:function(t,e,a){var r;return r=this.get_pure_array(t,e,a),r=this.has_fold(a,r)}},watch:{page_size:function(){this.page_current=1},"total+page_size+pages":function(){this.init()},page_current:function(t){this.$emit("current_change",t),this.pages_array=this.get_page_array(t,this.pages,this.total_count)}},created:function(){this.init()}}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(7),n=r(s);e["default"]={components:{page:n["default"]},props:{total:{type:Number,"default":0},pages:{type:Number,"default":7},page_current:{type:Number,"default":1},page_size:{type:Number,"default":10},page_sizes:{type:Array,"default":function(){return[10,20,100]}}},data:function(){return{}},methods:{init:function(){this.page_size=this.page_sizes[0]},current_change:function(t){this.page_current=t,this.$emit("size_change",t)}},created:function(){this.init()},watch:{page_size:function(t){this.$emit("size_change",t)}}}},function(t,e){},3,function(t,e){t.exports=' <ul v-show=total class=KsPage cid=KsPage @click=click_page_mian($event)> <li :class="{\'disabled\':page_current == 1}">&lt;</li> <li v-for="i in pages_array" track-by=$index :class="{\'active\':page_current == i}" v-text=i></li> <li :class="{\'disabled\':page_current == total_count}">&gt;</li> </ul> '},function(t,e){t.exports=' <div class=KsPageGroup cid=KsPageGroup> <div class=KsPageGroup-statistical>共<span>{{total}}</span>条</div> <div class=ks-col> 每页 <select class=input v-model=page_size> <option v-for="i in page_sizes" :value=i>{{i}}</option> </select> 条 </div> <page class=ks-col-auto :page_current=page_current :pages=pages :total=total :page_size=page_size v-on:current_change=current_change></page> </div> '},function(t,e,a){var r,s,n={};a(3),r=a(1),s=a(5),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;s&&(i.template=s),i.computed||(i.computed={}),Object.keys(n).forEach(function(t){var e=n[t];i.computed[t]=function(){return e}})},function(t,e,a){var r,s,n={};a(4),r=a(2),s=a(6),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;s&&(i.template=s),i.computed||(i.computed={}),Object.keys(n).forEach(function(t){var e=n[t];i.computed[t]=function(){return e}})}]))});