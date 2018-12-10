function getArgsVal(elem, args)
{
    return $(elem).closest('form').find('input[name="'+args+'"]').val();
}

Nette.validators.NepttuneValidatorCoreValidator_sameLength = function(elem, args, val)
{
    return val.length == getArgsVal(elem, args).length;
};

Nette.validators.NepttuneValidatorCoreValidator_isIn = function(elem, args, val)
{
    return Array.isArray(val) && val.includes(args);
};
