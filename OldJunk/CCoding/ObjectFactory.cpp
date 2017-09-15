#include <iostream.h>
#include <assert.h>

enum ObjectTypes {
     DogType, CatType, CowType
};

//Save for the enumeration, this is the same as BaseClasses.cpp
using namespace std;
//The Base Class
class CAnimal {
      public:
             int m_MaxAge;
             int m_Age;
             CAnimal();
             virtual ~CAnimal();
             virtual void Talk(void);
};

//Base Animal class const/deconst defines a prelvalue
CAnimal::CAnimal() {
                   m_MaxAge = 0;
                   m_Age = 0;
}
CAnimal::~CAnimal() {
}

//Virtual method of talk
void CAnimal::Talk (void) {
     std::cout << "Base animal doesn't talk!";
}

//Derived Dog Class
class CDog : public CAnimal {
      public:
             CDog();
             virtual ~CDog();
             virtual void Talk(void);
};

//Dog class constructors and deconstructors
CDog::CDog() {
             m_MaxAge = 9;
             m_Age = 0;
}

CDog::~CDog() {
}

//Virtual method.. Check if dog is alive. If so, bark and add to age.
void CDog::Talk(void) {
     if (m_Age < m_MaxAge) {
               std::cout << "Dog goes Bark!\n";
               m_Age++;
     }
}

//Same as dog for cat.

class CCat : public CAnimal {
      public:
             CCat();
             virtual ~CCat();
             virtual void Talk(void);
};
CCat::CCat() {
             m_MaxAge = 5;
             m_Age = 0;
}
CCat::~CCat() {}
void CCat::Talk(void) {
     if (m_Age < m_MaxAge) {
               std::cout << "Cat goes Meow!\n";
               m_Age++;
     }
}
//Now a cow for further testing LOL
class CCow : public CAnimal {
      public:
             CCow();
             virtual ~CCow();
             virtual void Talk(void);
};

//Dog class constructors and deconstructors
CCow::CCow() {
             m_MaxAge = 12;
             m_Age = 0;
}

CCow::~CCow() {
}

//Virtual method.. Check if dog is alive. If so, bark and add to age.
void CCow::Talk(void) {
     if (m_Age < m_MaxAge) {
               std::cout << "Cow goes Moo!\n";
               m_Age++;
     }
}

//Now it differs.
//
//Here is the Object Factory Class
class CObjectFactory {
      public:
             //Returns a pointer to CAnimal class, when pointer is actually to a class derived from it
             static CAnimal * GetType (int Type);
};

CAnimal * CObjectFactory::GetType(int Type) {
        switch (Type) {
               //Take the type and make a new object from the class type given
               case DogType:
                    return new CDog();
                    break;
               case CatType:
                    return new CCat();
                    break;
               case CowType:
                    return new CCow();
                    break;
               default:
                       assert(0);
               }
        return NULL;
}

//Start now.
int main() {
    //Creating two CAnimal types
    CAnimal * Dog;
    CAnimal * Cat;
    CAnimal * Cow;
    //Use Obj Factory to create two animals.
    Dog = CObjectFactory::GetType(DogType);
    Cat = CObjectFactory::GetType(CatType);
    Cow = CObjectFactory::GetType(CowType);
    //Call the derived classes' Talk method to check they're made.
    Dog->Talk();
    Cat->Talk();
    Cow->Talk();
    //Delete since there's no more need
    delete Dog;
    delete Cat;
    delete Cow;
    system("PAUSE");
    return 0;
}
