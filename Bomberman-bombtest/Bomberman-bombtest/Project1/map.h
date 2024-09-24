//classe carte

#ifndef MAP_H
#define MAP_H
    #include <SFML/Graphics.hpp>
    #include <SFML/Window.hpp>
    #include <string>

    class carte
    {
    public: //methode
    carte();//constructeur

    void generer_map();
    void affichermap(sf::RenderWindow &window);
    void zoom(sf::View view2,sf::RenderWindow &window);
    void setZoom();
    bool collision(float x,float y,int direction);
    //accesseur
    int getCase(int x, int y) const;//pour acceder a la structure de la map


    private : //attribut


    int map_case[14][15];
    sf::RenderTexture carte_0;
    bool zoom1;
    std::string nom;
    };
#endif // MAP_H
