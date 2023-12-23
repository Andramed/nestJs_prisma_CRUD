/*
  Warnings:

  - Changed the type of `role` on the `Manager` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "role",
ADD COLUMN     "role" INTEGER NOT NULL;
