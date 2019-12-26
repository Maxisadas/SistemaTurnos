import Turno from '../models/Turno';

const utc_to_TimeZoneArgentina = (fechaTurno:String):Date => {

    //formato de la fecha "2000-12-25T17:00:00"

    let fecha = new Date(Date.parse(`${fechaTurno}T00:00:00`));
    let offset = fecha.getTimezoneOffset();
    fecha.setMinutes(fecha.getMinutes()-offset);


    return fecha
}



const dateNowUTC_to_TimeZoneArgentina = ():Date => {

    //formato de la fecha "2000-12-25T17:00:00"

    let fecha = new Date();
    let offset = fecha.getTimezoneOffset();
    fecha.setMinutes(fecha.getMinutes()-offset);

    return fecha
}


const verify_date = (fechaTurno:String,horaTurno:String):Boolean => {

    //Metodo que verifica que la fecha ingresada, no sea una fecha anterior a la fecha actual. Es decir que ingresen una fecha del pasado.
    let fecha = new Date(Date.parse(`${fechaTurno}T00:00:00`));
    let fechaActual = dateNowUTC_to_TimeZoneArgentina();

    fecha.setHours(Number(horaTurno.slice(0,2)));
    fecha.setMinutes(Number(horaTurno.slice(3,5)));

    let offset = fecha.getTimezoneOffset();
    fecha.setMinutes(fecha.getMinutes()-offset);


    if(fecha.getFullYear() > fechaActual.getFullYear()){
        return true;
    }else{
        if(fecha.getFullYear() == fechaActual.getFullYear()){
            if(fecha.getMonth() >= fechaActual.getMonth()){
                if(fecha.getDate() > fechaActual.getDate()){
                    return true;
                    
                }else{
                    if(fecha.getDay() == fechaActual.getDay()){
                        if(fecha.getTime()>= fechaActual.getTime()){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

}

export default {
    utc_to_TimeZoneArgentina,
    verify_date,
    dateNowUTC_to_TimeZoneArgentina,
}