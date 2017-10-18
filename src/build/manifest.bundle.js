
function bootstrapWebpack(modules) {

    // objects to store loaded and loading chunks

    // Объекы для сохранения загруженных чанков и чанков в процессе загрузки
    var installedChunks = {
        2: 0
    };

    // install a JSONP callback for chunk loading

    // Перед тем, как присваивать в window.webpackJsonp новую функцию, сохраним имеющуюся функцию
    // При наличии старой функции, новая функция будет исполнять свой собственный код, и потом вызывать старую функцию.
    var parentJsonpFunction = window["webpackJsonp"];

    // Кладем в эту переменную окна webpackJsonp определенную функцию
    window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {

        // add "moreModules" to the modules object,
        // then flag all "chunkIds" as loaded and fire callback

        // Инициализируем несколько важных переменных
        var moduleId, chunkId, i = 0, resolves = [], result;

        // Берем массив идентификаторов чанков
        // Делаем по нему цикл
        //
        // Перекачиваем данные чанков chunkIds из installedChunks в resolves.
        // То что в installedChunks - удалить.
        // resolves - это пустой массив, который мы заполняем с чистого листа.
        for(; i < chunkIds.length; i++) {

            // Берем текущий чанк
            chunkId = chunkIds[i];

            // Пытаемся взять из объекта установленных чанков данные по ключу, равному идетификатору текущего чанка
            let installedChunk = installedChunks[chunkId];

            // Что-нибудь там было, в объекте установленных чанков?
            if (installedChunk) {

                // Да, что-то есть

                // Берем это что-то.
                // Это что-то - это массив.
                // Берем из него первый элемент.
                // Далее по коду выяснится, что первый элемент массива-чанка - это функция, которую можно вызвать без параметров.
                let installedChunkFirstElementFunction = installedChunk[0];

                // Этот первый элемент - это какой-то там резолв.
                // Добавляем его к массиву резолвов.
                resolves.push(installedChunkFirstElementFunction);
            }

            // Хоть нашли текущий чанк в установленных, хоть не нашли, все равно кладем на его место ноль, чтоб его там больше не было
            // Удаляем текущий чанк из объекта с установленными чанками
            installedChunks[chunkId] = 0;
        }

        // Берем аргумент moreModules
        // Перекачиваем оттуда все модули в объект modules.
        // Берем при этом только те модули, которые являются собственными пропертями объекта moreModules.
        // Возможно это оверинжиниринг появившийся из-за пропускания исходного кода WebPack через какие-то
        // оптимизаторы, транспайлеры и т.д.
        for (moduleId in moreModules) {

            // Здесь происходит что-то совсем страшное
            // Через прототип, берем функцию hasOwnProperty, которая есть у всех объектов.
            // Вызываем ее на объекте moreModules.
            // Передаем в эту функцию moduleId.
            //
            // Получается вот так:
            //      moreModules.hasOwnProperty(moduleId)
            //
            // Проверяем, является ли текущий moduleId собственным свойством объекта moreModules, из
            // которого этот moduleId собственно и вытащили.
            if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {

                // Да, moduleId это собственное свойство объекта moreModules

                // Берем данные из moreModules, и перекачиваем их в объект modules


                // modules - это параметр бутстрапа самого вебпака
                // moreModules - это параметр запуска функции webpackJsonCallback
                modules[moduleId] = moreModules[moduleId];
            }
        }

        // Вызывать старую функцию webpackJsonp, если она была такая старая
        // Вызываем с теми же параметрами.
        // Старая функция будет взаимодействовать с другими modules и другими installedChunks
        if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);

        // Если в резолвах что-то есть, то берем себе первый элемент.
        // Этот первый элемент при этом удаляется из массива.
        // Этот первый элемент - это функция.
        // Вызываем эту функцию без параметров.
        //
        // resolves - это массив функций, надерганных из чанков. Чанки - это объекты, которых такие функции есть.
        // точнее, это даже не просто чанки, а installedChunks.
        // в массиве они лежат не по индексам, а в подряд, в порядке добавления в массив.
        //
        // resolves - это массив функций, надерганных из установленных чанков.
        //
        while (resolves.length) {
            resolves.shift()();
        }

        // executeModules - это третий параметр нашей функции webpackJsonp
        // это массив.
        // Смотрим, задан ли данный параметр функции
        if (executeModules) {

            // Задан

            // Делаем цикл по этому массиву
            for(i = 0; i < executeModules.length; i++) {

                // Вытаскиваем текущий модуль
                let executeModule = executeModules[i];

                // Складываем его в переменную s
                __webpack_require__.s = executeModule;

                // Выполняем данный модуль
                // Экспорты получаем в виде result
                result = __webpack_require__(executeModule);
            }
        }

        // Возвращаем результат последнего модуля, который мы выполняли в цикле
        return result;
    };

    // Какой-то кеш установленных модулей
    // Это объект.
    // Ключи этого объекта - это целые числа.
    var installedModules = {};

    // Самая главная функция нашего вебпака
    // В нее параметром заходит идентификатор модуля, который есть какое-то целое число
    function __webpack_require__(moduleId) {

        // Check if module is in cache


        // Смотрим, есть ли переданный в функцию модуль уже в кеше
        if (installedModules[moduleId]) {

            // Да, есть

            // Возвращаем экспорты этого самого модуля, который уже в кеше
            return installedModules[moduleId].exports;
        }

        // Нет, такого модуля в кеше еще нет

        // Создаем незаполненный пока объект для нового модуля, чистенький и свеженький
        // Кладем его сразу в кеш установленных модулей
        var module = installedModules[moduleId] = {

            // Идентификатор модуля
            i: moduleId,

            // Флаг, показывающий, загружен уже модуль или нет
            l: false,

            // Экспорты данного модуля
            exports: {}
        };

        // Execute the module function

        // Как известно, модули у нас это функции.
        // Вообще, модуль это код, который выполняется, и в результате его выполнения заполняется объект экспортов данного модуля.
        // Ну так вот, этот модуль-код выполнен в виде функции.
        // То, где мы сейчас есть - это как раз то место, где эта функция модуля выполняется.

        // Берем себе модуль-функцию
        let moduleToInstall = modules[moduleId];

        // Вызываем данную функцию
        moduleToInstall.call(

            // this, с которым вызывается данная функция.
            // Почему-то вместо this мы устанавливаем экспорты нашего модуля.
            // Хотя, функции модулей не обращаются к this.
            // ну да ладно
            module.exports,

            // Параметры функции

            // Сам модуль
            module,

            // Экспорты модуля (зачем, ведь сам модуль тоже передается?)
            module.exports,

            // Функция для импорта других модулей, которые могут понадобиться данному модулю
            __webpack_require__
        );

        // Помечаем, что данный модуль уже загружен
        module.l = true;

        // Возвращаем экспорты данного модуля
        return module.exports;
    }

    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks


    // Какая-то функция e (requireEnsure)
    // Принимает идентификатор чанка

    __webpack_require__.e = function requireEnsure(chunkId) {

        // Достаем данные установки данного чанка
        var installedChunkData = installedChunks[chunkId];

        // Если там 0 (а мы видели место, где так устанавливается)
        if(installedChunkData === 0) {

            // То возвращаем промис, который резолвит сразу, причем не предоставляя никаких значений
            return new Promise(function(resolve) {
                resolve();
            });
        }

        // Нет, данные текущего чанка не равны 0

        // a Promise means "currently loading".

        // Ладно, данные чанка не ноль, теперь проверим, может быть там лежит какой-нибудь массив, например?
        if (installedChunkData) {

            // Да, там что-то лежит.
            // Лежать там может массив.
            // Вернем элемент 2 этого массива
            // Что там лежит, промис или еще что - это пока не понятно.
            return installedChunkData[2];
        }

        // Данные загрузки переданного нам сюда чанка еще не определены

        // setup Promise in chunk cache

        // Делаем какой-то промис
        // Этот промис мы будем возвращать из функции requireEnsure(chunkId)
        var promise = new Promise(function(resolve, reject) {

            // Если на данный промис подписаться, то

            // Будут сформированы данные загрузки чанка
            installedChunkData = [resolve, reject];

            // Эти данные будут положены в объект загружаемых и загруженных чанков
            installedChunks[chunkId] = installedChunkData;
        });

        // Кладем этот промис элементом 2 в данные загружаемого чанка
        // Вероятно, на данный момент installedChunkData это не массив, не объект, а нечто falsy, но тем не менее не undefined.
        // Например, пустая строка. Будем считать, что по умолчанию installedChunks заполняется пустыми строками.

        installedChunkData[2] = promise;

        // Возможно, после данной операции installedChunkData становится truthy?

        // Данные загружаемого чанка, это выходит вот такие:
        //      0 - resolve
        //      1 - reject
        //      2 - Promise, на который если подписаться, то в installedChunks по ключу текущего чанка положат массив [resolve, reject]

        // Даже так. Есть два варианта данных загружаемого чанка:
        //  Вариант 1:
        //      2 - Promise, на который если подписаться, то в installedChunks по ключу текущего чанка положат массив [resolve, reject]
        //  Вариант 2:
        //      0 - resolve
        //      1 - reject

        // start chunk loading

        // Получаем head текущего документа
        var head = document.getElementsByTagName('head')[0];

        // Создаем тег со скриптом
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.timeout = 120000;

        // Если есть nc, ставим его в скрипт
        if(__webpack_require__.nc) {
            script.setAttribute("nonce", __webpack_require__.nc);
        }

        // Начинаем составлять имя файла нашего скрипта
        // префикс (p) - номер чанка - .chunk.js
        script.src = __webpack_require__.p + "" + chunkId + ".chunk.js";

        // Заряжаем функцию, которая ниже на 120 секунд, две минуты, короче
        // Это ошибка загрузки скрипта по таймауту
        // Получаем ссылку на созданный таймаут
        var timeout = setTimeout(onScriptComplete, 120000);

        // При ошибке - тоже вызываем эту функцию
        // При успешной загрузке - тоже вызываем эту функцию
        script.onerror = script.onload = onScriptComplete;

        function onScriptComplete() {

            // avoid mem leaks in IE.

            // Очищаем нашему скрипту свойства onerror и onload
            script.onerror = script.onload = null;

            // Закрываем таймаут
            clearTimeout(timeout);

            // Получаем данные загрузки текущего чанка, для которого мы добавляли скрипт
            var chunk = installedChunks[chunkId];

            // Данные загрузки текущего чанка, это случайно не ноль?
            if(chunk !== 0) {

                // Нет, не ноль

                // А там есть что-нибудь truthy?
                if(chunk) {

                    // Есть

                    // Берем оттуда chunk[1] == reject
                    let reject = chunk[1];

                    // Составляем объект исключения
                    let error = new Error('Loading chunk ' + chunkId + ' failed.');

                    // Вызываем наш reject с составленным объектом исключения
                    reject(error);
                }

                // Убираем из загружаемых чанков данные загрузки текущего чанка
                installedChunks[chunkId] = undefined;
            }
        }

        // Цепляем наш собранный скрипт в head нашего текущего документа
        head.appendChild(script);

        return promise;
    };

    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // identity function for calling harmony imports with the correct context
    __webpack_require__.i = function(value) {
        return value;
    };

    // define getter function for harmony exports
    __webpack_require__.d = function(exports, name, getter) {
        if(!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ?
            function getDefault() {
                return module['default'];
            } :
            function getModuleExports() {
                return module;
            };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    // __webpack_public_path__
    __webpack_require__.p = "";

    // on error function for async loading
    __webpack_require__.oe = function(err) {
        console.error(err);
        throw err;
    };
}

// Вызвать инициализацию вебпака с пустым массивом модулей
bootstrapWebpack([]);
