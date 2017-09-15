#include <iostream.h>

using namespace std;

int main() {
    string naming, verb, adjective;
    cout <<"Please type a name and press enter: ";
    cin >> naming;
    cout <<"\nNow enter a present-tense verb such as runs or hides: ";
    //string verb;
    cin >> verb;
    cout <<"\nNow enter an adjective such as slowly: ";
    //string adjective;
    cin >> adjective;
    cout <<"All done. Every day, " << naming << " always " << verb << " on your face " << adjective << ".\n";
    cout <<"Congratulations! Press any letter key and enter to exit program.";
    cin >> verb;
    return 0;
}
