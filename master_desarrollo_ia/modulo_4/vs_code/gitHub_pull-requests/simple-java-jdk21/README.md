# simple-java-jdk21

Proyecto Java minimal preparado para probar la extensión de GitHub Pull Requests.

Requisitos:
- JDK 21 instalado y activo (JAVA_HOME apuntando a JDK 21, o usar `javac -version` para verificar).
- Maven (opcional para empaquetado) si quieres construir desde línea de comandos.

Cómo construir y ejecutar (Windows `cmd.exe`):

1) Comprobar Java y Maven:

```cmd
java -version
mvn -v
```

2) Construir (desde la carpeta del proyecto):

```cmd
cd simple-java-jdk21
mvn -B -DskipTests package
```

3) Ejecutar:

```cmd
java -cp target\simple-java-jdk21-1.0.0.jar com.example.App
```

Notas:
- Si no tienes Maven, puedes compilar con `javac` apuntando al JDK 21:

```cmd
cd simple-java-jdk21\src\main\java
javac -d ..\..\..\target com\example\App.java
```

Este proyecto es intencionalmente pequeño para pruebas de flujo de PRs.
