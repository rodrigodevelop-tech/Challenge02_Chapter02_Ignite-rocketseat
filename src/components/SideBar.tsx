import { useEffect, useState } from 'react';

import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';
interface GenreResponseProps {
      id: number;
      name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
      title: string; 
}

interface SlideBarProps {
  selectedGenreId : number;
  setSelectedGenreId : (setSelectedGenreId : number)=> void;
}

export function SideBar({ selectedGenreId,  setSelectedGenreId  }:SlideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genres) => (
          <Button
            key={String(genres.id)}
            title={genres.title}
            iconName={genres.name}
            onClick={() => handleClickButton(genres.id)}
            selected={selectedGenreId === genres.id}
          />
        ))}
      </div>
    </nav>
  );
}