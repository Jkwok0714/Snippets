#include <iostream.h>

int main() {
    unsigned short shortVar = 5;
    unsigned long longVar = 35735;
    long sVar = -3753;
    
    cout << "ShortVar:\t" << shortVar;
    cout << "\tAddress of shortVar:\t" << &shortVar << "\n";
    cout << "LongVar:\t" << longVar;
    cout << "\tAddress of longVar:\t" << &longVar << "\n";
    cout << "sVar:\t\t" << sVar << " \tAdress of sVar:\t\t" << &sVar << "\n";
    return 0;
}
