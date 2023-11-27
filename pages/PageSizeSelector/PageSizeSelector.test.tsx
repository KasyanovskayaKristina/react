import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CardPerPageSelector from './PageSizeSelector'
import { expect, test } from '@jest/globals'

test('renders CardPerPageSelector component', () => {
  const mockOnLimitChange = jest.fn()

  render(<CardPerPageSelector limit={10} onLimitChange={mockOnLimitChange} />)

  const selectElement: HTMLSelectElement = screen.getByRole(
    'combobox',
  ) as HTMLSelectElement

  expect(selectElement).toBeTruthy()
  expect(selectElement.value).toBe('10')

  fireEvent.change(selectElement, { target: { value: '15' } })

  expect(mockOnLimitChange).toHaveBeenCalledWith(15)
})
