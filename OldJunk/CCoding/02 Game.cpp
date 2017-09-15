//02 Game.cpp
#include "02 Game.h"

CGame::CGame() {
               m_Console = NULL;
               m_GameStatus = GameSplashScreen;
               m_LastAction = 0;
               m_Monsters = NULL;
}

CGame::CGame(ConLib * Console) {
               m_Console = Console;
               m_GameStatus = GameSplashScreen;
               m_LastAction = 0;
               m_Monsters = NULL;
}

CGame::~CGame() {
                m_Console = NULL;
               m_GameStatus = GameSplashScreen;
               m_LastAction = 0;
               m_Monsters = NULL;
}
//Set a pointer to the console
void CGame::SetConsole (ConLib * Console) {
     m_Console  = Console;
}

int CGame::GetStatus (void) {
    return m_GameStatus;
}
//Show Splash screen
void CGame::ShowSplash (void) {
     m_Console->Clear();
     m_Console->OutputString("\tWelcome to Monster 1.0\n\n");
     m_Console->OutputString("Playing Monster is very easy.\n\n");
     
     m_Console->OutputString("The objective of the game is to destroy\n");
     m_Console->OutputString("all the monsters. Two or more monsters \n");
     m_Console->OutputString("are destroyed when they move to the \n");
     m_Console->OutputString("same cell in the field. You also lose a \n");
     m_Console->OutputString("life if you move to a cell where a \n");
     m_Console->OutputString("monster is. You move the player with the \n");
     m_Console->OutputString("numerical keypad in the eight possible \n");
     m_Console->OutputString("directions. You can also press Insert \n");
     m_Console->OutputString("which will make you leap to a random \n");
     m_Console->OutputString("place in the field. \n\n");
     
     m_Console->SetTextColor (ConRed);
     m_Console->OutputString("NOTE: Make sure NumLock is turned off. \n\n");
     m_Console->SetTextColor(ConRed | ConGreen | ConBlue);
     m_Console->OutputString("There are three difficulties available:\n\n");
     m_Console->OutputString(" Easy:   Monsters = 10  Arena = 25*15\n");
     m_Console->OutputString("         Lives = 4      Leaps = 3\n);
     m_Console->OutputString(" Medium: Monsters = 20  Arena = 35*18\n");
     m_Console->OutputString("         Lives = 3      Leaps = 2\n);
     m_Console->OutputString(" Hard:   Monsters = 30  Arena = 50*23\n");
     m_Console->OutputString("         Lives = 2      Leaps = 1\n);
}
//Show menu
void CGame::ShowMenu (void) {
     COORD Position;
     
     m_Console->SetBackgroundColor(0);
     m_Console->SetTextColor(ConRed);
     m_Console->Clear();
     
     m_Console->SetBackgroundColor(ConRed | ConGreen | ConBlue);
     
     m_Console->OutputString("                 \n");
     m_Console->OutputString("           Monster - version 1.0      \n");
     m_Console->OutputString("                    ");
     
     m_Console->SetBackgroundColor(0);
     m_Console->SetTextColor(ConRed | ConGreen | ConBlue);
     
     Position.X = 1;
     Position.Y = 4;
     m_Console->SetPosition(Position);
     m_Console->OutputString("What do you want to do? ");
     Position.X = 3;
     Position.Y = 6;
     m_Console->SetPosition(Position);
     m_Console->OutputString("1 - Start New Game - Easy");
     Position.Y = 7;
     m_Console->SetPosition(Position);
     m_Console->OutputString("2 - Start New Game - Medium");
     Position.Y = 8;
     m_Console->SetPosition(Position);
     m_Console->OutputString("3 - Start New Game - Hard");
     
     Position.Y = 10;
     m_Console->SetPosition(Position);
     m_Console->OutputString("Q - Exit Game");
}
//Shows actual game
void CGame::ShowGame (void) {
     COORD Position;
     int Monster;
     
     m_Console->SetBackgroundColor(0);
     m_Console->SetTextColor(ConGreen);
     
     m_Player.GetPosition(&Position);
     
     m_Console->SetPosition(Position);
     m_Console->OutputString("P");
     //Draw field
     m_Console->SetBackgroundColor(ConRed | ConGreen | ConBlue);
     m_Console->SetTextColor(ConRed | ConGreen | ConBlue);
     for (FieldY = 0; FieldY <= m_Arena.Y; FieldY++) {
     for ((FieldY == 0) || (FieldY == m_Arena.Y)) {
         for (Field X = 0; FieldX <= m_Arena.X; FieldX++) {
             Position.X = FieldX;
             Position.Y = FieldY;
             m_Console->SetPosition(Position);
             m_Console->OutputString("#");
         }
     } else {
            Position.X = 0;
            Position.Y = FieldY;
            m_Console->SetPosition(Position);
            m_Console->OutputString("#");
            Position.X = m_Arena.X;
            Position.Y = FieldY;
            m_Console->SetPosition(Position);
            m_Console->OutputString("#");
     }
     }
     //Draw Monsters
     m_Console->SetBackgroundColor(0);
     m_Console->SetTextColor(ConRed);
     for (Monster = 0; Monster < m_MonstersNumber; Monster++) {
         if (m_Monsters [Monster].X != 0) {
                        m_Console->SetPosition(m_Monsters [Monster]);
                        m_Console->OutPutString("M");
         }
     }
     char Buffer[100];
     
     sprintf(Buffer, " Lives: %d \t\t Score: %d \t Leaps: %t", m_Player.GetLives() - 1, m_Player.GetScore(), m_Player.GetLeaps());
     Position.X = 5;
     Position.Y = 24;
     m_Console->SetPosition(Position);
     m_Console->SetTextColor(ConRed | ConGreen);
     m_Console->OutputString(Buffer);
}
//Shows game won boxxx
void CGame::ShowWon (void) {
     ShowGame();
     
     COORD Position;
     
     Position.X = 20;
     Position.Y = 11;
     m_Console->SetPosition(Position);
     m_Console->SetBackgroundColor(ConGreen);
     m_Console->SetTextColor(ConRed);
     
     m_Console->OutputString("#####################################");
     Position.Y = 12;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#          Congratulations          #");
     Position.Y = 13;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#  You have killed all the monsters #");
     Position.Y = 14;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#####################################");
}

//Shows life lost box
void CGame::ShowLostLife (void) {
     ShowGame();
     
     COORD Position;
     
     Position.X = 20;
     Position.Y = 11;
     m_Console->SetPosition(Position);
     m_Console->SetBackgroundColor(ConGreen);
     m_Console->SetTextColor(ConRed);
     
     m_Console->OutputString("#####################################");
     Position.Y = 12;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#        You've lost a life         #");
     Position.Y = 13;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#####################################");
}
//Show Game Lost boxxx
void CGame::ShowLost (void) {
     ShowGame();
     COORD Position;
     
     Position.X = 20;
     Position.Y = 11;
     m_Console->SetPosition(Position);
     
     m_Console->SetBackgroundColor(ConGreen);
     m_Console->SetTextColor (ConRed);
     
     m_Console->OutputString("#####################################");
     Position.Y = 12;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#            Tough Luck!            #");
     Position.Y = 13;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#     You lost all your lives.      #");
     Position.Y = 14;
     m_Console->SetPosition(Position);
     m_Console->OutputString("#####################################");
}
void CGame::ShowExit (void) {
     m_Console->SetBackgroundColor(0);
     m_Console->SetTextColors(ConRed | ConGreen | ConBlue);
     m_Console->Clear();
     m_Console->OutputString("\n  Monster 1.0 \n\n\n");
     m_Console->OutputString(" by: Bruno Sousa (bsousa@fireworks");
     m_Console->OutputString("-interactive.com)\n\n\n\n");
     m_Console->OutputString("Thanks for playing!\n\n\n");
     m_Console->OutputString("And remember, stay away from drugs.\n\n");
}
//Show screen depending on status
void CGame::Show(void) {
     m_Console->SetBackgroundColor(0);
     m_Console->SetTextColor (ConRed | ConGreen | ConBlue);
     m_Console->Clear();
     
     switch (m_GameStatus) {
            case GameMainMenu:
                 ShowMenu();
                 break;
            case GameRunning:
                 ShowGame();
                 break;
            case GameWon:
                 ShowWon();
                 break;
            case GameLostLife:
                 ShowLostLife();
                 break;
            case GameLost:
                 ShowLost();
                 break;
            case GameExit:
                 ShowExit();
                 break;
            case GameSplashScreen:
                 ShowSplash();
                 break;
            default:
                    break;
     }
}

void CGame::StartNewGame (int Difficulty) {
     int Monster;
     COORD Position;
     
     m_GameStatus = GameRunning;
     
     switch (Difficulty) {
            case GameEasy:
                 m_MonstersNumber = 10;
                 m_Player.SetLives(4);
                 m_Player.SetLeaps(3);
                 m_Arena.X = 25;
                 m_Arena.Y = 15;
                 break;
            case GameMedium:
                 m_MonstersNumber = 20;
                 m_Player.SetLives(3);
                 m_Player.SetLeaps(2);
                 m_Arena.X = 35;
                 m_Arena.Y = 18;
                 break;
            case GameDifficult:
                 m_MonstersNumber = 30;
                 m_Player.SetLives(2);
                 m_Player.SetLeaps(1);
                 m_Arena.X = 50;
                 m_Arena.Y = 23;
                 break;
     }
     //creatte player
     m_Player.RandomLeap (m_Arena);
     m_Player.GetPosition(&Position);
     m_Player.SetScore(0);
     
     //Create Monsters
     m_Monsters = new COORD [m_MonstersNumber];
     srand(time(NULL));
     //Get random pos for monsters
     for (Monster = 0; Monster < m_MonstersNumber; Monster++) {
         //Make sure pos if diff from player's
         do {
             m_Monsters[Monster].X = (rand()%(m_Arena.X - 1)) + 1;
             m_Monsters[Monster].Y = (rand()%(m_Arena.Y - 1)) + 1;
         }
         while ((m_Monsters[Monster].X == Position.X) && (m_Monsters[Monster].Y == Position.Y));
     }
}

