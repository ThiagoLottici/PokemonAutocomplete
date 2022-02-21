import { useContext, useEffect, useState } from 'react';
import { Pokemon } from '../../types/Pokemon';
import { ErrorContext } from '../ErrorContext';
import './PokemonDetails.css';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  const { name, url } = pokemon;
  const errorContext = useContext(ErrorContext);
  const [pokemonImage, setPokemonImage] = useState<string>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(url);
        const pokemonDetails = await response.json();
        setPokemonImage(pokemonDetails.sprites.other['official-artwork'].front_default);
      } catch (e) {
        errorContext.setError('Oops, could not load details, please type again!');
      }
    };

    if (url) {
      fetchDetails();
    }
  }, [url, errorContext]);

  const formatName = (name: string) => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  };

  return (
    <div className='PokemonDetails'>
      <div className='name'>{formatName(name)}</div>
      <div>{pokemonImage && <img src={pokemonImage} className='image' alt='Pokemon' />}</div>
    </div>
  );
};
