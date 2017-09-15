#include <iostream.h>

int main() {
    int counter, fart, gas;
    cout << "Enter a number to loop: ";
    cin >> fart;
    cout << "\n";
    //Uses MULTIPLE statements
    for (counter = 0, gas = 0; counter < fart; counter++, gas++)
    cout << "ROFL!!! ";
    
    cout << "\nCounter: " << counter << " and the gas value... " << gas << ".\n";
    return 0;
}
