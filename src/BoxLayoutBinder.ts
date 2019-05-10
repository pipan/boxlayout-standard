import { ComponentBinder, Component } from "@wildebeest/component";
import { BoxLayout } from "@wildebeest/boxlayout";
import { inject } from "inversify";

export class BoxLayoutBinder implements ComponentBinder
{
    protected boxLayoutFactory: () => BoxLayout;
    constructor(@inject('Factory<BoxLayout>') boxLayoutFactory: () => BoxLayout)
    {
        this.boxLayoutFactory = boxLayoutFactory;
    }

    private getAttribute(element: HTMLElement, name: string, def: any): any
    {
        if (element.getAttribute(name)) {
            return element.getAttribute(name);
        }
        return def;
    }

    bind(element: HTMLElement): Component
    {
        let boxLayout: BoxLayout = this.boxLayoutFactory();
        boxLayout.initialize(element, {
            top: this.getAttribute(element, 'data-top', 100),
            right: this.getAttribute(element, 'data-right', 400),
            bottom: this.getAttribute(element, 'data-bottom', 300),
            left: this.getAttribute(element, 'data-left', 300),
            deviders: {
                dragable: this.getAttribute(element, 'data-dragable', true)
            }
        });

        boxLayout.bindElement(element.querySelector('.std-box-layout__top'), 'top');
        boxLayout.bindElement(element.querySelector('.std-box-layout__left'), 'left');
        boxLayout.bindElement(element.querySelector('.std-box-layout__center'), 'center');
        boxLayout.bindElement(element.querySelector('.std-box-layout__right'), 'right');
        boxLayout.bindElement(element.querySelector('.std-box-layout__bottom'), 'bottom');
        return boxLayout;
    }
}