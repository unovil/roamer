/*
  Warnings:

  - You are about to drop the `password` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `password` DROP FOREIGN KEY `Password_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `hashedPassword` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `password`;
