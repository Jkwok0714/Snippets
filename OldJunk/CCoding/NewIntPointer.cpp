#include <iostream.h>

int main() {
    //Declare local variables
    int localVar = 5;
    //Make pointer with address of that local variable
    int * pLocal = &localVar;
    //Another pointer but initialize with new int This reserves the space.
    int * pHeap = new int;
    //If you memory is reserved, display this..
    if (pHeap == NULL) {
              cout << "Error. No memory for pHeap";
              return 1;
              }
              //Now give a value to that reserved space
              *pHeap = 7;
              cout << "localVar: " << localVar << "\n";
              cout << "*pLocal: " << *pLocal << "\n";
              cout << "*pHeap: " << *pHeap << "\n";
              //Remember to delete before reassigning
              delete pHeap;
              pHeap = new int;
              if (pHeap == NULL) {
                        cout << "Error. No memory for pHeap.";
                        return 1;
                        }
                        *pHeap = 9;
                        cout << "*pHeap: " << *pHeap << "\n";
                        delete pHeap;
                        return 0;
                        }
