export interface AxiosRequestConfig extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | null | undefined>;
  baseURL?: string;
}

export interface AxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig & { url: string };
}

const buildUrl = (url: string, params?: AxiosRequestConfig["params"], baseURL?: string) => {
  let finalUrl: URL;
  if (baseURL) {
    finalUrl = new URL(url, baseURL);
  } else {
    try {
      finalUrl = new URL(url);
    } catch (error) {
      finalUrl = new URL(url, "http://localhost");
    }
  }
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      finalUrl.searchParams.set(key, String(value));
    });
  }
  return finalUrl.toString();
};

const parseHeaders = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

async function get<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
  const targetUrl = buildUrl(url, config.params, config.baseURL);
  const response = await fetch(targetUrl, {
    ...config,
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Solicitud fallida con código ${response.status}`);
  }

  const data = (await response.json()) as T;
  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: parseHeaders(response.headers),
    config: {
      ...config,
      url: targetUrl,
    },
  };
}

const axios = { get };

export default axios;
