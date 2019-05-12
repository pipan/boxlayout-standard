import { ComponentBinder, Component, ElementService } from "@wildebeest/component";
import { BoxLayout } from "@wildebeest/boxlayout";
import { inject, named, injectable } from "inversify";
import { ScrollBoxBinder } from '@wildebeest/scroll-standard';
import { ScrollBox } from "@wildebeest/scroll";

@injectable()
export class BoxLayoutBinder implements ComponentBinder
{
    protected boxLayoutFactory: () => BoxLayout;
    protected scrollBoxBinder: ScrollBoxBinder;
    protected elementService: ElementService;

    constructor(@inject('Factory<BoxLayout>') boxLayoutFactory: () => BoxLayout, @inject("ComponentBinder") @named('scroll-box') scrollBoxBinder: ScrollBoxBinder, @inject(ElementService) elementService: ElementService)
    {
        this.boxLayoutFactory = boxLayoutFactory;
        this.scrollBoxBinder = scrollBoxBinder;
        this.elementService = elementService;
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
        let selectors: {[key: string]: string} = {
            top: '.std-box-layout__top',
            left: '.std-box-layout__left',
            center: '.std-box-layout__center',
            right: '.std-box-layout__right',
            bottom: '.std-box-layout__bottom'
        };

        for (let position in selectors) {
            let positionElement: HTMLElement = element.querySelector(selectors[position])
            if (!positionElement) {
                throw "Cannot find element with class '" + selectors[position] + "' in BoxLayout element";
            }
            this.bindToLayout(boxLayout, positionElement, position);
        }

        this.elementService.addComponent(element, boxLayout);
        return boxLayout;
    }

    protected bindToLayout(boxLayout: BoxLayout, element: HTMLElement, position: string): void
    {
        if (!element.getAttribute('data-scrollable') || element.getAttribute('data-scrollable') != "false") {
            let scrollBox: ScrollBox = this.scrollBoxBinder.bind(element) as ScrollBox;
            boxLayout.getEmitter().on('resize', () => {
                scrollBox.recalc();
            });
        }
        boxLayout.bindElement(element, position);
    }
}