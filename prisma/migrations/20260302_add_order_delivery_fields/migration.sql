-- Migration: add delivery fields to Order

ALTER TABLE "Order"
  ADD COLUMN "deliveryDeadline" TIMESTAMP(3) NULL,
  ADD COLUMN "deliveryWindowHours" INTEGER NULL,
  ADD COLUMN "deliveryConfirmed" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Order_deliveryDeadline_idx" ON "Order" ("deliveryDeadline");
CREATE INDEX "Order_storeId_deliveryConfirmed_idx" ON "Order" ("storeId", "deliveryConfirmed");
