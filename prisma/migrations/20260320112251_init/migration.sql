-- CreateTable
CREATE TABLE "Transactie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "aangemaakt_op" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'concept',
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
    "huisvestingsvergunning" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Clausule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artikelnummer" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "tekst_template" TEXT NOT NULL,
    "trigger_conditie" TEXT NOT NULL DEFAULT '{}',
    "type" TEXT NOT NULL DEFAULT 'standaard',
    "volgorde" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TransactieClausule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactie_id" TEXT NOT NULL,
    "clausule_id" TEXT NOT NULL,
    "aangepaste_tekst" TEXT,
    "actief" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "TransactieClausule_transactie_id_fkey" FOREIGN KEY ("transactie_id") REFERENCES "Transactie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TransactieClausule_clausule_id_fkey" FOREIGN KEY ("clausule_id") REFERENCES "Clausule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactieClausule_transactie_id_clausule_id_key" ON "TransactieClausule"("transactie_id", "clausule_id");
