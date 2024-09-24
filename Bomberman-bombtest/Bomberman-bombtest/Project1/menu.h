#ifndef MENU_H
#define MENU_H
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include "map.h"


class menu
{
public:
menu();



void afficher_menu(sf::RenderWindow &window,carte &carte1);
void retour_menu();


bool jeu() const;



private:
bool enjeu;



};
#endif
