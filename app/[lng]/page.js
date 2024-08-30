"use client";
import { useEffect } from "react";
import "./page.css";

export default function Home({ params: { lng } }) {
  let icon = {
    success: '<span class="material-symbols-outlined">task_alt</span>',
    danger: '<span class="material-symbols-outlined">error</span>',
    warning: '<span class="material-symbols-outlined">warning</span>',
    info: '<span class="material-symbols-outlined">info</span>',
  };

  const showUpgradedToast = (
    message = "Sample Message",
    toastType = "info"
  ) => {
    if (!Object.keys(icon).includes(toastType)) toastType = "info";

    let box = document.createElement("div");
    box.classList.add("better-toast", `better-toast-${toastType}`);
    box.innerHTML = ` <div class="better-toast-content-wrapper">
                      <div class="better-toast-icon">
                      ${icon[toastType]}
                      </div>
                      <div class="better-toast-message">${message}</div>
                      <div class="better-toast-progress"></div>
                      </div>`;

    let toastAlready = document.body.querySelector(".better-toast");
    if (toastAlready) {
      toastAlready.remove();
    }

    document.body.appendChild(box);
    setTimeout(() => {
      box.remove();
    }, 5000);
  };

  useEffect(() => {
    showUpgradedToast("This is a sample message", "success");
  }, []);
  return <main className=""></main>;
}
