import { CURRENCY } from "../config";

export function formatPrice(price: number, unit?: string): string {
  const p = Number.isInteger(price) ? price.toString() : price.toFixed(2);
  return unit ? `${p} ${CURRENCY} / ${unit}` : `${p} ${CURRENCY}`;
}

// Telefon zəng linki
export function telLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

// WhatsApp sifariş linki (hazır mesajla)
export function whatsappLink(whatsapp: string, message: string): string {
  const num = whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(productName: string): string {
  return `Salam! "${productName}" məhsulundan sifariş vermək istəyirəm.`;
}
