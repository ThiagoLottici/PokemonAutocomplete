import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          { name: 'poke1', url: 'https://fancyurl.com/details' },
          { name: 'bulbasaur', url: 'https://fancyurl.com/details' },
          { name: 'bulbasaur2', url: 'https://fancyurl.com/details' },
        ],
      })
    );
  }),
  rest.get('https://fancyurl.com/details', (req, res, ctx) => {
    return res(
      ctx.json({
        sprites: { other: { 'official-artwork': { front_default: 'an-image-url' } } },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('finds only one match', async () => {
  render(<App />);
  expect(screen.getByText(/pokemon finder/i)).toBeInTheDocument();
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'po' } });
  await screen.findByRole('listitem');
  const items = screen.getAllByRole('listitem');
  expect(items.length).toBe(1);
});

test('finds two matches', async () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'bulb' } });
  await screen.findByRole('list');
  const items = screen.getAllByRole('listitem');
  expect(items.length).toBe(2);
});

test('when the exact name is typed does not show autocomplete list', async () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'bulbasaur' } });
  await screen.findByText(/bulbasaur/i);
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  await screen.findByRole('img');
});

test('when server returns an error', async () => {
  server.use(
    rest.get('https://pokeapi.co/api/v2/pokemon/', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<App />);
  await screen.findByText(/something went wrong loading initial data/i);
});
