#include <iostream.h>
int main() {
    int rows, columns;
    char theChar;
    cout << "How many rows? ";
    cin >> rows;
    cout << "How many columns? ";
    cin >> columns;
    cout << "What character? ie. a, 6, +, etc.. ";
    cin >> theChar;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < columns; j++) {
            cout << theChar;
        }
        cout << "\n";
    }
    return 0;
            
}
