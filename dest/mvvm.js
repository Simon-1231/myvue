"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Compiler = /*#__PURE__*/function () {
  function Compiler(el, vm) {
    _classCallCheck(this, Compiler);

    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    console.log(this.el);
    var fragment = this.moveFragment(this.el);
    console.log(fragment); // 把节点中的内容进行替换
    // 编译模板

    this.Compile(fragment); // 把内容塞回到页面中

    this.el.appendChild(fragment);
  } // 判断是否元素节点


  _createClass(Compiler, [{
    key: "isElementNode",
    value: function isElementNode(node) {
      return node.nodeType === 1;
    } // 把节点移动到内存中编译（防止直接在页面渲染替换时造成回流重绘，性能下降）

  }, {
    key: "moveFragment",
    value: function moveFragment(node) {
      var fragment = document.createDocumentFragment();

      while (node.firstChild) {
        fragment.appendChild(node.firstChild);
      }

      return fragment;
    }
  }, {
    key: "Compile",
    value: function Compile(node) {
      var _this = this;

      var childNodes = node.childNodes; // node中的第一层节点

      childNodes.forEach(function (child) {
        if (_this.isElementNode(child)) {
          // 元素节点
          _this.compileElement(child);
        } else {
          // 文本节点
          _this.compileText(child);
        }
      });
    } // 编译元素

  }, {
    key: "compileElement",
    value: function compileElement(node) {
      var _this2 = this;

      var attributes = node.attributes; // 拿到节点所有属性

      console.log('attributes', attributes);
      Array.prototype.slice.call(attributes).forEach(function (attr) {
        var name = attr.name,
            value = attr.value;

        if (_this2.isDirective(name)) {
          console.log(node);
        }
      });
    } // 编译文本

  }, {
    key: "compileText",
    value: function compileText(node) {}
  }, {
    key: "isDirective",
    value: function isDirective(attrName) {
      return attrName.startsWith('v-');
    }
  }]);

  return Compiler;
}();

var Vue = function Vue(options) {
  _classCallCheck(this, Vue);

  this.$el = options.el;
  this.data = options.data;

  if (this.$el) {
    new Compiler(this.$el, this);
  }
};