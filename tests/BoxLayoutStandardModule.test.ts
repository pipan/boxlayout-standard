import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { BoxLayoutStandardModule } from '../src/BoxLayoutStandardModule';
import { BoxLayoutBinder } from '../src/BoxLayoutBinder';

let app: Application = new Application();
app.run([BoxLayoutStandardModule]);

test("register services", () => {
    expect(app.getContainer().getNamed('ComponentBinder', 'box-layout')).toBeInstanceOf(BoxLayoutBinder);
});