#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include "bombe.h"
#include "map.h"
#include "joueur.h"

bomb::bomb(joueur &Joueur)
{
portee=3;
timer=3;
explode=false;
impact=false;
posBomb=Joueur.getposition();
HAUT=
}

void bomb::afficherBombe(sf::Window &window)
{
sf::RectangleShape bombe(sf::Vector2f(20,20));
bombe.setPosition(posBomb);
bombe.setFillColor(sf::Color(0,0,0));
window.draw(bombe);
}

void bomb::TimerBomb(int tempSeconde)
{
if(tempSeconde>=1)
{timer--;}

}

void bomb::explosion(joueur &joueur1,joueur &joueur2, joueur &joueur3, joueur &joueur4)
{
if(timer<=0)
{
explode=true;
if()
{

}
}


}

void bomb::tuerJoueur(joueur &joueur1,carte &carte1)
{
if(impact==true)
{joueur1.change_vie();}

}
