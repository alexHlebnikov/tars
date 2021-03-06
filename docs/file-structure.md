Файловая структура
==================

!!! Вся файловая структура генерируется командой `gulp init`. Руками ничего создавать не нужно!!!

Сборщик имеет следующую файловую структуру:

```
├── gulpfile.js         # gulpfile сборщика
├── tars-config.js    # Конфигурационный файл
└── tars/              # Таски и хелперы для gulp
    └── helpers/        # Хелперы
    └── tasks/          # Основные таски (разложены по папкам в соответствии с типом таска)
    └── user-tasks/     # Пользовательские таски
└── markup/             # Основная папка с проектом
    └── modules/        # Модули
    └── pages/          # Шаблоны страниц
    └── static/         # Различная статика (css, js и т.п.)
└── docs/               # Документация
```


Структура отдельного модуля
---------------------------

Модуль — самостоятельная единица на странице. Пример модуля — «header» или «footer». Каждая страница состоит из модулей. Любой модуль может включать в себя другие модули.

```
exampleModule/                              # Пример модуля
    └── assets/                             # Картинки относящиейся только к данному модулю
    └── ie/                                 # Cтили для ie8 и ie9 (ie9.scss|less|styl и ie8.scss|less|styl)
    └── mData/                              # Папка для хранения данных для модуля
        ├── mData.js                        # Данные для модуля в виде js-объекта (формат объекта есть в модуле-примере _template)
    ├── exampleModule.html                  # Html-представления модуля (также может иметь расширение jade, в зависимости от выборанного шаблонизатора)
    ├── exampleModule.scss|less|styl        # Scss-представление модуля (less|styl, в зависимости от выбранного css-препроцессора)
    ├── exampleModule.js                    # Js-представление модуля

```

Основная идея в том, чтобы сделать модуль как можно более изолированной структурой. Здесь можно использовать <a href="https://ru.bem.info/" target="_blank">BEM</a>,  <a href="http://webcomponents.org/" target="_blank">веб-компоненты</a> (и их <a href="https://www.polymer-project.org/" target="_blank">реализация от Google</a>), что-то еще. Можно все делать и по старинке, внутри одного модуля вся верстка, но это крайне не рекомендуется.
Если говорить терминами BEM, то каждый модуль — это блок, в терминах Angular — каждый модуль может быть директивой и т.д.
Есть отличная лекция о том, как лучше организовать свой код, <a href="https://www.youtube.com/watch?v=pyAYbbDJjPo" target="_blank">ссылка</a>.

В `pages` находятся шаблоны страниц, в которые в итоге будут включены модули. Страницы являются лэйаутом и должны содеражть в себе как можно меньше кода, чтобы структура была как можно более прозрачная.
Чтобы создать новую страницу, просто скопируйте существующую (или _template) и переименуйте.

Структура папки для статики
---------------------------

Будем считать, что css-препроцессором был выбран Scss.

```
static/                                     # Папка для статики. Название для папки настраивается в tars-config.js
    └── fonts/                              # Шрифты (может содержать поддиректории)
    └── img/                                # Картинки. Название для папки настраивается в tars-config.js
        └── content/                        # Контентные картинки (может содержать поддиректории)
        └── plugins/                        # Картинки для плагинов (может содержать поддиректории)
        └── general/                        # Общие картинки для проекта (может содержать поддиректории)
        └── sprite/                         # Растровые картинки, которые должны быть включены в спрайт (png) 
            └── 96dpi/                      # Картинки для экранов с dpi 96
            ...
            └── 288dpi/                     # Картинки для экранов с dpi 288 (более подробно в разделе работы с изображениями)
        └── svg/                            # SVG-картинки
    └── js/                                 # js
        └── libraries/                      # js-библиотеки (например, jquery)
        └── plugins/                        # js-плагины
        └── separate-js/                     # js-файлы, которые не должны попасть в итоговый склеенный js-файл.
    └── misc/                               # Общие файлы, которые будут перемещены в корень собранного проекта — фавиконка, robots.txt и т.д.  (может содержать поддиректории)
    └── scss                  
        └── etc/                            # Стили, которые будут подключаться в самом конце (может содержать поддиректории)
        └── libraries/                        # Стили библиотек (может содержать поддиректории)
        └── plugins/                        # Стили для плагинов (может содержать поддиректории)
        └── spriteGeneratorTemplates/       # Шаблоны, по которым генерируются спрайты
        └── spritesScss                     # Миксины для спрайтов  
        ├── common.scss                     # Общие стили для всего проекта
        ├── fonts.scss                      # Стили для подключенный шрифтов
        ├── GUI.scss                        # Стили для GUI-элементов типа кнопок, полей ввода и т.д.
        ├── mixins.scss                     # Набор миксинов
        ├── normalize.scss                  # Сброс стилей
        ├── vars.scss                       # Переменные проекта
```

Структура готовой сборки
-------------------------

После сборки проекта в корне появятся две папки: dev и builds. Ниже дано описание dev-версии сборки, так как готовый билд не сильно отличается от dev.

```
dev/
    └── static/                         # Статика для проекта (имеет имя, заданное в tars-config)
        └── css/                        # Готовые файлы стилей для всех основных браузеров, ie9 и ie8, если включена их поддержка
        └── img/                        # Картинки для проекта
            └── assets/                 # Картинки для модулей. Содержит в себе директории с именами тех модулей, которые имеют картинки
                └── exampleModule/      
            └── content/                # Картинки для контента
            └── plugins/                # Картинки для плагинов
            └── svg/                    # SVG-Картинки для проекта
        └── js/                         # Итоговый main.js файл и js-файлы, которые нне должны попасть в общую сборку.
            └── separate-js/   
    └── temp/                           # Папка для данных для модулей
    ├── Готовые страницы и файлы из папки misc
```

build-версия проекта не содержит папки temp, включает минимизированные css- и js-файлы. Содержит оптимизированные картинки и архив с собранным проектом (опционально).

Если включена опция useBuildVersioning, то каждый билд лежит в отдельной папке под названием build_ver%дата сборки%. Если useBuildVersioning отключен, то готовый проект находится по пути ./builds/build

При подключении картинок необходимо использовать именно тот путь, по которому они лежат в собранном проекте.

Сразу после инициализации или переинициализации в корне могут появится папки .tmpPreproc и .tmpTemplater, в которых находятся скачанные шаблонизатор и css-препроцессор. При первой же сборке эти папки будут удалены. Так что просто не обращайте на них внимание. Эти папки влючены в .gitignore

Данную файловую структуру можно менять, с правкой соответствующих тасков и вотчеров. Для некоторых папок нет необходимости лезть в таски и вотчеры. Например, можно создать папки для хранения js,который должен быть выполнен до модулей и после. Это будет полезно при использовании различных js-фреймворков, например Angular.