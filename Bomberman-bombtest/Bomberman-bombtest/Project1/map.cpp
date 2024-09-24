#include "map.h"
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <fstream>
#include <iostream>

using namespace std;

carte::carte(): nom("desolation")
{
zoom1=false;
std::ifstream fichier("desolation.WTF", ios::in );  /**déclaration du flux et ouverture du fichier**/

        if(fichier)  /**si l'ouverture a réussi**/
        {
            /** instructions **/
            for(int i=0;i<15;i++)
            {
            map_case[0][i]=10;
            }
            char content_case;
        fichier.seekg(0, ios::beg); /**on revient au debut **/
            for(int i=1;i<14;i++)
            {
                for(int j=0;j<15;j++)
                {
                fichier.get(content_case);/**on recupere le caractere numerique dans le fichier**/

                map_case[i][j]=content_case -48;/**on soustrait 48 pour le transformer en nombre**/
                cout << map_case[i][j];/**test de sortie pour deboguer**/

                }


            }

            /** on referme le fichier **/
                fichier.close();
        }
        else  // sinon
                cerr << "Erreur à l'ouverture !" << endl;

carte_0.create(650,750);
}

void carte::generer_map()
{
sf::Texture texture;

if (!texture.loadFromFile("TILESET.png"))/**on charge le tileset**/
    {
        std::cerr << "Echec lors du chargement de tileset.png" << std::endl;
    }

sf::Sprite sprite;
sprite.setTexture(texture);
for(int i=1;i<14;i++)
    {
        for(int j=0;j<15;j++)
        {
            switch(map_case[i][j])/**on associe chaque case au sprite correspondant dans le fichier**/
            {
            case 0:
                sprite.setTextureRect(sf::IntRect(  18,  102,  50, 50 ));
            break;
            case 1:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50));
            break;
            case 2:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50 ));
            break;
            case 3:
                sprite.setTextureRect(sf::IntRect(  180,  20,  50, 50 ));
            break;
            case 4:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50 ));
            break;
            case 5:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50 ));
            break;
            case 6:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50 ));
            break;
            case 7:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50 ));
            break;
            case 8:
                sprite.setTextureRect(sf::IntRect(  10,  10,  50, 50 ));
            break;
            }
        sprite.setPosition(sf::Vector2f((50)*(i-1),((50)*(j))));
        carte_0.draw(sprite);/**on etablit une texture de rendu generer a partir des tiles**/

        }
    }
carte_0.display();

}

void carte::affichermap(sf::RenderWindow &window)
{
sf::Sprite sprite3(carte_0.getTexture());/**on cree un sprite de la texture de rendu pour pouvoir l'afficher**/
window.draw(sprite3);
}


int carte::getCase(int x, int y) const
{


return map_case[x][y];
}

void carte::setZoom()
{
zoom1= !zoom1;
}

void carte::zoom(sf::View view2,sf::RenderWindow &window)/**si l'utilisateur a reduit la taille on etablie la vue predefinie**/
{
if(zoom1==true)
{
window.setView(view2);
}
else
{
window.setView(window.getDefaultView());
}

}

bool carte::collision(float x,float y,int direction)
{
int collision_o=0;
int case_x=((x)/50)+1;/**haut gauche**/
int case_y=(y)/50;
int case2_x=((x+40)/50)+1;/**bas droite**/
int case2_y=((y+40)/50);
int case3_x=((x+40)/50)+1;/**haut droite**/
int case3_y=((y)/50);
int case4_x=((x)/50)+1;/**bas gauche**/
int case4_y=(y+40)/50;
cout << case_x <<";"<< case_y << endl;
cout << x << ";"<< y << endl;
switch(direction)
{
case 1:/**HAUT**/
if(y<=50 && y>1 && x<=50)
{collision_o=0;}
else if(y<=1)
{collision_o=1;}
else if(map_case[case_x][case_y]==1 || map_case[case3_x][case3_y]==1)
{collision_o=1;}
    break;

case 2:/**BAS**/
if(y>=710)
{collision_o=1;}
else if( map_case[case2_x][case2_y]==1 || map_case[case4_x][case4_y]==1)
{collision_o=1;}
    break;

case 3:/**GAUCHE**/
if(x<=50 && x>1 && y>=610)
{collision_o=0;}
else if(x<=1)
{collision_o=1;}
else if(map_case[case_x][case_y]==1 || map_case[case4_x][case4_y]==1)
{collision_o=1;}
    break;

case 4:/**DROITE**/
if(x>=610)
{collision_o=1;}
else if(map_case[case2_x][case2_y]==1 || map_case[case3_x][case3_y]==1)
{collision_o=1;}
    break;

default:
collision_o=0;
break;
}
return collision_o;
}



