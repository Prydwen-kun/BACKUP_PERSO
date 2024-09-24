    #include <SFML/Graphics.hpp>
    #include <SFML/Window.hpp>
    #include "joueur.h"
    #include "map.h"
    #include "menu.h"
    #include "bombe.h"
    #include <fstream>
    #include <iostream>
    #include <string>
    #include <sstream>

    using namespace sf;

    int main()
    {
        sf::ContextSettings settings;
        settings.antialiasingLevel = 16;
        settings.depthBits = 32;
        RenderWindow window(VideoMode(650, 900, 32), "Bomberman premium edition");
        window.setFramerateLimit(60);
        window.setMouseCursorVisible(false);

/** creation du menu **/
        menu menu1;
/**declaration de la map**/
        carte carte1;
        carte1.generer_map();
/**declaration des joueurs**/
        joueur joueur1(0,0,1);
        RectangleShape carre(Vector2f(40,40));
        carre.setPosition(joueur1.getposition());
        carre.setFillColor(Color(255,75,0));

        joueur joueur2(610,0,2);
        Vector2f positionj2=joueur2.getposition();
        RectangleShape carre2(Vector2f(40,40));
        carre2.setPosition(joueur2.getposition());
        carre2.setFillColor(Color(0,50,155));

        joueur joueur3(0,710,3);
        RectangleShape carre3(Vector2f(40,40));
        carre3.setPosition(joueur3.getposition());
        carre3.setFillColor(Color(0,155,155));

        joueur joueur4(610,710,4);
        RectangleShape carre4(Vector2f(40,40));
        carre4.setPosition(joueur4.getposition());
        carre4.setFillColor(Color(155,55,155));
/**declaration des bombes**/


/**creation d'un curseur perso**/
        Texture texture_cursor;
        Sprite curseur;
        Vector2i localpos;
        curseur.setOrigin(9,9);
        if (!texture_cursor.loadFromFile("pointeur.gif"))/**on charge le tileset**/
    {
        std::cerr << "Echec lors du chargement de pointeur.gif" << std::endl;
    }
        curseur.setTexture(texture_cursor);
        curseur.scale(Vector2f(1.5,1.5));

/**on gere la vue**/
        View view1(FloatRect(0,0,650,900));
        view1.zoom(1.75);

/**on gere le temps**/
        Clock clock;
        Time time; /** temps ecoule **/


/**TIMER GRAPHIQUE**/
    Text timer;
    int nbSeconde(100); /**temps de jeu a discuter ?**/
    int nbMilliseconde(0);
    std::ostringstream ss;
    timer.setString(ss.str());
    timer.setCharacterSize(30);
    Font font;
    if(!font.loadFromFile("font1.otf"))
    {std::cout << std::endl << "erreur de chargement";}
    timer.setFont(font);
    timer.setColor(sf::Color(255,255,255));
    timer.setPosition(Vector2f(290,790));

        while (window.isOpen())
        {
            if( menu1.jeu()==false) /**on gere le menu **/
            {
            /**declaration de la MAP en fonction de la taille via appui sur un bouton dans le menu
            type -> carte carte1(fonction_menu()); dans carte si test fonction_menu true choix de la map en consequence de meme que pour le TIMER**/
            menu1.afficher_menu(window,carte1);
            carte1.zoom(view1,window);
            localpos=sf::Mouse::getPosition(window);
            localpos=static_cast<sf::Vector2i>(window.mapPixelToCoords(localpos));
            curseur.setPosition(static_cast<Vector2f>(localpos));
            window.draw(curseur);
            }
            else if( menu1.jeu()==true) /** sinon si 'en jeu' on est en jeu **/
            {

                    time=clock.getElapsedTime();
                    nbMilliseconde+=time.asMilliseconds();/**on gere tout le timer et temps ecoulé**/
                    if(nbMilliseconde>=1000)
                    {
                        if(nbSeconde>0)
                        {
                        nbSeconde--;
                        }
                    nbMilliseconde=0;
                    }



                    if (Keyboard::isKeyPressed(Keyboard::Escape))
                        {
                            menu1.retour_menu();
                        }


                        joueur1.seDeplacer(time,carte1);/**on actualise toutes les positions**/
                        joueur2.seDeplacer(time,carte1);
                        joueur3.seDeplacer(time,carte1);
                        joueur4.seDeplacer(time,carte1);
                        carre.setPosition(joueur1.getposition());
                        carre2.setPosition(joueur2.getposition());
                        carre3.setPosition(joueur3.getposition());
                        carre4.setPosition(joueur4.getposition());
                        ss << "Timer:";
                        ss << nbSeconde;
                        timer.setString(ss.str());
                        ss.str("");/**on vide le stream pour pouvoir le reutiliser**/

    clock.restart();/**remise a zero du temps ecoule**/

            window.clear();
           carte1.affichermap(window);/**on dessine tout**/
            if(joueur1.estVivant())
            window.draw(carre);
            if(joueur2.estVivant())
            window.draw(carre2);
            if(joueur3.estVivant())
            window.draw(carre3);
            if(joueur4.estVivant())
            window.draw(carre4);

            joueur1.change_score(window);
            joueur2.change_score(window);
            joueur3.change_score(window);
            joueur4.change_score(window);
            window.draw(timer);
            }
            window.display();/**on affiche le tout ,rendu map plus joueur**/
        }
    return 42;
    }
