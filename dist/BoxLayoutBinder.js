"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var scroll_standard_1 = require("@wildebeest/scroll-standard");
var BoxLayoutBinder = (function () {
    function BoxLayoutBinder(boxLayoutFactory, scrollBoxBinder) {
        this.boxLayoutFactory = boxLayoutFactory;
        this.scrollBoxBinder = scrollBoxBinder;
    }
    BoxLayoutBinder.prototype.getAttribute = function (element, name, def) {
        if (element.getAttribute(name)) {
            return element.getAttribute(name);
        }
        return def;
    };
    BoxLayoutBinder.prototype.bind = function (element) {
        var boxLayout = this.boxLayoutFactory();
        boxLayout.initialize(element, {
            top: this.getAttribute(element, 'data-top', 100),
            right: this.getAttribute(element, 'data-right', 400),
            bottom: this.getAttribute(element, 'data-bottom', 300),
            left: this.getAttribute(element, 'data-left', 300),
            deviders: {
                dragable: this.getAttribute(element, 'data-dragable', true)
            }
        });
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__top'), 'top');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__left'), 'left');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__center'), 'center');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__right'), 'right');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__bottom'), 'bottom');
        return boxLayout;
    };
    BoxLayoutBinder.prototype.bindToLayout = function (boxLayout, element, position) {
        if (element.getAttribute('data-scrollable')) {
            var scrollBox_1 = this.scrollBoxBinder.bind(element);
            boxLayout.getEmitter().on('resize', function () {
                scrollBox_1.recalc();
            });
        }
        boxLayout.bindElement(element, position);
    };
    BoxLayoutBinder = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject('Factory<BoxLayout>')), __param(1, inversify_1.inject("ComponentBinder")), __param(1, inversify_1.named('scroll-box')),
        __metadata("design:paramtypes", [Function, scroll_standard_1.ScrollBoxBinder])
    ], BoxLayoutBinder);
    return BoxLayoutBinder;
}());
exports.BoxLayoutBinder = BoxLayoutBinder;
//# sourceMappingURL=BoxLayoutBinder.js.map