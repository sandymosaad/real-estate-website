/** Formats Egyptian pound values for friendly Arabic display. */
export function formatPrice(price: number): string {
  return `${new Intl.NumberFormat("ar-EG").format(price)} جنيه`;
}

/** Formats an area value with the square-meter unit. */
export function formatArea(area: number): string {
  return `${new Intl.NumberFormat("ar-EG").format(area)} م²`;
}
