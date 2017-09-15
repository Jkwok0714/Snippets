#include <iostream.h>

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
               std::cout << "Bark!\n";
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
               std::cout << "Meow!\n";
               m_Age++;
     }
}
int main() {
    //Create the Dog from the class
    CDog Dog;
    CCat Cat;
    int Loop;
    
    for (Loop = 0; Loop < 10; Loop++) {
        Dog.Talk();
        Cat.Talk();
    }
    system("PAUSE");
    return 0;
}
