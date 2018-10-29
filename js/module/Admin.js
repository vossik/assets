$(document).ready(function(){
    $(document).on('collapsed.pushMenu expanded.pushMenu', function(){
        $.nette.ajax({
            url: url_menuState,
            method: 'GET',
            data: { state: $('body').hasClass('sidebar-collapse') ? 1 : 0 }
        });
    });
});
