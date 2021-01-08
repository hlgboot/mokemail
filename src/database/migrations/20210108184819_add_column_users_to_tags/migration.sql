/*
  Warnings:

  - You are about to drop the column `usersId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_usersId_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "usersId";

-- CreateTable
CREATE TABLE "_TagsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToUsers_AB_unique" ON "_TagsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToUsers_B_index" ON "_TagsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_TagsToUsers" ADD FOREIGN KEY("A")REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToUsers" ADD FOREIGN KEY("B")REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
