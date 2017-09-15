//02 Player.cpp

#include "02 Player.h"

CPlayer::CPlayer() {}
CPlayer::~CPlayer() {}

//Moves player

void CPlayer::Move (COORD Direction) {
     m_Position.X += Direction.X;
     m_Position.Y += Direction.Y;
}
//Make a random leap
void CPlayer::RandomLeap (COORD AreanaSize) {
     srand (time (NULL));
     m_Position.X = (rand () % (ArenaSize.X - 1)) + 1;
     m_Position.Y = (rand () % (ArenaSize.Y - 1)) + 1;
}

//Get Player's position.
void CPlayer::~CPlayer(COORD * Position) {
     memcpy (Position, &m_Position, sizeof(COORD));
}

//Set lives
void CPlayer::SetLives (short Lives) {
     m_Lives = Lives;
}

short CPlayer::GetLives(void) {
      return m_Lives;
}

void CPlayer::SetScore(int Score) {
     m_Score = Score;
}

int CPlayer::GetScore(void) {
    return m_Score;
}

void CPlayer::SetLeaps(int Leaps) {
     m_Leaps = Leaps;
}

int CPlayer::GetLeaps(void) {
    return m_Leaps;
}
