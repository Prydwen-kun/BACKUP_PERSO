    //Classe joueur
    #ifndef JOUEUR_H
    #define JOUEUR_H
    #include <SFML/Graphics.hpp>
    #include <SFML/Window.hpp>
    #include "map.h"

    class joueur
    {

    public :


    joueur(float posx,float posy,int num);
    //methode de classe

    void seDeplacer(sf::Time elapsedtime,carte &carte1);

    void setPosition(float x, float y);

    void poserBomb();

    void change_score(sf::RenderWindow &window);

    void change_vie();

    void ajout_score();

    void setSpeed(float multiple);

    //accesseur d'attribut
    bool estVivant() const;
    int getBomb() const;
    sf::Vector2f getposition() const;
    int getScore() const;
float getpositionx() const;
float getpositiony() const;

    protected:
    float positionx;
    float positiony;


    private :
    //attribut

    bool enVie;
    int nbBomb;
    int score;
    int config;
    float speed;

    };
#endif
