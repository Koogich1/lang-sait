/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ... другие настройки
  rewrites() {
    return [
      {
        source: '/src/lib/file-storage',
        destination: '/api/file-storage' // Перенаправляем на маршрут в pages/api
      }
    ]
  },
  experimental:{
    serverExternalPackages: ['sharp'],
    serverActions: {
      bodySizeLimit: "5mb",
    }
  },
  images:{
    domains: ['storage.yandexcloud.net']
  }
}


export default nextConfig;
