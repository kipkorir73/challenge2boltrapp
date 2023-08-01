import React, { useState } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import SortBar from './SortBar';
import BotSpecs from './BotSpecs'; 
import './App.css';
import jsonData from './data.json';

const App = () => {
  const [allBots] = useState(jsonData.bots);
  const [army, setArmy] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [selectedBot, setSelectedBot] = useState(null);


  const handleEnlist = (bot) => {
    if (!army.some((b) => b.bot_class === bot.bot_class)) {
      setArmy([...army, bot]);
    }
  };

  const handleRelease = (bot) => {
    const updatedArmy = army.filter((b) => b.id !== bot.id);
    setArmy(updatedArmy);
  };

  const handleDischarge = async (bot) => {
    try {
      if (army.filter((b) => b.bot_class === bot.bot_class).length > 1) {
        const updatedArmy = army.filter((b) => b.id !== bot.id);
        setArmy(updatedArmy);
      } else {
        await fetch(`http://localhost:8001/bots/${bot.id}`, {
          method: 'DELETE',
        });
        const updatedArmy = army.filter((b) => b.id !== bot.id);
        setArmy(updatedArmy);
      }
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleSortTypeChange = (type) => {
    setSortType(type);
  };

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
  };

  const handleGoBack = () => {
    setSelectedBot(null);
  };

  const filteredBots = allBots.filter(
    (bot) => filters.length === 0 || filters.includes(bot.bot_class)
  );

  const sortedBots = sortType
    ? [...filteredBots].sort((a, b) => b[sortType] - a[sortType])
    : filteredBots;

  return (
    <div>
      <h1>The Blues Bot Army</h1>
      <SortBar
        sortType={sortType}
        onSortTypeChange={handleSortTypeChange}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="container">
        <div className="your-bot-army">
          {selectedBot ? (
            <BotSpecs bot={selectedBot} onEnlist={handleEnlist} onGoBack={handleGoBack} />
          ) : (
            <YourBotArmy army={army} onRelease={handleRelease} onDischarge={handleDischarge} />
          )}
        </div>
        <div className="bot-collection">
          <BotCollection bots={sortedBots} onEnlist={handleEnlist} onClick={handleBotClick} />
        </div>
      </div>
    </div>
  );
};

export default App;
