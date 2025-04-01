from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def multiplicar_matrices(matriz1, matriz2, filas1, columnas1, filas2, columnas2):
    if columnas1 != filas2:
        return None

    resultado = [[0] * columnas2 for _ in range(filas1)]
    for i in range(filas1):
        for j in range(columnas2):
            for k in range(columnas1):
                resultado[i][j] += matriz1[i][k] * matriz2[k][j]
    return resultado

@app.route('/')
def indice():
    return render_template('index.html')

@app.route('/multiplicar', methods=['POST'])
def multiplicar():
    try:
        filas1 = int(request.form.get('rows1', 0))
        columnas1 = int(request.form.get('cols1', 0))
        filas2 = int(request.form.get('rows2', 0))
        columnas2 = int(request.form.get('cols2', 0))

        if columnas1 != filas2:
            return jsonify({'error': 'Las matrices no se pueden multiplicar. Columnas de Matriz 1 ≠ Filas de Matriz 2.'}), 400

        matriz1 = [[int(request.form.get(f"matrix1_{i}_{j}", 0)) for j in range(columnas1)] for i in range(filas1)]
        matriz2 = [[int(request.form.get(f"matrix2_{i}_{j}", 0)) for j in range(columnas2)] for i in range(filas2)]

        resultado = multiplicar_matrices(matriz1, matriz2, filas1, columnas1, filas2, columnas2)

        if resultado is None:
            return jsonify({'error': 'No se pueden multiplicar las matrices.'}), 400

        return jsonify({'resultado': resultado})

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Siempre devolver JSON

if __name__ == '__main__':
    app.run(debug=True)
