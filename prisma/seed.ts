import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const clausules = [
  {
    artikelnummer: 'Artikel 1',
    naam: 'Verkoop en koop',
    categorie: 'Kernbepalingen',
    tekst_template: `Verkoper verkoopt aan koper, die van verkoper koopt, het navolgende registergoed:

Het appartementsrecht / de eengezinswoning / het grachtenpand, plaatselijk bekend te {{adres}}, kadastraal bekend gemeente Amsterdam, {{kadastrale_aanduiding}}, ten tijde van de eigendomsoverdracht vrij van huur en gebruik, voor een koopprijs van € {{koopprijs}} (zegge: {{koopprijs_voluit}}).

Verkoper en koper worden hierna gezamenlijk aangeduid als "partijen".
Verkoper: {{verkoper}}
Koper: {{koper}}`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 1,
  },
  {
    artikelnummer: 'Artikel 2',
    naam: 'Levering',
    categorie: 'Kernbepalingen',
    tekst_template: `De levering van het registergoed zal plaatsvinden op {{leveringsdatum}}, of zoveel eerder of later als partijen nader overeenkomen, door middel van het verlijden van een notariële akte van levering ten overstaan van een notaris verbonden aan het kantoor van de instrumenterend notaris te Amsterdam.

Het registergoed zal bij de feitelijke levering de eigenschappen bezitten die voor een normaal gebruik nodig zijn. Verkoper staat er niet voor in dat het registergoed geschikt is voor een bijzonder gebruik.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 2,
  },
  {
    artikelnummer: 'Artikel 3',
    naam: 'Betaling',
    categorie: 'Kernbepalingen',
    tekst_template: `De koopprijs van € {{koopprijs}} dient te worden voldaan bij het ondertekenen van de akte van levering via de kwaliteitsrekening van de notaris.

Als waarborgsom voor de nakoming van de verplichtingen van koper dient een bedrag van € {{waarborgsom}} (zijnde 10% van de koopprijs) te worden gestort op de kwaliteitsrekening van de notaris, uiterlijk 5 werkdagen na ondertekening van deze koopovereenkomst. In plaats van een waarborgsom kan koper een bankgarantie stellen ten bedrage van voornoemd bedrag.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 3,
  },
  {
    artikelnummer: 'Artikel 4',
    naam: 'Eigendomsoverdracht',
    categorie: 'Kernbepalingen',
    tekst_template: `Verkoper garandeert dat hij/zij ten tijde van het verlijden van de akte van levering bevoegd is tot verkoop en levering van het registergoed en dat het registergoed op dat moment vrij zal zijn van beslagen, hypotheken en inschrijvingen daarvan.

Verkoper garandeert voorts dat er geen voorkeursrechten, koopoptierechten of andere aanspraken van derden bestaan met betrekking tot het registergoed, behoudens de hierna te noemen lasten en beperkingen.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 4,
  },
  {
    artikelnummer: 'Artikel 5',
    naam: 'Erfpachtbepaling eeuwigdurend',
    categorie: 'Erfpacht',
    tekst_template: `Het registergoed is belast met het recht van eeuwigdurende erfpacht van de gemeente Amsterdam. Het erfpachtrecht is gevestigd bij akte verleden op [datum], ingeschreven ten kantore van de Dienst voor het kadaster en de openbare registers.

Op het erfpachtrecht zijn van toepassing de Algemene Bepalingen voor eeuwigdurende erfpacht van de gemeente Amsterdam. Koper verklaart bekend te zijn met de inhoud van deze Algemene Bepalingen en de daaruit voortvloeiende verplichtingen, waaronder de verplichting tot betaling van de jaarlijkse canon aan de gemeente Amsterdam.

Koper verklaart ermee bekend te zijn dat de canon periodiek wordt herzien conform de geldende Algemene Bepalingen.`,
    trigger_conditie: '{"erfpacht":true,"erfpacht_type":"eeuwigdurend"}',
    type: 'conditioneel',
    volgorde: 5,
  },
  {
    artikelnummer: 'Artikel 5',
    naam: 'Erfpachtbepaling tijdelijk',
    categorie: 'Erfpacht',
    tekst_template: `Het registergoed is belast met het recht van tijdelijke erfpacht van de gemeente Amsterdam. Het erfpachtrecht is gevestigd bij akte verleden op [datum] en heeft een looptijd tot [einddatum].

Koper verklaart bekend te zijn met de expiratiedatum van het erfpachtrecht en de voorwaarden voor eventuele verlenging. Koper is ermee bekend dat bij het verstrijken van de erfpachttermijn het recht van erfpacht eindigt, tenzij tijdig verlenging wordt aangevraagd en verkregen.

De aan de erfpacht verbonden canon en eventuele bijkomende kosten komen vanaf de leveringsdatum voor rekening van koper.`,
    trigger_conditie: '{"erfpacht":true,"erfpacht_type":"tijdelijk"}',
    type: 'conditioneel',
    volgorde: 6,
  },
  {
    artikelnummer: 'Artikel 6',
    naam: 'VvE-bepalingen',
    categorie: 'VvE',
    tekst_template: `Het registergoed maakt deel uit van een appartementsgebouw waarvoor een Vereniging van Eigenaars (VvE) is opgericht. Koper treedt met ingang van de leveringsdatum van rechtswege toe als lid van de VvE.

Verkoper verstrekt aan koper, uiterlijk bij het ondertekenen van de akte van levering, de volgende stukken:
a) de splitsingsakte en het splitsingsreglement;
b) het huishoudelijk reglement van de VvE;
c) de notulen van de laatste drie algemene ledenvergaderingen;
d) de meest recente jaarrekening en begroting;
e) een verklaring van het bestuur van de VvE omtrent de omvang van het reservefonds.

Verkoper verklaart dat hem/haar geen besluiten van de VvE bekend zijn die tot extra financiële verplichtingen kunnen leiden, anders dan hiervoor vermeld.`,
    trigger_conditie: '{"vve":true}',
    type: 'conditioneel',
    volgorde: 7,
  },
  {
    artikelnummer: 'Artikel 7',
    naam: 'Energielabel',
    categorie: 'Duurzaamheid',
    tekst_template: `Verkoper heeft een geldig energielabel als bedoeld in het Besluit energieprestatie gebouwen beschikbaar gesteld aan koper. Koper verklaart dit energielabel te hebben ontvangen en van de inhoud daarvan kennis te hebben genomen.

Het energielabel is geregistreerd bij de Rijksdienst voor Ondernemend Nederland (RVO) en is als bijlage aan deze overeenkomst gehecht.`,
    trigger_conditie: '{"energielabel":true}',
    type: 'conditioneel',
    volgorde: 8,
  },
  {
    artikelnummer: 'Artikel 8',
    naam: 'Ouderdomsclausule',
    categorie: 'Ouderdom',
    tekst_template: `Koper is ermee bekend dat het registergoed meer dan 30 jaar oud is, hetgeen betekent dat de eisen die aan de bouwkwaliteit gesteld mogen worden aanzienlijk lager liggen dan bij een nieuwbouwwoning of een recent gerenoveerd object.

In afwijking van artikel 7:17 lid 1 en 2 BW komen gebreken die het gevolg zijn van de ouderdom van het registergoed, en die inherent zijn aan het bouwjaar en de destijds gebruikelijke bouwmethoden en materialen, voor rekening en risico van koper. Dit betreft onder meer, maar niet uitsluitend: gebreken aan de fundering, vochtproblemen, onvoldoende isolatie, en verouderde leidingen en installaties.

Koper verklaart hiermee uitdrukkelijk in te stemmen.`,
    trigger_conditie: '{"bouwjaar_voor_1992":true}',
    type: 'conditioneel',
    volgorde: 9,
  },
  {
    artikelnummer: 'Artikel 9',
    naam: 'Asbestclausule',
    categorie: 'Ouderdom',
    tekst_template: `Koper is ermee bekend dat in het registergoed, gelet op het bouwjaar (vóór 1992), asbesthoudende materialen aanwezig kunnen zijn. Het is niet uitgesloten dat bij verbouwing of renovatie asbesthoudende materialen worden aangetroffen.

Koper aanvaardt uitdrukkelijk het risico van de aanwezigheid van asbest in het registergoed en vrijwaart verkoper voor alle aanspraken en kosten die voortvloeien uit de aanwezigheid en/of verwijdering van asbest.

Het eventueel saneren van asbesthoudende materialen geschiedt geheel voor rekening en risico van koper, met inachtneming van de geldende wet- en regelgeving.`,
    trigger_conditie: '{"bouwjaar_voor_1992":true}',
    type: 'conditioneel',
    volgorde: 10,
  },
  {
    artikelnummer: 'Artikel 10',
    naam: 'Bouwtechnische keuring',
    categorie: 'Keuring',
    tekst_template: `Koper heeft voorafgaand aan het sluiten van deze koopovereenkomst een bouwtechnische keuring laten uitvoeren door een onafhankelijk en deskundig bouwkundig bureau. Het bouwkundig rapport d.d. [datum rapport] is als bijlage aan deze overeenkomst gehecht.

Koper verklaart de inhoud van het bouwkundig rapport te kennen en de staat van het registergoed te aanvaarden zoals beschreven in dit rapport. Verkoper is niet aansprakelijk voor gebreken die uit het bouwkundig rapport hadden kunnen blijken, noch voor gebreken die bij een zorgvuldig uitgevoerde inspectie ontdekt hadden kunnen worden.`,
    trigger_conditie: '{"bouwtechnische_keuring":true}',
    type: 'conditioneel',
    volgorde: 11,
  },
  {
    artikelnummer: 'Artikel 11',
    naam: 'Financieringsvoorbehoud',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `Deze koopovereenkomst kan door koper worden ontbonden indien koper niet uiterlijk {{financieringstermijn}} weken na ondertekening van deze overeenkomst voor de financiering van het registergoed een bindende toezegging heeft verkregen van een erkende geldverstrekkende instelling voor het verkrijgen van een hypothecaire geldlening onder Nationale Hypotheek Garantie of zonder Nationale Hypotheek Garantie, tegen de bij de betreffende instelling op dat moment geldende voorwaarden en tarieven, tot een hoofdsom van ten minste € {{koopprijs}}, of een nader door koper te bepalen lager bedrag.

Indien koper zich op deze ontbindende voorwaarde wenst te beroepen, dient hij/zij dit uiterlijk op de eerste werkdag na het verstrijken van de hiervoor genoemde termijn schriftelijk en gedocumenteerd aan verkoper mede te delen. Bij deze mededeling dienen ten minste twee afwijzingen van erkende geldverstrekkende instellingen te worden overgelegd.`,
    trigger_conditie: '{"financieringsvoorbehoud":true}',
    type: 'conditioneel',
    volgorde: 12,
  },
  {
    artikelnummer: 'Artikel 11a',
    naam: 'NHG-bepaling',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `De in het voorgaande artikel bedoelde financiering geschiedt met Nationale Hypotheek Garantie (NHG) als bedoeld in de Voorwaarden en Normen van de Stichting Waarborgfonds Eigen Woningen.

Indien de Nationale Hypotheek Garantie niet wordt verleend, wordt dit aangemerkt als het niet verkrijgen van de financiering als bedoeld in het voorgaande artikel, en kan koper zich beroepen op de ontbindende voorwaarde van het financieringsvoorbehoud.`,
    trigger_conditie: '{"nhg":true}',
    type: 'conditioneel',
    volgorde: 13,
  },
  {
    artikelnummer: 'Artikel 12',
    naam: 'Bouwkundig voorbehoud',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `Deze koopovereenkomst kan door koper worden ontbonden indien uit een bouwtechnisch onderzoek, uit te voeren door een door koper aan te wijzen deskundig en onafhankelijk bouwkundig bureau, blijkt dat de kosten van direct noodzakelijk herstel van gebreken aan het registergoed meer bedragen dan € 5.000,00 (vijfduizend euro).

Koper dient het bouwtechnisch onderzoek uiterlijk 2 weken na ondertekening van deze koopovereenkomst te laten uitvoeren. Indien koper zich op deze ontbindende voorwaarde wenst te beroepen, dient hij/zij dit uiterlijk op de eerste werkdag na het verstrijken van voornoemde termijn schriftelijk aan verkoper mede te delen, onder overlegging van het bouwkundig rapport.`,
    trigger_conditie: '{"bouwkundig_voorbehoud":true}',
    type: 'conditioneel',
    volgorde: 14,
  },
  {
    artikelnummer: 'Artikel 13',
    naam: 'Huisvestingsvergunning',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `Deze koopovereenkomst kan door koper worden ontbonden indien de vereiste huisvestingsvergunning op grond van de Huisvestingswet 2014 en/of de Huisvestingsverordening van de gemeente Amsterdam niet wordt verleend.

Koper dient de huisvestingsvergunning zo spoedig mogelijk na ondertekening van deze koopovereenkomst aan te vragen bij de gemeente Amsterdam. Indien de vergunning niet uiterlijk 4 weken vóór de overeengekomen leveringsdatum is verleend, kan koper zich beroepen op deze ontbindende voorwaarde.

Opmerking: een huisvestingsvergunning is in Amsterdam vereist bij woningen met een WOZ-waarde onder de geldende koopprijsgrens.`,
    trigger_conditie: '{"huisvestingsvergunning":true}',
    type: 'conditioneel',
    volgorde: 15,
  },
  {
    artikelnummer: 'Artikel 14',
    naam: 'Bedenktijd',
    categorie: 'Wettelijke bepalingen',
    tekst_template: `Koper heeft het recht deze koopovereenkomst te ontbinden gedurende drie dagen na de dag waarop een afschrift van deze koopovereenkomst aan koper ter hand is gesteld, overeenkomstig het bepaalde in artikel 7:2 lid 2 van het Burgerlijk Wetboek.

De bedenktijd eindigt om 23:59 uur van de laatste dag van de driedagentermijn. Indien de bedenktijd eindigt op een zaterdag, zondag of algemeen erkende feestdag, wordt de termijn verlengd tot en met de eerstvolgende werkdag.

Koper kan van dit ontbindingsrecht gebruik maken door een schriftelijke mededeling aan de notaris te doen toekomen.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 16,
  },
  {
    artikelnummer: 'Artikel 15',
    naam: 'Boetebeding',
    categorie: 'Wettelijke bepalingen',
    tekst_template: `Indien één van de partijen, na schriftelijk in gebreke te zijn gesteld, gedurende acht dagen nalatig is of blijft in de nakoming van één of meer van haar verplichtingen uit deze koopovereenkomst, is die partij in verzuim en verbeurt zij ten behoeve van de wederpartij een onmiddellijk opeisbare boete van 10% (tien procent) van de koopprijs, zijnde € {{boetebedrag}}, onverminderd het recht op aanvullende schadevergoeding indien de werkelijke schade het boetebedrag overtreft, en onverminderd vergoeding van kosten van verhaal.

Indien het verzuim betrekking heeft op het niet tijdig meewerken aan de feitelijke en/of juridische levering dan wel de niet tijdige betaling van de koopprijs, verbeurt de nalatige partij daarnaast een onmiddellijk opeisbare boete van 3 promille van de koopprijs per dag dat het verzuim voortduurt, met een maximum van 10% van de koopprijs.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 17,
  },
  {
    artikelnummer: 'Artikel 16',
    naam: 'Ingebrekestelling',
    categorie: 'Wettelijke bepalingen',
    tekst_template: `Voordat een partij een beroep kan doen op het in het voorgaande artikel bepaalde boetebeding, dient de nalatige partij schriftelijk in gebreke te worden gesteld, waarbij een termijn van acht dagen wordt gegund om alsnog aan de verplichtingen uit deze overeenkomst te voldoen.

De ingebrekestelling dient per aangetekende brief of per exploot van een deurwaarder te geschieden. De termijn vangt aan op de dag volgend op de dag van ontvangst van de aangetekende brief of de dag van het exploot.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 18,
  },
]

async function main() {
  // Clear existing clausules
  await prisma.transactieClausule.deleteMany()
  await prisma.clausule.deleteMany()
  await prisma.transactie.deleteMany()

  for (const clausule of clausules) {
    await prisma.clausule.create({ data: clausule })
  }

  console.log(`Seeded ${clausules.length} clausules`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
