(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskItem = function TaskItem(id, title) {
    _classCallCheck(this, TaskItem);

    this.id = id;
    this.title = title;
};

exports.default = TaskItem;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TaskItem = require('./TaskItem');

var _TaskItem2 = _interopRequireDefault(_TaskItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskList = function () {
    function TaskList() {
        var _this = this;

        _classCallCheck(this, TaskList);

        this.inputField = document.getElementById('task-input');
        this.addButton = document.getElementById('add-task');
        this.tasksElem = document.getElementById('tasks');

        this.tasks = JSON.parse(localStorage.getItem('userTasks')) || [];
        this.addButton.addEventListener('click', function () {
            return _this.addNewTask();
        });
        console.log(this);
    }

    _createClass(TaskList, [{
        key: 'addNewTask',
        value: function addNewTask() {
            var newTaskTitle = this.inputField.value;

            if (newTaskTitle) {
                var newTask = new _TaskItem2.default(this.tasks.length, newTaskTitle);
                this.tasks.push(newTask);
                this.inputField.value = '';
                localStorage.setItem('userTasks', JSON.stringify(this.tasks));
                this.displayTasks();
            }
        }
    }, {
        key: 'displayTasks',
        value: function displayTasks() {
            console.log(this.tasks);
        }
    }]);

    return TaskList;
}();

exports.default = TaskList;

},{"./TaskItem":1}],3:[function(require,module,exports){
'use strict';

var _TaskList = require('./TaskList');

var _TaskList2 = _interopRequireDefault(_TaskList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  return new _TaskList2.default();
});

},{"./TaskList":2}]},{},[3]);
