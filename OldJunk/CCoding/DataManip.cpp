#include <iostream.h>

typedef unsigned short int USHORT;
int main() {
    USHORT myAge; //a variable
    USHORT * pAge; //a pointer
    myAge = 5;
    cout << "myAge: " << myAge << "\n";
    pAge = &myAge; //assign adress of myage to page;
    cout << "*pAge: " << *pAge << "\n\n";
    //
    cout << "Setting *pAge to 7.\n";
    *pAge = 7;
    cout << "myAge: " << myAge << "\n";
    cout << "*pAge: " << *pAge << "\n\n";
    
    cout << "Setting myAge to 9.\n";
    myAge = 9;
    cout << "myAge: " << myAge << "\n";
    cout << "*pAge: " << *pAge << "\n\n";
    return 0;
}
