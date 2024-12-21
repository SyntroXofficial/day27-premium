import React from 'react';
import GameCard from './GameCard';

export default function GameGrid({ games }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {games.map((game, index) => (
        <GameCard key={game.game} game={game} index={index} />
      ))}
    </div>
  );
}