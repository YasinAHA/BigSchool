# Modifcamos para incluir los pilares de poo y atributo privado en python

class Libro:
    def __init__(self, titulo="Sin título", autor="Anónimo", paginas=0):
        self.__titulo = titulo
        self.__autor = autor
        self.__paginas = paginas
        self.__prestado = False

    def prestar(self):
        if not self.__prestado:
            self.__prestado = True
            return True
        return False
    
    def devolver(self):
        if self.__prestado:
            self._prestado = False
            return True
        return False

# Ejemplo de uso
libro1 = Libro("1984", "George Orwell", 328)
print(f"Título: {libro1.titulo}, Autor: {libro1.autor}, Páginas: {libro1.paginas}, Prestado: {libro1.prestado}")
libro1.prestar()
print(f"Prestado después de prestar: {libro1.prestado}")
libro1.devolver()
print(f"Prestado después de devolver: {libro1.prestado}")
print(f"Título: {libro1.titulo}, Autor: {libro1.autor}, Páginas: {libro1.paginas}, Prestado: {libro1.prestado}")