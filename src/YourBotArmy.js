import React from 'react';
import Bot from './Bot';

const YourBotArmy = ({ army, onRelease, onDischarge }) => {
  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      {army.map((bot) => (
        <Bot key={bot.id} bot={bot} onRelease={onRelease} onDischarge={onDischarge} />
      ))}
    </div>
  );
};

export default YourBotArmy;
