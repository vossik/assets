const selectOptions =
{
    width: '100%'
};
const iCheckOptions =
{
    checkboxClass: 'icheckbox_square-red',
    radioClass: 'iradio_square-red'
};

Nette.showFormErrors = function (form, errors)
{
    $(form).find('.has-error').removeClass('has-error');
    $(form).find('span.help-block').remove();

    for (var i = 0; i < errors.length; i++)
    {
        $(errors[i].element).parent().addClass('has-error');
        $(errors[i].element).parent().append('<span class="help-block">' + errors[i].message + '</span>');
    }

    if (errors.length > 0)
    {
        var elem = errors[0].element;

        if (elem.nodeName === 'SELECT')
        {
            $(elem).parent().find('input[type="text"]').trigger('click');
            return;
        }
        $(elem).focus();
    }
};

showFormErrorsBS4 = function (form, errors)
{
    $(form).find('.is-invalid').removeClass('is-invalid');
    $(form).find('.invalid-feedback').remove();

    for (var i = 0; i < errors.length; i++)
    {
        $(errors[i].element).addClass('is-invalid');
        $(errors[i].element).closest('.form-group').children().last().append('<div class="invalid-feedback d-block">' + errors[i].message + '</div>');
    }
};

form_refereshPlugins = refreshPlugins;

refreshPlugins = function (el)
{
    form_refereshPlugins(el);

    var checkInputs = $(el).find('input[type="radio"], input[type="checkbox"]');
    checkInputs.iCheck(iCheckOptions);
    checkInputs.on('ifChanged', function (event)
    {
        event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, true);
        event.eventName = 'change';

        this.dispatchEvent(event);
    });

    var selectInputs = $(el).find('select');
    selectInputs.select2(selectOptions);

    $(el).find('[data-dependentselectbox]').dependentSelectBox();
    
    $(el).find('input.date, input.datetime-local').each(function(i, el) {
        el = $(el);
        el.get(0).type = 'text';
        el.datetimepicker({
            startDate: el.attr('min'),
            endDate: el.attr('max'),
            weekStart: 1,
            language: el.data('language'),
            minView: el.is('.date') ? 'month' : 'hour',
            format: el.is('.date') ? 'd. m. yyyy' : 'd. m. yyyy - hh:ii', // for seconds support use 'd. m. yyyy - hh:ii:ss'
            autoclose: true
        });
        el.attr('value') && el.datetimepicker('setValue');
    });
    
    if ($('.g-recaptcha').length !== 0)
    {
        g_ReCaptchaOnLoad();
    }
};
