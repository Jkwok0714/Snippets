#include <iostream>
#include <cstdlib>

using namespace std;

class Object {
public:
       //Universal for all objects of the class
     void SetI(int iValue);
     int GetI();
     void SetF(float fValue);
     float GetF();
     //Only for the one object
     private:
             int i;
             float f;
 };
             //Setting function purposes: return values and changing them
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
    //Create two new objects of the class
    Object Obj1, Obj2;
    //Define I and F values for the objects
    Obj1.SetI(23);
    Obj1.SetF(7.2572);
    
    Obj2.SetI(-25);
    Obj2.SetF(3.2727);
    
    //Display the given values.
    cout << "Object one i: " << Obj1.GetI() << endl;
    cout << "Object one f: " << Obj1.GetF() << endl;
    
    cout << "Object two i: " << Obj2.GetI() << endl;
    cout << "Object two f: " << Obj2.GetF() << endl;
    system("PAUSE");
    return 0;
}
