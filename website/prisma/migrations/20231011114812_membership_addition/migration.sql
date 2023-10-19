/*
  Warnings:

  - You are about to drop the column `responseType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "responseType";
ALTER TABLE "User" ADD COLUMN     "membership" STRING;
