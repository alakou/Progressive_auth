/*
  Warnings:

  - You are about to drop the `aircraft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_datas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aircraft" DROP CONSTRAINT "aircraft_airlineId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_flightId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "flight" DROP CONSTRAINT "flight_aircraftId_fkey";

-- DropForeignKey
ALTER TABLE "flight" DROP CONSTRAINT "flight_airlineId_fkey";

-- DropForeignKey
ALTER TABLE "flight" DROP CONSTRAINT "flight_arrAiportId_fkey";

-- DropForeignKey
ALTER TABLE "flight" DROP CONSTRAINT "flight_depAiportId_fkey";

-- DropForeignKey
ALTER TABLE "user_datas" DROP CONSTRAINT "user_datas_userId_fkey";

-- DropTable
DROP TABLE "aircraft";

-- DropTable
DROP TABLE "booking";

-- DropTable
DROP TABLE "flight";

-- DropTable
DROP TABLE "user_datas";

-- CreateTable
CREATE TABLE "aircrafts" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "airlineId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "flights" (
    "id" TEXT NOT NULL,
    "flight_num" TEXT NOT NULL,
    "scheduled_dep" TIMESTAMP(3) NOT NULL,
    "scheduled_arr" TIMESTAMP(3) NOT NULL,
    "status" "FlightStatus" NOT NULL DEFAULT 'RAS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "airlineId" TEXT NOT NULL,
    "aircraftId" TEXT NOT NULL,
    "depAiportId" TEXT NOT NULL,
    "arrAiportId" TEXT NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profession" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "booking_ref" TEXT NOT NULL,
    "seat_num" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aircrafts_id_key" ON "aircrafts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "aircrafts_registration_key" ON "aircrafts"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "flights_flight_num_key" ON "flights"("flight_num");

-- CreateIndex
CREATE UNIQUE INDEX "flights_airlineId_flight_num_scheduled_dep_key" ON "flights"("airlineId", "flight_num", "scheduled_dep");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_userId_key" ON "bookings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_flightId_key" ON "bookings"("flightId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_booking_ref_key" ON "bookings"("booking_ref");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_seat_num_key" ON "bookings"("seat_num");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_flightId_seat_num_key" ON "bookings"("flightId", "seat_num");

-- AddForeignKey
ALTER TABLE "aircrafts" ADD CONSTRAINT "aircrafts_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircrafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_depAiportId_fkey" FOREIGN KEY ("depAiportId") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_arrAiportId_fkey" FOREIGN KEY ("arrAiportId") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
