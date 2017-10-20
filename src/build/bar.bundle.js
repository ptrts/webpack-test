
// Берем из свойств окна функцию webpackJsonp, и вызываем ее
webpackJsonp(

    // chunkIds
    [0],

    // moreModules
    [
        /* Место модуля 0 - пустое. Подразумевается, что 0 - это место модуля foo.js */,

        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";

            // Даем знать наверх вебпаку, через наши экспорты, что мы не просто какой-то старый модуль,
            // а модуль поддерживающий интерфейс хармони
            Object.defineProperty(__webpack_exports__, "__esModule", {value: true});

            // импортируем наше Foo через интерфейс хармони
            // хотя, какое тут хармони, просто заказываем себе экспорты модуля номер 0
            var __WEBPACK_IMPORTED_MODULE_0__foo__ = __webpack_require__(0);

            class Bar {

                doThings() {

                    console.log('This is Bar');

                    console.log('And Foo goes');

                    // Вот как класс Foo изменил свое наименование
                    // К нему дописали WEBPACK_IMPORTED_MODULE_0, и наставили подчеркиваний __
                    let foo = new __WEBPACK_IMPORTED_MODULE_0__foo__["Foo"]();

                    foo.doThings();
                }
            }

            // Объявляем экспорты. Вроде бы объявляем по простецки, но это почему-то называется здесь хармони
            __webpack_exports__["Bar"] = Bar;
        })
    ],

    // executeModules
    [1]
);
