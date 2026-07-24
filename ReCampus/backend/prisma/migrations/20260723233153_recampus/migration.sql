/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `condition` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ad" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "isDonation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT NOT NULL;
