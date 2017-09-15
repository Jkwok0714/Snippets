#include <iostream.h>

int main() {
    int counter;
    cout << "How many farts?: ";
    cin >> counter;
    while (counter > 0) {
          cout << "-fart-\n";
          counter--;
  }
  cout << "Counter is now at: " << counter;
  return 0;
}
