-- DropForeignKey
ALTER TABLE "DeliveryReport" DROP CONSTRAINT "DeliveryReport_order_fk";

-- DropForeignKey
ALTER TABLE "DeliveryReport" DROP CONSTRAINT "DeliveryReport_store_fk";

-- DropForeignKey
ALTER TABLE "DeliveryReport" DROP CONSTRAINT "DeliveryReport_user_fk";

-- DropIndex
DROP INDEX "DeliveryReport_orderId_idx";

-- DropIndex
DROP INDEX "DeliveryReport_storeId_idx";

-- DropIndex
DROP INDEX "DeliveryReport_userId_idx";

-- CreateTable
CREATE TABLE "AddressChangeAlert" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "oldAddress" JSONB NOT NULL,
    "newAddress" JSONB NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddressChangeAlert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressChangeAlert" ADD CONSTRAINT "AddressChangeAlert_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressChangeAlert" ADD CONSTRAINT "AddressChangeAlert_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressChangeAlert" ADD CONSTRAINT "AddressChangeAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
