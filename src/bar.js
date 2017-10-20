import fooDefault from './foo.js';

import {Foo} from './foo.js';

export class Bar {
    
    doThings() {

        console.log('This is Bar');

        console.log('And Foo goes: ' + fooDefault);
        let foo = new Foo();
        foo.doThings();
    }
}
