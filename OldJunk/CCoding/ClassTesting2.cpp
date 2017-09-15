#include <iostream.h>
#include <stdlib.h>
#include <assert.h>

using namespace std;

enum MobTypes {
     RockerType,
     AliceType
};
//Base Enemy Class
class CEnemy {
      public:
             int MaxHP;
             int CurrentHP;
             int Attack;
             string Status;
             string MobName;
             CEnemy();
             virtual ~CEnemy();
             void LoseHP(int);
             int getHP();
};

CEnemy::CEnemy() {
                 MaxHP = 0;
                 CurrentHP = 0;
                 Attack = 0;
                 Status = "Alive";
                 MobName = "Monster";
}
CEnemy::~CEnemy() {
}
void CEnemy::LoseHP(int dmgValue) {
     CurrentHP -= dmgValue;
     if (CurrentHP < 0) {
                   CurrentHP = 0;
                   Status = "Dead";
     }
            
}
int CEnemy::getHP() {
    return (CurrentHP);
}

//Derive Rockers from the Enemy base
class CRocker:CEnemy {
      public:
             CRocker();
             virtual ~CRocker();
             virtual void LoseHP(int);
             virtual int getHP();
};
CRocker::CRocker() {
                   MobName = "Rocker";
                   MaxHP = 900;
                   CurrentHP = 900;
                   Attack = 22;
}
CRocker::~CRocker() {}

void CRocker::LoseHP(int dmgValue) {
     CurrentHP -= dmgValue;
     if (CurrentHP < 0) {
                   CurrentHP = 0;
                   cout << "The Rocker has died!\n";
                   cout << "-------------------\n\n";
                   Status = "Dead";
     } else {
     float HPPercent;
     HPPercent = (100*CurrentHP)/MaxHP;
     cout << "The Rocker is now at " << CurrentHP << " HP, which is " << HPPercent << "%.\n";
     }
            
}
int CRocker::getHP() {
                return (CurrentHP);
}

//Derive Alice
class CAlice:CEnemy {
      public:
             CAlice();
             virtual ~CAlice();
             virtual void LoseHP(int);
             virtual int getHP();
};
CAlice::CAlice() {
                 MobName = "Alice";
                   MaxHP = 11000;
                   CurrentHP = 11000;
                   Attack = 700;
}
CAlice::~CAlice() {}
    
void CAlice::LoseHP(int dmgValue) {
     CurrentHP -= dmgValue;
     if (CurrentHP < 0) {
                   CurrentHP = 0;
                   cout << "The Alice has died!\n";
                   cout << "-------------------\n\n";
                   Status = "Dead";
     } else {
     float HPPercent;
     HPPercent = (100*CurrentHP)/MaxHP;
     cout << "The Alice is now at " << CurrentHP << " HP, which is " << HPPercent << "%.\n";
     }
            
}
int CAlice::getHP() {
     return (CurrentHP);
}

class CMobSpawner {
      public:
             static CEnemy * GetType (int Type);
};

CEnemy * CMobSpawner::GetType(int Type) {
       switch (Type) {
              case RockerType:
                   return new CRocker();
                   break;
              case AliceType:
                   return new CAlice();
                   break;
              default:
                      assert(0);
       }
       return NULL;
}


int main() {
    //CRocker Enemy1, Enemy2;
    //CAlice Enemy3;
    int AttacksMade = 0;
    int OverallDamage = 0;
    int RandomRange = 70;
    int PlayerAtk = 300;
    int SpawnedFoes = 3;
    
    CEnemy * Enemy1;
    CEnemy * Enemy2;
    CEnemy * Enemy3;
    Enemy1 = CMobSpawner::GetType(RockerType);
    Enemy2 = CMobSpawner::GetType(RockerType);
    Enemy3 = CMobSpawner::GetType(AliceType);
    int * Enemies;
    Enemies = new int [SpawnedFoes];
    Enemies[1] = Enemy1;
    Enemies[2] = Enemy2;
    Enemies[3] = Enemy3;
    short AttackDamage;
    int EnemiesAlive = SpawnedFoes;
    int Target;
    cout << "Two Rockers and an Alice have been spawned.\n";
    cout << "They must be killed before the Novices attack and get 0wn3d.\n";
    cout << "You happen to have a hot curry in your inventory. This will up your attack greatly.\n";
    cout << "Enter 1 if you want to use it, anything other number will be considered no: ";
    int UseCurry;
    cin >> UseCurry;
    switch (UseCurry) {
           case 1:
                PlayerAtk = 600;
                RandomRange = 200;
                cout << "\nYou have used the hot curry.\n";
                break;
           default:
                   UseCurry = 0;
                   cout << "\nYou decide to skip the curry and save your mouth from fire.\n";
                   break;
    }
                
     while (EnemiesAlive > 0) {
    cout << "Enter a 1, or 2 to attack one of the Rockers, or a 3 to attack Alice: ";
    cin >> Target;
    AttackDamage = 0;
           srand(time (NULL));
           AttackDamage = (rand()%RandomRange)+PlayerAtk;
          
                for (Target = 0; Target < EnemiesAlive; Target++) {
                if (Enemies[Target].getHP() > 0) {
                                            AttacksMade+=1;
                OverallDamage += AttackDamage;
                cout << "You've attacked enemy " << Target << ", inflicting " << AttackDamage << " damage.\n";
                Enemies[Target].LoseHP(AttackDamage);
                
                } else {
                       cout << "Enemy " << Target << " is dead.\n\n";
                }
                }
                
         
        int EnemiesAlive = SpawnedFoes;
    if (Enemy1.getHP() <= 0) {
                         EnemiesAlive-=1;
    }
    if (Enemy2.getHP() <= 0) {
                         EnemiesAlive-=1;
    }
    if (Enemy3.getHP() <= 0) {
                         EnemiesAlive-=1;
    }
    cout << "Enemies alive: " << EnemiesAlive << endl << endl;
    if (EnemiesAlive == 0) {
                     break;
    }
    
}
int AvDamage = OverallDamage/AttacksMade;
cout << "All the monsters are dead.\n\n";
cout << "You have made " << AttacksMade << " attacks, inflicting " << OverallDamage << " damage overall.\n";
cout << "This makes an average of " << AvDamage << " per attack.\n";
    system("PAUSE");
    return 0;
}

    
