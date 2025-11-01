package com.example;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

/**
 * Tests for Calculator. These tests were generated to demonstrate AI-created tests.
 */
class CalculatorAITest {

    @Test
    void testAddPositive() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    void testAddNegative() {
        Calculator calc = new Calculator();
        assertEquals(-1, calc.add(2, -3));
    }

    @Test
    void testDivideByZero() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class, () -> calc.divide(1, 0));
    }
}
