#include <iostream.h>
#include <assert.h>

//Singleton Class - Useful for managers and such for sound, graphics, enemies etc.
//It prevents duplicate, avoiiding it pasing to other functions and still having access
class CSingletonExample {
      private:
              static CSingletonExample * m_Singleton;
      public:
             CSingletonExample();
             virtual ~CSingletonExample();
             static CSingletonExample * GetSingleton(void);
};

CSingletonExample * CSingletonExample::m_Singleton;

CSingletonExample::CSingletonExample() {
                                       //Assert is a breakpoint if the (argument) is false
                                       assert (!m_Singleton);
                                       m_Singleton = this;
}

CSingletonExample::~CSingletonExample() {
                                        assert (m_Singleton);
                                        m_Singleton = NULL;
}

CSingletonExample * CSingletonExample::GetSingleton() {
                  assert (m_Singleton);
                  
                  return m_Singleton;
}

int main() {
    CSingletonExample Singleton;
    CSingletonExample *PointerSingleton;
    PointerSingleton = CSingletonExample::GetSingleton();
    system ("PAUSE");
    return 0;
}
    
