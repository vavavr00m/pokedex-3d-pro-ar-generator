var p3c=[3,4],p3b=[[2,5],[5,5],[5,2],[3,5],[5,4],[4,2],[4,5],[5,3],[3,2],[4,4],[3,3]],p3p=[[2,2],[2,3],[2,4]];
function poke3dproargen(f,e,i){var f=document.getElementById(f),a=f.getContext("2d"),c=0.125*f.width,b=0.125*f.height;a.fillStyle="white";a.fillRect(0,0,f.width,f.height);a.fillStyle="black";a.fillRect(c,b,6*c,6*b);a.fillStyle="white";a.fillRect(p3c[0]*c,p3c[1]*b,c,b);e-=1;if(!(0>e||1024<=e)){for(var d=e.toString(2),g=0,h=[!0,!0,!0];0!=d.length;)"1"==d.substr(d.length-1,1)&&(a.fillRect(p3b[g][0]*c,p3b[g][1]*b,c,b),9==g?a.fillRect(p3b[g+1][0]*c,p3b[g+1][1]*b,c,b):h[Math.floor(g/
3)]=!h[Math.floor(g/3)]),d=d.substr(0,d.length-1),g+=1;for(d=0;d<h.length;d++)h[d]&&a.fillRect(p3p[d][0]*c,p3p[d][1]*b,c,b);if(i&&(pokedex[e]||987<e&&1024>e))a.textBaseline="top",a.textAlign="center",a.font=Math.floor(0.8*b)+"px Arial",a.fillStyle="black",pokedex[e]?a.fillText(pokedex[e],0.5*f.width,7*b,6*c):1000>e?a.fillText("Copy",0.5*f.width,7*b,6*c):a.fillText("Random",0.5*f.width,7*b,6*c)}}var pokedex="Bulbasaur;Ivysaur;Venusaur;Charmander;Charmeleon;Charizard;Squirtle;Wartortle;Blastoise;Caterpie;Metapod;Butterfree;Weedle;Kakuna;Beedrill;Pidgey;Pidgeotto;Pidgeot;Rattata;Raticate;Spearow;Fearow;Ekans;Arbok;Pikachu;Raichu;Sandshrew;Sandslash;Nidoran\u2640;Nidorina;Nidoqueen;Nidoran\u2642;Nidorino;Nidoking;Clefairy;Clefable;Vulpix;Ninetales;Jigglypuff;Wigglytuff;Zubat;Golbat;Oddish;Gloom;Vileplume;Paras;Parasect;Venonat;Venomoth;Diglett;Dugtrio;Meowth;Persian;Psyduck;Golduck;Mankey;Primeape;Growlithe;Arcanine;Poliwag;Poliwhirl;Poliwrath;Abra;Kadabra;Alakazam;Machop;Machoke;Machamp;Bellsprout;Weepinbell;Victreebel;Tentacool;Tentacruel;Geodude;Graveler;Golem;Ponyta;Rapidash;Slowpoke;Slowbro;Magnemite;Magneton;Farfetch'd;Doduo;Dodrio;Seel;Dewgong;Grimer;Muk;Shellder;Cloyster;Gastly;Haunter;Gengar;Onix;Drowzee;Hypno;Krabby;Kingler;Voltorb;Electrode;Exeggcute;Exeggutor;Cubone;Marowak;Hitmonlee;Hitmonchan;Lickitung;Koffing;Weezing;Rhyhorn;Rhydon;Chansey;Tangela;Kangaskhan;Horsea;Seadra;Goldeen;Seaking;Staryu;Starmie;Mr. Mime;Scyther;Jynx;Electabuzz;Magmar;Pinsir;Tauros;Magikarp;Gyarados;Lapras;Ditto;Eevee;Vaporeon;Jolteon;Flareon;Porygon;Omanyte;Omastar;Kabuto;Kabutops;Aerodactyl;Snorlax;Articuno;Zapdos;Moltres;Dratini;Dragonair;Dragonite;Mewtwo;Mew;Chikorita;Bayleef;Meganium;Cyndaquil;Quilava;Typhlosion;Totodile;Croconaw;Feraligatr;Sentret;Furret;Hoothoot;Noctowl;Ledyba;Ledian;Spinarak;Ariados;Crobat;Chinchou;Lanturn;Pichu;Cleffa;Igglybuff;Togepi;Togetic;Natu;Xatu;Mareep;Flaaffy;Ampharos;Bellossom;Marill;Azumarill;Sudowoodo;Politoed;Hoppip;Skiploom;Jumpluff;Aipom;Sunkern;Sunflora;Yanma;Wooper;Quagsire;Espeon;Umbreon;Murkrow;Slowking;Misdreavus;Unknown;Wobbuffet;Girafarig;Pineco;Forretress;Dunsparce;Gligar;Steelix;Snubbull;Granbull;Qwilfish;Scizor;Shuckle;Heracross;Sneasel;Teddiursa;Ursaring;Slugma;Magcargo;Swinub;Piloswine;Corsola;Remoraid;Octillery;Delibird;Mantine;Skarmory;Houndour;Houndoom;Kingdra;Phanpy;Donphan;Porygon2;Stantler;Smeargle;Tyrogue;Hitmontop;Smoochum;Elekid;Magby;Miltank;Blissey;Raikou;Entei;Suicune;Larvitar;Pupitar;Tyranitar;Lugia;Ho-Oh;Celebi;Treecko;Grovyle;Sceptile;Torchic;Combusken;Blaziken;Mudkip;Marshtomp;Swampert;Poochyena;Mightyena;Zigzagoon;Linoone;Wurmple;Silcoon;Beautifly;Cascoon;Dustox;Lotad;Lombre;Ludicolo;Seedot;Nuzleaf;Shiftry;Taillow;Swellow;Wingull;Pelipper;Ralts;Kirlia;Gardevoir;Surskit;Masquerain;Shroomish;Breloom;Slakoth;Vigoroth;Slaking;Nincada;Ninjask;Shedinja;Whismur;Loudred;Exploud;Makuhita;Hariyama;Azurill;Nosepass;Skitty;Delcatty;Sableye;Mawile;Aron;Lairon;Aggron;Meditite;Medicham;Electrike;Manectric;Plusle;Minun;Volbeat;Illumise;Roselia;Gulpin;Swalot;Carvanha;Sharpedo;Wailmer;Wailord;Numel;Camerupt;Torkoal;Spoink;Grumpig;Spinda;Trapinch;Vibrava;Flygon;Cacnea;Cacturne;Swablu;Altaria;Zangoose;Seviper;Lunatone;Solrock;Barboach;Whiscash;Corphish;Crawdaunt;Baltoy;Claydol;Lileep;Cradily;Anorith;Armaldo;Feebas;Milotic;Castform;Kecleon;Shuppet;Banette;Duskull;Dusclops;Tropius;Chimecho;Absol;Wynaut;Snorunt;Glalie;Spheal;Sealeo;Walrein;Clamperl;Huntail;Gorebyss;Relicanth;Luvdisc;Bagon;Shelgon;Salamence;Beldum;Metang;Metagross;Regirock;Regice;Registeel;Latias;Latios;Kyogre;Groudon;Rayquaza;Jirachi;Deoxys (Normal);Turtwig;Grotle;Torterra;Chimchar;Monferno;Infernape;Piplup;Prinplup;Empoleon;Starly;Staravia;Staraptor;Bidoof;Bibarel;Kricketot;Kricketune;Shinx;Luxio;Luxray;Budew;Roserade;Cranidos;Rampardos;Shieldon;Bastiodon;Burmy (Plant cloak);Wormadam (Plant cloak);Mothim;Combee;Vespiquen;Pachirisu;Buizel;Floatzel;Cherubi;Cherrim (Overcast);Shellos (West);Gastrodon (West);Ambipom;Drifloon;Drifblim;Buneary;Lopunny;Mismagius;Honchkrow;Glameow;Purugly;Chingling;Stunky;Skuntank;Bronzor;Bronzong;Bonsly;Mime Jr.;Happiny;Chatot;Spiritomb;Gible;Gabite;Garchomp;Munchlax;Riolu;Lucario;Hippopotas;Hippowdon;Skorupi;Drapion;Croagunk;Toxicroak;Carnivine;Finneon;Lumineon;Mantyke;Snover;Abomasnow;Weavile;Magnezone;Lickilicky;Rhyperior;Tangrowth;Electivire;Magmortar;Togekiss;Yanmega;Leafeon;Glaceon;Gliscor;Mamoswine;Porygon-Z;Gallade;Probopass;Dusknoir;Froslass;Rotom;Uxie;Mesprit;Azelf;Dialga;Palkia;Heatran;Regigigas;Giratina (Altered);Cresselia;Phione;Manaphy;Darkrai;Shaymin (Land);Arceus (Normal);Victini;Snivy;Servine;Serperior;Tepig;Pignite;Emboar;Oshawott;Dewott;Samurott;Patrat;Watchog;Lillipup;Herdier;Stoutland;Purrloin;Liepard;Pansage;Simisage;Pansear;Simisear;Panpour;Simipour;Munna;Musharna;Pidove;Tranquill;Unfezant\u2642;Blitzle;Zebstrika;Roggenrola;Boldore;Gigalith;Woobat;Swoobat;Drilbur;Excadrill;Audino;Timburr;Gurdurr;Conkeldurr;Tympole;Palpitoad;Seismitoad;Throh;Sawk;Sewaddle;Swadloon;Leavanny;Venipede;Whirlipede;Scolipede;Cottonee;Whimsicott;Petilil;Lilligant;Basculin (Red stripe);Sandile;Krokorok;Krookodile;Darumaka;Darmanitan;Maractus;Dwebble;Crustle;Scraggy;Scrafty;Sigilyph;Yamask;Cofagrigus;Tirtouga;Carracosta;Archen;Archeops;Trubbish;Garbodor;Zorua;Zoroark;Minccino;Cinccino;Gothita;Gothorita;Gothitelle;Solosis;Duosion;Reuniclus;Ducklett;Swanna;Vanillite;Vanillish;Vanilluxe;Deerling (Spring);Sawsbuck (Spring);Emolga;Karrablast;Escavalier;Foongus;Amoonguss;Frillish\u2642;Jellicent\u2642;Alomomola;Joltik;Galvantula;Ferroseed;Ferrothorn;Klink;Klang;Klinklang;Tynamo;Eelektrik;Eelektross;Elgyem;Beheeyem;Litwick;Lampent;Chandelure;Axew;Fraxure;Haxorus;Cubchoo;Beartic;Cryogonal;Shelmet;Accelgor;Stunfisk;Mienfoo;Mienshao;Druddigon;Golett;Golurk;Pawniard;Bisharp;Bouffalant;Rufflet;Braviary;Vullaby;Mandibuzz;Heatmor;Durant;Deino;Zweilous;Hydreigon;Larvesta;Volcarona;Cobalion;Terrakion;Virizion;Tornadus (Incarnate);Thundurus (Incarnate);Reshiram;Zekrom;Landorus (Incarnate);Kyurem;Keldeo;Meloetta (Aria);Genesect;Deoxys (Attack);Deoxys (Defense);Deoxys (Speed);Wormadam (Sandy cloak);Wormadam (Trash cloak);Shaymin (Sky);Giratina (Origin);Rotom (Heat);Rotom (Wash);Rotom (Frost);Rotom (Fan);Rotom (Mow);Castform (Sunny);Castform (Rainy);Castform (Snowy);Burmy (Sandy cloak);Burmy (Trash cloak);Cherrim (Sunshine);Shellos (East);Gastrodon (East);Arceus (Fighting);Arceus (Flying);Arceus (Poison);Arceus (Ground);Arceus (Rock);Arceus (Bug);Arceus (Ghost);Arceus (Steel);Arceus (Fire);Arceus (Water);Arceus (Grass);Arceus (Electric);Arceus (Psychic);Arceus (Ice);Arceus (Dragon);Arceus (Dark);Unown (B);Unown (C);Unown (D);Unown (E);Unown (F);Unown (G);Unown (H);Unown (I);Unown (J);Unown (K);Unown (L);Unown (M);Unown (N);Unown (O);Unown (P);Unown (Q);Unown (R);Unown (S);Unown (T);Unown (U);Unown (V);Unown (W);Unown (X);Unown (Y);Unown (Z);Unown (!);Unown (?);Basculin (Blue stripe);Darmanitan (Zen Mode);Deerling (Summer);Deerling (Autumn);Deerling (Winter);Sawsbuck (Summer);Sawsbuck (Autumn);Sawsbuck (Winter);Meloetta (Pirouette);Genesect (Shock Drive);Genesect (Burn Drive);Genesect (Chill Drive);Genesect (Douse Drive);Unfezant\u2640;Frillish\u2640;Jellicent\u2640;Kyurem (White);Kyurem (Black);Keldeo (Resolute);Tornadus (Therian);Thundurus (Therian);Landorus (Therian)".split(";");