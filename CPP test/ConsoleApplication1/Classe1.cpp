#include <iostream>
#include <algorithm>
#include <vector>
#include "include/Classe1.h"

using namespace std;

Classe1::Classe1(int arg1, int arg2)
{
	num = arg1;
	exp = arg2;
}

int Classe1::get_num()
{
	return num;
}

void Classe1::set_num(int val)
{
	num = val;
}

void Classe1::nbPremier(int maxIncrement)
{
	vector<int> ListPremier = { 1,2,3,5,7 };
	int nbDiviseur = 0;//use .pushback pour rajouter des element à la fin
	vector<int>::iterator ite;//pour find()

	for (int i = 2; i < maxIncrement; i++)
	{
		nbDiviseur = 0;
		for (int j = 0; j < ListPremier.size(); j++)
		{

			if (i % ListPremier[j] == 0 )
			{
				nbDiviseur++;
			}
			if (i % i == 0 && i != 1 && i != 2 && i != 3 && i != 5 && i != 7)
			{
				nbDiviseur++;
			}
		}
		if (nbDiviseur == 2)
		{
			cout << i << " est premier" << endl;
			ite = find(ListPremier.begin(), ListPremier.end(), i);
			if (ite != ListPremier.end()) 
			{//trouve le fonction find pls
				ListPremier.push_back(i);
			}
			else if(ite == ListPremier.end())
			{
				cout << "Nb déjà dans la liste" << endl;
			}
		}
		/* if (!(i % 2 == 0 || i % 3 == 0 || i % 5 == 0 || i % 7 == 0))
		 {

		   cout << i << "---" << endl;
		 }
		 else if(i == 2 || i == 3 || i==5 || i==7)
		 {
			 cout << i << "---" << endl;
		 }
		 */
	}
	//DEBUG
	for (int count = 0; count < ListPremier.size(); count++)
	{
		cout << "|" << ListPremier[count] << "|";
	}
}
