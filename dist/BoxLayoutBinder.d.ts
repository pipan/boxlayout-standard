import { ComponentBinder, Component } from "@wildebeest/component";
import { BoxLayout } from "@wildebeest/boxlayout";
import { ScrollBoxBinder } from '@wildebeest/scroll-standard';
export declare class BoxLayoutBinder implements ComponentBinder {
    protected boxLayoutFactory: () => BoxLayout;
    protected scrollBoxBinder: ScrollBoxBinder;
    constructor(boxLayoutFactory: () => BoxLayout, scrollBoxBinder: ScrollBoxBinder);
    private getAttribute;
    bind(element: HTMLElement): Component;
    protected bindToLayout(boxLayout: BoxLayout, element: HTMLElement, position: string): void;
}
