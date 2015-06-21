/*
    φ-js 
    Pavo Philip - 2015
    on vk common based
*/
var $ = {
    // On loaded
    ready: function () {

    },
    //browser init()
    browser: {

    },
    //MAIN
    init: function () {
        if (!window._ua) {
            var _ua = navigator.userAgent.toLowerCase();
        }
        $.browser = {
            version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
            opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
            msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)),
            msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
            msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
            msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
            msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
            mozilla: /firefox/i.test(_ua),
            chrome: /chrome/i.test(_ua),
            safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
            iphone: /iphone/i.test(_ua),
            ipod: /ipod/i.test(_ua),
            iphone4: /iphone.*OS 4/i.test(_ua),
            ipod4: /ipod.*OS 4/i.test(_ua),
            ipad: /ipad/i.test(_ua),
            android: /android/i.test(_ua),
            bada: /bada/i.test(_ua),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
            msie_mobile: /iemobile/i.test(_ua),
            safari_mobile: /iphone|ipod|ipad/i.test(_ua),
            opera_mobile: /opera mini|opera mobi/i.test(_ua),
            opera_mini: /opera mini/i.test(_ua),
            mac: /mac/i.test(_ua),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
        };
        $.ready();
    },
    // DOM
    ge: function (el) {
        return (typeof el == 'string' || typeof el == 'number') ? document.getElementById(el) : el;
    },
    geByTag: function (searchTag, node) {
        node = $.ge(node) || document;
        return node.getElementsByTagName(searchTag);
    },
    geByTag1: function (searchTag, node) {
        node = $.ge(node) || document;
        return node.querySelector && node.querySelector(searchTag) || $.geByTag(searchTag, node)[0];
    },
    geByClass: function (searchClass, node, tag) {
        node = $.ge(node) || document;
        tag = tag || '*';
        var classElements = [];

        if (!$.browser.msie8 && node.querySelectorAll && tag != '*') {
            return node.querySelectorAll(tag + '.' + searchClass);
        }
        if (node.getElementsByClassName) {
            var nodes = node.getElementsByClassName(searchClass);
            if (tag != '*') {
                tag = tag.toUpperCase();
                for (var i = 0, l = nodes.length; i < l; ++i) {
                    if (nodes[i].tagName.toUpperCase() == tag) {
                        classElements.push(nodes[i]);
                    }
                }
            } else {
                classElements = Array.prototype.slice.call(nodes);
            }
            return classElements;
        }

        var els = $.geByTag(tag, node);
        var pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
        for (var i = 0, l = els.length; i < l; ++i) {
            if (pattern.test(els[i].className)) {
                classElements.push(els[i]);
            }
        }
        return classElements;
    },
    geByClass1: function (searchClass, node, tag) {
        node = $.ge(node) || document;
        tag = tag || '*';
        return !$.browser.msie8 && node.querySelector && node.querySelector(tag + '.' + searchClass) || $.geByClass(searchClass, node, tag)[0];
    },
    ce: function (tagName, attr, style) {
        var el = document.createElement(tagName);
        if (attr) $.extend(el, attr);
        if (style) $.setStyle(el, style);
        return el;
    },
    re: function (el) {
        el = $.ge(el);
        if (el && el.parentNode) el.parentNode.removeChild(el);
        return el;
    },
    getStyle: function (elem, name, force) {
        elem = $.ge(elem);
        if ($.isArray(name)) { var res = {}; $.each(name, function (i, v) { res[v] = $.getStyle(elem, v); }); return res; }
        if (!elem) return '';
        if (force === undefined) {
            force = true;
        }
        if (!force && name == 'opacity' && $.browser.msie) {
            var filter = elem.style['filter'];
            return filter ? (filter.indexOf('opacity=') >= 0 ?
                (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1') : '';
        }
        if (!force && elem.style && (elem.style[name] || name == 'height')) {
            return elem.style[name];
        }

        var ret, defaultView = document.defaultView || window;
        if (defaultView.getComputedStyle) {
            name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
            var computedStyle = defaultView.getComputedStyle(elem, null);
            if (computedStyle) {
                ret = computedStyle.getPropertyValue(name);
            }
        } else if (elem.currentStyle) {
            if (name == 'opacity' && $.browser.msie) {
                var filter = elem.currentStyle['filter'];
                return filter && filter.indexOf('opacity=') >= 0 ?
                    (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1';
            }
            var camelCase = name.replace(/\-(\w)/g, function (all, letter) {
                return letter.toUpperCase();
            });
            ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
            if (ret == 'auto') {
                ret = 0;
            }

            ret = (ret + '').split(' ');
            $.each(ret, function (i, v) {
                if (!/^\d+(px)?$/i.test(v) && /^\d/.test(v)) {
                    var style = elem.style, left = style.left, rsLeft = elem.runtimeStyle.left;
                    elem.runtimeStyle.left = elem.currentStyle.left;
                    style.left = v || 0;
                    ret[i] = style.pixelLeft + 'px';
                    style.left = left;
                    elem.runtimeStyle.left = rsLeft;
                }
            });
            ret = ret.join(' ');
        }

        if (force && (name == 'width' || name == 'height')) {
            var ret2 = $.getSize(elem, true)[({ 'width': 0, 'height': 1 })[name]];
            ret = ($.intval(ret) ? Math.max($.floatval(ret), ret2) : ret2) + 'px';
        }

        return ret;
    },
    show: function (elem) {
        var l = arguments.length;
        if (l > 1) {
            for (var i = 0; i < l; i++) {
                $.show(arguments[i]);
            }
            return;
        }

        elem = $.ge(elem);
        if (!elem || !elem.style) return;

        var old = elem.olddisplay;
        var newStyle = 'block';
        var tag = elem.tagName.toLowerCase();
        elem.style.display = old || '';

        if ($.getStyle(elem, 'display') !== 'none') {
            return;
        }

        if ($.hasClass(elem, 'inline')) {
            newStyle = 'inline';
        } else if (tag === 'tr' && !$.browser.msie) {
            newStyle = 'table-row';
        } else if (tag === 'table' && !$.browser.msie) {
            newStyle = 'table';
        } else {
            newStyle = 'block';
        }
        elem.style.display = elem.olddisplay = newStyle;
    },

    hide: function (elem) {
        var l = arguments.length;
        if (l > 1) {
            for (var i = 0; i < l; i++) {
                $.hide(arguments[i]);
            }
            return;
        }

        elem = $.ge(elem);
        if (!elem || !elem.style) return;

        var display = $.getStyle(elem, 'display');
        elem.olddisplay = ((display != 'none') ? display : '');
        elem.style.display = 'none';
    },

    isVisible: function (elem) {
        elem = $.ge(elem);
        if (!elem || !elem.style) return false;
        return $.getStyle(elem, 'display') != 'none';
    },

    toggle: function (elem, v) {
        if (v === undefined) {
            v = !$.isVisible(elem);
        }
        if (v) {
            $.show(elem);
        } else {
            $.hide(elem);
        }
    },
    //CSS
    setStyle: function (elem, name, value) {
        elem = $.ge(elem);
        if (!elem) return;
        if (typeof name == 'object') return $.each(name, function (k, v) { $.setStyle(elem, k, v); });
        if (name == 'opacity') {
            if ($.browser.msie) {
                if ((value + '').length) {
                    if (value !== 1) {
                        elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
                    } else {
                        elem.style.filter = '';
                    }
                } else {
                    elem.style.cssText = elem.style.cssText.replace(/filter\s*:[^;]*/gi, '');
                }
                elem.style.zoom = 1;
            };
            elem.style.opacity = value;
        } else {
            try {
                var isN = typeof (value) == 'number';
                if (isN && (/height|width/i).test(name)) value = Math.abs(value);
                elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
            } catch (e) { console.log('setStyle error: ') }
        }
    },
    //AJAX
    Ajax: {
        getXmlHttp: function () {
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        },
        post: function (url, data) {
            var xhr = $.Ajax.getXmlHttp();

            xhr.open("POST", url, true)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    console.log("HTTP status: " + xhr.statusText);
                    if (xhr.status == 200) {
                        console.log("HTTP OK");
                        console.log("Response: " + xhr.responseText);
                    } else {
                        console.log("HTTP ERROR");
                    }
                }

            };
            xhr.send("some=data");
        },
        get: function (url, data, cb) {
            var xhr = $.Ajax.getXmlHttp();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    console.log("HTTP status: " + xhr.statusText);
                    if (xhr.status == 200) {
                        cb(xhr.responseText, xhr.status, xhr.statusText);
                    } else {
                        console.log("HTTP ERROR");
                    }
                }

            }
            xhr.open('GET', url + '?' + $.data2str(data), true);
            xhr.send(null);
        }
    },
    //UTILS
    intval: function (value) {
        if (value === true) return 1;
        return parseInt(value) || 0;
    },
    floatval: function (value) {
        if (value === true) return 1;
        return parseFloat(value) || 0;
    },
    //gen-s
    rand: function (mi, ma) { return Math.random() * (ma - mi + 1) + mi; },
    irand: function (mi, ma) { return Math.floor($.rand(mi, ma)); },
    crand: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    //Objects & Arrays
    data2str: function (data) {
        var res = [];
        $.each(data, function (k, v) {
            res.push(k + "=" + v);
        });
        return res.join('&');
    },
	getUrlParams: function() {
        var query_obj = {};
        var get = location.search;
        if (get) {
            var query_arr = (get.substr(1)).split('&');
            var tmp_val;
            for (var i = 0; i < query_arr.length; i++) {
                tmp_val = query_arr[i].split("=");
                query_obj[tmp_val[0]] = tmp_val[1];
            }
        }
        return query_obj;
    },
    isObject: function (obj) { return Object.prototype.toString.call(obj) === '[object Object]' && !($.browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); },
    each: function (object, callback) {
        if (!$.isObject(object) && typeof object.length !== 'undefined') {
            for (var i = 0, length = object.length; i < length; i++) {
                var value = object[i];
                if (callback.call(value, i, value) === false) break;
            }
        } else {
            for (var name in object) {
                if (!Object.prototype.hasOwnProperty.call(object, name)) continue;
                if (callback.call(object[name], name, object[name]) === false)
                    break;
            }
        }

        return object;
    },
    extend: function () {
        var a = arguments, target = a[0] || {}, i = 1, l = a.length, deep = false, options;

        if (typeof target === 'boolean') {
            deep = target;
            target = a[1] || {};
            i = 2;
        }

        if (typeof target !== 'object' && !$.isFunction(target)) target = {};

        for (; i < l; ++i) {
            if ((options = a[i]) != null) {
                for (var name in options) {
                    var src = target[name], copy = options[name];

                    if (target === copy) continue;

                    if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
                        target[name] = $.extend(deep, src || (copy.length != null ? [] : {}), copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }

};
window.onload = $.init;