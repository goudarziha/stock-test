import * as React from 'react'
import { render, screen } from '@testing-library/react';
import {Search} from '../Search'

it('render', () => {
    render(<Search handleUpdateStock={jest.fn()} stocks={[]} />)
    const search = screen.findByTestId('app-test')
    expect(search).toBeDefined()
})