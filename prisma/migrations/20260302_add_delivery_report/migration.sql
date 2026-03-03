-- Migration: add DeliveryReport model

CREATE TABLE "DeliveryReport" (
  "id" TEXT PRIMARY KEY,
  "orderId" TEXT NOT NULL,
  "storeId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE INDEX "DeliveryReport_orderId_idx" ON "DeliveryReport" ("orderId");
CREATE INDEX "DeliveryReport_storeId_idx" ON "DeliveryReport" ("storeId");
CREATE INDEX "DeliveryReport_userId_idx" ON "DeliveryReport" ("userId");

ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_order_fk" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE;
ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_store_fk" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE;
ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_user_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
