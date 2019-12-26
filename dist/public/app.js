let dniPaciente; // Se usa como cache
let paciente; // Se usa como cache
let profesionalesList = [];
$(document).ready(function() {

    let estado = "principal"; //Exisitira 3 estados en el proceso de pedir un turno "Principal","PedirTurno","Cofirmar","MiTurno"
    mostrarContenido(estado);
    //ALTA DE PACIENTE

    $('body').on('click', '#submitButton', function() {
        estado = "PedirTurno";
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = Number($('#dni').val());
        let edad = $('#edad').val();

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

                    dniPaciente = dni;
                    estado = "PedirTurno"
                    mostrarContenido(estado);

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

    $('body').on('click', '#submitTurn', function() {



    });


})

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
                    paciente = data;
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
                    <div class="input-group date custom-date col-sm-5 ml-4">
                        <input type="text" id="fecha" class="form-control control-date" readonly><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-5 my-4 ml-2">
                        <label for="horaTurno">Horario disponible para el turno:</label>
                        <select id="horaTurno" class="form-control">
                        <option selected>Elegir...</option>

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


    };

    function arregloProfesional() {

        for (let i = 0; i < profesionalesList.length; i++) {
            $("#profesional").append(`<option value=${profesionalesList[i].id}>${profesionalesList[i].nombre + " " + profesionalesList[i].apellido + "  " + profesionalesList[i].especialidad}</option>`);

        }

    }



};