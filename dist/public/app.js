let dniPaciente; // Se usa como cache
let fecha;
let IDprofesional;
let medico;
let horario;
let paciente; // Se usa como cache
let profesionalesList = [];

function cargarProfesional(_callback) {
    $.ajax({
        url: `/buscarProfesionale/${IDprofesional}`,
        type: 'GET', // http method
        success: function(data) {
            medico = data.profesionalDB;
            _callback();
        }

    });
}


function arregloHorario(fecha) {

    fecha = fecha.replace("/", "-").replace("/", "-");

    $.ajax({
        url: `/buscarTurnos/${fecha}`,
        type: 'GET', // http method
        success: function(data) {

            if (data.turnosDB.length > 0) {
                let horarios = ["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00", "19:00:00", "19:30:00", "20:00:00", "20:30:00", "21:00:00", "21:30:00"];

                for (let i = 0; i < data.turnosDB.length; i++) {
                    for (let j = 0; j < horarios.length; j++) {
                        if (horarios[j] == data.turnosDB[i].horaTurno) {
                            horarios.splice(j, 1)
                        }

                    }

                }


                $("#horaTurno").empty();
                horarios.forEach((horario) => {

                    $("#horaTurno").append(`<option value=${horario}>${horario}</option>`);


                })
            } else {
                let horarios = ["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00", "19:00:00", "19:30:00", "20:00:00", "20:30:00", "21:00:00", "21:30:00"];

                $("#horaTurno").empty();
                horarios.forEach(horario => $("#horaTurno").append(`<option value=${horario}>${horario}</option>`))
            }




        }
    });



}

$(document).ready(function() {

    $.ajax({
        url: '/buscarProfesional',
        type: 'GET', // http method
        success: function(data) {
            for (let i = 0; i < data.profesionalesDB.length; i++) {
                profesionalesList[i] = data.profesionalesDB[i];
            }

        },
        error: function(jqXhr, textStatus, errorMessage) {

            profesionalesList = ["No hay profesionales cargados en el sistema"];

        }

    });

    let estado = "principal"; //Exisitira 3 estados en el proceso de pedir un turno "Principal","PedirTurno","Cofirmar","MiTurno"
    mostrarContenido(estado);
    //ALTA DE PACIENTE

    $('body').on('click', '#submitButton', function() {
        estado = "PedirTurno";
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = Number($('#dni').val());
        let edad = $('#edad').val();

        if (nombre != "" && apellido != "" && dni != "" && Number.isInteger(dni) && edad != "") {
            $.ajax({
                url: '/crearPaciente',
                type: 'POST', // http method
                data: { nombre, apellido, dni, edad }, // data to submit
                success: function(data, status) {
                    let paciente = data;
                    dniPaciente = paciente.pacienteDB.dni
                    estado = "PedirTurno"
                    mostrarContenido(estado);
                },
                error: function(jqXhr, textStatus, errorMessage) {

                    $.ajax({
                        url: '/buscarPaciente',
                        type: 'POST', // http method
                        data: { dni }, // data to submit
                        success: function(data, status) {
                            paciente = data.paciente;
                            dniPaciente = paciente.dni;
                            estado = "PedirTurno"
                            mostrarContenido(estado);
                        }


                    });


                }
            });
        } else {
            $('#container').empty();
            $('#container').append(`
            <div class="row"> 
            <div class="alert alert-danger mx-auto" role="alert">
                Complete todos las casillas e ingrese los datos correctamente
                </div>
            </div>
        <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                    <h3 class="text-center text-uppercase mb-4">Complete con sus datos personales</h3>
                    <h5 class="text-center text-uppercase mb-4">Rellene con sus datos personales y luego haga click en el boton "Pedir turno"</h5>
                    <div class="form-row">
                        <div class="form-group col-sm-5">
                            <label for="inputnombre">Nombre</label>
                            <input type="text" class="form-control" id="nombre" name="nombre">
                        </div>
                        <div class="form-group col-sm-5">
                            <label for="inputapellido">Apellido</label>
                            <input type="text" class="form-control" id="apellido" name="apellido">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputDNI">DNI</label>
                        <input type="text" class="form-control" id="dni" name="dni">
                    </div>
                    <div class="form-group">
                        <label for="inputedad">Edad</label>
                        <input type="text" class="form-control" id="edad" name="edad">
                    </div>
                    <button type="button" class="btn btn-primary" id="submitButton">Pedir Turno</button>

                </form>
        `);

        }


    });

    $('body').on('change', '#date', function() {

        let fecha = $('#fecha').val();
        arregloHorario(fecha);



    });

    $('body').on('click', '#submitTurn', function() {

        fecha = $('#fecha').val();
        IDprofesional = $('#profesional').val();
        horario = $('#horaTurno').val();
        cargarProfesional(function() {
            estado = "Confirmar"
            mostrarContenido(estado);
        });


    });

    $('body').on('click', '#Finalizar', function() {

        location.reload();


    });

    $('body').on('click', '#Confirmar', function() {

        $.ajax({
            url: '/crearTurno',
            type: 'POST', // http method
            data: { dni: dniPaciente, fechaTurno: fecha, horaTurno: horario, idProfesional: IDprofesional }, // data to submit
            success: function(data, status) {
                $('#container').empty();
                $('#container').append(`
                
                <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                <h3 class="text-center text-uppercase mb-4">¡Turno creado con exito!</h3>
                <div class="form-group row">
                    <button type="button " class="btn btn-primary mx-auto" id="Finalizar">Volver a la pagina de inicio</button>
                </div>
            </form>
                `);
            },
            error: function(jqXhr, textStatus, errorMessage) {

                $('#container').empty();
                $('#container').append(`
                
                <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                <h3 class="text-center text-uppercase mb-4">¡Usted ya posee un turno!</h3>
                <h5 class="text-center text-uppercase mb-4">Dirigase a la seccion MiTurno y dele de baja a su turno para crear uno nuevo</h5>
                <div class="form-group row">
                    <button type="button " class="btn btn-primary mx-auto" id="Finalizar">Volver a la pagina de inicio</button>
                </div>
            </form>
                `);


            }



        });


    });



})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mostrarContenido(estado) {
    switch (estado) {
        case "principal":
            $('#container').empty();
            $('#container').append(`
        <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                    <h3 class="text-center text-uppercase mb-4">Complete con sus datos personales</h3>
                    <h5 class="text-center text-uppercase mb-4">Rellene con sus datos personales y luego haga click en el boton "Pedir turno"</h5>
                    <div class="form-row">
                        <div class="form-group col-sm-5">
                            <label for="inputnombre">Nombre</label>
                            <input type="text" class="form-control" id="nombre" name="nombre">
                        </div>
                        <div class="form-group col-sm-5">
                            <label for="inputapellido">Apellido</label>
                            <input type="text" class="form-control" id="apellido" name="apellido">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputDNI">DNI</label>
                        <input type="text" class="form-control" id="dni" name="dni">
                    </div>
                    <div class="form-group">
                        <label for="inputedad">Edad</label>
                        <input type="text" class="form-control" id="edad" name="edad">
                    </div>
                    <button type="button" class="btn btn-primary" id="submitButton">Pedir Turno</button>

                </form>
        `);
            break;
        case "PedirTurno":
            $.ajax({
                url: '/buscarPaciente',
                type: 'POST', // http method
                data: { dni: dniPaciente }, // data to submit
                success: function(data, status) {
                    paciente = data.paciente;
                },
                error: function(jqXhr, textStatus, errorMessage) {

                    estado = "principal"
                    $('#container').empty();
                    $('#container').append(`
                    
                    <div class="alert alert-danger mx-auto" role="alert">
                         El paciente no existe en el sistema, por favor debe darse de alta.
                    </div>
                    
                    `);



                }

            });


            $('#container').empty();
            $('#container').append(`
            <!--Cuerpo para pedir turno-->
            <form class="shadow-lg bg-white mb-4 my-4">
                <h2 class="uppercase my-4">Pedido del turno</h2>

                <div class="form-group row my-4 ml-2">

                    <label for="fecha">Seleccione la fecha:</label>
                    <div class="input-group date custom-date col-sm-5 ml-4" id="date">
                        <input type="text" id="fecha" class="form-control control-date" readonly data-date-format='yyyy-mm-dd'><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-5 my-4 ml-2">
                        <label for="horaTurno">Horario disponible para el turno:</label>
                        <select id="horaTurno" class="form-control">
                        <option selected>Seleccione una fecha...</option>

                        </select>
                    </div>
                    <div class="form-group col-sm-5 my-4 ml-2">
                        <label for="profesional">Elija al profesional que desea:</label>
                        <select id="profesional" class="form-control">
                        <option selected>Elegir...</option>
                        </select>
                    </div>

                </div>

                <button type="button" class="btn btn-primary ml-2 mb-4" id="submitTurn">Pedir Turno</button>
            </form>
            `);

            arregloProfesional()




            break;
        case "Confirmar":
            let fechaMostrar = fecha.replace("-", "/").replace("-", "/");
            $('#container').empty();
            $('#container').append(`
            <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                    <h3 class="text-center text-uppercase mb-4">Confirmar turno</h3>
                    <div class="form-row">
                        <label for="Nombre" class="col-sm-2 col-form-label">Nombre:</label>
                        <div class="col-sm-3">
                            <input type="text" readonly class="form-control-plaintext" id="Nombre" value="${paciente.nombre}">
                        </div>
                        <label for="Apellido" class="col-sm-2 col-form-label">Apellido:</label>
                        <div class="col-sm-3">
                            <input type="text" readonly class="form-control-plaintext" id="Apellido" value="${paciente.apellido}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="DNI" class="col-sm-2 col-form-label">DNI:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="DNI" value="${paciente.dni}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Edad" class="col-sm-2 col-form-label">Edad:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Edad" value="${paciente.edad}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Fecha" class="col-sm-2 col-form-label">Fecha:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Fecha" value="${fechaMostrar}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Hora" class="col-sm-2 col-form-label">Hora:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Hora" value="${horario}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Profesional" class="col-sm-2 col-form-label">Profesional:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Profesional" value="${medico.nombre} ${medico.apellido}">
                        </div>
                    </div>
                    <div class="form-row">
                    <label for="Area" class="col-sm-2 col-form-label">Especialidad:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id="Area" value="${medico.especialidad}">
                    </div>
                </div>
                    <button type="button" class="btn btn-primary" id="Confirmar">Confirmar turno</button>

                </form>
            `)




    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function arregloProfesional() {

        for (let i = 0; i < profesionalesList.length; i++) {
            $("#profesional").append(`<option value=${profesionalesList[i]._id}>${profesionalesList[i].nombre + " " + profesionalesList[i].apellido + "  " + profesionalesList[i].especialidad}</option>`);

        }

    }




}