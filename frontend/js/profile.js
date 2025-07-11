// File: frontend/js/profile.js
document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Jika tidak login, tendang ke halaman utama
  if (!userInfo || !userInfo.token) {
    window.location.href = "index.html";
    return;
  }

  // Fungsi untuk mengambil data profil dan mengisi form
  const loadProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Gagal memuat profil");
      }

      const data = await res.json();
      nameInput.value = data.name;
      emailInput.value = data.email;
      phoneInput.value = data.phone || "";
      addressInput.value = data.address || "";
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  // Event listener untuk form submit
  profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {
      showToast("Konfirmasi password tidak cocok!", "danger");
      return;
    }

    const updateData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
    };

    // Hanya tambahkan password ke data update jika diisi
    if (passwordInput.value) {
      updateData.password = passwordInput.value;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal memperbarui profil");
      }

      showToast("Profil berhasil diperbarui!", "success");
      // Perbarui userInfo di localStorage dengan data baru
      localStorage.setItem("userInfo", JSON.stringify(data));
      // Reload halaman untuk memastikan semua info (seperti nama di navbar) terupdate
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      showToast(error.message, "danger");
    }
  });

  // Panggil fungsi untuk memuat profil saat halaman dibuka
  loadProfile();
});
