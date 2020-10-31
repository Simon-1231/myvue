class Compiler {
    constructor(el,vm) {
       this.el = this.isElementNode(el)?el:document.querySelector(el)
       this.vm = vm
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
                this.Compile(child) // 如果是元素节点，需递归
            } else { // 文本节点
                this.compileText(child)
            }
        })
    }
    // 编译元素
    compileElement(node) {
        let attributes = node.attributes // 拿到节点所有属性
        // console.log('attributes',[...attributes])
        Array.prototype.slice.call(attributes).forEach(attr => {
            let {name,value:expr} = attr
            if (this.isDirective(name)) { // 判断是否是指令（包含v-）v-model v-html v-text
                let [,dir] = name.split('-')
                // console.log('expr',this.vm)
                // 调用不同的指令来处理
                compileUtil[dir](node,expr,this.vm)
            }
        })
    }
    // 编译文本
    compileText(node) { // 首先判断当前节点时候包含{{xxx}} {{aaa}}
        let content = node.textContent
        if(/\{\{(.+?)\}\}/.test(content)) {
            // console.log('内容',content)
        }
    }
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
} 

compileUtil = {
    // 根据表达式取到对应的数据
    getVal(vm,expr) {
        return expr.split('.').reduce((data,current) => {
            return data[current]
        },vm.data)
    },
    model(node,expr,vm) { // node节点  expr表达式  vm当前实例
        let fn = this.updater['modelUpdater']
        let value = this.getVal(vm,expr) // 取到李四
        fn(node,value)
    },
    html() {

    },
    text() {
        
    },
    updater: {
        // 把数据插入到节点中
        modelUpdater(node,value) {
            node.value = value
        },
        htmlUpdater() {

        }
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