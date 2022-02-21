import React, { useContext, useEffect, useState } from 'react';
import { Pokemon } from '../../types/Pokemon';
import { AutocompleteList } from '../AutocompleteList';
import { ErrorContext } from '../ErrorContext';
import './AutocompleteInput.css';

interface AutocompleteInputProps {
  pokemonList: Pokemon[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  selectedPokemon: Pokemon | null;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  pokemonList,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [pokemonInput, setPokemonInput] = useState<string>('');
  const errorContext = useContext(ErrorContext);

  useEffect(() => {
    const filterPokemon = async (pokemon: string) => {
      const filteredPokemons = await new Promise<Pokemon[]>(resolve => {
        resolve(pokemonList.filter(({ name }) => name.includes(pokemon.toLowerCase())));
      });

      //In case user types the complete pokemon name, it selects automatically
      const indexOfPokemon = filteredPokemons.findIndex(({ name }) => name === pokemon);
      if (indexOfPokemon >= 0) {
        setSelectedPokemon(filteredPokemons[indexOfPokemon]);
        setFilteredPokemonList([]);
      } else {
        setFilteredPokemonList(filteredPokemons);
      }
    };

    //Wait 800ms after user stopped typing before making requests to "filterPokemon mock API"
    const timer = setTimeout(() => {
      if (pokemonInput) {
        filterPokemon(pokemonInput);
      } else {
        setFilteredPokemonList([]);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [pokemonInput, pokemonList, setSelectedPokemon]);

  useEffect(() => {
    if (selectedPokemon) {
      setPokemonInput(selectedPokemon.name);
    }
    setFilteredPokemonList([]);
  }, [selectedPokemon]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (errorContext.error) {
      errorContext.setError('');
    }
    if (selectedPokemon) {
      setSelectedPokemon(null);
    }
    setPokemonInput(event.target.value);
  };

  return (
    <div className='AutocompleteInput'>
      <input
        className='input'
        value={pokemonInput}
        placeholder='Start typing to search..'
        type='text'
        onChange={onInputChange}
      />
      <AutocompleteList
        list={filteredPokemonList}
        setSelectedPokemon={setSelectedPokemon}
        input={pokemonInput}
      />
    </div>
  );
};
