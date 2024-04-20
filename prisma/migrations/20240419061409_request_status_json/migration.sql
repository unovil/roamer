/*
  Warnings:

  - You are about to drop the column `isAllowed` on the `request` table. All the data in the column will be lost.
  - Added the required column `requestStatus` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `request` DROP COLUMN `isAllowed`,
    ADD COLUMN `requestStatus` JSON NOT NULL;
