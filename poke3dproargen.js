/**

 Elisherer's Pokedex 3D Pro AR Marker Generator

 Usage:
 	
 	poke3dproargen( canvasId, number, drawName )

 	canvasId - this is the 'id' attribute of the canvas element
 	number - this is the number of the pokemon as in the pokedex (i.e. 1-Bulbasaur)
 	drawName - this is a boolean specifiying if to draw the name at the bottom of the marker.

 Explaination:

	The ar marker is just a bit map with a parity check
	 _____ _____ _____ _____
	|     |     |     |     |
	| P02 | 256 |  32 |  4  |
	|_____|_____|_____|_____|
	|     |     |     |     |
	| P35 | 512 |  B  | 128 |
	|_____|_____|_____|_____|
	|     |#####|     |     |
	| P68 |# W #| 512 |  16 |
	|_____|#####|_____|_____|
	|     |     |     |     |
	|  1  |  8  |  64 |  2  |
	|_____|_____|_____|_____| * B is always Black and W is always White

	1. Convert the pokemon's number (minus 1) to 10 bits (i.e. 5 -> 5-1=4 -> 0000000100)
	2. Fill with white all the '1' bits on the map by the value of the bit
		* Notice that 512 has 2 cells to fill
	3. Calculate the parity and fill it accordingly.

 Parity check:
	P02 - is true if the amount of ones in bits[0,1,2] is even
	P35 - is true if the amount of ones in bits[3,4,5] is even
	P68 - is true if the amount of ones in bits[6,7,8] is even

**/

var constPos = [3,4];

var bitPos = [
	/* 1 */[2,5], /* 2 */[5,5], /* 4 */[5,2], /* 8 */[3,5], 
	/* 16*/[5,4], /* 32*/[4,2], /* 64*/[4,5], /*128*/[5,3], 
	/*256*/[3,2], /*512*/[4,4], /*512B*/[3,3]
];

var parityPos = [ [2,2], [2,3], [2,4] ];

function poke3dproargen(canvasId, number, drawName) {

	//get canvas and fill it black
	var canvas = document.getElementById(canvasId),
	 	context = canvas.getContext('2d'),
		recWidth = canvas.width * 0.125,
		recHeight = canvas.height * 0.125;
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'black';
	context.fillRect(recWidth, recHeight, recWidth * 6, recHeight * 6);
	context.fillStyle = 'white'; //prepare pen
	context.fillRect(constPos[0] * recWidth, constPos[1] * recHeight, recWidth, recHeight);

	var id = number - 1; //the code is zero based

	if (id < 0 || id >= 0x400) //check for valid values
		return;

	//split to bits
	var bits = id.toString(2), bit = 0;
	var parity = [true, true, true];
	while (bits.length != 0) {
		var lsb = bits.substr(bits.length - 1, 1);
		if (lsb == '1') {
			context.fillRect(bitPos[bit][0] * recWidth, bitPos[bit][1] * recHeight, recWidth, recHeight);
			if (bit == 9) // need to fill the other rectangle
				context.fillRect(bitPos[bit+1][0] * recWidth, bitPos[bit+1][1] * recHeight, recWidth, recHeight);			
			//parity check
			else
				parity[Math.floor(bit / 3)] = !parity[Math.floor(bit / 3)];
		}
		bits = bits.substr(0,bits.length-1); //cut the lsb
		bit += 1;
	}

	//draw the parity cells
	for (var i = 0; i < parity.length; i++)
		if (parity[i])
			context.fillRect(parityPos[i][0] * recWidth, parityPos[i][1] * recHeight, recWidth, recHeight);

	//find name
	var name = null;
	if (pokedex[id] || (id > 0x3DB && id < 0x400)) {
		name = pokedex[id] ? pokedex[id] : id < 0x3e8 ? "Copy" : "Random";
	}

	//draw name
	if (drawName && name != null) {
		context.textBaseline = 'top'; 
		context.textAlign = 'center';
		context.font = Math.floor(recHeight * 0.8) + 'px Arial';
		context.fillStyle = 'black';
		context.fillText(name, canvas.width * 0.5, recHeight * 7, recWidth * 6);
	}

	//put pokemon's info
	var txtName = document.getElementById('txtName');
	txtName.innerHTML = name || "N/A";

	var img = document.getElementById('imgPokemon');
	var numtxt = "" + number;
	if (numtxt.length == 1)
		numtxt = "00" + numtxt;
	else if (numtxt.length == 2)
		numtxt = "0" + numtxt;
	img.src = 'pokedb/' + numtxt +'.png'
}

var pokedex = [
	"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie",
	"Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow",
	"Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂",
	"Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish",
	"Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck",
	"Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop",
	"Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem",
	"Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer",
	"Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb",
	"Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing",
	"Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime",
	"Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon",
	"Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres",
	"Dratini","Dragonair","Dragonite","Mewtwo","Mew","Chikorita","Bayleef","Meganium","Cyndaquil","Quilava","Typhlosion",
	"Totodile","Croconaw","Feraligatr","Sentret","Furret","Hoothoot","Noctowl","Ledyba","Ledian","Spinarak","Ariados",
	"Crobat","Chinchou","Lanturn","Pichu","Cleffa","Igglybuff","Togepi","Togetic","Natu","Xatu","Mareep","Flaaffy",
	"Ampharos","Bellossom","Marill","Azumarill","Sudowoodo","Politoed","Hoppip","Skiploom","Jumpluff","Aipom","Sunkern",
	"Sunflora","Yanma","Wooper","Quagsire","Espeon","Umbreon","Murkrow","Slowking","Misdreavus","Unknown","Wobbuffet",
	"Girafarig","Pineco","Forretress","Dunsparce","Gligar","Steelix","Snubbull","Granbull","Qwilfish","Scizor","Shuckle",
	"Heracross","Sneasel","Teddiursa","Ursaring","Slugma","Magcargo","Swinub","Piloswine","Corsola","Remoraid","Octillery",
	"Delibird","Mantine","Skarmory","Houndour","Houndoom","Kingdra","Phanpy","Donphan","Porygon2","Stantler","Smeargle",
	"Tyrogue","Hitmontop","Smoochum","Elekid","Magby","Miltank","Blissey","Raikou","Entei","Suicune","Larvitar","Pupitar",
	"Tyranitar","Lugia","Ho-Oh","Celebi","Treecko","Grovyle","Sceptile","Torchic","Combusken","Blaziken","Mudkip","Marshtomp",
	"Swampert","Poochyena","Mightyena","Zigzagoon","Linoone","Wurmple","Silcoon","Beautifly","Cascoon","Dustox","Lotad",
	"Lombre","Ludicolo","Seedot","Nuzleaf","Shiftry","Taillow","Swellow","Wingull","Pelipper","Ralts","Kirlia","Gardevoir",
	"Surskit","Masquerain","Shroomish","Breloom","Slakoth","Vigoroth","Slaking","Nincada","Ninjask","Shedinja","Whismur",
	"Loudred","Exploud","Makuhita","Hariyama","Azurill","Nosepass","Skitty","Delcatty","Sableye","Mawile","Aron","Lairon",
	"Aggron","Meditite","Medicham","Electrike","Manectric","Plusle","Minun","Volbeat","Illumise","Roselia","Gulpin","Swalot",
	"Carvanha","Sharpedo","Wailmer","Wailord","Numel","Camerupt","Torkoal","Spoink","Grumpig","Spinda","Trapinch","Vibrava",
	"Flygon","Cacnea","Cacturne","Swablu","Altaria","Zangoose","Seviper","Lunatone","Solrock","Barboach","Whiscash","Corphish",
	"Crawdaunt","Baltoy","Claydol","Lileep","Cradily","Anorith","Armaldo","Feebas","Milotic","Castform","Kecleon","Shuppet",
	"Banette","Duskull","Dusclops","Tropius","Chimecho","Absol","Wynaut","Snorunt","Glalie","Spheal","Sealeo","Walrein",
	"Clamperl","Huntail","Gorebyss","Relicanth","Luvdisc","Bagon","Shelgon","Salamence","Beldum","Metang","Metagross",
	"Regirock","Regice","Registeel","Latias","Latios","Kyogre","Groudon","Rayquaza","Jirachi","Deoxys (Normal)","Turtwig",
	"Grotle","Torterra","Chimchar","Monferno","Infernape","Piplup","Prinplup","Empoleon","Starly","Staravia","Staraptor",
	"Bidoof","Bibarel","Kricketot","Kricketune","Shinx","Luxio","Luxray","Budew","Roserade","Cranidos","Rampardos","Shieldon",
	"Bastiodon","Burmy (Plant cloak)","Wormadam (Plant cloak)","Mothim","Combee","Vespiquen","Pachirisu","Buizel","Floatzel",
	"Cherubi","Cherrim (Overcast)","Shellos (West)","Gastrodon (West)","Ambipom","Drifloon","Drifblim","Buneary","Lopunny",
	"Mismagius","Honchkrow","Glameow","Purugly","Chingling","Stunky","Skuntank","Bronzor","Bronzong","Bonsly","Mime Jr.",
	"Happiny","Chatot","Spiritomb","Gible","Gabite","Garchomp","Munchlax","Riolu","Lucario","Hippopotas","Hippowdon",
	"Skorupi","Drapion","Croagunk","Toxicroak","Carnivine","Finneon","Lumineon","Mantyke","Snover","Abomasnow","Weavile",
	"Magnezone","Lickilicky","Rhyperior","Tangrowth","Electivire","Magmortar","Togekiss","Yanmega","Leafeon","Glaceon",
	"Gliscor","Mamoswine","Porygon-Z","Gallade","Probopass","Dusknoir","Froslass","Rotom","Uxie","Mesprit","Azelf","Dialga",
	"Palkia","Heatran","Regigigas","Giratina (Altered)","Cresselia","Phione","Manaphy","Darkrai","Shaymin (Land)",
	"Arceus (Normal)","Victini","Snivy","Servine","Serperior","Tepig","Pignite","Emboar","Oshawott","Dewott","Samurott",
	"Patrat","Watchog","Lillipup","Herdier","Stoutland","Purrloin","Liepard","Pansage","Simisage","Pansear","Simisear",
	"Panpour","Simipour","Munna","Musharna","Pidove","Tranquill","Unfezant♂","Blitzle","Zebstrika","Roggenrola","Boldore",
	"Gigalith","Woobat","Swoobat","Drilbur","Excadrill","Audino","Timburr","Gurdurr","Conkeldurr","Tympole","Palpitoad",
	"Seismitoad","Throh","Sawk","Sewaddle","Swadloon","Leavanny","Venipede","Whirlipede","Scolipede","Cottonee","Whimsicott",
	"Petilil","Lilligant","Basculin (Red stripe)","Sandile","Krokorok","Krookodile","Darumaka","Darmanitan","Maractus",
	"Dwebble","Crustle","Scraggy","Scrafty","Sigilyph","Yamask","Cofagrigus","Tirtouga","Carracosta","Archen","Archeops",
	"Trubbish","Garbodor","Zorua","Zoroark","Minccino","Cinccino","Gothita","Gothorita","Gothitelle","Solosis","Duosion",
	"Reuniclus","Ducklett","Swanna","Vanillite","Vanillish","Vanilluxe","Deerling (Spring)","Sawsbuck (Spring)","Emolga",
	"Karrablast","Escavalier","Foongus","Amoonguss","Frillish♂","Jellicent♂","Alomomola","Joltik","Galvantula","Ferroseed",
	"Ferrothorn","Klink","Klang","Klinklang","Tynamo","Eelektrik","Eelektross","Elgyem","Beheeyem","Litwick","Lampent",
	"Chandelure","Axew","Fraxure","Haxorus","Cubchoo","Beartic","Cryogonal","Shelmet","Accelgor","Stunfisk","Mienfoo",
	"Mienshao","Druddigon","Golett","Golurk","Pawniard","Bisharp","Bouffalant","Rufflet","Braviary","Vullaby","Mandibuzz",
	"Heatmor","Durant","Deino","Zweilous","Hydreigon","Larvesta","Volcarona","Cobalion","Terrakion","Virizion",
	"Tornadus (Incarnate)","Thundurus (Incarnate)","Reshiram","Zekrom","Landorus (Incarnate)","Kyurem","Keldeo",
	"Meloetta (Aria)","Genesect","Deoxys (Attack)","Deoxys (Defense)","Deoxys (Speed)","Wormadam (Sandy cloak)",
	"Wormadam (Trash cloak)","Shaymin (Sky)","Giratina (Origin)","Rotom (Heat)","Rotom (Wash)","Rotom (Frost)","Rotom (Fan)",
	"Rotom (Mow)","Castform (Sunny)","Castform (Rainy)","Castform (Snowy)","Burmy (Sandy cloak)","Burmy (Trash cloak)",
	"Cherrim (Sunshine)","Shellos (East)","Gastrodon (East)","Arceus (Fighting)","Arceus (Flying)","Arceus (Poison)",
	"Arceus (Ground)","Arceus (Rock)","Arceus (Bug)","Arceus (Ghost)","Arceus (Steel)","Arceus (Fire)","Arceus (Water)",
	"Arceus (Grass)","Arceus (Electric)","Arceus (Psychic)","Arceus (Ice)","Arceus (Dragon)","Arceus (Dark)","Unown (B)",
	"Unown (C)","Unown (D)","Unown (E)","Unown (F)","Unown (G)","Unown (H)","Unown (I)","Unown (J)",
	"Unown (K)","Unown (L)","Unown (M)","Unown (N)","Unown (O)","Unown (P)","Unown (Q)","Unown (R)",
	"Unown (S)","Unown (T)","Unown (U)","Unown (V)","Unown (W)","Unown (X)","Unown (Y)","Unown (Z)",
	"Unown (!)","Unown (?)","Basculin (Blue stripe)","Darmanitan (Zen Mode)","Deerling (Summer)","Deerling (Autumn)",
	"Deerling (Winter)","Sawsbuck (Summer)","Sawsbuck (Autumn)","Sawsbuck (Winter)","Meloetta (Pirouette)",
	"Genesect (Shock Drive)","Genesect (Burn Drive)","Genesect (Chill Drive)","Genesect (Douse Drive)","Unfezant♀",
	"Frillish♀","Jellicent♀","Kyurem (White)","Kyurem (Black)","Keldeo (Resolute)","Tornadus (Therian)",
	"Thundurus (Therian)","Landorus (Therian)"
];