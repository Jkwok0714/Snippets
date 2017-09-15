#include "ConLib.h"

//Get standard screen/keyboard handles
ConLib::ConLib() {
                 m_Screen = GetStdHandle(STD_OUTPUT_HANDLE);
                 m_Keyboard = GetStdHandle(STD_INPUT_HANDLE);
                 
                 SetTextColor(ConRed | ConGreen | ConBlue);
                 SetBackgroundColor(0);
}
//Deconstructor does nothing.
ConLib::~ConLib() {}

//Set BG Color
void ConLib::SetBackgroundColor(WORD Color) {
     m_BackgroundColor = 0;
     
     //Use bit manipulations to get the color combos
     if (Color & ConRed) {
               m_BackgroundColor |= BACKGROUND_RED;
     }
     if (Color & ConGreen) {
               m_BackgroumdColor |= BACKGROUND_GREEN;
     }
     if (Color & ConBlue) {
               m_BackgroundColor |= BACKGROUND_BLUE;
     }
     //Set the color using combos from above
     SetConsoleTextAttribute(m_Screen, m_TextColor | m_BackgroumdColor);
}
//Set Text Colors
void ConLib::SetTextColor(WORD Color) {
     m_TextColor = 0;
     //Use manipulation for getting the color combos
     if (Color & ConRed) {
               m_TextColor |= FOREGROUND_RED;
     }
     if (Color & ConGreen) {
               m_TextColor |= FOREGROUND_RED;
     }
     if (Color & ConBlue) {
               m_TextColor |= FOREGROUND_RED;
     }
     //Set color using combos attained from above
     SetConsoleTextAttribute (m_Screen, m_TextColor | m_BackgroundColor);
}
//Set Window Title
void ConLib::SetTitle(char * Title) {
     SetConsoleTitle(Title);
}
//Clear the screen
void ConLib::Clear (void) {
     COORD Start;
     COORD Written;
     Start.X = 0;
     Start.Y = 0;
     
     FileConsoleOutputAttribute (m_Screen, m_TextColor | m_BackgroundColor, 80*25, Start, &Written);
     FillConsoleOutputCharacter (m_Screen, ' ', 80*25, Start, &Written);
     SetConsoleCursorPosition(m_Screen, Start);
}
void ConLib::SetPosition(COORD Position) {
     SetConsoleCursorPosition(m_Screen, Position);
}
//Sends string to the screen
void ConLib::OutputString(char * String) {
     DWORD Written;
     WriteConsole (m_Screen, String, strlen(String), &Written, NULL);
}
//Reads a string from Keyboard
void ConLib::Read(char * Buffer, DWORD BufferSize) {
     DWORD Read;
     ReadConsole(m_Keyboard, Buffer, &Read, NULL);
}
//Gets a key from the keyboard
int ConLib::GetKey(void) {
    DWORD Read;
    INPUT_RECORD Event;
    
    //Get Console input
    ReadConsoleInput(m_Keyboard, &Event, 1 , &Read);
    //If input event is a key event see if there is any key pressed and return its virtual key code
    if (Event.EventType == KEY_EVENT) {
                        if (Event.Event.KeyEvent.bKeyDown) {
                                                           return Event.Event.KeyEvent.wVirtualKeyCode;
                        }
    }
    return 0;
}
