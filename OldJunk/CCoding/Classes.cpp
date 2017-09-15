#include <cstdlib>
#include <iostream>

using namespace std;

class Object {
      public:
             int i;
             float f;
             };
             int main() {
                 Object anObject;
                 anObject.i = 10;
                 anObject.f = 3.14159;
                 cout <<"i = " << anObject.i << endl;
                 cout <<"f = " << anObject.f << endl;
                 system("PAUSE");
                 return 0;
                 }
