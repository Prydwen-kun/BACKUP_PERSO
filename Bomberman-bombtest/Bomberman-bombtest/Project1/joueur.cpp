    #include "joueur.h"
    #include "map.h"
    #include "bombe.h"
    #include <SFML/Graphics.hpp>
    #include <SFML/Window.hpp>
    #include <string>
    #include <sstream>
    #include <iostream>



    /** constructeur **/
    joueur::joueur(float posx,float posy,int num) :enVie(true),nbBomb(1),score(0),config(num),speed(0.1)
    {
    positionx=posx;
    positiony=posy;

    }


    /** methode **/
    bool joueur::estVivant() const
    {

    return enVie;
    }

    void joueur::seDeplacer(sf::Time elapsedtime,carte &carte1)/** NE PLUS TOUCHER A CE CODE >.< **/
    {

        float elapsedTime=elapsedtime.asMilliseconds();/**temps ecoule depuis la derniere frame**/

        /** JOUEUR 1 **/
        if(sf::Keyboard::isKeyPressed(sf::Keyboard::Z) && config==1 && carte1.collision(positionx,positiony,1)!=1) // Appui sur une touche du clavier
            {

        positiony-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::S) && config==1  && carte1.collision(positionx,positiony,2)!=1)
            {
        positiony+=speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Q) && config==1  && carte1.collision(positionx,positiony,3)!=1)
            {
        positionx-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::D) && config==1  && carte1.collision(positionx,positiony,4)!=1)
            {
        positionx+=speed*elapsedTime;
       //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
       /** JOUEUR 2 **/
        if(sf::Keyboard::isKeyPressed(sf::Keyboard::Up) && config==2  && carte1.collision(positionx,positiony,1)!=1) // Appui sur une touche du clavier
            {

        positiony-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;

            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Down) && config ==2  && carte1.collision(positionx,positiony,2)!=1)
            {
       positiony+=speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
       else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Left) && config==2  && carte1.collision(positionx,positiony,3)!=1)
            {
        positionx-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
       else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Right) && config==2 && carte1.collision(positionx,positiony,4)!=1)
            {
        positionx+=speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
         /** JOUEUR3 **/
         if(sf::Keyboard::isKeyPressed(sf::Keyboard::I) && config==3  && carte1.collision(positionx,positiony,1)!=1) // Appui sur une touche du clavier
            {

       positiony-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;

            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::K) && config ==3  && carte1.collision(positionx,positiony,2)!=1)
            {
        positiony+=speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::J) && config==3  && carte1.collision(positionx,positiony,3)!=1)
            {
        positionx-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
        else if(sf::Keyboard::isKeyPressed(sf::Keyboard::L) && config==3  && carte1.collision(positionx,positiony,4)!=1)
            {
        positionx+=speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;

            }
         /** JOUEUR4 **/
         if(sf::Keyboard::isKeyPressed(sf::Keyboard::Numpad8) && config==4  && carte1.collision(positionx,positiony,1)!=1) // Appui sur une touche du clavier
            {

       positiony-= speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;

            }
       else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Numpad5) && config ==4  && carte1.collision(positionx,positiony,2)!=1)
            {
        positiony+=speed*elapsedTime;
        //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
       else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Numpad4) && config==4  && carte1.collision(positionx,positiony,3)!=1)
            {
       positionx-= speed*elapsedTime;
       //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
        //enVie=false;
            }
       else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Numpad6) && config==4  && carte1.collision(positionx,positiony,4)!=1)
            {
        positionx+=speed*elapsedTime;
    //if(carte1.getCase(((positionx+20)/13),((positiony+20)/15))==3)
      //  enVie=false;
            }
        /**gestion de la retro collision**/
        if(carte1.collision(positionx,positiony,1)==1)
        positiony+=1;
        if(carte1.collision(positionx,positiony,2)==1)
        positiony-=1;
        if(carte1.collision(positionx,positiony,3)==1)
        positionx+=1;
        if(carte1.collision(positionx,positiony,4)==1)
        positionx-=1;

    }

    void joueur::poserBomb()
    {
    if(nbBomb>0)
    {
    nbBomb--;
    bomb bomb1()

    }

    }


    int joueur::getBomb() const
    {



    return nbBomb;
    }
/**pour recuperer la position des joueurs**/
    sf::Vector2f joueur::getposition() const
    {
    sf::Vector2f position(positionx,positiony);
    return position;

    }
/**pour les tuer je suppose :c**/
    void joueur::change_vie()
    {
    enVie=false;


    }

    int joueur::getScore() const
    {

    return score;
    }

    void joueur::change_score(sf::RenderWindow &window)/**creation des scores **/
    {
    sf::Text scor1;

    std::ostringstream ss;
    ss << "J";
    ss << config;
    ss << ":";
    ss << score;/**on transforme des int en string **/
    scor1.setString(ss.str());
    scor1.setCharacterSize(30);
    sf::Font font;
    if(!font.loadFromFile("font1.otf"))
    {std::cout <<std::endl <<"erreur de chargement";}
    scor1.setFont(font);
    scor1.setColor(sf::Color(255,255,255));
    switch(config)
    {
    case 1:
    scor1.setPosition(sf::Vector2f(10,850));
    break;
    case 2:
    scor1.setPosition(sf::Vector2f(190,850));/**les 4 scores des 4 joueurs**/
    break;
    case 3:
    scor1.setPosition(sf::Vector2f(390,850));
    break;
    case 4:
    scor1.setPosition(sf::Vector2f(590,850));
    break;
    }
    window.draw(scor1);

    }

void joueur::ajout_score()
{
score++;

}

float joueur::getpositionx() const
{
return positionx;
}
float joueur::getpositiony() const
{
return positiony;
}

void joueur::setSpeed(float multiple)
{
speed=speed*multiple;

}

void joueur::setPosition(float x,float y)
{
positionx=x;
positiony=y;
}

/**methode de set de skin pour le joueur**/

