import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const koopClausules = [
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 1',
    naam: 'Verkoop en koop',
    categorie: 'Kernbepalingen',
    tekst_template: `Verkoper verkoopt aan koper, die van verkoper koopt, het appartementsrecht/de eengezinswoning/het grachtenpand, plaatselijk bekend te {{adres}}, kadastraal bekend gemeente Amsterdam, {{kadastrale_aanduiding}}, ten tijde van de eigendomsoverdracht vrij van huur en gebruik, voor een koopprijs van € {{koopprijs}}.

Verkoper: {{verkoper}}
Koper: {{koper}}`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 1,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 2',
    naam: 'Levering',
    categorie: 'Kernbepalingen',
    tekst_template: `De akte van levering zal worden verleden op {{leveringsdatum}}, of zoveel eerder of later als partijen nader overeenkomen, ten overstaan van een notaris verbonden aan een der kantoren van de Ring van Notarissen te Amsterdam.

Het registergoed zal bij de feitelijke levering de eigenschappen bezitten die voor een normaal gebruik nodig zijn. Verkoper staat niet in voor andere eigenschappen dan die voor een normaal gebruik nodig zijn.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 2,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 3',
    naam: 'Betaling koopprijs',
    categorie: 'Kernbepalingen',
    tekst_template: `De betaling van de koopprijs ad € {{koopprijs}} geschiedt via de notaris bij het ondertekenen van de akte van levering.

Tot zekerheid voor de nakoming van de verplichtingen van koper zal deze uiterlijk op de vijfde werkdag na heden als waarborgsom een bedrag van € {{waarborgsom}} (10% van de koopprijs) storten op de kwaliteitsrekening van de notaris, dan wel een schriftelijke bankgarantie doen stellen ten bedrage van dit bedrag.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 3,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 4',
    naam: 'Staat van het registergoed / Garanties verkoper',
    categorie: 'Kernbepalingen',
    tekst_template: `Verkoper garandeert dat hij bevoegd is tot verkoop en levering en dat het registergoed vrij is van beslagen, hypotheken en beperkte rechten die niet door koper worden aanvaard.

Verkoper garandeert voorts dat er geen privaatrechtelijke beperkingen, kwalitatieve verplichtingen of voorkeursrechten bestaan ten aanzien van het registergoed, anders dan vermeld in deze overeenkomst.

Het registergoed zal bij de eigendomsoverdracht vrij zijn van huurovereenkomsten, pacht en gebruiksrechten van derden, tenzij uitdrukkelijk anders overeengekomen.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 4,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 5',
    naam: 'Erfpacht eeuwigdurend',
    categorie: 'Erfpacht',
    tekst_template: `Het registergoed is belast met het recht van eeuwigdurende erfpacht van de gemeente Amsterdam. Op het erfpachtrecht zijn van toepassing de Algemene Bepalingen voor voortdurende erfpacht.

Koper verklaart bekend te zijn met de inhoud van de Algemene Bepalingen en de jaarlijkse canon. De canon is periodiek herzienbaar conform de geldende Algemene Bepalingen.`,
    trigger_conditie: '{"erfpacht":true,"erfpacht_type":"eeuwigdurend"}',
    type: 'conditioneel',
    volgorde: 5,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 5',
    naam: 'Erfpacht tijdelijk',
    categorie: 'Erfpacht',
    tekst_template: `Het registergoed is belast met het recht van tijdelijke erfpacht van de gemeente Amsterdam. Koper verklaart bekend te zijn met de expiratiedatum en de voorwaarden voor verlenging.

Bij het verstrijken van de erfpachttermijn eindigt het recht van erfpacht tenzij tijdig verlenging wordt aangevraagd. De canon en bijkomende kosten komen vanaf de leveringsdatum voor rekening van koper.`,
    trigger_conditie: '{"erfpacht":true,"erfpacht_type":"tijdelijk"}',
    type: 'conditioneel',
    volgorde: 6,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 6',
    naam: 'VvE-bepalingen',
    categorie: 'VvE',
    tekst_template: `Koper treedt met ingang van de leveringsdatum van rechtswege toe als lid van de Vereniging van Eigenaars. Verkoper verstrekt aan koper uiterlijk bij levering:
a) de splitsingsakte en het splitsingsreglement;
b) het huishoudelijk reglement;
c) de notulen van de laatste drie ALV's;
d) de meest recente jaarrekening en begroting;
e) een verklaring omtrent het reservefonds.

Verkoper verklaart dat geen besluiten van de VvE bekend zijn die tot extra financiële verplichtingen leiden.`,
    trigger_conditie: '{"vve":true}',
    type: 'conditioneel',
    volgorde: 7,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 7',
    naam: 'Energielabel',
    categorie: 'Duurzaamheid',
    tekst_template: `Verkoper heeft een geldig energielabel beschikbaar gesteld. Koper verklaart dit te hebben ontvangen en van de inhoud kennis te hebben genomen.`,
    trigger_conditie: '{"energielabel":true}',
    type: 'conditioneel',
    volgorde: 8,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 8',
    naam: 'Ouderdomsclausule',
    categorie: 'Ouderdom',
    tekst_template: `Koper is ermee bekend dat het registergoed meer dan dertig jaar oud is. De eisen die aan de bouwkwaliteit gesteld mogen worden liggen aanzienlijk lager dan bij nieuwbouw. Gebreken inherent aan de ouderdom, waaronder fundering, vocht, isolatie en verouderde installaties, komen voor risico van koper.`,
    trigger_conditie: '{"bouwjaar_voor_1992":true}',
    type: 'conditioneel',
    volgorde: 9,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 9',
    naam: 'Asbestclausule',
    categorie: 'Ouderdom',
    tekst_template: `In het registergoed kunnen, gelet op het bouwjaar vóór 1992, asbesthoudende materialen aanwezig zijn. Koper aanvaardt het risico van de aanwezigheid van asbest en vrijwaart verkoper voor alle daaruit voortvloeiende kosten.`,
    trigger_conditie: '{"bouwjaar_voor_1992":true}',
    type: 'conditioneel',
    volgorde: 10,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 10',
    naam: 'Bouwtechnische keuring',
    categorie: 'Keuring',
    tekst_template: `Koper heeft een bouwtechnische keuring laten uitvoeren. Het rapport is als bijlage gehecht. Verkoper is niet aansprakelijk voor gebreken die uit het rapport hadden kunnen blijken.`,
    trigger_conditie: '{"bouwtechnische_keuring":true}',
    type: 'conditioneel',
    volgorde: 11,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 11',
    naam: 'Financieringsvoorbehoud',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `Deze overeenkomst kan door koper worden ontbonden indien hij niet uiterlijk {{financieringstermijn}} weken na ondertekening een toezegging heeft verkregen voor een hypothecaire geldlening tot een hoofdsom van ten minste € {{koopprijs}}.

Koper dient bij beroep op deze voorwaarde ten minste twee afwijzingen van erkende geldverstrekkers over te leggen.`,
    trigger_conditie: '{"financieringsvoorbehoud":true}',
    type: 'conditioneel',
    volgorde: 12,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 11a',
    naam: 'NHG-bepaling',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `De financiering geschiedt met Nationale Hypotheek Garantie. Indien NHG niet wordt verleend, geldt dit als niet-verkrijging van de financiering.`,
    trigger_conditie: '{"nhg":true}',
    type: 'conditioneel',
    volgorde: 13,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 12',
    naam: 'Bouwkundig voorbehoud',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `Koper kan ontbinden indien uit bouwtechnisch onderzoek blijkt dat direct noodzakelijke herstelkosten meer bedragen dan € 5.000,00.`,
    trigger_conditie: '{"bouwkundig_voorbehoud":true}',
    type: 'conditioneel',
    volgorde: 14,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 13',
    naam: 'Huisvestingsvergunning',
    categorie: 'Ontbindende voorwaarden',
    tekst_template: `Koper kan ontbinden indien de vereiste huisvestingsvergunning niet wordt verleend door de gemeente Amsterdam. Een huisvestingsvergunning is vereist bij woningen met een WOZ-waarde onder de geldende koopprijsgrens.`,
    trigger_conditie: '{"huisvestingsvergunning":true}',
    type: 'conditioneel',
    volgorde: 15,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 14',
    naam: 'Wettelijke bedenktijd',
    categorie: 'Wettelijke bepalingen',
    tekst_template: `Koper heeft gedurende drie dagen na ontvangst van een afschrift van deze overeenkomst het recht de overeenkomst te ontbinden (artikel 7:2 BW). De bedenktijd eindigt om 23:59 uur op de derde dag.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 16,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 15',
    naam: 'Boetebeding',
    categorie: 'Wettelijke bepalingen',
    tekst_template: `Bij toerekenbare tekortkoming verbeurt de nalatige partij na ingebrekestelling een boete van 10% van de koopprijs (€ {{boetebedrag}}), onverminderd het recht op aanvullende schadevergoeding. Tevens 3 promille per dag bij te late levering of betaling.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 17,
  },
  {
    document_type: 'koopovereenkomst',
    artikelnummer: 'Artikel 16',
    naam: 'Ingebrekestelling',
    categorie: 'Wettelijke bepalingen',
    tekst_template: `Voordat een beroep kan worden gedaan op het boetebeding dient de nalatige partij schriftelijk in gebreke te zijn gesteld met een termijn van acht dagen om alsnog na te komen.`,
    trigger_conditie: '{}',
    type: 'standaard',
    volgorde: 18,
  },
]

async function main() {
  await prisma.transactieClausule.deleteMany()
  await prisma.clausule.deleteMany()
  await prisma.transactie.deleteMany()

  for (const c of koopClausules) {
    await prisma.clausule.create({ data: c })
  }
  console.log(`Koopovereenkomst: ${koopClausules.length} clausules`)

  // Load additional clausules from separate files
  const { samenlevingClausules } = await import('./seed-samenleving')
  for (const c of samenlevingClausules) {
    await prisma.clausule.create({ data: c })
  }
  console.log(`Samenlevingsovereenkomst: ${samenlevingClausules.length} clausules`)

  const { splitsingClausules } = await import('./seed-splitsing')
  for (const c of splitsingClausules) {
    await prisma.clausule.create({ data: c })
  }
  console.log(`Splitsingsakte: ${splitsingClausules.length} clausules`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
