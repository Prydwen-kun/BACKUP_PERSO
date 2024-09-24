#ifndef BOMB_H
#define BOMB_H
#include "map.h"
#include "joueur.h"
#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>

class bomb
{
public:
bomb(joueur &Joueur);

void afficherBombe(sf::Window &window);

void TimerBomb(int tempSeconde);

void explosion();

void tuerJoueur(joueur &joueur1,carte &carte1);

private:
int portee;
sf::Vector2f posBomb;
sf::FloatRect HAUT;
sf::FloatRect BAS;
sf::FloatRect GAUCHE;
sf::FloatRect DROITE;
int timer;
bool explode;
bool impact;
};
#endif
/** rajouter un flag d'explosion pour faire disparaitre la bombe**/
