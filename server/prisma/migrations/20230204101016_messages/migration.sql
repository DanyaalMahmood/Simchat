/*
  Warnings:

  - The primary key for the `Messages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_pkey",
ADD CONSTRAINT "Messages_pkey" PRIMARY KEY ("sentby", "sentto");
