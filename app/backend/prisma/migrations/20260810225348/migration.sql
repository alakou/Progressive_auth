-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FlightStatus" AS ENUM ('RAS', 'SCHEDULED', 'BOARDING', 'DEPARTED', 'DELAYED', 'CANCELLED', 'ARRIVED');

-- CreateTable
CREATE TABLE "aircraft" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "airlineId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "flight" (
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

    CONSTRAINT "flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_datas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profession" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_datas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "booking_ref" TEXT NOT NULL,
    "seat_num" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_id_key" ON "aircraft"("id");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_registration_key" ON "aircraft"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "flight_flight_num_key" ON "flight"("flight_num");

-- CreateIndex
CREATE UNIQUE INDEX "flight_airlineId_flight_num_scheduled_dep_key" ON "flight"("airlineId", "flight_num", "scheduled_dep");

-- CreateIndex
CREATE UNIQUE INDEX "user_datas_userId_key" ON "user_datas"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_userId_key" ON "booking"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_flightId_key" ON "booking"("flightId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_booking_ref_key" ON "booking"("booking_ref");

-- CreateIndex
CREATE UNIQUE INDEX "booking_seat_num_key" ON "booking"("seat_num");

-- CreateIndex
CREATE UNIQUE INDEX "booking_flightId_seat_num_key" ON "booking"("flightId", "seat_num");

-- AddForeignKey
ALTER TABLE "aircraft" ADD CONSTRAINT "aircraft_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_depAiportId_fkey" FOREIGN KEY ("depAiportId") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_arrAiportId_fkey" FOREIGN KEY ("arrAiportId") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_datas" ADD CONSTRAINT "user_datas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
