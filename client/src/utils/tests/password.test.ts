import { expect, test } from '@jest/globals';
import { isPasswordValid, getPasswordValidationMessage } from '../password';

test('senha com 8 caracteres retorna true', () => {
  expect(isPasswordValid('Igor123#')).toBe(true);
}); //bug

test('senha válida retorna true', () => {
  expect(isPasswordValid('Igor123##')).toBe(true);
});

test('senha sem maiúscula retorna false', () => {
  expect(isPasswordValid('igor123#')).toBe(false);
});

test('senha vazia retorna mensagem de obrigatória', () => {
  expect(getPasswordValidationMessage('')).toBe('Senha é obrigatória');
});

test('senha válida retorna string vazia', () => {
  expect(getPasswordValidationMessage('Igor123##')).toBe('');
});
