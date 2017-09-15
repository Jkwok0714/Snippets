#include <iostream.h>

int Add (int x, int y) {
  cout <<"Numbers recieved are " << x << " and " << y << "\n";
  return (x+y);
}

int main() {
  cout <<"Main function initiated.\n";
  //Define integers
  int a, b, c;
  //Wait for user input for number a
  cin >> a;
  //Same for b
  cin >> b;
  cout <<"Calling add function.\n";
  c = Add(a, b);
  cout <<"Back in main function.\n";
  cout <<"So " << a << " Plus " << b << " is " << c << "\n";
  cout <<"Exiting function.\n\n";
  return 0;
}

/* Comment */