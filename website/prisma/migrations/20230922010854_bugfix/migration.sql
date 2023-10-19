-- DropForeignKey
ALTER TABLE "UserAnalytics" DROP CONSTRAINT "UserAnalytics_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserAnalytics" ADD CONSTRAINT "UserAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
