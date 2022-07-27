create database webDM;
use webDM;

create table clients (
    id int not null auto_increment primary key,
    email varchar(20) not null,
    password varchar(20) not null,
    unique(email)
);

create table bouquet (
    id int auto_increment primary key auto_increment not null,
    src text not null,
    titre text not null,
    discription text not null,
    disponible int not null,
    prix smallint not null
);


create table commande (
    id_client int not null,
    id_bouquet int not null,
    quantity int not null,
    prix int not null,
    date varchar(20) not null,
    status varchar(20) default "non traité",
    primary key (id_client, id_bouquet),
    foreign key (id_client) references clients(id),
    foreign
    key (id_bouquet) references bouquet(id)
    );


create table employers (
    id int not null auto_increment primary key,
    email varchar(20) not null,
    password varchar(20) not null,
    unique(email)
);   


create table bouquetperso (
    id_cmd int not null default 0,
    id_bouquet int not null,
    primary key (id_cmd, id_bouquet),
    foreign key (id_bouquet) references bouquet (id)
);

create table commandeperso (
    id_cmd int not null auto_increment primary key,
    prix int not null,
    id_client int not null,
    bqtprs int not null, 
    date varchar(20) not null,
    statue varchar(30) default "non traité",
    foreign key (id_client) references clients (id),
    foreign key (bqtprs) references bouquetperso (id_cmd)
);

insert into clients (email, password) values 
("massi@gmail.com", "mymanifiquewebsite"),
("farines@yahoo.com", "hello"),
("kouci@gmail.com", "reactnative");

insert into employers (email, password) values 
("emp@gmail.com", "getwork1");

insert into bouquet (id, src, titre, discription, disponible, prix) values
 (
    1,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.CHWXPTq0dzc-hRS83W-fAwHaHa%26pid%3DApi&f=1",
    "Rose fleur",
    "Bouquet roses et blanc est une jolie attention qui ne manquera pas de ravir son destinataire.",
    10,
    28 
), (
    2,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.F64M0pQwNr1N0_VnYgJvjgHaHa%26pid%3DApi&f=1",
    "Rose et vert",
    "Bouquet romantique avec roses et germinis dans les tons rouge et vert, et feuillages.",
    16,
    34
), (
    3,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AAQ_0pFTbmhUZfzutuJqRQHaHa%26pid%3DApi&f=1",
    "Monaraque",
    "Bouquet rond composé de roses et autres fleurettes dans les tons blanc et vert.",
    10,
    35
), (
    4,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.3ikF1gPu9k7-gsq0pi_f_QHaHa%26pid%3DApi&f=1",
    "Chrysanthèmes",
    "Composé de chrysanthèmes colorés accompagnera vos plus tendres pensées pour rendre un hommage chaleureux...",
    30,
    55
), (
    5,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.rW37QyzMdDJxLzUx_Tc6VQHaIV%26pid%3DApi&f=1",
    "Lavande",
     "Bouquet romantique avec roses et germinis dans les tons rouge et vert, et feuillages.",
    5,
    10
), (
    6,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.K-l4CXU7F3mlKAocL2gQhgHaHa%26pid%3DApi&f=1",
    "fleur sunshine",
    "Pétillant bouquet de roses blanches et fleurs aux tons jaunes",
    6,
    29
), (
    7,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zGQ99KNuiYAHXZ-z2NS84gHaHa%26pid%3DApi&f=1",
    "fleur tendresse",
    "Légèreté et tendresse pour ce bouquet aux tons blanc crème avec une jolie touche de rose.",
    10,
    19
), (
    8,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AAQ_0pFTbmhUZfzutuJqRQHaHa%26pid%3DApi&f=1",
    "monaraque",
    "jolie bouquet de fleur",
    2,
    11
), (
    9,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VIEfIRbkbqaP95-CoJL_3QHaFj%26pid%3DApi&f=1",
    "fleur de coton",
    "Bouquet fleur de coton, composition de roses rouges, gypsophile et fleurs de coton piquées dans une boite à chapeau.",
    22,
    29
), (
    10,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.MhgkzCYDaqpvAXbke4m3xAHaHa%26pid%3DApi&f=1",
    "Sucrerie",
    "Bouquet rond de fleurs variées avec de jolis germinis et de tendres roses dans les tons pâles.",
    18,
    55
), (
    11,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.OnzvzzmQjd64e97LCg-KXAHaE8%26pid%3DApi&f=1",
    "Jolie fleur",
    "Bouquet en une bonne et jolie fleur",
    19,
    10
), (
    12,
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SHQp11nPqkXIHYTfnnJX6wHaFJ%26pid%3DApi&f=1",
    "fleur bleu",
    "Joulie bouquet en une bonne et jolie fleur",
    2,
    8
);


