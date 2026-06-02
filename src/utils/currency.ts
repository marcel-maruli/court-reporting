export const formatCurrency = (amount: string | number): string => {
  // Pastikan input diubah menjadi angka
  const numericValue = typeof amount === "string" ? parseFloat(amount) : amount;

  // Cek jika angka tidak valid
  if (isNaN(numericValue)) return "Rp0";

  // Gunakan Intl.NumberFormat untuk format Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Mengatur agar tidak ada digit desimal di belakang (00)
    maximumFractionDigits: 0,
  }).format(numericValue);
};