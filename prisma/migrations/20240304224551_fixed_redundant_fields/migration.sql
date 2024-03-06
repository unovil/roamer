/*
  Warnings:

  - You are about to drop the column `middleName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `middleName`,
    DROP COLUMN `password`;
