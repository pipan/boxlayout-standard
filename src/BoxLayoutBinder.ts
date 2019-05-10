import { ComponentBinder, Component } from "@wildebeest/component";
import { BoxLayout } from "@wildebeest/boxlayout";
import { inject, named, injectable } from "inversify";
import { ScrollBoxBinder } from '@wildebeest/scroll-standard';
import { ScrollBox } from "@wildebeest/scroll";

@injectable()
export class BoxLayoutBinder implements ComponentBinder
{
    protected boxLayoutFactory: () => BoxLayout;
    protected scrollBoxBinder: ScrollBoxBinder;

    constructor(@inject('Factory<BoxLayout>') boxLayoutFactory: () => BoxLayout, @inject("ComponentBinder") @named('scroll-box') scrollBoxBinder: ScrollBoxBinder)
    {
        this.boxLayoutFactory = boxLayoutFactory;
        this.scrollBoxBinder = scrollBoxBinder;
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

        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__top'), 'top');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__left'), 'left');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__center'), 'center');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__right'), 'right');
        this.bindToLayout(boxLayout, element.querySelector('.std-box-layout__bottom'), 'bottom');
        return boxLayout;
    }

    protected bindToLayout(boxLayout: BoxLayout, element: HTMLElement, position: string): void
    {
        if (element.getAttribute('data-scrollable')) {
            let scrollBox: ScrollBox = this.scrollBoxBinder.bind(element) as ScrollBox;
            boxLayout.getEmitter().on('resize', () => {
                scrollBox.recalc();
            });
        }
        boxLayout.bindElement(element, position);
    }
}