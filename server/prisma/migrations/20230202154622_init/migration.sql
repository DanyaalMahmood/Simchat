/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_number_key" ON "Users"("number");
