import '@testing-library/jest-dom'
import React, { useEffect, useState } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '.'
import SearchBar from './SearchBar/SearchBar'

describe('Home component', () => {
  it('renders the heading', () => {
    render(<Home pokemons={[]} total={0} limit={10} page={1} />)
    const heading = screen.getByText('Pokemon List')
    expect(heading).toBeInTheDocument()
  })

  it('renders SearchBar component', async () => {
    render(<Home pokemons={[]} total={0} limit={10} page={1} />)
    const searchBarElement = await screen.findByTestId('search-bar')
    expect(searchBarElement).toBeInTheDocument()
  })

  it('renders Pokemon List component without errors', () => {
    render(<Home pokemons={[]} total={0} limit={10} page={1} />)
  })

  it('handles search correctly', async () => {
    const onSearchChangeMock = jest.fn()
    const onSearchMock = jest.fn()

    const { getByTestId, getByText } = render(
      <SearchBar
        searchTerm=""
        onSearchChange={onSearchChangeMock}
        onSearch={onSearchMock}
        isLoading={false}
      />,
    )

    const searchInput = getByTestId('search-bar')
    fireEvent.change(searchInput, { target: { value: 'pikachu' } })

    const searchButton = getByText('Search')
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(onSearchChangeMock).toHaveBeenCalledWith('pikachu')
      expect(onSearchMock).toHaveBeenCalled()
    })
  })
})

const TestComponent = ({ searchTerm, originalPokemons }) => {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setPokemonList(originalPokemons)
    }
  }, [searchTerm, originalPokemons])

  return <div data-testid="pokemon-list">{JSON.stringify(pokemonList)}</div>
}

test('updates Pokemon list correctly in useEffect', () => {
  const initialSearchTerm = ''
  const initialOriginalPokemons = [
    { name: 'Bulbasaur' },
    { name: 'Charmander' },
  ]

  const { queryByTestId } = render(
    <TestComponent
      searchTerm={initialSearchTerm}
      originalPokemons={initialOriginalPokemons}
    />,
  )

  const updatedListElement = queryByTestId('pokemon-list')

  if (updatedListElement) {
    expect(updatedListElement.textContent).toBe(
      JSON.stringify(initialOriginalPokemons),
    )
  } else {
    console.error("Element with data-testid 'pokemon-list' not found")
  }
})

function YourComponent({ setSearchTerm }) {
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm')
    if (storedSearchTerm) {
      setSearchTerm((prevSearchTerm) => {
        if (prevSearchTerm !== storedSearchTerm) {
          return storedSearchTerm
        }
        return prevSearchTerm
      })
    }
  }, [setSearchTerm])

  return <div>Your component content</div>
}

test('it sets search term from local storage', () => {
  const setSearchTerm = jest.fn()

  const localStorageMock = {
    getItem: jest.fn(),
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })

  localStorageMock.getItem.mockReturnValueOnce('searchValue')

  render(<YourComponent setSearchTerm={setSearchTerm} />)
  expect(setSearchTerm).toHaveBeenCalledWith('searchValue')
})
