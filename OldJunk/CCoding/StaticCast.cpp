#include <iostream.h>

int main() {
    int Number = 74; //ASCII Value for J.
    char Letter;
    float Energy = 54.4;
    Letter = static_cast <char> (Number); //Turn the number into the letter
    Number = static_cast <int> (Energy); //Make number equal to Energy, as an int
    cout << "Letter: " << Letter << " and Number: " << Number << endl;
    system ("PAUSE");
    return 0;
}
