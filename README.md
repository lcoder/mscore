## 基于jquery的打分评价插件

demo:

![基于jquery的打分评价插件](http://oco9w3mgp.bkt.clouddn.com/blog_images/mscore_demo.png)

使用方法：

```javascript
$(".star_score").initScore( {
        onMouseEnterStar: function( starIndex ){	// 鼠标移动到星星上触发此事件(仅开启打分功能的使用启用)
            console.log( this ) ;
            console.log( starIndex );
        } ,
        onPick: function( index ){			// 需要打分功能的话，监听｀onPick｀事件；单单显示分数的话，不需要监听此事件
            console.log( this ) ;
            console.log( index );
        }
    } ) ;
```

```html
<div data-stars="3" class="star_score grade"></div>
<!-- stars显示几颗星，class grade代表打分模式，就添加了个手型。 -->
```

