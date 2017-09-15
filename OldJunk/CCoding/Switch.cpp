#include <iostream.h>

int main() {
    unsigned short int number, number2;
    cout << "Enter a number between 1 and 5: ";
    cin >> number;
    switch (number) {
           case 0: cout << "Too small of a number. Marbin is burned.";
           break;
           case 5: cout << "Marbin eats a snail and belches.\n";
           case 4: cout << "Marbin draws a picture and it bursts to dust.\n";
           case 3: cout << "A tornado appears on Marbin, sweeping him away.\n";
           case 2: cout << "A herd of rhinos in Africa emit dung on Marbin.\n";
           case 1: cout << "A granola bar slices Mrabin to pieces.\n";
           break;
           default: cout << "Value is too large! Marbin is spared.\n";
           break;
   }
   cout << "Ack! Enter another number between 1 and 3 to find out what happens next: ";
   cin >> number2;
   switch (number2) {
          case 0: cout << "Too small of a number. Marbin's remains are eaten by dogs.\n";
          break;
          case 3: cout << "Marbin goes to heaven where he gropes angels.\n";
          case 2: cout << "Marbin then falls into hell and is stabbed by demons.\n";
          case 1: cout << "Marbin recovers though, and eats live rats and lives happily ever after off them.\n";
          break;
          default: cout << "Marbin jumps on his bed and lands badly, crushing skull and dying.\n";
          break;
          }
          cout << "\n\n";
          system("PAUSE");
          return 0;

          }
