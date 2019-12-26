$(document).on('click', '.custom-date .control-date', function() {
    $('.custom-date .control-date').datepicker({
        language: "es",
        daysOfWeekDisabled: "0,6",
        daysOfWeekHighlighted: "1",
        autoclose: true,
        todayHighlight: true
    }).focus();

})