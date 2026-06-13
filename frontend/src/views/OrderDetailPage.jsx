import { useContext, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from '../js/store/appContext.jsx';
import { formatCurrency } from "../utils/price.js";

const moneyAR = (n) => formatCurrency(n || 0);

export default function OrderDetailPage() {
    const { store, actions } = useContext(Context);
    const { orderId } = useParams();
    const orders = Array.isArray(store.orders) ? store.orders : [];

    useEffect(() => {
        if (!orders.length) actions.fetchOrders();
    }, [orders.length]);

    const order = useMemo(() => {
        return orders.find(
            (p) =>
                String(p.id) === String(orderId) ||
                `${p.id}-${p.public_order_number}` === String(orderId)
        );
    }, [orders, orderId]);

    const orderItems = Array.isArray(order?.order_items)
        ? order.order_items
        : Array.isArray(order?.items)
            ? order.items
            : [];



    if (!order) return <div className="p-6">Cargando pedido…</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                    Pedido #{order.public_order_number || String(order.id).padStart(4, "0")}
                </h3>



                <Link
                    to="/cuenta/pedidos"
                    className="text-sm text-purple-600 hover:underline"
                >
                    ← Volver a pedidos
                </Link>
            </div>
            <div className="text-sm text-gray-600">Estado: {order.status}</div>

            <div className="border rounded-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="border-b">
                            <tr>
                                <th className="text-left py-2 px-4">Producto</th>
                                <th className="text-left py-2 px-4">Cantidad</th>
                                <th className="text-left py-2 px-4">Precio</th>
                                <th className="text-left py-2 px-4">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((it, index) => {
                                const quantity = Number(it.quantity || 0);
                                const price = Number(it.price || 0);

                                return (
                                <tr key={it.id || `${it.product_id || "item"}-${index}`} className="border-b last:border-0">
                                    <td className="py-2 px-4">
                                        {it.product_name || `#${it.product_id}`}
                                        {it.selected_flavor ? ` (${it.selected_flavor})` : ""}
                                    </td>
                                    <td className="py-2 px-4">{quantity}</td>
                                    <td className="py-2 px-4">{moneyAR(price)}</td>
                                    <td className="py-2 px-4">
                                        {moneyAR(quantity * price)}
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* 🔽 Sección de resumen con envío y total */}
                <div className="border-t px-4 py-3 text-sm bg-gray-50">
                    <div className="flex justify-between">
                        <span>Envío:</span>
                        <span className={order.shipping_cost === 0 ? "text-green-600" : ""}>
                            {order.shipping_cost === 0
                                ? "Gratis"
                                : moneyAR(order.shipping_cost || 0)}
                        </span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 text-base">
                        <span>Total:</span>
                        <span>{moneyAR(order.total_amount)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
