/*
  Warnings:

  - You are about to alter the column `image` on the `equipment` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(191)`.
  - You are about to alter the column `image` on the `facility` table. The data in that column could be lost. The data in that column will be cast from `Blob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `equipment` MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `facility` MODIFY `image` VARCHAR(191) NOT NULL;
