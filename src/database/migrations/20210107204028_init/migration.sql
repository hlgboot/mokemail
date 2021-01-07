-- CreateTable
CREATE TABLE "Newsletters" (
"id" SERIAL,
    "name" TEXT,
    "email" TEXT,
    "tagsId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
"id" SERIAL,
    "email" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
"id" SERIAL,
    "name" TEXT,
    "usersId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Newsletters.name_unique" ON "Newsletters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletters.email_unique" ON "Newsletters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tags.name_unique" ON "Tags"("name");

-- AddForeignKey
ALTER TABLE "Newsletters" ADD FOREIGN KEY("tagsId")REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD FOREIGN KEY("usersId")REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
