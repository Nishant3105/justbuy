/// <reference types="vite/client" />

declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";

declare global {
  interface Window {
    google: any;
  }
}

export {};
