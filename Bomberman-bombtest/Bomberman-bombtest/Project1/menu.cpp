#include "menu.h"
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <iostream>
#include "map.h"

menu::menu()
{
enjeu=false;

}

bool menu::jeu() const
{

return enjeu;
}

void menu::afficher_menu(sf::RenderWindow &window,carte &carte1)
{
/**chargement de la police**/
sf::Font font;
if(!font.loadFromFile("font1.otf"))
{std::cout <<std::endl <<"erreur de chargement";}

/** TITRE BOMBERMAN **/
sf::Text titre;
titre.setFont(font);
titre.setString("Bomberman");
titre.setCharacterSize(80);
titre.setPosition(sf::Vector2f(210,50));
titre.setColor(sf::Color(255,155,20));

/**bouton nouvelle partie**/
sf::Text start;
start.setString("Nouvelle Partie");
start.setCharacterSize(40);
start.setFont(font);
start.setColor(sf::Color(255,0,100));
start.setPosition(sf::Vector2f(250,200));

/**gestion de l'interaction menu via souris/clavier**/
sf::Vector2i localpos; /**position locale de la souris**/
sf::RectangleShape carre(sf::Vector2f(185,50));
carre.setPosition(sf::Vector2f(250,200));
carre.setFillColor(sf::Color(0,155,155));
sf::FloatRect BB = carre.getGlobalBounds();
localpos=sf::Mouse::getPosition(window);
localpos=static_cast<sf::Vector2i>(window.mapPixelToCoords(localpos));/**CONVERSION DE COORDONNEE RELATIVE A LA VUE **/
if(sf::Keyboard::isKeyPressed(sf::Keyboard::Return))
{
enjeu=true;/**flag de demarrage**/
}
if(sf::Mouse::isButtonPressed(sf::Mouse::Left) && BB.contains(static_cast<sf::Vector2f>(localpos)))/**fonction tres pratique**/
{                                                                                                 /**pour les collisions**/
enjeu=true;
}

/**bouton quitter**/
sf::Text quitter;
quitter.setString("Quitter");
quitter.setCharacterSize(40);
quitter.setFont(font);
quitter.setColor(sf::Color(255,0,100));
quitter.setPosition(sf::Vector2f(290,790));
sf::RectangleShape carre2(sf::Vector2f(185,50));
carre2.setPosition(sf::Vector2f(250,790));
BB = carre2.getGlobalBounds();
if(sf::Mouse::isButtonPressed(sf::Mouse::Left) && BB.contains(static_cast<sf::Vector2f>(localpos)))
{
window.close();
}

/**bouton zoom**/
sf::Text zoom;
zoom.setFont(font);
zoom.setString("zoom");
zoom.setPosition(sf::Vector2f(0,0));
zoom.setCharacterSize(30);
zoom.setColor(sf::Color(0,0,0));
sf::RectangleShape carre3(sf::Vector2f(50,34));
carre3.setPosition(sf::Vector2f(0,0));
BB= carre3.getGlobalBounds();
if(sf::Mouse::isButtonPressed(sf::Mouse::Left) && BB.contains(static_cast<sf::Vector2f>(localpos)))
{
carte1.setZoom();
}

/**credit**/
sf::Text credit;
credit.setFont(font);
credit.setString(L"Dévellopeur : Van Iseghem Pierre || Loïck Peltier || Frappier Florent               Remerciement(musique) : MrX");
credit.setCharacterSize(18);
credit.setColor(sf::Color(255,255,255));
credit.setPosition(2,875);

window.clear();
window.draw(carre);
window.draw(carre2);
window.draw(carre3);
window.draw(start);
window.draw(quitter);
window.draw(titre);
window.draw(zoom);
window.draw(credit);
}
void menu::retour_menu()
{
enjeu= false;
}
