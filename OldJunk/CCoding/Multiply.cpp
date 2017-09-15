#include <iostream.h>

//int FindProduct(int Num1, Num2); //Func Prototype
int findProduct(int a, int b) {
  cout <<"Multiplying...\n";
  return a*b;
}

int CallMessages(int c) {
  if (c == 1) {
    cout <<"Recieved one.\n";
  } else if (c == 2) {
    cout <<"Recieved 2.\n";
  } else if (c == 3) {
    cout <<"Recieved 3.\n";
  } else if (c == 4) {
    cout <<"Recieved 4.\n";
  } else if (c == 5) {
    cout <<"Recieved 5.\n";
  } else {
    cout <<"Recieved a value outside of the requested numbers!\n";
  }
  cout <<"Now to show it by using the actual input rather than if statements...\n";
  cout <<"The number entered was: " << c << ".\n";
  if ((c >= 1) && (c <= 5)) {
    return 1;
  } else {
    return 0;
  }
}

float ConvertNum(float d) {
  cout <<"\nConverting to Celcius...";
  float ResultsC = ((d - 32)*5)/9;
  return ResultsC;
}

int main() {
  int Num1, Num2;
  cout <<"Enter a number to multiply: ";
  cin >> Num1;
  cout <<"\nEnter another number: ";
  cin >> Num2;
  cout <<"Now to multiply..\n";
  int Product = findProduct(Num1, Num2);
  cout <<"Back in main function, the product is.. " << Product << ".\n\n";
  cout <<"Now enter a number between 1 and 5: ";
  int Num3;
  cin >> Num3;
  cout <<"\nCalling message function...";
  CallMessages(Num3);
  if (CallMessages(Num3) == 0) {
    cout <<"\nPlease enter a number 1 thru 5 again: ";
    cin >> Num3;
      cout <<"\nCalling message function...";
    CallMessages(Num3);
  }
  cout <<"\nMoving on to next function, using float ints to calculate a conversion.\n";
  cout <<"Enter a temperature in fahrenheit degrees: ";
  float Num4;
  cin >> Num4;
  cout <<"\nNow to call the converting function.";
//  cout <<"Function is ended.\n";
  float CDegrees = ConvertNum(Num4);
  cout <<"\nConversion completed. " <<Num4 << " degrees F is equivilant to " << CDegrees << " degrees C.\n";
  cout <<"Function ended. Press a letter key and Enter to exit.";
  cin >> Num4;
  return 0;
}

