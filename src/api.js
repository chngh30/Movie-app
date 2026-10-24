const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Không thể lấy dữ liệu phim");
  }

  return response.json();
}

export default fetchData;
