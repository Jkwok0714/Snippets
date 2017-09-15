#include "Header.h"
#include <iostream.h>

int main() {
    double Number;
    double SquaredNumber, CubedNumber;
    Number = 5;
    SquaredNumber = Square(Number);
    CubedNumber = Cube(Number);
    
    cout << "Square of 5 = " << SquaredNumber << endl;
    cout << "Cube of 5 = " << CubedNumber << endl;
    system("PAUSE");
    return 0;
   
}
