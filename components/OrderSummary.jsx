import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const OrderSummary = ({ totalPrice, items }) => {
  const { user } = useAuth();
  const { getToken } = useAuth();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';
  const addressList = useSelector((state) => state.address.list);

  const [paymentMethod, setPaymentMethod] = useState('PAYSTACK');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [coupon, setCoupon] = useState('');

  const deliveryAmount = useMemo(() => {
    if (!selectedAddress) return 0;
    const city = (selectedAddress.city || '').toString().toLowerCase();
    if (city === 'kumasi') return 0;
    if (totalPrice <= 500) return 20;
    return parseFloat((totalPrice * 0.05).toFixed(2));
  }, [selectedAddress, totalPrice]);

  const couponDiscount = useMemo(() => {
    if (!coupon) return 0;
    return coupon.discount / 100 * totalPrice;
  }, [coupon, totalPrice]);

  const displayedTotal = useMemo(() => {
    return parseFloat((totalPrice + deliveryAmount - couponDiscount).toFixed(2));
  }, [totalPrice, deliveryAmount, couponDiscount]);

  const handleCouponCode = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error('You need to be logged in to apply a coupon');
      return;
    }

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/coupon', { code: couponCodeInput }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupon(data.coupon);
      toast.success('Coupon applied successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong while applying coupon');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You need to be logged in to place an order');
      return;
    }

    if (!selectedAddress) {
      toast.error('Please select an address to place order');
      return;
    }

    try {
      const token = await getToken();
      const normalizedItems = items.map((item) => ({ productId: item.id || item.productId, quantity: item.quantity || 1 }));
      const orderData = {
        items: normalizedItems,
        paymentMethod: 'PAYSTACK',
        addressId: selectedAddress.id,
        couponCode: coupon ? coupon.code : null,
      };

      const { data } = await axios.post('/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data?.authorizationUrl) {
        toast.error(data?.error || 'Payment initialization failed');
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch (error) {
      const apiErr = error?.response?.data?.error || error?.response?.data?.message || error?.message;
      toast.error(apiErr || 'Something went wrong while placing order');
    }
  };

  return (
    <div className="w-full max-w-lg rounded-[32px] border border-slate-800 bg-slate-900/95 p-7 text-slate-100 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)]">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-rose-400">Order summary</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Ready to checkout</h2>
      </div>

      <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="radio"
            id="PAYSTACK"
            name="payment"
            checked={paymentMethod === 'PAYSTACK'}
            onChange={() => setPaymentMethod('PAYSTACK')}
            className="accent-rose-400"
          />
          <label htmlFor="PAYSTACK" className="cursor-pointer">Paystack</label>
        </div>

        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
          <p className="text-slate-400">Delivery address</p>
          {selectedAddress ? (
            <div className="mt-3 flex items-center justify-between gap-3 text-slate-100">
              <div>
                <p className="font-medium">{selectedAddress.name}</p>
                <p className="text-sm text-slate-400">{selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
              </div>
              <SquarePenIcon
                size={18}
                className="cursor-pointer text-slate-300 hover:text-white"
                onClick={() => setSelectedAddress(null)}
              />
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              {addressList.length > 0 && (
                <select
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none"
                  onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                >
                  <option value="">Select Address</option>
                  {addressList.map((address, index) => (
                    <option key={index} value={index} className="bg-slate-900 text-slate-100">
                      {address.name}, {address.city}, {address.state}
                    </option>
                  ))}
                </select>
              )}
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 transition hover:border-rose-400 hover:text-rose-300"
              >
                <PlusIcon size={16} /> Add Address
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
        <div className="flex justify-between pb-3 text-slate-400">
          <span>Subtotal</span>
          <span>{currency}{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-3 text-slate-400">
          <span>Delivery fee</span>
          <span>{deliveryAmount === 0 ? 'Free' : `${currency}${deliveryAmount.toFixed(2)}`}</span>
        </div>
        {coupon && (
          <div className="flex justify-between py-3 text-emerald-300">
            <span>Coupon</span>
            <span>-{currency}{couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="mt-3 h-px bg-slate-800" />
        <div className="mt-4 flex justify-between text-sm text-slate-200">
          <span>Total</span>
          <span className="text-lg font-semibold text-white">{currency}{displayedTotal.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleCouponCode} className="mt-6 space-y-3">
        {!coupon ? (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={couponCodeInput}
              onChange={(e) => setCouponCodeInput(e.target.value)}
              placeholder="Coupon Code"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none"
            />
            <button
              type="submit"
              className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border border-emerald-500 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-200">
            <span>{coupon.code.toUpperCase()} applied</span>
            <button type="button" onClick={() => setCoupon('')} className="text-emerald-300 hover:text-white">
              <XIcon size={18} />
            </button>
          </div>
        )}
      </form>

      <button
        type="button"
        onClick={handlePlaceOrder}
        className="mt-6 w-full rounded-3xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
      >
        Place Order
      </button>

      {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
    </div>
  );
};

export default OrderSummary;
