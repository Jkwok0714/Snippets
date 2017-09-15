//Game.h
#include <windows.h>
#include <stdio.h>
#include "ConLib.h"
#include "02 Player.h"

//Game status enumerator
enum GameStatus {
     GameMainMenu = 1,
     GameRunning = 2,
     GamePaused = 3,
     GameWon = 4,
     GameLostLife = 5,
     GameLost = 6,
     GameExit = 7,
     GameExit = 8
};

//Game Difficulty Enum
enum GameDifficulty {
     GameEasy = 1,
     GameMedium = 2,
     GameDifficult = 3
};

//Game base class

class CGame {
      private:
              //In/output indformation
              ConLib * m_Console;
              int m_LastAction;
              
              //Game Info
              int m_GameStatus;
              COORD m_Arena;
              CPlayer m_Player;
              COORD * m_Monsters;
              int m_MonstersNumber;
              
      public:
             //Constructors/Destructors
             CGame();
             CGame(ConLib * Console);
             ~CGame();
             //Shows relative information depending on game status
             void ShowSplash(void);
             void ShowMenu(void);
             void ShowGame(void);
             void ShowWon(void);
             void ShowLostLife(void);
             void ShowLost(void);
             void ShowExit (void);
             void Show(void);
             
             //Process game depending on status
             void ProcessSplash(void);
             void ProcessMenu(void);
             void ProcessGame(void);
             void ProcessWon(void);
             void ProcessLostLife(void);
             void ProcessLost(void);
             void ProcessExit(void);
             void ProcessTurn(void);
             
             //Set Console Information
             void SetConsole(ConLib * Console);
             
             //Game Methods
             void StartNewGame(int Difficulty);
             void EndGame(void);
             void CheckCollisions();
             int GetAction(void);
             int GetStatus(void);
             void MoveMonsters (void);
};
