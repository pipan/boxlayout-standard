"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boxlayout_1 = require("@wildebeest/boxlayout");
var component_1 = require("@wildebeest/component");
var BoxLayoutBinder_1 = require("./BoxLayoutBinder");
var scroll_standard_1 = require("@wildebeest/scroll-standard");
var BoxLayoutStandardModule = (function () {
    function BoxLayoutStandardModule() {
    }
    BoxLayoutStandardModule.prototype.getDependencies = function () {
        return [boxlayout_1.BoxLayoutModule, scroll_standard_1.ScrollStandardModule, component_1.ComponentModule];
    };
    BoxLayoutStandardModule.prototype.register = function (container) {
        container.bind("ComponentBinder").to(BoxLayoutBinder_1.BoxLayoutBinder).whenTargetNamed('box-layout');
    };
    BoxLayoutStandardModule.prototype.boot = function (container) {
        var componentBindService = container.get(component_1.ComponentBindService);
        componentBindService.addBinder('boxLayout', {
            selector: '.std-box-layout',
            binder: container.getNamed("ComponentBinder", "box-layout")
        });
    };
    return BoxLayoutStandardModule;
}());
exports.BoxLayoutStandardModule = BoxLayoutStandardModule;
//# sourceMappingURL=BoxLayoutStandardModule.js.map