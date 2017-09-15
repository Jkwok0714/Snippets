//Avoid Redefinition
#pragma once
#include <windows.h>

//ConLib color codes
enum ConColor {
     ConRed = 1,
     ConGreen = 2,
     ConBlue = 4
};

//Control Class
class ConLib {
      //Screen/Keyboard handles
      HANDLE m_Screen;
      HANDLE m_Keyboard;
      
      WORD m_TextColor;
      WORD m_BackgroundColor;
      
      public:
             ConLib();
             ~ConLib();
             
             void SetBackgroundColor(WORD Color);
             void SetTextColor(WORD Color);
             void SetTitle(char * Title);
             void SetPosition (COORD Position);
             
             void Clear(void);
             void OutputString(char * String);
             
             void Read(char * Buffer, DWORD BufferSize);
             int GetKey(void);
};
