/*
  Warnings:

  - You are about to drop the column `isDonation` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ad" DROP COLUMN "isDonation",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
