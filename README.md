## Main
`$.init()`

    $.ready() = function(){
        //on document loaded
    }
## DOM
_поиск элемента с id_
`$.ge(element || id)`
* **element** - элемент
* **id** - id элемента (string)

`$.geByTag(searchTag, node = document)`
* **searchTag** - тег (string)
* **node** - узел для поиска (по умолчанию - весь документ)

`$.geByTag1(searchTag, node = document)`
* **searchTag** - тег (string)
* **node** - узел для поиска (по умолчанию - весь документ)

`$.geByClass(searchClass, node = document, tag)`
* **searchClass** - класс (string)
* **node** - узел для поиска (по умолчанию - весь документ) 
* **tag** - тег (string)

`$.geByClass1(searchClass, node = document, tag)`
* **searchClass** - класс (string)
* **node** - узел для поиска (по умолчанию - весь документ)
* **tag** - тег (string)

`$.ce(tagName, attr, style)`
* **tagName** - HTML-тег (string)
* **attr** - HTML- атрибуты (Object)
* **style** - CSS-стили (Object)

`$.re(el)`
* **el** - элемент (HTML-object)

`$.show(elem)`
* **elem** - элемент (HTML-object)

`$.hide(elem)`
* **elem** - элемент (HTML-object)

`$.isVisible(elem)`
* **elem** - элемент (HTML-object)

`$.toggle(elem, v)`
* **elem** - элемент (HTML-object)
* **v** - значение (bool)

## CSS
`$.setStyle(elem, name, value)`
* **elem** - элемент (HTML-object)
* **name** - имя атрибута css или набор атрибутов (string / Object)
* **value** - значение атрибута

## AJAX
`$.Ajax.getXmlHttp()`

`$.Ajax.post(url, data)`
* **url** - url-адрес запроса
* **data** - post данные (Object)

`$.Ajax.get(url, data, cb)`
* **url** - url-адрес запроса
* **data** - данные (Object)
* **cb** - callback (function)

## Utils
`$.intval(value)`
* **value** - значение(mixed)

`$.floatval(value)`
* **value** - значение(mixed)

`$.rand(mi, ma)`
* **mi** - минимальное (number)
* **ma** - максимальное (number)

`$.irand(mi, ma)`
* **mi** - минимальное (number)
* **ma** - максимальное (number)

`$.crand()`

`$.data2str(data)`
* **data** - данные (Object)

`$.getUrlParams()`

`$.isObject(obj)`
* **obj** - объект(mixed)

`$.each(object, callback)`
* **object** - объект(Object)
* **callback** - callback(function)

`$.extend()`
