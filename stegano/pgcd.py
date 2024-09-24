def pgcd(q,p):
    if q%p ==0:
        return p
    else:
        return pgcd(p,q%p)
q=619
p=569
e=20
s=0
while s!=1:
    s=pgcd(e,(q-1)*(p-1))
    e=e+1
print(e)
