import React from 'react';
import { Pokemon } from '../../types/Pokemon';
import './AutocompleteList.css';

interface AutocompleteListProps {
  list: Pokemon[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  input: string;
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({
  list,
  setSelectedPokemon,
  input,
}) => {
  const displayNameWithInputHighlighted = (name: string) => {
    return name.replace(input, `<span class='highlight'>${input}</span>`);
  };
  const displayPokemonList = () => {
    return list.map(({ name, url }) => (
      <li
        className='pokemon-item'
        key={name}
        onClick={() => setSelectedPokemon({ name, url })}
        dangerouslySetInnerHTML={{ __html: displayNameWithInputHighlighted(name) }}
      />
    ));
  };

  if (!list.length) return null;

  return (
    <div className='AutocompleteList'>
      <ul className='pokemon-list'>{displayPokemonList()}</ul>
    </div>
  );
};
