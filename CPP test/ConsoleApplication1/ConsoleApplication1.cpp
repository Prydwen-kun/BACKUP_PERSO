#include <stdlib.h>
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
#include "include/Classe1.h"

using namespace std;

void pyramide(int pyramideBase)
{
    int k = 0;
    for (int i = 0; i < pyramideBase; i++)
    {
        for (k; k < pyramideBase; k++)
        {
            cout << " ";
        }
        k = i;
        for (int j = 0; j < i; j++)
        {

            cout << "*";
            cout << " ";
        }
        cout << endl;
    }
    cout << endl;
}
// USE system("cls") pour clean la console // use \r carriage return character pour revenir debut ligne
int main()
{
    /*
    // start runtime clock var
    const clock_t c_start = clock();
    cout << c_start << endl;
    clock_t c_end;
    // init and decl main var
    bool flipper = true;
    int pyramideArg = 0;
    cout << "Please enter your pyramide base :";
    cin >> pyramideArg;

    // test function pyramide
    pyramide(pyramideArg);
    cout << endl;
    cout << "Voici une pyramide de base " << pyramideArg << endl;

    // TEST de loop avec actualisation
    int count = 0;
    while (count < 3) // nombre max de pyramide
    {
        count++;
        pyramide(pyramideArg);
        cout << endl;
        system("cls");
        if (flipper)
        {
            pyramideArg += 10;
            flipper = false;
        }
        else
        {
            pyramideArg -= 10;
            flipper = true; // alterne la taille de la base
        }
    }
    count = 0;
    c_end = clock(); // clock is directly linked to CPU time used beware threaded function
    cout << c_end << endl;
    */
    /*////////////////////////////////////////////////*/
    /*///////////////////TEST NB PREMIER//////////////*/
    /*////////////////////////////////////////////////*/
    Classe1 newPremierObject(13, 2);
    cout << "Entrer le nombre max pour générer la liste de nombre premier :";
    int liste_max = 0;
    cin >> liste_max;
    newPremierObject.nbPremier(liste_max);
    // pause exec
    int pause = 0;

    cin >> pause;
    return 0;
}