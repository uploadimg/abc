<div id="janshare-ad-container"></div>

<script>
  let janshareAds = [];
  let janshareCurrentIndex = -1;
  const janshareRotationInterval = 5000; 

  async function janshareFetchAdsFromSheet() {
    try {
      const janshareUrl = "https://docs.google.com/spreadsheets/d/1LE6ukiHexKdNqnOiINjbE19x1AsYkBU5dLFOz6YTP3c/gviz/tq?tqx=out:json&tq&gid=880296214";
      const response = await fetch(janshareUrl);
      if (!response.ok) throw new Error("Không thể lấy dữ liệu quảng cáo.");

      const text = await response.text();
      const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const data = JSON.parse(jsonText);

      janshareAds = data.table.rows.slice(1).map(row => ({
        src: row.c[1]?.v || "",
        link: row.c[2]?.v || "#",
        title: row.c[3]?.v || "Sản phẩm không có tiêu đề"
      })).filter(ad => ad.src);

      if (janshareAds.length === 0) {
        document.getElementById("janshare-ad-container").innerText = "Không có quảng cáo để hiển thị.";
        return;
      }

      janshareAds = janshareShuffleArray(janshareAds); 
      janshareShowNextAd(); 
      setInterval(janshareShowNextAd, janshareRotationInterval); 
    } catch (error) {
      console.error("Lỗi tải quảng cáo:", error);
      document.getElementById("janshare-ad-container").innerText = "Lỗi khi tải quảng cáo.";
    }
  }

  function janshareShowNextAd() {
    if (janshareAds.length === 0) return;

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * janshareAds.length);
    } while (nextIndex === janshareCurrentIndex && janshareAds.length > 1);

    janshareCurrentIndex = nextIndex;
    const ad = janshareAds[nextIndex];
    const img = new Image();
    img.src = ad.src;
    img.alt = ad.title;
    img.title = ad.title;
    img.style.maxWidth = "100%";
    img.className = "janshare-ad-image";

    const link = document.createElement("a");
    link.href = ad.link;
    link.target = "_blank";
    link.appendChild(img);

    const container = document.getElementById("janshare-ad-container");
    container.innerHTML = "";
    container.appendChild(link);
  }

  function janshareShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  janshareFetchAdsFromSheet();
</script>

<style>
  #janshare-ad-container {
    transition: opacity 0.5s ease-in-out;
  }

  .janshare-ad-image {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .janshare-ad-image.loaded {
    opacity: 1;
  }
</style>

<script>

  document.addEventListener("load", function (event) {
    if (event.target.classList.contains("janshare-ad-image")) {
      event.target.classList.add("loaded");
    }
  }, true);
</script>
