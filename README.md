## Main
`$.init()`

    $.ready() = function(){
        //on document loaded
    }
## DOM
####Поиск элемента по идентификатору###
`$.ge(element || id)`
* _element_ - элемент
* _id_ - id элемента (string)

####Поиск элементов по названию тега####
`$.geByTag(searchTag, node = document)`
* _searchTag_ - тег (string)
* _node_ - узел для поиска (по умолчанию - весь документ)

####Поиск первого элемента с тегом searchTag####
`$.geByTag1(searchTag, node = document)`
* _searchTag_ - тег (string)
* _node_ - узел для поиска (по умолчанию - весь документ)

####Поиск элементов по названию класса####
`$.geByClass(searchClass, node = document, tag)`
* _searchClass_ - класс (string)
* _node_ - узел для поиска (по умолчанию - весь документ) 
* _tag_ - тег (string)

####Поиск первого элемента с классом searchClass####
`$.geByClass1(searchClass, node = document, tag)`
* _searchClass_ - класс (string)
* _node_ - узел для поиска (по умолчанию - весь документ)
* _tag_ - тег (string)

####Создание элемента с тегом tagName, атрибутами attr и стилями style####
`$.ce(tagName, attr, style)`
* _tagName_ - HTML-тег (string)
* _attr_ - HTML- атрибуты (Object)
* _style_ - CSS-стили (Object)

####Удаление элемента el####
`$.re(el)`
* _el_ - элемент (HTML-object)

####Показать элемент####
`$.show(elem)`
* _elem_ - элемент (HTML-object)

####Скрыть элемент####
`$.hide(elem)`
* _elem_ - элемент (HTML-object)

`$.isVisible(elem)`
* _elem_ - элемент (HTML-object)

`$.toggle(elem, v)`
* _elem_ - элемент (HTML-object)
* _v_ - значение (bool)

## CSS
`$.setStyle(elem, name, value)`
* _elem_ - элемент (HTML-object)
* _name_ - имя атрибута css или набор атрибутов (string / Object)
* _value_ - значение атрибута

## AJAX
`$.Ajax.getXmlHttp()`

`$.Ajax.post(url, data)`
* _url_ - url-адрес запроса
* _data_ - post данные (Object)

`$.Ajax.get(url, data, cb)`
* _url_ - url-адрес запроса
* _data_ - данные (Object)
* _cb_ - callback (function)

## Utils
`$.intval(value)`
* _value_ - значение(mixed)

`$.floatval(value)`
* _value_ - значение(mixed)

`$.rand(mi, ma)`
* _mi_ - минимальное (number)
* _ma_ - максимальное (number)

`$.irand(mi, ma)`
* _mi_ - минимальное (number)
* _ma_ - максимальное (number)

`$.crand()`

`$.data2str(data)`
* _data_ - данные (Object)

`$.getUrlParams()`

`$.isObject(obj)`
* _obj_ - объект(mixed)

`$.each(object, callback)`
* _object_ - объект(Object)
* _callback_ - callback(function)

`$.extend()`
