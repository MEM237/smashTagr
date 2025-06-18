import React from "react";

const InviteAwaiting = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 225 225" width="225" height="225" fill="none">
  <g opacity="100%">
    <rect x="0" y="0" width="225" height="225" fill="#000" rx="0" filter="url(#filter_dshadow_0_0_0_00000014)"></rect>
  </g>
  <g opacity="100%">
    <rect filter="url(#filter_dshadow_0_0_0_00000014)" x="5" y="14" width="218" height="192" fill="#212121" rx="32"></rect>
    <svg xmlns="http://www.w3.org/2000/svg" height="162" width="162" viewBox="0 0 24 24" fill="#c8edfd" x="33" y="29">
      <path d="M0 0h24v24H0V0z" fill="none"></path>
      <path d="M12 3.99c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.25 12.24c-2.35 2.34-6.15 2.34-8.49 0L12 11.99v-6c1.54 0 3.07.59 4.24 1.76a5.99 5.99 0 0 1 .01 8.48z" opacity=".3"></path>
      <path d="M16.24 7.75A5.974 5.974 0 0 0 12 5.99v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0a5.99 5.99 0 0 0-.01-8.48zM12 1.99c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    </svg>
  </g>
  <defs>
    <filter id="filter_dshadow_0_0_0_00000014" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood flood-opacity="0" result="bg-fix"></feFlood>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="alpha"></feColorMatrix>
      <feOffset dx="0" dy="0"></feOffset>
      <feGaussianBlur stdDeviation="0"></feGaussianBlur>
      <feComposite in2="alpha" operator="out"></feComposite>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
      <feBlend mode="normal" in2="bg-fix" result="bg-fix-filter_dshadow_0_0_0_00000014"></feBlend>
      <feBlend in="SourceGraphic" in2="bg-fix-filter_dshadow_0_0_0_00000014" result="shape"></feBlend>
    </filter>
  </defs>
</svg>
);

export default InviteAwaiting;
