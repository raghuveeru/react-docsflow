var MOMINTRANET = (function(app, $, window, undefined){

    'use strict';

    app.$document = $(document),
    app.$html = $('html'),
    app.$body = $('body');

    /**
     * User Interactions
     */

    app.UI = {
        initialize: function(){

            this.dropdown();
        },
        dropdown: function(){

            var $dropdown = $('.ui-dropdown'),
                $dropcontent = $('.dropdown');

            app.$body.off('click.dropdown').on('click.dropdown', '.ui-dropdown', function(e){

                var $this = $(this);

                $dropdown
                    .not($this)
                    .removeClass('dropdown-active');

                $(this).toggleClass('dropdown-active');

                e.preventDefault();
                e.stopPropagation();

            });

            $dropcontent.click(function(e){
                e.stopPropagation();
            })

            app.$html.click(function(){
                $dropdown.removeClass('dropdown-active');
            })
        }
    };


    /**
     * On body load
     */

    $(function(){

        app.UI.initialize();

    });


    return app;

})(MOMINTRANET || {} , jQuery, window, undefined);