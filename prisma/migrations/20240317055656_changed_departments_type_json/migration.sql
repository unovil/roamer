/*
  Warnings:

  - A unique constraint covering the columns `[depedId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `depedId` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `school` ADD COLUMN `depedId` CHAR(6) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `School_depedId_key` ON `School`(`depedId`);
