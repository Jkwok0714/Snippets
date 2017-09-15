#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main () {
  //string line1;
  fstream FileLoader;
  cout << "Enter some text to save in the text file: ";
  string TextThings;
  cin >> TextThings;
  FileLoader.open ("Store.txt", ios::ate);
  FileLoader<< TextThings << "\n";
  FileLoader.close();
  return 0;
}