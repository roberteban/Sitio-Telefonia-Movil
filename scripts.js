// Función que obtiene todos los dispositivos al cargar la página
async function obtenerTodos() {
    try {
        const respuesta = await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/db', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const data = await respuesta.json();

        // Construir la tabla con los datos obtenidos
        let cuerpoTabla = document.getElementById("tblContenido");
        let salida = "";
        data.dispositivos.forEach(elemento => {
            salida += `
                <tr>
                    <td>${elemento.id}</td>
                    <td>${elemento.marca}</td>
                    <td>${elemento.modelo}</td>
                    <td>${elemento.color}</td>
                    <td>${elemento.almacenamiento} GB</td>
                    <td>${elemento.procesador}</td>
                </tr>
            `;
        });
        cuerpoTabla.innerHTML = salida;

    } catch (error) {
        console.error("Error obteniendo dispositivos: ", error);
        alert("Error al obtener los dispositivos.");
    }
}

// Función para consultar un dispositivo específico por ID
async function consultarUno() {
    try {
        let id = document.getElementById('txtConsulta').value;
        if (!id) {
            alert('Debe ingresar un ID válido');
            return;
        }

        const respuesta = await axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id);
        let dispositivo = respuesta.data;

        // Rellenar los campos con los datos del dispositivo consultado
        document.getElementById('consultaNombre').value = dispositivo.marca;
        document.getElementById('consultaModelo').value = dispositivo.modelo;
        document.getElementById('consultaColor').value = dispositivo.color;
        document.getElementById('consultaAlmacenamiento').value = `${dispositivo.almacenamiento} GB`;
        document.getElementById('consultaProcesador').value = dispositivo.procesador;

    } catch (error) {
        console.error("Error en la consulta: ", error);
        alert("Error al consultar el dispositivo.");
    }
}

// Función para agregar un nuevo dispositivo
async function agregarUno() {
    try {
        let marca = document.getElementById("inputMarca").value;
        let modelo = document.getElementById("inputModelo").value;
        let color = document.getElementById("inputColor").value;
        let almacenamiento = document.getElementById("inputAlmacenamiento").value;
        let procesador = document.getElementById("inputProcesador").value;

        const respuesta = await fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ marca, modelo, color, almacenamiento, procesador })
        });

        const data = await respuesta.json();
        alert(`Se agregó el dispositivo:\nMarca: ${data.marca}\nModelo: ${data.modelo}\nColor: ${data.color}`);

    } catch (error) {
        console.error("Error al agregar el dispositivo: ", error);
        alert("Error al agregar el dispositivo.");
    }
}

// Función para eliminar un dispositivo
async function eliminarUno() {
    try {
        let id = document.getElementById('txtConsulta').value;
        if (!id) {
            alert('Debe ingresar un ID válido');
            return;
        }

        await axios.delete('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id);
        alert('Dispositivo eliminado correctamente.');

    } catch (error) {
        console.error("Error al eliminar: ", error);
        alert("Error al eliminar el dispositivo.");
    }
}

// Función para modificar un dispositivo
async function modificarUno() {
    try {
        let id = document.getElementById('txtConsulta').value;
        if (!id) {
            alert('Debe ingresar un ID válido');
            return;
        }

        let marca = document.getElementById("consultaNombre").value;
        let modelo = document.getElementById("consultaModelo").value;
        let color = document.getElementById("consultaColor").value;
        let almacenamiento = document.getElementById("consultaAlmacenamiento").value.replace(' GB', ''); // Eliminar 'GB'
        let procesador = document.getElementById("consultaProcesador").value;

        const respuesta = await axios.put('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id, {
            marca, modelo, color, almacenamiento, procesador
        });

        alert(`Dispositivo modificado correctamente: ${respuesta.data.marca} ${respuesta.data.modelo}`);

    } catch (error) {
        console.error("Error al modificar: ", error);
        alert("Error al modificar el dispositivo.");
    }
}
