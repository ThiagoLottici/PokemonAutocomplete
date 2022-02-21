import React, { useEffect, useState } from 'react';
import { ErrorContext } from '../../components/ErrorContext';
import { AutocompleteInput } from '../../components/AutocompleteInput';
import { PokemonDetails } from '../../components/PokemonDetails';
import { Pokemon } from '../../types/Pokemon';
import './PokeAutocomplete.css';

export const PokeAutocomplete = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1126');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        setError('Oops, something went wrong loading initial data, please reload!');
      }
    };
    fetchPokemonList();
  }, []);

  return (
    //I added an error context since 3 components (PokeAutocomplete, PokemonDetails and AutocompleteInput) can set/show errors to avoid prop drilling.
    <ErrorContext.Provider value={{ error, setError }}>
      <div className='PokeAutocomplete'>
        <div className='pokemon-details'>
          {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
        </div>
        <div>Pokemon Finder</div>
        <div className='autocomplete-input'>
          <AutocompleteInput
            pokemonList={pokemonList}
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </div>
        <div className='error'>{error}</div>
      </div>
    </ErrorContext.Provider>
  );
};
