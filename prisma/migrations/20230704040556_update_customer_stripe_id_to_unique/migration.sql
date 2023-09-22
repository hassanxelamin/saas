/*
  Warnings:

  - A unique constraint covering the columns `[stripe_customer_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_stripe_customer_id_key" ON "Customer"("stripe_customer_id");
