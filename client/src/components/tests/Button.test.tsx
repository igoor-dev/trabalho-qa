import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

test('renderiza o texto do botão corretamente', () => {
  render(<Button>Entrar</Button>);
  expect(screen.getByText('Entrar')).toBeInTheDocument();
});

test('chama a função onClick ao ser clicado', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Clique</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});