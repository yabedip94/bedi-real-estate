/**
 * NARA ESTATE — Property Consultation & Inquiry Helper
 * Formats polite consultation messages and builds conditional WhatsApp links.
 *
 * Requirements:
 * - Institutional identity: NARA ESTATE — Konsultasi Portofolio.
 * - Primary interaction: Generates clean inquiry text for clipboard copying.
 * - Conditional WhatsApp: Returns wa.me deep-link ONLY when a valid phone number
 *   is explicitly provided (e.g., from configuration or props). Does not hardcode
 *   fictional or operational phone numbers.
 */

import type { Property } from "@/types/property";
import { formatPropertyPrice } from "./formatters.ts";

/**
 * Normalizes an international phone number to digits-only E.164 standard.
 * - Strips '+', dashes, spaces, and brackets.
 * - Converts leading '0' (Indonesian national format) to '62'.
 * - Returns null if input is empty, non-string, or invalid length.
 */
export function sanitizePhoneNumber(phone?: string | null): string | null {
  if (!phone || typeof phone !== "string") {
    return null;
  }

  // Extract digits only
  let digits = phone.replace(/\D/g, "");

  if (!digits) {
    return null;
  }

  // Convert Indonesian national prefix 0 (e.g., 0812...) to 62812...
  if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  }

  // Validate E.164 length (typically 10 to 15 digits)
  if (digits.length >= 10 && digits.length <= 15) {
    return digits;
  }

  return null;
}

export type PropertyInquiryTarget = Pick<
  Property,
  "title" | "code" | "price" | "pricePeriod" | "location"
>;

/**
 * Builds the standardized Indonesian inquiry message text suitable for
 * clipboard copying or pre-filled WhatsApp deep-linking.
 */
export function buildInquiryMessageText(property: PropertyInquiryTarget): string {
  const formattedPrice = formatPropertyPrice(
    property.price,
    property.pricePeriod
  );
  const locationSummary = `${property.location.area}, ${property.location.city}`;

  return (
    `Halo NARA ESTATE, saya tertarik untuk mendapatkan informasi lebih lanjut ` +
    `mengenai properti *${property.title}* (Kode: ${property.code} | Harga: ${formattedPrice}) ` +
    `di ${locationSummary}. Mohon informasi jadwal kunjungan privat yang tersedia. Terima kasih.`
  );
}

export interface PropertyInquiryUrlOptions {
  property: PropertyInquiryTarget;
  phone?: string | null;
}

/**
 * Constructs a deep-link URL to WhatsApp (https://wa.me/<phone>?text=...)
 * ONLY if a valid phone number is provided.
 *
 * If no phone number is provided or the number is invalid, returns null
 * to prevent generating misleading or broken WhatsApp links.
 */
export function buildWhatsAppPropertyInquiryUrl(
  options: PropertyInquiryUrlOptions
): string | null {
  const sanitizedPhone = sanitizePhoneNumber(options.phone);

  if (!sanitizedPhone) {
    return null;
  }

  const messageText = buildInquiryMessageText(options.property);
  const encodedText = encodeURIComponent(messageText);

  return `https://wa.me/${sanitizedPhone}?text=${encodedText}`;
}

export interface GeneralInquiryUrlOptions {
  phone?: string | null;
  agentName?: string;
}

/**
 * Builds general consultation message text.
 */
export function buildGeneralInquiryMessageText(agentName?: string): string {
  const trimmedName = agentName?.trim();
  return trimmedName
    ? `Halo ${trimmedName} dari NARA ESTATE, saya ingin berkonsultasi mengenai koleksi properti premium yang tersedia saat ini. Terima kasih.`
    : `Halo NARA ESTATE, saya ingin berkonsultasi mengenai koleksi properti premium yang tersedia saat ini. Terima kasih.`;
}

/**
 * Constructs a general consultation WhatsApp URL if a valid phone number is provided.
 * Returns null if no phone number is provided.
 */
export function buildWhatsAppGeneralInquiryUrl(
  options?: GeneralInquiryUrlOptions
): string | null {
  const sanitizedPhone = sanitizePhoneNumber(options?.phone);

  if (!sanitizedPhone) {
    return null;
  }

  const messageText = buildGeneralInquiryMessageText(options?.agentName);
  const encodedText = encodeURIComponent(messageText);

  return `https://wa.me/${sanitizedPhone}?text=${encodedText}`;
}

