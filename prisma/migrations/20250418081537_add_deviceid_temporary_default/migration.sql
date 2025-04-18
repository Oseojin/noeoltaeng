/*
  Warnings:

  - You are about to drop the column `ip` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_ip_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `ip`,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL DEFAULT 'temp-device-id';

-- CreateIndex
CREATE UNIQUE INDEX `User_deviceId_key` ON `User`(`deviceId`);
