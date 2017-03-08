
(function($){

    var version = '1.0.1',
        defaults = {
            label_position: 'before',
            checked_color: null,
            readonly: false,
            click: null
        },

        methods = {

            version: function()
            {
                return this.each(function()
                {
                    $(this).html(version);
                });
            },

            init: function(options)
            {
                var o = $.extend(defaults, options);

                return this.each( function()
                {

                    var me = $(this),
                        wrapper  = $('<div />', {'class': 'switchable-wrapper'}),
                        switcher = $('<div />', {'class': 'switchable-holder', 'style': 'display: inline-block'}),
                        button   = $('<div />', {'class': 'switchable-switcher'}),
                        label	 = $('<div />', {'class': 'switchable-label', 'html': (me.data('label') ? me.data('label'): '')});


                    button.appendTo(switcher.appendTo(wrapper));
                    me.after(wrapper);

                    if (me.data('label'))
                    {
                        if (o.label_position == 'before')
                        {
                            switcher.before(label);
                        }
                        else
                        {
                            wrapper.append(label);
                        }

                    }

                    me.hide();
                    switcher.toggleClass('switchable-checked', me.is(':checked'));

                    if (o.checked_color)
                    {
                        _setCustomColor( switcher, me.is(':checked'), o );
                    }

                    if (! o.readonly)
                    {

                        button.on('click', function(e){
$('#switch').prop('checked') == true;
                            if(!$('#switch').prop('checked') == true){
                                $('.switchable-switcher').css('background-color','#ffea00');
                                $('.change_color').css('color','#ffea00');
                            } else{
                                $('.switchable-switcher').css('background-color','');
                                $('.change_color').css('color','');
                            }
                            me.prop('checked', !me.is(':checked') );
                            switcher.toggleClass('switchable-checked', me.is(':checked'));

                            if (o.checked_color)
                            {
                                _setCustomColor( switcher, me.is(':checked'), o );
                            }

                            if (o.click && $.isFunction(o.click))
                            {
                                e.switcher = me;
                                return o.click(e, me.is(':checked'));
                            }
                        });
                    }
                    else
                    {
                        switcher.addClass('switchable-readonly');
                        button.css({'cursor': 'not-allowed'});
                    }

                });

            }

        };

    function _setCustomColor( switcher, is_checked, options )
    {
        
        switcher.css({
            'border-color': (is_checked ? options.checked_color : ''),
            'background-color': (is_checked ? options.checked_color : '')
        });

    } 


    $.fn.switchable = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.Switchable()' );
        }
    };
    
})(jQuery);
