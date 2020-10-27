class Compiler {
    constructor(el,vm) {
       this.el = this.isElementNode(el)?el:document.querySelector(el)
       console.log(this.el)
       let fragment = this.moveFragment(this.el)
       console.log(fragment)
       // 把节点中的内容进行替换

       // 编译模板
       this.Compile(fragment)
       // 把内容塞回到页面中
       this.el.appendChild(fragment)
    }
    // 判断是否元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
    // 把节点移动到内存中编译（防止直接在页面渲染替换时造成回流重绘，性能下降）
    moveFragment(node) {
        let fragment = document.createDocumentFragment()
        while(node.firstChild) {
            fragment.appendChild(node.firstChild)
        }
        return fragment
    }
    Compile(node) {
        let childNodes = node.childNodes // node中的第一层节点
        childNodes.forEach(child => {
            if (this.isElementNode(child)) { // 元素节点
                this.compileElement(child)
            } else { // 文本节点
                this.compileText(child)
            }
        })
    }
    // 编译元素
    compileElement(node) {
        let attributes = node.attributes // 拿到节点所有属性
        [...attributes].forEach(attr => {
            let {name,value} = attr
            console.log(name,value)
        })
    }
    // 编译文本
    compileText(node) {

    }
} 

class Vue {
    constructor(options) {
        this.$el = options.el
        this.data = options.data
        if (this.$el) {
            new Compiler(this.$el,this)
        }
    }
}