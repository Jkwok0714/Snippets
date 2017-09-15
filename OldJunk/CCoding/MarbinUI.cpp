#include <iostream.h>
int main() {
  int Num1, Num2, Chicken;
  cout <<"Enter the first number: ";
  cin >> Num1;
  cout <<"\nEnter another number: ";
  cin >> Num2;
  cout <<"'\nEnter another Chicken: ";
  cin >> Chicken;
  if (Num1 > Num2){
    cout <<"\nNum1 is larger than Num2 so Marbin will be eaten alive.";
  } else if (Num2 > Num1){
    cout <<"\nNum1 is not larger than Num2 so Marbin will be spared.";
  } else if (Chicken > Num2){
    cout <<"\nMarbin lives!";
  } else if (Num2 > Chicken){
    cout <<"\nMarbin is attacked!";
  }
  return 0;
}