import api from "./api";

const TIP_URL = "/api/v1/tip";

export const getTip = () => api.get(TIP_URL);
