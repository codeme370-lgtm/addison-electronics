-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "avgResponseTime" INTEGER NOT NULL DEFAULT 24,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "productsSold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "returnRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalFollowers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "SellerReview" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "communicationRating" INTEGER NOT NULL DEFAULT 3,
    "shippingRating" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreFollower" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreFollower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchOptimization" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "searchKeywords" TEXT[],
    "searchCount" INTEGER NOT NULL DEFAULT 0,
    "lastIndexed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchOptimization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SellerReview_userId_storeId_orderId_key" ON "SellerReview"("userId", "storeId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "StoreFollower_userId_storeId_key" ON "StoreFollower"("userId", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchOptimization_storeId_key" ON "SearchOptimization"("storeId");

-- AddForeignKey
ALTER TABLE "SellerReview" ADD CONSTRAINT "SellerReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerReview" ADD CONSTRAINT "SellerReview_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreFollower" ADD CONSTRAINT "StoreFollower_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchOptimization" ADD CONSTRAINT "SearchOptimization_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
