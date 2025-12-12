import React, { useEffect, useState } from 'react';

import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import CombatArena from './components/CombatArena';
import GameOverScreen from './components/GameOverScreen';
import { socket } from './api/Socket';
import type PlayerUser from './api/user/PlayerUser';
import type Players from './api/online/Players';


type GamePhase = 'LOADING' | 'FRIEND_LIST' | 'FINDING_PLAYERS' | 'MAIN_MENU' | 'COMBAT' | 'GAME_OVER' | 'ONLINE_OPTIONS';
const App: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('LOADING');
  const [activePlayerCount, setActivePlayerCount] = useState<number>(0);
  const [playerUser, setPlayerUser] = useState<PlayerUser>();
  const [inviteTarget, setInviteTarget] = useState<Players>();
  // useEffect(() => {
  //   const handlePlayerUserUpdate = (PlayerUser: { nickname: string, status: string, level: number}) => {

  //   };
  // });
  function catchTarget(target: Players){
    setInviteTarget(target);
    socket.emit('create_room', playerUser!.id);
    socket.on('svr_new_room', () => {
      socket.emit('invite_to_room', {requester: playerUser, target: target});
    });
  }

  useEffect(() => {
    const handleUserTransfer = (user: PlayerUser) => {
      setPlayerUser(user);
    };
    socket.on('svr_player_user', handleUserTransfer); 

    return () => {
      socket.off('svr_player_user', handleUserTransfer);
    };
    
  }, []);

  useEffect(() => {
    const handlePlayerUpdate = (count: number) => {
      setActivePlayerCount(count); 
    };
    socket.on('svr_active_players_count', handlePlayerUpdate); 

    return () => {
      socket.off('svr_active_players_count', handlePlayerUpdate);
    };
    
  }, []);

  useState(() => {
    const timer = setTimeout(() => {
      setCurrentPhase('MAIN_MENU');
    }, 1000);
    return () => clearTimeout(timer);
  });

  // Leitor de Estado Atual do Jogo
  const renderCurrentScreen = () => {
    switch (currentPhase) {
      case 'LOADING':
        return <LoadingScreen />;
        
      case 'MAIN_MENU':
        return (
          <MainMenu
            playerUser={playerUser}
            onArcadeMode={() => setCurrentPhase('COMBAT')}
            onConnectOnline={() => {setCurrentPhase('ONLINE_OPTIONS'), socket.connect()}}
            catchTarget={catchTarget}
          />
        );

      case 'ONLINE_OPTIONS':
        return (
          <MainMenu 
            playerUser={playerUser}
            onlineSection={true}
            onFindPlayers={() => setCurrentPhase('FINDING_PLAYERS')}
            onFindRoom={() => setCurrentPhase('FINDING_PLAYERS')}
            onFriendList={() => setCurrentPhase('FRIEND_LIST')}
            catchTarget={catchTarget}
          />
        );

      case 'FINDING_PLAYERS':
        return (
          <MainMenu
            playerUser={playerUser}
            onlineSection={true}
            findingPlayers={true}
            playerCount={activePlayerCount}
            catchTarget={catchTarget}
          />
        );
      
      case 'FRIEND_LIST':
        return (
          <MainMenu
            playerUser={playerUser}
            onlineSection={true}
            friendList={true}
            catchTarget={catchTarget}
          />
        )
      case 'COMBAT':
        return (
          <CombatArena 
            onGameOver={() => setCurrentPhase('GAME_OVER')} 
          />
        );
        
      case 'GAME_OVER':
        return (
          <GameOverScreen 
            onRestart={() => setCurrentPhase('MAIN_MENU')} 
          />
        );
        
      default:
        return <div>An unknown error occurred.</div>;
    }
  };

  // Render baseado em Estado Atual do Jogo
  return (
    <div className="game-screen">
      {renderCurrentScreen()}
    </div>
  );
};

export default App;