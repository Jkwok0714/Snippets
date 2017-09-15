#include <iostream.h>
#include <time.h>
using namespace std;

main (void) {
     char * String;
     char Test[255];
     char Test2[255];
     char FinalString[255];
     char StrnctTester[255];
     char CharacTest;
     char StrnTest[255];
     char NumString[255];
     char FinalStr2[255];
     char TimeStr[255];
     time_t Today;
     tm * Time;
     int Number;
     
     cout << "Type a string: ";
     cin >> Test;
     
     cout << "And another: ";
     cin >> Test2;
     
     cout << "Enter a character to look for in string 1: ";
     cin >> CharacTest;
     
     cout << "Enter a string to look for in string 1: ";
     cin >> StrnTest;
     
     cout << "Enter a string of numerical values: ";
     cin >> NumString;
     
     //Convert the new numerical string to integers
     //To return floats, use atof. For long values, use atol
     Number = atoi(NumString);
     
     //Here's another string compiler thing.
     //First name the var to use, then format, and order.
     //Format: %s is for strings, %d for signed integers, %u for decimal integers
     //%c for characters and %f for floats.
     sprintf(FinalStr2, "The first string was %s, followed by %s as the second string. Within that, %c will be looked for inside the first string, and %s will also be looked for in there.\nThe numerical string is %s.", Test, Test2, CharacTest, StrnTest, NumString);
     
     //Duplicate string 1
     String = new char [strlen (Test) + 1];
     strcpy (String, Test);
     
     //Duplicate string 1 to diff vars and add str 2 parts to it
     strcpy(FinalString, Test);
     strcat(FinalString, Test2);
     //Same as above,, only adds first 3 chars of string 2
     strcpy(StrnctTester, Test);
     strncat(StrnctTester, Test2, 3);
     
     //Set the time string.
     time (&Today);
     Time = localtime(&Today);
     //Make it a string. Format specifiers:
     //All lowercase is abbreviated or numerical version
     //A = weekday. d = day of month. B = Month name. Y = year. H = Hour in 24 hour format.
     //I = Hour in 12 hour format. M = Minutes. S = Seconds. P = AM/PM.
     strftime(TimeStr, 255, "The date is %A, %B %d of year %Y. The time is %I:%M:%S.\n", Time);
     
     cout << endl << endl;
     cout << "And here the computer output begins.\n";
     cout << "------------------------------------\n";
     cout << TimeStr << endl;
     cout << FinalStr2 << endl << endl;
     cout << "Test String: " << Test << endl;
     cout << "Input String in Pointer: " << String << endl;
     cout << "String Length: " << strlen(Test) << endl;
     cout << "Concatenated String: " << FinalString << endl;
     cout << "Length of Con. String: " << strlen(FinalString) << endl;
     cout << "First String and first 3 letters of string 2: " << StrnctTester << endl;
     cout << "First String and its pointer Duplicate: " << Test << " " << String << endl;
     if (false == strcmp(Test, Test2)) {
               cout << "String 1 and 2 match.\n";
     } else {
            cout << "The two strings do not match.\n";
     }
     if (0 == strchr(Test, CharacTest)) {
           cout << "The character '" << CharacTest << "' isn't a part of string 1.\n";
     } else {
            cout << "The character '" << CharacTest << "' is a part of string 1.\n";
     }
       if (0 == strstr(Test, StrnTest)) {
           cout << "The string '" << StrnTest << "' isn't a part of string 1.\n";
     } else {
            cout << "The string '" << StrnTest << "' is a part of string 1.\n";
     }
     cout << "The numerical string doubled is " << Number+Number << endl;
     system("PAUSE");
     return 0;
}
