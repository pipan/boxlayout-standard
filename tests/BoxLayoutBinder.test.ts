import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { BoxLayoutStandardModule } from '../src/BoxLayoutStandardModule';
import { ComponentBindService, Component, ElementService } from '@wildebeest/component';
import { DomService } from '@wildebeest/common';
import { ScrollBox } from '@wildebeest/scroll';
import { BoxLayout } from '@wildebeest/boxlayout';

let app: Application = new Application();
app.run([BoxLayoutStandardModule]);
let domService: DomService = app.getContainer().get(DomService);
let bindService: ComponentBindService = app.getContainer().get(ComponentBindService);
let elementService: ElementService = app.getContainer().get(ElementService);

beforeEach(() => {
    document.body.innerHTML = "";
});

test("bind scroll box to html element", () => {
    let element: HTMLElement = domService.create('<div class="std-box-layout">' +
    '<div class="std-box-layout__top"><div>no content</div></div>' + 
    '<div class="std-box-layout__left"><div>no content</div></div>' + 
    '<div class="std-box-layout__center"><div>no content</div></div>' + 
    '<div class="std-box-layout__right"><div>no content</div></div>' + 
    '<div class="std-box-layout__bottom"><div>no content</div></div>' + 
    '</div>');
    domService.insert([element], document.body);

    let components: Map<string, Array<Component>> = bindService.autoBind(document.body);

    expect(components.get('boxLayout')).toBeDefined();
    expect(components.get('boxLayout').length).toEqual(1);

    let boxLayout: BoxLayout = components.get('boxLayout')[0] as BoxLayout;
    expect(elementService.hasComponent(boxLayout.getElement(), BoxLayout)).toEqual(true);
    expect(boxLayout.getPosition('top').getValue()).toEqual(100);
    expect(boxLayout.getPosition('right').getValue()).toEqual(400);
    expect(boxLayout.getPosition('bottom').getValue()).toEqual(300);
    expect(boxLayout.getPosition('left').getValue()).toEqual(300);
});

test("create scroll boxes", () => {
    let element: HTMLElement = domService.create('<div class="std-box-layout">' +
    '<div class="std-box-layout__top"><div>no content</div></div>' + 
    '<div class="std-box-layout__left"><div>no content</div></div>' + 
    '<div class="std-box-layout__center"><div>no content</div></div>' + 
    '<div class="std-box-layout__right"><div>no content</div></div>' + 
    '<div class="std-box-layout__bottom"><div>no content</div></div>' + 
    '</div>');
    domService.insert([element], document.body);

    let components: Map<string, Array<Component>> = bindService.autoBind(document.body);
    let selectors: Array<string> = [
        '.std-box-layout__top',
        '.std-box-layout__left',
        '.std-box-layout__center',
        '.std-box-layout__right',
        '.std-box-layout__bottom'
    ];

    for (let i = 0; i < selectors.length; i++) {
        let scrollElement: HTMLElement = document.body.querySelector(selectors[i]);
        expect(elementService.hasComponent(scrollElement, ScrollBox)).toEqual(true);
    }
});

let missingInnerHtml = [
    [
        '<div class="std-box-layout__left"><div>no content</div></div>' + 
        '<div class="std-box-layout__center"><div>no content</div></div>' + 
        '<div class="std-box-layout__right"><div>no content</div></div>' + 
        '<div class="std-box-layout__bottom"><div>no content</div></div>',
        ".std-box-layout__top"
    ], [
        '<div class="std-box-layout__top"><div>no content</div></div>' + 
        '<div class="std-box-layout__center"><div>no content</div></div>' + 
        '<div class="std-box-layout__right"><div>no content</div></div>' + 
        '<div class="std-box-layout__bottom"><div>no content</div></div>',
        ".std-box-layout__left"
    ], [
        '<div class="std-box-layout__left"><div>no content</div></div>' + 
        '<div class="std-box-layout__top"><div>no content</div></div>' + 
        '<div class="std-box-layout__right"><div>no content</div></div>' + 
        '<div class="std-box-layout__bottom"><div>no content</div></div>',
        ".std-box-layout__center"
    ], [
        '<div class="std-box-layout__left"><div>no content</div></div>' + 
        '<div class="std-box-layout__center"><div>no content</div></div>' + 
        '<div class="std-box-layout__top"><div>no content</div></div>' + 
        '<div class="std-box-layout__bottom"><div>no content</div></div>',
        ".std-box-layout__right"
    ], [
        '<div class="std-box-layout__left"><div>no content</div></div>' + 
        '<div class="std-box-layout__center"><div>no content</div></div>' + 
        '<div class="std-box-layout__right"><div>no content</div></div>' + 
        '<div class="std-box-layout__top"><div>no content</div></div>',
        ".std-box-layout__bottom"
    ]
];
test.each(missingInnerHtml)("bind scroll box missing inner element", (innerHTML: string, missintPositionSelector: string) => {
    let element: HTMLElement = domService.create('<div class="std-box-layout">' + innerHTML + '</div>');
    domService.insert([element], document.body);

    expect(() => {
        let components: Map<string, Array<Component>> = bindService.autoBind(document.body);
    }).toThrowError("Cannot find element with class '" + missintPositionSelector + "' in BoxLayout element");
});

test("create with blocked scroll box", () => {
    let element: HTMLElement = domService.create('<div class="std-box-layout">' +
    '<div class="std-box-layout__top" data-scrollable="false"><div>no content</div></div>' + 
    '<div class="std-box-layout__left"><div>no content</div></div>' + 
    '<div class="std-box-layout__center"><div>no content</div></div>' + 
    '<div class="std-box-layout__right"><div>no content</div></div>' + 
    '<div class="std-box-layout__bottom"><div>no content</div></div>' + 
    '</div>');
    domService.insert([element], document.body);

    let components: Map<string, Array<Component>> = bindService.autoBind(document.body);

    let scrollElement: HTMLElement = document.body.querySelector('.std-box-layout__top');
    expect(elementService.hasComponent(scrollElement, ScrollBox)).toEqual(false);
});

test("set initial position", () => {
    let element: HTMLElement = domService.create('<div class="std-box-layout" data-top="20" data-left="20" data-right="20" data-bottom="20">' +
    '<div class="std-box-layout__top"><div>no content</div></div>' + 
    '<div class="std-box-layout__left"><div>no content</div></div>' + 
    '<div class="std-box-layout__center"><div>no content</div></div>' + 
    '<div class="std-box-layout__right"><div>no content</div></div>' + 
    '<div class="std-box-layout__bottom"><div>no content</div></div>' + 
    '</div>');
    domService.insert([element], document.body);

    let components: Map<string, Array<Component>> = bindService.autoBind(document.body);
    let boxLayout: BoxLayout = components.get('boxLayout')[0] as BoxLayout;
    expect(boxLayout.getPosition('top').getValue()).toEqual(20);
    expect(boxLayout.getPosition('left').getValue()).toEqual(20);
    expect(boxLayout.getPosition('right').getValue()).toEqual(20);
    expect(boxLayout.getPosition('bottom').getValue()).toEqual(20);
});