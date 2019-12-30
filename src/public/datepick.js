$(document).on('click', '.custom-date .control-date', function() {
    $('.custom-date .control-date').datepicker({
        language: "es",
        daysOfWeekDisabled: "0,6",
        daysOfWeekHighlighted: "1",
        startDate: new Date(),
        dateFormat: 'yy/mm/dd',
        autoclose: true,
        todayHighlight: true
    }).focus();

})