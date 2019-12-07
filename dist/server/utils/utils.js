"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utc_to_TimeZoneArgentina = function (fechaTurno, horaTurno) {
    //formato de la fecha "2000-12-25T17:00:00"
    var fecha = new Date(Date.parse(fechaTurno + "T" + horaTurno));
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
    var fecha = utc_to_TimeZoneArgentina(fechaTurno, horaTurno);
    var fechaActual = dateNowUTC_to_TimeZoneArgentina();
    if (fecha.getFullYear() > fechaActual.getFullYear()) {
        return true;
    }
    else {
        if (fecha.getFullYear() == fechaActual.getFullYear()) {
            if (fecha.getMonth() >= fechaActual.getMonth()) {
                if (fecha.getDay() > fechaActual.getDay()) {
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
    dateNowUTC_to_TimeZoneArgentina: dateNowUTC_to_TimeZoneArgentina
};
