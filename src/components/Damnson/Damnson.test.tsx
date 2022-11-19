import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Damnson from './Damnson';

describe('<Damnson />', () => {
  test('it should mount', () => {
    render(<Damnson />);
    
    const damnson = screen.getByTestId('Damnson');

    expect(damnson).toBeInTheDocument();
  });
});