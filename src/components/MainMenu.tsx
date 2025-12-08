// src/components/MainMenu.tsx
import React, { useState } from 'react';
import './MainMenu.css'

interface MainMenuProps {
  playerCount?: number;
  onArcadeMode?: () => void;
  arcadeMode?: boolean;
  onPlayerVsCpu?: () => void;
  vsCpu?: boolean;
  onPlayerVsPlayer?: () => void;
  pvpMode?: boolean;
  onCoopMode?: () => void;
  coopMode?: boolean;
  onConnectOnline?: () => void;
  onlineSection?: boolean;
  onMyAccount?: () => void;
  myAccount?: boolean;
  onCreateRoom?: () => void;
  createRoom?: boolean;
  onFindRoom?: () => void;
  findingRoom?: boolean;
  onFriendList?: () => void;
  friendList?: boolean;
  onFindPlayers?: () => void;
  findingPlayers?: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({   
  onArcadeMode,     arcadeMode,   onConnectOnline, onlineSection,     
  onCreateRoom,     createRoom,   onFindPlayers,   findingPlayers,
  onFindRoom,       findingRoom,  onFriendList,    friendList,
  onPlayerVsPlayer, pvpMode,      onCoopMode,      coopMode,
  onPlayerVsCpu,    vsCpu,      onMyAccount,       myAccount,
  playerCount
}) => {
  
  const playerDivs = Array(playerCount).fill(0).map((_, index) => (
    <div 
      key={index}
      className="apm-col"
    />
  ));

  let component = !onlineSection ? 
    <div className="main-menu">
        <ul id="menu-list" className="no-dots">
          <li onClick={onArcadeMode} className="menu-item">ARCADE</li>
          <li onClick={onPlayerVsCpu} className="menu-item">PLAYER VS CPU</li>
          <li onClick={onPlayerVsPlayer} className="menu-item">PLAYER VS PLAYER</li>
          <li onClick={onCoopMode} className="menu-item">COOP</li>
          <li onClick={onConnectOnline} className="menu-item">ONLINE</li>
          <li onClick={onMyAccount} className="menu-item">MY ACCOUNT</li>
        </ul>
    </div>
    : friendList ?
    <div className="friend-list-menu">
       
    </div>  
    : findingPlayers ?    
    <div className="active-players-menu">
      <div className="apm-header">
          <h3>Nickname</h3>
          <h3>Description</h3>
          <h3>Status</h3>
          <h3>Level</h3>
      </div>
      {playerDivs}
    </div> 
    : coopMode ?
    <div className="coop-options-menu">
       
    </div> 
    : myAccount ?
    <div className="my-account-menu">
       
    </div> 
    : pvpMode ?
    <div className="pvp-options-menu">
       
    </div> 
    : vsCpu ?
    <div className="vs-cpu-menu">
       
    </div>
    :
    <div className="main-menu">
        <ul id="menu-list" className="no-dots">
          <li onClick={onCreateRoom} className="menu-item">CREATE ROOM</li>
          <li onClick={onFindRoom} className="menu-item">FIND ROOM</li>
          <li onClick={onFriendList} className="menu-item">FRIEND LIST</li>
          <li onClick={onFindPlayers} className="menu-item">FIND PLAYERS</li>
        </ul>
    </div>
    

  return (
    component
  );
};

export default MainMenu;