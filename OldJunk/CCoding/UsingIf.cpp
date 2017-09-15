#include <iostream.h>
int main() {
  int Num1, Num2;
  cout <<"Enter the first number: ";
  cin >> Num1;
  cout <<"\nEnter another number: ";
  cin >> Num2;
  if (Num1 > Num2){
    cout <<"\nNum1 is larger than Num2 so Marbin will be eaten alive.";
  } else {
    cout <<"\nNum1 is not larger than Num2 so Marbin will be spared.";
  }
  return 0;
}