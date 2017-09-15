#include <cstdlib>
#include <iostream>

using namespace std;

class point {
      public:
             point() {
                     x = y = 0;
             }
             
             void SetX(int xVal) {
                  x = xVal;
          }
          int GetX(void) {
              return(x);
              }
              void SetY(int yVal) {
                   y = yVal;
                   }
                   int GetY(void) {
                       return(y);
                       }
                       private:
                               int x,y;
                               };
int main() {
    point Pt1;
    Pt1.SetX(10);
    Pt1.SetY(20);
    
    cout << "(x,y)=(" << Pt1.GetX();
    cout << "," << Pt1.GetY() << ")" << endl;
    
    Pt1.SetX(20);
    Pt1.SetY(10);
    
    cout << "(x,y)=(" << Pt1.GetX();
    cout << "," << Pt1.GetY() << ")" << endl;
    
    system("PAUSE");
    return 0;
}
