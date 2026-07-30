# Banco de Dados

## User

 Campo  Tipo 
 id  UUID 
 name  String 
 email  String 
 password  String 


## Ad

 Campo  Tipo 

 id  UUID 
 title  String 
 description  String 
 category  String 
 condition  String 
 location  String 
 price  Decimal 
 imageUrl  String 
 isDonation  Boolean 
 userId  UUID 

## Relacionamento

User

Ad (1:N)