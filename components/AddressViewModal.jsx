"use client"
import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import AddressEditModal from "./AddressEditModal"

const AddressViewModal = ({ address, onClose, orderId, orderStatus, onAddressUpdated }) => {
    const [mounted, setMounted] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!address) return null
    if (!mounted) return null

    const canEditAddress = orderStatus !== "SHIPPED" && orderStatus !== "DELIVERED"

    const modal = (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Full Address</h3>
                    <XIcon size={22} className="cursor-pointer text-slate-500" onClick={onClose} />
                </div>

                <div className="text-sm space-y-2">
                    <p><span className="font-medium">Name:</span> {address?.name || '—'}</p>
                    <p><span className="font-medium">Email:</span> {address?.email || '—'}</p>
                    <p><span className="font-medium">Street:</span> {address?.street || '—'}</p>
                    <p><span className="font-medium">City:</span> {address?.city || '—'}</p>
                    <p><span className="font-medium">State:</span> {address?.state || '—'}</p>
                    <p><span className="font-medium">Zip:</span> {address?.zip || '—'}</p>
                    <p><span className="font-medium">Country:</span> {address?.country || '—'}</p>
                    <p><span className="font-medium">Phone:</span> {address?.phone || '—'}</p>
                </div>

                {canEditAddress && (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition font-medium"
                    >
                        Edit Address
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <>
            {createPortal(modal, document.body)}
            {showEditModal && (
                <AddressEditModal
                    address={address}
                    orderId={orderId}
                    orderStatus={orderStatus}
                    onClose={() => setShowEditModal(false)}
                    onAddressUpdated={(updatedOrder) => {
                        onAddressUpdated?.(updatedOrder)
                        setShowEditModal(false)
                        onClose()
                    }}
                />
            )}
        </>
    )
}

export default AddressViewModal