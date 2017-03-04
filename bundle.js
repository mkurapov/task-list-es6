(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var htmlEscape = exports.htmlEscape = function htmlEscape(string) {

    return string.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

var getRandomId = exports.getRandomId = function getRandomId() {
    return Math.round(Math.random() * (9999 - 1000) + 1000);
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskItem = function TaskItem(id, title) {
    _classCallCheck(this, TaskItem);

    this.id = id;
    this.title = title;
    this.completed = false;
};

exports.default = TaskItem;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TaskItem = require('./TaskItem');

var _TaskItem2 = _interopRequireDefault(_TaskItem);

var _Helpers = require('./Helpers');

var helpers = _interopRequireWildcard(_Helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskList = function () {
    function TaskList() {
        _classCallCheck(this, TaskList);

        this.inputField = document.getElementById('task-input');
        this.addButton = document.getElementById('add-task');
        this.tasksElem = document.getElementById('tasks');
        this.tasks = JSON.parse(localStorage.getItem('userTasks')) || [];

        this.displayTasks();
        this.initializeEventListeners();
    }

    _createClass(TaskList, [{
        key: 'initializeEventListeners',
        value: function initializeEventListeners() {
            var _this = this;

            this.tasksElem.addEventListener('click', function (event) {
                var taskId = event.target.parentNode.getAttribute('data-id');

                switch (event.target.localName) {
                    case 'button':
                        _this.removeTask(taskId);
                        break;
                    case 'input':
                        _this.toggleCompleted(taskId);
                        break;
                    case 'label':
                        _this.handleTaskChange(taskId, event.target);
                        break;
                    default:
                }
            });

            this.addButton.addEventListener('click', this.addNewTask.bind(this));
        }
    }, {
        key: 'addNewTask',
        value: function addNewTask() {
            var newTaskTitle = this.inputField.value.trim();

            if (newTaskTitle) {
                var newTaskID = helpers.getRandomId().toString(); //need to check if id exists
                var newTask = new _TaskItem2.default(newTaskID, helpers.htmlEscape(newTaskTitle));
                this.tasks.push(newTask);
                this.inputField.value = '';
                this.saveTasks();
                this.displayTasks();
            }
        }
    }, {
        key: 'removeTask',
        value: function removeTask(idToRemove) {
            this.tasks = this.tasks.filter(function (task) {
                return task.id !== idToRemove;
            });

            this.saveTasks();
            this.displayTasks();
        }
    }, {
        key: 'handleTaskChange',
        value: function handleTaskChange(idToChange, label) {
            var _this2 = this;

            console.log(label);
            // label.onchange = () => console.log('dog');
            label.addEventListener('input', function () {

                var newTitle = helpers.htmlEscape(label.textContent).trim();
                _this2.tasks.forEach(function (task) {
                    if (task.id === idToChange) {
                        task.title = newTitle;
                    }
                });

                label.textContent = newTitle;
                _this2.saveTasks();
            });
        }
    }, {
        key: 'toggleCompleted',
        value: function toggleCompleted(idToToggle) {
            this.tasks.forEach(function (task) {
                if (task.id === idToToggle) {
                    task.completed = !task.completed;
                }
            });

            this.saveTasks();
            this.displayTasks();
        }
    }, {
        key: 'saveTasks',
        value: function saveTasks() {
            localStorage.setItem('userTasks', JSON.stringify(this.tasks));
        }
    }, {
        key: 'displayTasks',
        value: function displayTasks() {
            var _this3 = this;

            this.tasksElem.innerHTML = this.tasks.reduce(function (acc, task) {
                return acc + _this3.returnTaskTemplate(task);
            }, '');
        }
    }, {
        key: 'returnTaskTemplate',
        value: function returnTaskTemplate(task) {
            return '<li data-id="' + task.id + '">\n                   <input class="toggle" type="checkbox" ' + (task.completed ? 'checked' : '') + '>\n                   <label contenteditable>' + task.title + '</label>\n                   <button>Remove</button>\n                </li>';
        }
    }]);

    return TaskList;
}();

exports.default = TaskList;

},{"./Helpers":1,"./TaskItem":2}],4:[function(require,module,exports){
'use strict';

var _TaskList = require('./TaskList');

var _TaskList2 = _interopRequireDefault(_TaskList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  return new _TaskList2.default();
});

},{"./TaskList":3}]},{},[4]);
