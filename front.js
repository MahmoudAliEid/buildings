export function createProduct(fileInput) {
  const formData = new FormData();

  // Append the file
  formData.append("image", fileInput.files[0]); // Replace `fileInput.files[0]` with your file object

  // Append text fields
  formData.append("name_en", "Skyline Tower");
  formData.append("name_ar", "برج الأفق");
  formData.append("price", "4000");
  formData.append("location_en", "Downtown, City Center");
  formData.append("location_ar", "وسط المدينة");
  formData.append("city_en", "New York");
  formData.append("city_ar", "نيويورك");
  formData.append("goToLocation", "https://maps.google.com/example");
  formData.append("description_en", "Luxury apartments with modern amenities.");
  formData.append("description_ar", "شقق فاخرة مع وسائل راحة حديثة.");
  formData.append("title_en", "Luxury Apartments");
  formData.append("title_ar", "شقق فاخرة");
  formData.append("studio_en", "Fully Furnished Studio");
  formData.append("studio_ar", "استوديو مفروش بالكامل");
  formData.append("size_en", "150 sqm");
  formData.append("size_ar", "150 متر مربع");
  formData.append("paymentPlan_en", "12 months installment");
  formData.append("paymentPlan_ar", "تقسيط على 12 شهر");
  formData.append("downPayment_en", "20% down payment");
  formData.append("downPayment_ar", "20٪ دفعة مقدمة");
  formData.append("type_en", "Residential");
  formData.append("type_ar", "سكني");
  formData.append("adders_en", "123 Main Street, Downtown");
  formData.append("adders_ar", "١٢٣ شارع الرئيسي ، وسط البلد");
  formData.append("status_en", "Available");
  formData.append("status_ar", "متاح");
  formData.append("category_en", "Apartments");
  formData.append("category_ar", "شقق");

  // Send the request
  fetch("http://localhost:4000/api/create-building", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
