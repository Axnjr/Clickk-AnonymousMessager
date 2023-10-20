/*
  Warnings:

  - You are about to drop the column `membership` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `membershipEndDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `membershipStartDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "membership";
ALTER TABLE "User" DROP COLUMN "membershipEndDate";
ALTER TABLE "User" DROP COLUMN "membershipStartDate";

-- CreateTable
CREATE TABLE "UserMembership" (
    "id" STRING NOT NULL,
    "membership" STRING,
    "membershipStartDate" STRING,
    "membershipEndDate" STRING,
    "paymentIntent" STRING,
    "userId" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMembership_id_key" ON "UserMembership"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMembership_userId_key" ON "UserMembership"("userId");

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
