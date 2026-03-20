export const splitsingClausules = [
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 1',
    naam: 'Omschrijving gebouw',
    categorie: 'Algemeen',
    tekst_template: `Het gebouw, plaatselijk bekend te {{adres}}, kadastraal bekend gemeente Amsterdam, {{kadastrale_aanduiding}}, wordt gesplitst in appartementsrechten overeenkomstig het bepaalde in artikel 5:106 van het Burgerlijk Wetboek.

Het gebouw is oorspronkelijk gebouwd in {{bouwjaar}} en omvat {{aantal_appartementen}} appartementen.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 1,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 2',
    naam: 'Eigenaar en titel',
    categorie: 'Algemeen',
    tekst_template: `De eigenaar van het te splitsen registergoed is {{eigenaar}}. De eigendom is verkregen door middel van een akte van levering, ingeschreven ten kantore van de Dienst voor het kadaster en de openbare registers.

De eigenaar verklaart bevoegd te zijn tot splitsing over te gaan en dat het registergoed vrij is van beslagen.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 2,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 3',
    naam: 'Splitsing in appartementsrechten',
    categorie: 'Splitsing',
    tekst_template: `Het gebouw wordt gesplitst in {{aantal_appartementen}} appartementsrechten, elk rechtgevend op het uitsluitend gebruik van een privégedeelte met de daarbij behorende berging, alsmede op het medegebruik van de gemeenschappelijke gedeelten en gemeenschappelijke zaken.

De splitsing geschiedt overeenkomstig de aan deze akte gehechte splitsingstekening, vervaardigd door een beëdigd landmeter, welke tekening deel uitmaakt van deze akte.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 3,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 4',
    naam: 'Breukdelen',
    categorie: 'Splitsing',
    tekst_template: `Aan ieder appartementsrecht is een breukdeel in de gemeenschap verbonden, vastgesteld op basis van de vloeroppervlakte van het betreffende privégedeelte ten opzichte van de totale vloeroppervlakte van alle privégedeelten.

De breukdelen zijn bepalend voor het aandeel van iedere appartementseigenaar in de gemeenschappelijke kosten en lasten, alsmede voor het stemrecht in de vergadering van eigenaars.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 4,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 5',
    naam: 'Gemeenschappelijke gedeelten',
    categorie: 'Gemeenschappelijk',
    tekst_template: `Tot de gemeenschappelijke gedeelten worden gerekend:
a) de funderingen, de dragende muren en kolommen, het dak en de dakbedekking;
b) de gevels, inclusief kozijnen, ramen en buitendeuren;
c) het trappenhuis, de gangen en overloop;
d) de leidingen en installaties voor water, gas, elektriciteit en riolering, voor zover deze niet uitsluitend een privégedeelte bedienen;
e) de gemeenschappelijke tuin en/of binnenplaats, indien aanwezig.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 5,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 6',
    naam: 'Privégedeelten',
    categorie: 'Gemeenschappelijk',
    tekst_template: `Tot de privégedeelten worden gerekend de afzonderlijke woningen met de daarbinnen gelegen niet-dragende wanden, vloeren (met uitzondering van de draagvloer), sanitaire voorzieningen, keukeninstallatie en overige voorzieningen die uitsluitend ten dienste van het betreffende privégedeelte staan.

De eigenaar van een privégedeelte draagt zorg voor het onderhoud van zijn privégedeelte.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 6,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 7',
    naam: 'Oprichting VvE',
    categorie: 'VvE',
    tekst_template: `Door de inschrijving van deze akte ontstaat van rechtswege de Vereniging van Eigenaars, genaamd "{{vve_naam}}", gevestigd te Amsterdam.

De vereniging heeft ten doel het behartigen van de gemeenschappelijke belangen van de appartementseigenaars, in het bijzonder door het voeren van beheer over de gemeenschappelijke gedeelten en zaken.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 7,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 8',
    naam: 'Vergadering van eigenaars',
    categorie: 'VvE',
    tekst_template: `De vergadering van eigenaars wordt ten minste eenmaal per jaar gehouden. De voorzitter roept de vergadering bijeen met inachtneming van een termijn van veertien dagen.

Besluiten worden genomen bij volstrekte meerderheid van de uitgebrachte stemmen, tenzij in deze akte of het reglement een gekwalificeerde meerderheid is voorgeschreven. Ieder appartementsrecht geeft recht op een aantal stemmen naar rato van het breukdeel.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 8,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 9',
    naam: 'Bestuur VvE',
    categorie: 'VvE',
    tekst_template: `Het bestuur van de vereniging wordt gevormd door een of meer bestuurders, benoemd door de vergadering van eigenaars. Het bestuur voert de besluiten van de vergadering uit en is belast met het dagelijks beheer van het gebouw.

De vergadering kan besluiten het beheer geheel of gedeeltelijk op te dragen aan een professionele beheerder.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 9,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 10',
    naam: 'Reservefonds',
    categorie: 'Financieel',
    tekst_template: `De vereniging houdt een reservefonds aan ter bestrijding van andere dan de gewone jaarlijkse kosten, waaronder groot onderhoud en onvoorziene uitgaven. De jaarlijkse dotatie aan het reservefonds wordt vastgesteld door de vergadering van eigenaars op basis van een meerjarenonderhoudsplan.

Het reservefonds dient op een afzonderlijke bankrekening ten name van de vereniging te worden aangehouden.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 10,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 11',
    naam: 'Servicekosten',
    categorie: 'Financieel',
    tekst_template: `Iedere appartementseigenaar is verplicht maandelijks bij vooruitbetaling zijn aandeel in de gezamenlijke kosten te voldoen. De maandelijkse bijdrage wordt jaarlijks vastgesteld door de vergadering van eigenaars.

Bij niet-tijdige betaling is de eigenaar van rechtswege in verzuim en is hij wettelijke rente verschuldigd over het openstaande bedrag.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 11,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 12',
    naam: 'Erfpachtbepaling',
    categorie: 'Erfpacht',
    tekst_template: `Het te splitsen registergoed is belast met het recht van erfpacht van de gemeente Amsterdam. Op het erfpachtrecht zijn van toepassing de Algemene Bepalingen voor voortdurende erfpacht.

Na splitsing rust het recht van erfpacht op ieder afzonderlijk appartementsrecht. De canon wordt verdeeld over de appartementsrechten naar rato van de breukdelen.`,
    trigger_conditie: '{"erfpacht":true}',
    type: 'conditioneel',
    volgorde: 12,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 13',
    naam: 'Gebruik privégedeelten',
    categorie: 'Gebruik',
    tekst_template: `De privégedeelten zijn bestemd om te worden gebruikt als woning. Het is niet toegestaan de privégedeelten te gebruiken als bedrijfsruimte, tenzij de vergadering van eigenaars hiervoor toestemming heeft verleend.

Het is de eigenaar of gebruiker niet toegestaan overlast te veroorzaken aan de overige bewoners van het gebouw.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 13,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 14',
    naam: 'Verhuur en ingebruikgeving',
    categorie: 'Gebruik',
    tekst_template: `Een appartementseigenaar is bevoegd zijn privégedeelte aan een derde te verhuren of in gebruik te geven, mits de gebruiker schriftelijk verklaart het splitsingsreglement en het huishoudelijk reglement na te leven.

Verhuur voor toeristische doeleinden (short stay) is slechts toegestaan met inachtneming van de gemeentelijke regels en na toestemming van de vergadering van eigenaars.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 14,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 15',
    naam: 'Onderhoud en verbouwing',
    categorie: 'Onderhoud',
    tekst_template: `Het onderhoud van de gemeenschappelijke gedeelten geschiedt voor rekening van de gezamenlijke eigenaars. Iedere eigenaar is verplicht de noodzakelijke werkzaamheden aan de gemeenschappelijke gedeelten te gedogen.

Verbouwingen aan privégedeelten die de gemeenschappelijke gedeelten of het uiterlijk van het gebouw raken, behoeven voorafgaande schriftelijke toestemming van de vergadering van eigenaars.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 15,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 16',
    naam: 'Verzekering',
    categorie: 'Financieel',
    tekst_template: `De vereniging sluit een opstalverzekering af voor het gehele gebouw op basis van de herbouwwaarde. De premie wordt omgeslagen over de eigenaars naar rato van de breukdelen.

Iedere eigenaar is gehouden een inboedelverzekering en een aansprakelijkheidsverzekering af te sluiten voor zijn privégedeelte.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 16,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 17',
    naam: 'Huishoudelijk reglement',
    categorie: 'Overig',
    tekst_template: `De vergadering van eigenaars stelt een huishoudelijk reglement vast, waarin nadere regels worden opgenomen met betrekking tot het gebruik van de gemeenschappelijke gedeelten en de privégedeelten, het onderhoud en de orde in het gebouw.

Het huishoudelijk reglement kan bij besluit van de vergadering worden gewijzigd.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 17,
  },
  {
    document_type: 'splitsingsakte',
    artikelnummer: 'Artikel 18',
    naam: 'Slotbepalingen',
    categorie: 'Slotbepalingen',
    tekst_template: `Op deze splitsingsakte en het splitsingsreglement is Nederlands recht van toepassing. Geschillen tussen appartementseigenaars onderling of tussen een eigenaar en de vereniging worden bij uitsluiting beslecht door de bevoegde rechter te Amsterdam.

Voor zover in deze akte niet anders is bepaald, is het Modelreglement bij splitsing in appartementsrechten van toepassing.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 18,
  },
]
