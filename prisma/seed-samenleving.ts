export const samenlevingClausules = [
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 1',
    naam: 'Begripsbepalingen',
    categorie: 'Algemeen',
    tekst_template: `In deze overeenkomst wordt verstaan onder:
a) "partners": {{partner1}} en {{partner2}}, gezamenlijk;
b) "gemeenschappelijke huishouding": het gezamenlijk voorzien in huisvesting en de kosten van levensonderhoud;
c) "samenlevingsovereenkomst": de onderhavige overeenkomst tot regeling van de vermogensrechtelijke gevolgen van het samenleven.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 1,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 2',
    naam: 'Doel samenleving',
    categorie: 'Algemeen',
    tekst_template: `Partners verklaren met ingang van {{datum_samenwonen}} een gemeenschappelijke huishouding te voeren in de woning gelegen te {{adres}}. Partners verbinden zich de kosten van de gemeenschappelijke huishouding te delen overeenkomstig het in deze overeenkomst bepaalde.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 2,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 3',
    naam: 'Kosten huishouding',
    categorie: 'Financieel',
    tekst_template: `Onder kosten van de gemeenschappelijke huishouding worden verstaan alle kosten die verband houden met het dagelijks leven, waaronder huur of hypotheeklasten, nutsvoorzieningen, verzekeringen, boodschappen en overige huishoudelijke uitgaven.

Partners dragen bij in de kosten naar evenredigheid van hun netto-inkomen. Indien een partner geen inkomen geniet, wordt deze geacht bij te dragen naar draagkracht.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 3,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 4',
    naam: 'Bankrekeningen',
    categorie: 'Financieel',
    tekst_template: `Partners openen een gezamenlijke bankrekening (en/of-rekening) ten behoeve van de kosten van de gemeenschappelijke huishouding. Ieder der partners stort maandelijks een naar evenredigheid van inkomen vastgesteld bedrag op deze rekening.

Ieder der partners behoudt daarnaast het recht eigen bankrekeningen aan te houden.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 4,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 5',
    naam: 'Koude uitsluiting',
    categorie: 'Vermogen',
    tekst_template: `Tussen partners bestaat geen gemeenschap van goederen in welke vorm dan ook. Iedere partner behoudt het eigen vermogen, zowel het bij aanvang van de samenleving aanwezige vermogen als het nadien verkregen vermogen, waaronder begrepen de vruchten daarvan.

Schulden aangegaan door een der partners komen uitsluitend voor rekening van die partner, tenzij deze schulden zijn aangegaan ten behoeve van de gemeenschappelijke huishouding.`,
    trigger_conditie: '{"vermogensregeling":"koude_uitsluiting"}',
    type: 'conditioneel',
    volgorde: 5,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 5',
    naam: 'Beperkte gemeenschap',
    categorie: 'Vermogen',
    tekst_template: `Tussen partners geldt een beperkte gemeenschap van goederen, bestaande uit:
a) de inboedel van de gemeenschappelijke woning;
b) alle roerende zaken die gedurende de samenleving gezamenlijk zijn aangeschaft.

Alle overige bezittingen en schulden blijven privé-eigendom van de betreffende partner. Bij twijfel over de eigendom wordt een goed geacht gemeenschappelijk te zijn.`,
    trigger_conditie: '{"vermogensregeling":"beperkte_gemeenschap"}',
    type: 'conditioneel',
    volgorde: 6,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 6',
    naam: 'Gemeenschappelijke woning',
    categorie: 'Woning',
    tekst_template: `De woning gelegen te {{adres}} wordt door partners als gemeenschappelijke woning gebruikt. De kosten van bewoning, waaronder huur of hypotheeklasten, onderhoud en verzekeringen, worden gedeeld conform artikel 3.

Bij beëindiging van de samenleving heeft de partner die niet de eigenaar of huurder is, het recht de woning gedurende maximaal zes maanden te blijven bewonen, mits een redelijke gebruiksvergoeding wordt voldaan.`,
    trigger_conditie: '{"gemeenschappelijke_woning":true}',
    type: 'conditioneel',
    volgorde: 7,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 7',
    naam: 'Inboedel',
    categorie: 'Vermogen',
    tekst_template: `Bij beëindiging van de samenleving worden de gemeenschappelijke inboedelgoederen bij helfte verdeeld, tenzij een partner kan aantonen dat een goed uitsluitend aan hem of haar toebehoort.

Partners stellen bij aanvang van de samenleving een lijst op van de inboedelgoederen die ieder inbrengt. Goederen die niet op deze lijst voorkomen en die tijdens de samenleving zijn aangeschaft, worden vermoed gemeenschappelijk eigendom te zijn.`,
    trigger_conditie: '{"inboedelverdeling":true}',
    type: 'conditioneel',
    volgorde: 8,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 8',
    naam: 'Pensioenverevening',
    categorie: 'Pensioen',
    tekst_template: `Partners komen overeen dat bij beëindiging van de samenleving verevening van ouderdomspensioen zal plaatsvinden overeenkomstig de Wet verevening pensioenrechten bij scheiding, zoals deze wet van overeenkomstige toepassing is op geregistreerde partners.

De verevening heeft uitsluitend betrekking op de pensioenrechten die zijn opgebouwd gedurende de periode van de samenleving.`,
    trigger_conditie: '{"pensioenregeling":true}',
    type: 'conditioneel',
    volgorde: 9,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 9',
    naam: 'Partnerpensioen',
    categorie: 'Pensioen',
    tekst_template: `Partners wijzen elkaar over en weer aan als begunstigde voor het partnerpensioen bij hun respectieve pensioenfondsen of pensioenverzekeraars, voor zover de pensioenregeling hierin voorziet.

Partners verbinden zich de daartoe benodigde formulieren zo spoedig mogelijk in te vullen en in te dienen.`,
    trigger_conditie: '{"partnerpensioen":true}',
    type: 'conditioneel',
    volgorde: 10,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 10',
    naam: 'Alimentatie',
    categorie: 'Beëindiging',
    tekst_template: `Bij beëindiging van de samenleving kan de partner die niet in eigen levensonderhoud kan voorzien, aanspraak maken op een bijdrage van de andere partner. De onderhoudsverplichting duurt ten hoogste vijf jaar na de beëindiging.

De hoogte van de bijdrage wordt vastgesteld met inachtneming van de draagkracht van de alimentatieplichtige en de behoefte van de alimentatiegerechtigde.`,
    trigger_conditie: '{"alimentatie":true}',
    type: 'conditioneel',
    volgorde: 11,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 11',
    naam: 'Overlijden',
    categorie: 'Overlijden',
    tekst_template: `Bij overlijden van een der partners eindigt deze overeenkomst. De langstlevende partner heeft het recht de gemeenschappelijke woning gedurende zes maanden na het overlijden te blijven bewonen.

Partners verklaren ieder voor zich bereid te zijn een testament op te maken waarin de belangen van de langstlevende partner worden behartigd.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 12,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 12',
    naam: 'Verblijvingsbeding',
    categorie: 'Overlijden',
    tekst_template: `Partners komen overeen dat bij overlijden van een der partners alle gemeenschappelijke goederen, als bedoeld in deze overeenkomst, van rechtswege verblijven aan de langstlevende partner, onder de verplichting alle gemeenschappelijke schulden voor zijn of haar rekening te nemen.

De verblijving geschiedt tegen de waarde ten tijde van het overlijden. Verrekening met de erfgenamen van de overleden partner vindt plaats overeenkomstig het bepaalde in het testament, dan wel overeenkomstig het wettelijk erfrecht.`,
    trigger_conditie: '{"verblijvingsbeding":true}',
    type: 'conditioneel',
    volgorde: 13,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 13',
    naam: 'Beëindiging',
    categorie: 'Beëindiging',
    tekst_template: `Deze overeenkomst eindigt:
a) door het overlijden van een der partners;
b) door het sluiten van een huwelijk of geregistreerd partnerschap tussen partners;
c) door schriftelijke opzegging door een der partners, met inachtneming van een opzegtermijn van drie maanden;
d) door onderlinge overeenstemming.

Na beëindiging van de overeenkomst dient de afwikkeling van de vermogensrechtelijke gevolgen binnen zes maanden plaats te vinden.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 14,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 14',
    naam: 'Geschillenregeling',
    categorie: 'Slotbepalingen',
    tekst_template: `Geschillen die voortvloeien uit deze overeenkomst worden in eerste instantie voorgelegd aan een mediator, aan te wijzen door de Koninklijke Notariële Beroepsorganisatie.

Indien mediation niet tot een oplossing leidt, wordt het geschil voorgelegd aan de bevoegde rechter te Amsterdam.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 15,
  },
  {
    document_type: 'samenlevingsovereenkomst',
    artikelnummer: 'Artikel 15',
    naam: 'Slotbepalingen',
    categorie: 'Slotbepalingen',
    tekst_template: `Deze overeenkomst wordt aangegaan bij notariële akte en treedt in werking op de datum van ondertekening. Wijziging van deze overeenkomst is slechts mogelijk bij notariële akte.

Op deze overeenkomst is Nederlands recht van toepassing.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 16,
  },
]
