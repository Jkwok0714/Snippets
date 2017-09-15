#include <windows.h>
#include <time.h>

class CPlayer {
      private:
              COORD m_Position;
              short m_Lives;
              int m_Score;
              int m_Leaps;
      public:
             CPlayer();
             ~CPlayer();
             
             //Move Player
             void Move (COORD Direction);
             void RandomLeap (COORD ArenaSize);
             //Maintenance methods
             void GetPosition (COORD * Position);
             void SetLives (short Lives);
             short GetLives (void);
             void SetScore (int Score);
             int GetScore (void);
             void SetLeaps (int Leaps);
             int GetLeaps (void);
};

