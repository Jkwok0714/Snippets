#include <iostream.h>

//int FindProduct(int Chickens, CowGoesMoo); //Func Prototype
int findProduct(int a, int b) {
  cout <<"Multiplying...\n";
  return a*b;
}

int CallMessages(int c);

int redoCalc() {
  cout <<"Please enter a number between 1 and 5 damn it!!\n";
   int Num3;
  cin >> Num3;
  cout <<"\nCalling message function...";
  CallMessages(Num3);
  return 0;
}

int CallMessages(int c) {
  if (c == 1) {
    cout <<"Marbin has risen from the dead.\n";
  } else if (c == 2) {
    cout <<"Marbin eats a chicken.\n";
  } else if (c == 3) {
    cout <<"Marbin falls into the pit of agony.\n";
  } else if (c == 4) {
    cout <<"A zombie falls onto Marbin.\n";
  } else if (c == 5) {
    cout <<"Gremlins attack Marbin.\n";
  } else {
    cout <<"Recieved a value outside of the requested numbers! Damn you Marbin\n";
  }
//  cout <<"Now to show it by using the actual input rather than if statements...\n";
  cout <<"The number entered was: " << c << ".\n";
  if ((c >= 1) && (c <= 5)) {
    return 0;
  } else {
    redoCalc();
    return 0;
  }
}

float ConvertNum(float d) {
  cout <<"\nConverting to Celcius...";
  float ResultsC = ((d - 32)*5)/9;
  return ResultsC;
}

int main() {
  int Chickens, CowGoesMoo;
  cout <<"Enter the number of Chickens: ";
  cin >> Chickens;
  cout <<"\nEnter how many legs each has: ";
  cin >> CowGoesMoo;
  cout <<"Now to multiply..\n";
  int Product = findProduct(Chickens, CowGoesMoo);
  cout <<"Back in main function! The are.. " << Product << " Chicken legs in the yard.\n\n";
  cout <<"Now enter a number between 1 and 5: ";
  int Num3;
  cin >> Num3;
  cout <<"\nCalling message function to see what happens...";
  CallMessages(Num3);
  cout <<"\nMoving on to next function, using float ints to calculate a conversion.\n";
  cout <<"Enter a temperature in fahrenheit degrees: ";
  float Num4;
  cin >> Num4;
  cout <<"\nNow to call the converting function.";
//  cout <<"Function is ended.\n";
  float CDegrees = ConvertNum(Num4);
  cout <<"\nConversion completed. " <<Num4 << " degrees F is equivilant to " << CDegrees << " degrees C.\n";
  cout <<"Function ended.";
  return 0;
}

