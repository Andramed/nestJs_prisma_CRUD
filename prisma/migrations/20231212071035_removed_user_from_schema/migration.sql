/*
  Warnings:

  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_userId_fkey";

-- DropIndex
DROP INDEX "Manager_userId_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
