#include <iostream>
#include <stdlib.h>
using namespace std;

int main () {
     short Number;
     short Guess = 0;
     
     srand(time (NULL));
     Number = rand()%100;
     Number++;
     
     while (Guess != Number) {
           cout << "Enter a number between 1 and 100: ";
           cin >> Guess;
           
           if (Guess < Number) {
                     cout << "You are guessing low.\n";
           }
           if (Guess > Number) {
                     cout << "You are guessing high.\n";
           }
     }
     
     cout << "You got it. The winning number is: " << Number;
     cout << endl;
     
     system("PAUSE");
     
}
