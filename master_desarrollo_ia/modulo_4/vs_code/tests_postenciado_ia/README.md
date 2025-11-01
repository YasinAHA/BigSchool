# AI Tests Demo (Java)

Proyecto de ejemplo que muestra tests en Java generados por IA.

Requisitos
- JDK 21
- Maven (opcional para ejecutar tests: `mvn test`)

Cómo ejecutar los tests

1. Comprueba que JVM es la 21:

```
mvn -v
```

2. Ejecuta los tests con Maven:

```
mvn test
```

Archivos creados
- `pom.xml` — configuración Maven (Java 21, JUnit 5)
- `src/main/java/com/example/Calculator.java` — clase simple
- `src/test/java/com/example/CalculatorAITest.java` — tests generados por IA
- `.gitignore` — patrones para proyectos Java/Maven

Notas
- Si no tienes Maven instalado, puedes ejecutar los tests desde tu IDE (IntelliJ, Eclipse, VS Code) configurando JDK 21 y ejecutando el test runner.
