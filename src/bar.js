export class Bar {
    
    doThings() {

        import('./hello.js').then(({hello}) => {
            console.log('This is Bar: ' + hello);
        });
    }
}
