# Calculadora de Multiplicación de Matrices - Versión Python

## Instalación
1. Descarga el archivo `multiplicacion_matrices.py`
2. Asegúrate de tener Python 3.x instalado en tu sistema

## Uso
1. Abre una terminal o línea de comandos
2. Navega hasta la carpeta donde guardaste el archivo
3. Ejecuta el script con:
  ```
  python app.py
  ```

4. Sigue las instrucciones en la consola:
- Ingresa el número de filas y columnas para cada matriz
- Recuerda que para poder multiplicar dos matrices, el número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz
- Ingresa los valores para cada elemento de ambas matrices cuando se te solicite
5. El programa validará los datos ingresados
6. El resultado de la multiplicación se mostrará en la consola

## Algoritmo de Multiplicación de Matrices
La multiplicación de matrices sigue estas reglas:

1. Si la Matriz A es de tamaño m×n y la Matriz B es de tamaño n×p, la Matriz Resultante C será de tamaño m×p
2. Cada elemento C[i,j] se calcula multiplicando los elementos correspondientes de la fila i de la Matriz A y la columna j de la Matriz B, y luego sumándolos:
C[i,j] = A[i,0] × B[0,j] + A[i,1] × B[1,j] + ... + A[i,n-1] × B[n-1,j]

## Ejemplo
Para multiplicar:

- Matriz A (2×3): [[1, 2, 3], [4, 5, 6]]
- Matriz B (3×2): [[7, 8], [9, 10], [11, 12]]

El resultado será una matriz 2×2 calculada así:

- C[0,0] = 1×7 + 2×9 + 3×11 = 58
- C[0,1] = 1×8 + 2×10 + 3×12 = 64
- C[1,0] = 4×7 + 5×9 + 6×11 = 139
- C[1,1] = 4×8 + 5×10 + 6×12 = 154

Resultando en: [[58, 64], [139, 154]]

## Notas Adicionales
- El programa incluye validación para asegurarse de que las dimensiones de las matrices sean compatibles para la multiplicación
- El script implementa la multiplicación de matrices manualmente mediante bucles anidados
- Todos los cálculos se realizan en el servidor Python
- Los valores pueden ser números enteros o decimales
- El programa maneja errores de entrada, solicitando nuevamente los datos cuando se ingresan valores no numéricos
- La salida está formateada para facilitar la lectura de las matrices
