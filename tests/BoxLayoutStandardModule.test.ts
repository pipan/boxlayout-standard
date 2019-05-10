import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { BoxLayoutStandardModule } from '../src/BoxLayoutStandardModule';
import { BoxLayoutBinder } from '../src/BoxLayoutBinder';
// import { ComponentBindService, Component } from '@wildebeest/component';
// import { DomService } from '@wildebeest/common';

let app: Application = new Application();
app.run([BoxLayoutStandardModule]);
// let domService: DomService = app.getContainer().get(DomService);
// let bindService: ComponentBindService = app.getContainer().get(ComponentBindService);

test("register services", () => {
    expect(app.getContainer().getNamed('ComponentBinder', 'box-layout')).toBeInstanceOf(BoxLayoutBinder);
});

// test("bind scroll box to html element", () => {
//     let element: HTMLElement = domService.create('<div class="std-scroll-box" data-on-scroll-class="std-scroll--show" data-hide-delay="500"><div>no content</div></div>');
//     domService.insert([element], document.body);

//     let components: Map<string, Array<Component>> = bindService.bindToElement(document.body);

//     expect(components.get('scrollBox')).toBeDefined();
//     expect(components.get('scrollBox').length).toEqual(1);
// });