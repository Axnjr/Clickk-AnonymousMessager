/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserAnalytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAnalytics_userId_key" ON "UserAnalytics"("userId");
