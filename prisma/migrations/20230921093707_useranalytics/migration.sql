/*
  Warnings:

  - You are about to drop the column `extra_param1` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "extra_param1";
ALTER TABLE "User" ALTER COLUMN "responseType" SET DEFAULT 'text_only';

-- CreateTable
CREATE TABLE "UserAnalytics" (
    "id" STRING NOT NULL,
    "page_views" INT4 DEFAULT 0,
    "page_clicks" INT4 DEFAULT 0,
    "responses" INT4 DEFAULT 0,
    "spam" INT4 DEFAULT 0,
    "userId" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAnalytics_id_key" ON "UserAnalytics"("id");

-- AddForeignKey
ALTER TABLE "UserAnalytics" ADD CONSTRAINT "UserAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
