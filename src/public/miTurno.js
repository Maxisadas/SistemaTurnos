let idTurno;
$(document).ready(function() {
    $('body').on('click', '#miTurno', function() {
        let dniPaciente = Number($('#inputdni').val());
        $('#container').empty();


        $.ajax({
            url: '/buscarPaciente',
            type: 'POST', // http method
            data: { dni: dniPaciente }, // data to submit
            success: function(data, status) {

                $.ajax({

                    url: `/buscarTurno/${data.paciente._id}`,
                    type: 'GET', // http method
                    success: function(turno, status) {
                        paciente = turno.turnosDB[0].paciente;
                        profesional = turno.turnosDB[0].profesional;
                        idTurno = turno.turnosDB[0]._id;
                        fecha = turno.turnosDB[0].fechaTurno.substring(0, 10);
                        $('#container').empty();
                        $('#container').append(`
                    <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                    <h3 class="text-center text-uppercase mb-4">Mi turno</h3>
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
                            <input type="text" readonly class="form-control-plaintext" id="Fecha" value="${fecha}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Hora" class="col-sm-2 col-form-label">Hora:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Hora" value="${turno.turnosDB[0].horaTurno}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Profesional" class="col-sm-2 col-form-label">Profesional:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Profesional" value="${profesional.nombre} ${profesional.apellido}">
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="Area" class="col-sm-2 col-form-label">Especialidad:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="Area" value="${profesional.especialidad}">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" id="Volver">Volver</button>
                    <button type="button" class="btn btn-primary float-right" id="baja">Dar de baja</button>
        
                </form>
                    
                    `)

                    },
                    error: function() {

                        $('#container').empty();
                        $('#container').append(`
                        
                        <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                        <h3 class="text-center text-uppercase mb-4">¡Usted no tiene turno!</h3>
                        <h5 class="text-center text-uppercase mb-4">Por favor dirijase a la pagina principal y pida su turno</h5>
                        <div class="form-group row">
                            <button type="button " class="btn btn-primary mx-auto" id="Volver">Volver a la pagina de inicio</button>
                        </div>
                    </form>
                    `);


                    }
                });

            },
            error: function(jqXhr, textStatus, errorMessage) {

                estado = "principal"
                $('#container').empty();
                $('#container').append(`
                
                <div class="alert alert-danger mx-auto" role="alert">
                     El paciente no existe en el sistema, por favor debe darse de alta.
                </div>
                <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                    <h3 class="text-center text-uppercase mb-4">Mi turno</h3>
                    <div class="form-group">
                        <label for="inputdni" class="col-sm-2 col-form-label">Ingrese su DNI:</label>
                        <input type="text" class="form-control col-sm-10" id="inputdni" name="inputdni">
                    </div>
                    <div class="form-group row">
                        <button type="button " class="btn btn-primary mx-auto my-4" id="miTurno">Ver mi turno</button>
                    </div>
                </form>
                
                `);



            }

        });



    });

    $('body').on('click', '#Volver', function() {

        window.location = "/index.html";

    });

    $('body').on('click', '#baja', function() {
        $.ajax({

            url: `/borrarTurno/${idTurno}`,
            type: 'DELETE', // http method
            success: function(data) {
                $('#container').empty();
                $('#container').append(`
                
                <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                <h3 class="text-center text-uppercase mb-4">¡Su turno se dio de baja con exito!</h3>
                <h5 class="text-center text-uppercase mb-4">Por favor dirijase a la pagina principal y pida su nuevo turno</h5>
                <div class="form-group row">
                    <button type="button " class="btn btn-primary mx-auto" id="Volver">Volver a la pagina de inicio</button>
                </div>
            </form>
            `);
            },
            error: function() {

                $('#container').empty();
                $('#container').append(`
                
                <form class="shadow-lg p-3 mb-5 bg-white rounded" id="form">
                <h3 class="text-center text-uppercase mb-4">¡Usted no tiene turno!</h3>
                <h5 class="text-center text-uppercase mb-4">Por favor dirijase a la pagina principal y pida su turno</h5>
                <div class="form-group row">
                    <button type="button " class="btn btn-primary mx-auto" id="Volver">Volver a la pagina de inicio</button>
                </div>
            </form>
            `);

            }

        });


    });

});