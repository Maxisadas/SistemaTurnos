"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utc_to_TimeZoneArgentina = function (fechaTurno) {
    //formato de la fecha "2000-12-25T17:00:00"
    var fecha = new Date(Date.parse(fechaTurno + "T00:00:00"));
    var offset = fecha.getTimezoneOffset();
    fecha.setMinutes(fecha.getMinutes() - offset);
    return fecha;
};
var dateNowUTC_to_TimeZoneArgentina = function () {
    //formato de la fecha "2000-12-25T17:00:00"
    var fecha = new Date();
    var offset = fecha.getTimezoneOffset();
    fecha.setMinutes(fecha.getMinutes() - offset);
    return fecha;
};
var verify_date = function (fechaTurno, horaTurno) {
    //Metodo que verifica que la fecha ingresada, no sea una fecha anterior a la fecha actual. Es decir que ingresen una fecha del pasado.
    var fecha = new Date(Date.parse(fechaTurno + "T00:00:00"));
    var fechaActual = dateNowUTC_to_TimeZoneArgentina();
    fecha.setHours(Number(horaTurno.slice(0, 2)));
    fecha.setMinutes(Number(horaTurno.slice(3, 5)));
    var offset = fecha.getTimezoneOffset();
    fecha.setMinutes(fecha.getMinutes() - offset);
    if (fecha.getFullYear() > fechaActual.getFullYear()) {
        return true;
    }
    else {
        if (fecha.getFullYear() == fechaActual.getFullYear()) {
            if (fecha.getMonth() >= fechaActual.getMonth()) {
                if (fecha.getDate() > fechaActual.getDate()) {
                    return true;
                }
                else {
                    if (fecha.getDay() == fechaActual.getDay()) {
                        if (fecha.getTime() >= fechaActual.getTime()) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
exports.default = {
    utc_to_TimeZoneArgentina: utc_to_TimeZoneArgentina,
    verify_date: verify_date,
    dateNowUTC_to_TimeZoneArgentina: dateNowUTC_to_TimeZoneArgentina,
};
//# sourceMappingURL=utils.js.map