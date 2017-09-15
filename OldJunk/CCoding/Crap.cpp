#include <iostream.h>
#include <stdlib.h>
#include <time.h>

using namespace std;

void ShowIntroScreen(void);
void ShowInformation(unsigned long Money);
short GetBet(void);
short DoDiceThrow(void);
unsigned short DoMoneyCalc(short dice, short Bet, short BetMoney);
unsigned long GetAmount(void);

int main (void) {
     unsigned long MoneyEarned;
     unsigned long Money;
     
     short DiceValue;
     short Bet;
     short BetMoney;
     ShowIntroScreen();
     Money = 1000;
     
     do {
         ShowInformation(Money);
         Bet = GetBet();
         BetMoney = GetAmount();
         DiceValue = DoDiceThrow();
         MoneyEarned = DoMoneyCalc(DiceValue, Bet, BetMoney);
         
         Money -= BetMoney;
         
         if (MoneyEarned == 0) {
                         cout << "You lost. Number was: " << DiceValue << "\n\n";
         } else {
                cout << "You won " << MoneyEarned - BetMoney;
                cout << " dollars. Number was: " << DiceValue;
                cout << endl << endl;
                
                Money += MoneyEarned;
         }
     }
     while (Money > 100);
     cout << "Game over. Keep $" << Money << " for the ride home.\n";
     
     return 0;
     system("PAUSE");
}

void ShowIntroScreen (void) {
     cout << "    Welcome to Craps 1.0\n\n";
     cout << "Here are the rules:\n\n";
     cout << "You have $1000 to start gambling.\n\n";
     cout << "You can do three different bets. You can bet on ";
     cout << "numbers 2 and 12 which will give";
     cout << " you a win ratio of ";
     cout << "5 to 1 if you win. You can also bet the numbers 4 ";
     cout << "and 10 which will give you a ratio of 2.5 to 1. ";
     cout << "The last kind of bet you can do is on the numbers 6 and 8 ";
     cout << "which will give you a win ratio of 1.5 to 1.\n\n";
     cout << "The minimum bet is $10 whereas the maximum is $100.\n\n";
}
void ShowInformation (unsigned long Money) {
     cout << "You have $" << Money << endl;
}
short GetBet(void) {
      unsigned short BetType;
      cout << "Enter a type of bet (1 = '6/8' 2 = '4/10' 3 = '2/12'): ";
      cin >> BetType;
      
      if ((BetType == 1) || (BetType == 2) || (BetType == 3)) {
                   return BetType;
      } else {
             return 1;
      }
}
short DoDiceThrow(void) {
      short DiceValue;
      
      srand(time(NULL));
      DiceValue = (rand()%11) + 2;
      
      if ((DiceValue == 4) || (DiceValue == 10)) {
                     srand (time(NULL));
                     DiceValue = (rand()%12) + 1;
      }
      if ((DiceValue == 2) || (DiceValue == 12)) {
               srand (time(NULL));
               DiceValue = (rand()%12) + 1;
               if ((DiceValue == 2) || (DiceValue == 12)) {
               srand (time(NULL));
               DiceValue = (rand()%12) + 1;
               }
      }
      return DiceValue;
}

unsigned short DoMoneyCalc(short Dice, short Bet, short BetMoney) {
         unsigned long MoneyEarned = 0;
         switch (Bet) {
                case 1:
                     if ((Dice == 6) || (Dice == 8)) {
                               MoneyEarned = BetMoney*1.5;
                     }
                     break;
                case 2:
                     if ((Dice == 10) || (Dice == 4)) {
                               MoneyEarned = BetMoney*2.5;
                     }
                     break;
                case 3:
                     if ((Dice == 2) || (Dice == 12)) {
                               MoneyEarned = BetMoney*5;
                     }
                     break;
                default:
                        MoneyEarned = 0;
                        break;
         }
         return MoneyEarned;
}
unsigned long GetAmount(void) {
         unsigned short BetAmount;
         
         cout << "Enter amount to bet (min 10, max 100): ";
         cin >> BetAmount;
         
         if (BetAmount < 10) {
                       BetAmount = 10;
         }
         if (BetAmount > 100) {
                       BetAmount = 100;
         }
         return BetAmount;
}
