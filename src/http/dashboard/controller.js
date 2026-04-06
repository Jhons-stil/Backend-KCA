const { resGagal, resSukses } = require("../../payloads/payload");
const { tampilDashboard } = require("./service");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await tampilDashboard(userId);

    if (!data) {
      return resGagal(res, 404, "error", "Maaf, data tidak ditemukan");
    }

    const finance = data.finance || [];
    const activities = data.activities || [];
    // FINANCE
    const totalPemasukan = finance
      .filter((item) => item.type.toLowerCase().trim() === "pemasukan")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
    console.log(totalPemasukan);

    const totalPengeluaran = finance
      .filter((item) => item.type.toLowerCase().trim() === "pengeluaran")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalSaldo = totalPemasukan - totalPengeluaran;

    // ACTIVITIES
    const totalPending = activities.filter(
      (item) => item.status === "1",
    ).length;
    const totalInProgres = activities.filter(
      (item) => item.status === "2",
    ).length;
    const totalCompleted = activities.filter(
      (item) => item.status === "3",
    ).length;

    return resSukses(res, 200, "success", "Berhasil memuat data dashboard", {
      user: {
        nama: data.username,
        email: data.email,
      },
      ringkasanKeuangan: {
        pemasukan: totalPemasukan,
        pengeluaran: totalPengeluaran,
        saldo: totalSaldo,
      },
      ringkasanAktivitas: {
        total_tugas: activities.length,
        detail_status: {
          pending: totalPending,
          in_progress: totalInProgres,
          completed: totalCompleted,
        },
        daftar_activities: activities.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          status: item.status,
          categories: item.categories,
        })),
      },
    });
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  getDashboard,
};
