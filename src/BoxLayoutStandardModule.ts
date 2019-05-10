import { Module } from '@wildebeest/js-modules';
import { BoxLayoutModule } from '@wildebeest/boxlayout';
import { Container } from 'inversify';
import { ComponentBindService } from '@wildebeest/component';
import { BoxLayoutBinder } from './BoxLayoutBinder';
import { ScrollStandardModule } from '@wildebeest/scroll-standard';

export class BoxLayoutStandardModule implements Module
{
    getDependencies():Array<any>
    {
        return [BoxLayoutModule, ScrollStandardModule]
    }

    register(container: Container): void
    {
        container.bind<BoxLayoutBinder>("ComponentBinder").to(BoxLayoutBinder).whenTargetNamed('box-layout');
    }

    boot(container: Container): void
    {
        let componentBindService: ComponentBindService = container.get<ComponentBindService>(ComponentBindService);
        componentBindService.addBinder('boxLayout', {
            selector: '.std-box-layout',
            binder: container.getNamed("ComponentBinder", "box-layout")
        });
    }
}