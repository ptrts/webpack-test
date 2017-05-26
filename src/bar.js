import {Foo} from './foo.js';

class Bar {
    
    doThings() {
        
        console.log('This is Bar');
        
        console.log('And now goes Foo');
        
        let foo = new Foo();
        foo.doThings();
    }
}

let bar = new Bar();

bar.doThings();
