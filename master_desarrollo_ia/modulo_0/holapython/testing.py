# Test Unitario ejemplo con calculadora

import unittest
from analizador.utilidades import sumar


class TestCalculadora(unittest.TestCase):
    def test_sumar(self):
        self.assertEqual(sumar(3, 5), 8)
        self.assertEqual(sumar(-1, 1), 0)
        self.assertEqual(sumar(-1, -1), -2)


if __name__ == "__main__":
    unittest.main()
