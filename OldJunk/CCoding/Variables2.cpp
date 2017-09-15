#include <iostream.h>

/* typedef is to shorten things
Short means it's a short var, and reserves less memory to hold it.
Unsigned means they're all positive, instead of signed which means neg OR pos. */
typedef unsigned short int USHORT;

int main() {
  USHORT Width = 5, Length;
  cout <<"Please enter a length (number).\n";
  cin >> Length;
  //Create an int and multiply the result in one step.
  int Area = Width*Length;
  cout << "Width: " << Width << "\n";
  cout << "Length: " << Length << endl;
  cout << "Area : " << Area << endl;
  return 0;
}