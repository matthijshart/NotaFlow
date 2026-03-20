-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clausule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_type" TEXT NOT NULL DEFAULT 'koopovereenkomst',
    "artikelnummer" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "tekst_template" TEXT NOT NULL,
    "trigger_conditie" TEXT NOT NULL DEFAULT '{}',
    "type" TEXT NOT NULL DEFAULT 'standaard',
    "volgorde" INTEGER NOT NULL
);
INSERT INTO "new_Clausule" ("artikelnummer", "categorie", "id", "naam", "tekst_template", "trigger_conditie", "type", "volgorde") SELECT "artikelnummer", "categorie", "id", "naam", "tekst_template", "trigger_conditie", "type", "volgorde" FROM "Clausule";
DROP TABLE "Clausule";
ALTER TABLE "new_Clausule" RENAME TO "Clausule";
CREATE TABLE "new_Transactie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aangemaakt_op" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'concept',
    "document_type" TEXT NOT NULL DEFAULT 'koopovereenkomst',
    "adres" TEXT NOT NULL DEFAULT '',
    "kadastrale_aanduiding" TEXT NOT NULL DEFAULT '',
    "type_object" TEXT NOT NULL DEFAULT 'eengezinswoning',
    "verkoper_naam" TEXT NOT NULL DEFAULT '',
    "koper_naam" TEXT NOT NULL DEFAULT '',
    "koopprijs" INTEGER NOT NULL DEFAULT 0,
    "leveringsdatum" TEXT NOT NULL DEFAULT '',
    "vve" BOOLEAN NOT NULL DEFAULT false,
    "erfpacht" BOOLEAN NOT NULL DEFAULT false,
    "erfpacht_type" TEXT NOT NULL DEFAULT 'eeuwigdurend',
    "bouwjaar_voor_1992" BOOLEAN NOT NULL DEFAULT false,
    "bouwtechnische_keuring" BOOLEAN NOT NULL DEFAULT false,
    "energielabel" BOOLEAN NOT NULL DEFAULT false,
    "financieringsvoorbehoud" BOOLEAN NOT NULL DEFAULT false,
    "financieringstermijn_weken" INTEGER NOT NULL DEFAULT 6,
    "nhg" BOOLEAN NOT NULL DEFAULT false,
    "bouwkundig_voorbehoud" BOOLEAN NOT NULL DEFAULT false,
    "huisvestingsvergunning" BOOLEAN NOT NULL DEFAULT false,
    "extra_data" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_Transactie" ("aangemaakt_op", "adres", "bouwjaar_voor_1992", "bouwkundig_voorbehoud", "bouwtechnische_keuring", "energielabel", "erfpacht", "erfpacht_type", "financieringstermijn_weken", "financieringsvoorbehoud", "huisvestingsvergunning", "id", "kadastrale_aanduiding", "koopprijs", "koper_naam", "leveringsdatum", "nhg", "status", "type_object", "verkoper_naam", "vve") SELECT "aangemaakt_op", "adres", "bouwjaar_voor_1992", "bouwkundig_voorbehoud", "bouwtechnische_keuring", "energielabel", "erfpacht", "erfpacht_type", "financieringstermijn_weken", "financieringsvoorbehoud", "huisvestingsvergunning", "id", "kadastrale_aanduiding", "koopprijs", "koper_naam", "leveringsdatum", "nhg", "status", "type_object", "verkoper_naam", "vve" FROM "Transactie";
DROP TABLE "Transactie";
ALTER TABLE "new_Transactie" RENAME TO "Transactie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
