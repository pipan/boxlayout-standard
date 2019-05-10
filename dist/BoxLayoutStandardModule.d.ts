import { Module } from '@wildebeest/js-modules';
import { Container } from 'inversify';
export declare class BoxLayoutStandardModule implements Module {
    getDependencies(): Array<any>;
    register(container: Container): void;
    boot(container: Container): void;
}
