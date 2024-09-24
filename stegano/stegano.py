from tkinter import *   ###BIBLIOTHEQUE POUR GUI###
import tkinter.messagebox  ###POUR LA BOITE DE DIALOGUE
import tkinter.filedialog  ###POUR LE CHOIX DES FICHIERS
from PIL import ImageTk   ###POUR LES IMAGES

###DEFINITION DES FONCTIONS DIVERSES###

def ouvrir():
    imagestegano.delete(ALL) # on efface la zone graphique

    filename = tkinter.filedialog.askopenfilename(title="Ouvrir une image",filetypes=[('gif files','.gif'),('all files','.*')])
    print(filename)#pour le debug
    photo= ImageTk.PhotoImage(file=filename)  
    dico[filename] = photo  # référence
    print(dico)#pareil    
    imagestegano.create_image((photo.width())/2,(photo.height())/2,image=photo)
    imagestegano.config(height=photo.height(),width=photo.width())
    
def fermer():
    imagestegano.delete(ALL)

def lien():
    import os
    os.startfile('stegano.html')

def afficher(event):
    p=3
    q=11
    n=p*q
    e=3
    chaine=inpu1.get()
    chaine2=[]
    chaine3=[]
    chaine4=[]
    somm=0
    
    for i in chaine:
        chaine2.append(ord(i))#on transforme en ASCII
    print(chaine2)    
    for j in chaine2:
        somm=j**e
        somm=(somm%n)
        chaine3.append(somm)
    print(chaine3)
    for k in chaine3:
        chaine4.append(chr(k))#on repasse en caractere normaux
    label1.configure(text=chaine4)
    
###CREATION DE LA FENETRE###
    
fen1 = Tk()#instance de la fenetre
fen1.title('Stéganographie')#titre
fen1.geometry("1260x600")
back=ImageTk.PhotoImage(file="matrix.jpeg")#background
backa=Canvas(fen1)
backa.grid(row=1,column=1,rowspan=5,columnspan=5)
backa.create_image((back.width())/2,(back.height())/2,image=back)
backa.config(height=back.height(),width=back.width())
###CREATION DES LABEL DE TEXTES ET DES ZONES D'ENTREE DE TEXTES###

text2 = Label(fen1, text='Entrer le message à coder :', fg='black')#encore
text2.grid(row=1,column=1)
text2.config(bg='green')

inpu1 = Entry(fen1)#pour rentrer un texte
inpu1.grid(row=1,column=2,padx=5)
inpu1.bind("<Return>",afficher)#on gere l'event "return" donc ->entree



label1= Label(fen1,text='_  _  _',fg='yellow',background='green')#zone d'affichage pour texte
label1.grid(row=2,column=2,padx=5,rowspan=1)
label2 = Label(fen1,text='Message codé:',fg='black',background='green')
label2.grid(row=2,column=1)

###CREATION DU CANVAS###

imagestegano = Canvas(fen1)#canvas principal du programme(zone d'image)
imagestegano.grid(row=1,column=3,rowspan=5)

listbut1=Checkbutton(fen1,text='Décoder',bg='green')
listbut1.grid(row=3,column=1)

dico={}###CREATION D'UN DICTIONNAIRE DE REFERENCES POUR LES IMAGE DEJA OUVERTES###

###CREATION DU MENU ET DES SOUS-MENU DEROULANTS###

menu1= Menu(fen1)
menu2=Menu(menu1,tearoff=0)
menu2.add_command(label="Ouvrir une image",command=ouvrir )
menu2.add_command(label="Fermer",command=fermer)
menu2.add_command(label="Quitter",command=fen1.destroy)
menu3=Menu(menu1,tearoff=0)
menu3.add_command(label="À propos de...",command=lien )
menu1.add_cascade(label="Fichier",menu=menu2)
menu1.add_cascade(label="Infos",menu=menu3)
fen1.config(menu=menu1)

fen1.mainloop()###BOUCLE PRINCIPALE###
