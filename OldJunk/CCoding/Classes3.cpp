#include <cstdlib>
#include <iostream>

using namespace std;

class Object {
      public:
             Object();
             ~Object();
             void SetI(int iValue);
             int GetI();
             void SetF(float fValue);
             float GetF();
             
     private:
             int i;
             float f;
};

Object::Object() {
                 cout << "Entering constructor." << endl;
                 i = 0;
                 f = 0.0;
}

Object::~Object() {
                  cout << "Entering destructor." << endl;
}

void Object::SetI(int iValue) {
      i = iValue;
}
int Object::GetI() {
      return (i);
}
void Object::SetF(float fValue) {
         f = fValue;
}
float Object::GetF() {
      return (f);
}

int main() {
    Object Obj1, Obj2;
    Obj1.SetI(10);
    Obj1.SetF(35.71);
    Obj2.SetI(36);
    Obj2.SetF(35.14);
    
        cout << "Object one i: " << Obj1.GetI() << endl;
    cout << "Object one f: " << Obj1.GetF() << endl;
    
    cout << "Object two i: " << Obj2.GetI() << endl;
    cout << "Object two f: " << Obj2.GetF() << endl;
    system("PAUSE");
    return 0;
}
