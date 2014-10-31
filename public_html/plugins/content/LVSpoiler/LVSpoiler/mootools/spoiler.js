/* Spoiler by http://irridium.spb.ru/articles/show/116 */

myLoader = new Image();
myLoader.src = "/plugins/content/LVSpoiler/LVSpoiler/loading.gif";// кэшируем картинку с лоадером
//console.log(myLoader.src);
window.addEvent('domready', function() {

    //все спойлеры на странице
    var spoilers = $$('.spoiler');

    function hide_all_spoilers(id) {
        spoilers.each(function(element) {
            //если спойлер открыт и не является текущим спойлером, то закрываем его и изменяем класс открытого/закрытого
            if (element.getElement('.sp-head').getProperty('class').test("unfolded") && element.getElement('.sp-head').get('id') != id) {
                element.getElement('.sp-head').toggleClass('unfolded').toggleClass('folded');
                var fx_slide = new Fx.Slide(element.getElement(".sp-body"), {
                    duration: pb_sp_conf.animatespeed
                }).slideOut();
            }
        })
    }

    function open_spoiler(id) {

        var spoiler = $$('#' + id + '_spoiler');

        //изменение прозрачности спойлера modified by Lex
        var fx_sp_opac = new Fx.Morph(spoiler[0].getElement('.sp-body'), {
            duration: pb_sp_conf.animatespeed,
            transition: Fx.Transitions.Expo.easeInOut
        });

        //слайдинг спойлера
        var fx_sp_slide = new Fx.Slide(spoiler[0].getElement('.sp-body'), {
            duration: pb_sp_conf.animatespeed,
            onStart: function() {
                fx_sp_opac.start({
                    'opacity': [0.5, 1]
                });
            }
        }).slideIn();
    }

    //цикл перебора спойлеров
    spoilers.each(function(element) {

        //изменение прозрачности спойлера modified by Lex
        var fx_sp_opac = new Fx.Morph(element.getElement('.sp-body'), {
            duration: pb_sp_conf.animatespeed,
            transition: Fx.Transitions.Expo.easeInOut
        });

        //слайдинг спойлера
        var fx_sp_slide = new Fx.Slide(element.getElement('.sp-body'), {
            duration: pb_sp_conf.animatespeed,
            onStart: function() {
                fx_sp_opac.start({
                    'opacity': [0.5, 1]
                });
            }
        });

        //открыт ли элемент по умолчанию
        var opened = element.getElement('.opened').get('value');
        //если элемент не открыт по умолчанию, и установлено анимировать открытые по умолчанию то закрываем его и открываем с анимацией
        if (pb_sp_conf.animatedefault == 1) {
            fx_sp_slide.hide();
            if (opened == '1') {
                var osid = element.getElement('.sp-head').get('id').toInt();
                open_spoiler(osid);
            }
        }//если элемент не открыт по умолчанию, и установлено не анимировать открытые по умолчанию то закрываем его
        else if (opened != '1') {
            fx_sp_slide.hide();
        }

        //действия по нажатию на спойлер
        var makeAction = function() {
            if (pb_sp_conf.revealtype != "mouseover")
                makeAction2();
            else
                makeAction2.delay(pb_sp_conf.mouseoverdelay);
        }

        var makeAction2 = function() {

            //если в настройках указано что один спойлер всегда должен быть открыт и производится закрытие последнего спойлера
            if (pb_sp_conf.onemustopen == 1) {
                var unfoldedSpoilers = $$('div.unfolded');//массив развернутых спойлеров
                var thisId = element.getElement('.sp-head').get('id');//ид текущего спойлера
                if (unfoldedSpoilers.length == 1 && unfoldedSpoilers[0].get('id') == thisId) {
                    return;//если открыт всего один спойлер и это текущий спойлер, то прерываем исполнение функции
                }
            }

            //если в настройках указано сворачивать предыдущий спойлер при открытии нового сворачиваем все спойлеры кроме нового
            if (pb_sp_conf.collapseprev == 1) {
                hide_all_spoilers(element.getElement('.sp-head').get('id'));
            }

            // изменяем класс спойлера открытый/закрытый
            element.getElement('.sp-head').toggleClass('unfolded').toggleClass('folded');
            //для подгрузки картинок после открытия спойлера
            var images = element.getElements('.spoilerimage');//все картинки в спойлере
            var all_images = []; //массив для хранения путей к изображениям для функции Asset
            var $href = null;//ссылка на картинку

            $each(images, function(item) {//заполняем массив путей
                $href = item.getProperty("data_src");
                if($href != 'undefined' && $href != null){
                    all_images.push($href);
                }
            });

            if (all_images.length > 0) {//если есть картинки с атрибутом data_src то сначала мы их должны загрузить в кеш
                element.getElement('.sp-head').toggleClass('loading');

                var loader = new Asset.images(all_images, {
                    onComplete: function() {

                        $each(images, function(item) {
                             $href = item.getProperty("data_src");
                if ($href != 'undefined' && $href != null) {
                    item.setProperty("src", $href); //присваиваем атрибуту src изображения занчение data_src
                    item.removeProperty("data_src"); //удаляем атрибут data_src
                }
            });

                        element.getElement('.sp-head').toggleClass('loading');
                        fx_sp_slide.toggle();
                    }
                });
            }

            else {
                fx_sp_slide.toggle();//если спойлер уже открывался, то обрабатываем нажатие. в противном случае ждём пока сработает "load"
            }
        }
        element.getElement('.sp-head-click').addEvent(pb_sp_conf.revealtype, makeAction);
    });
});