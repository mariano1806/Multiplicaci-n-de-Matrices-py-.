// Función que obtiene los valores de la matriz desde los inputs
function obtenerMatriz(name, rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let input = document.querySelector(`input[name="${name}_${i}_${j}"]`);
            row.push(Number(input.value) || 0); // Evita NaN si está vacío
        }
        matrix.push(row);
    }
    return matrix;
}

// Función para generar las matrices en la interfaz de usuario
function generarMatriz(containerId, title, rows, cols, name) {
    let container = document.getElementById(containerId);
    container.innerHTML = `<h3>${title} (${rows}x${cols})</h3>`;

    let table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-input";
            input.name = `${name}_${i}_${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

// Función para mostrar el resultado de la multiplicación
function mostrarResultado(matrix) {
    let resultContainer = document.getElementById("result-matrix");
    resultContainer.innerHTML = "<h3>Resultado</h3>";

    let table = document.createElement("table");
    matrix.forEach(row => {
        let rowElement = document.createElement("tr");
        row.forEach(value => {
            let cell = document.createElement("td");
            cell.textContent = value;
            rowElement.appendChild(cell);
        });
        table.appendChild(rowElement);
    });

    resultContainer.appendChild(table);
}

// Configuración del botón para ingresar las matrices
document.getElementById("btn-ingresar").addEventListener("click", function() {
    let rows1 = parseInt(document.getElementById("rows1").value);
    let cols1 = parseInt(document.getElementById("cols1").value);
    let rows2 = parseInt(document.getElementById("rows2").value);
    let cols2 = parseInt(document.getElementById("cols2").value);

    if (cols1 !== rows2) {
        alert("Las columnas de la Matriz 1 deben ser iguales a las filas de la Matriz 2.");
        return;
    }

    generarMatriz("matrix1-container", "Matriz 1", rows1, cols1, "matrix1");
    generarMatriz("matrix2-container", "Matriz 2", rows2, cols2, "matrix2");
});

// Configuración del botón para multiplicar las matrices
document.getElementById("btn-multiplicar").addEventListener("click", function() {
    let rows1 = parseInt(document.getElementById("rows1").value);
    let cols1 = parseInt(document.getElementById("cols1").value);
    let rows2 = parseInt(document.getElementById("rows2").value);
    let cols2 = parseInt(document.getElementById("cols2").value);

    let matrix1 = obtenerMatriz("matrix1", rows1, cols1);
    let matrix2 = obtenerMatriz("matrix2", rows2, cols2);

    let formData = new URLSearchParams();
    formData.append("rows1", rows1);
    formData.append("cols1", cols1);
    formData.append("rows2", rows2);
    formData.append("cols2", cols2);

    matrix1.forEach((row, i) => row.forEach((value, j) => formData.append(`matrix1_${i}_${j}`, value)));
    matrix2.forEach((row, i) => row.forEach((value, j) => formData.append(`matrix2_${i}_${j}`, value)));

    fetch("/multiplicar", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en el servidor");
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            mostrarResultado(data.resultado);
        }
    })
    .catch(error => console.error("Error:", error));
});
