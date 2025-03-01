import React, { useEffect } from "react";

const Spinner1 = ({ color = "#fe718d", size = 200 }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes ldio {
        0% { opacity: 1 }
        100% { opacity: 0 }
      }

      .ldio div {
        left: ${size * 0.47}px;
        top: ${size * 0.24}px;
        position: absolute;
        animation: ldio linear 1s infinite;
        background: ${color};
        width: ${size * 0.06}px;
        height: ${size * 0.12}px;
        border-radius: 50%;
        transform-origin: ${size * 0.03}px ${size * 0.26}px;
      }

      .ldio div:nth-child(1) { transform: rotate(0deg); animation-delay: -0.9167s; }
      .ldio div:nth-child(2) { transform: rotate(30deg); animation-delay: -0.8333s; }
      .ldio div:nth-child(3) { transform: rotate(60deg); animation-delay: -0.75s; }
      .ldio div:nth-child(4) { transform: rotate(90deg); animation-delay: -0.6667s; }
      .ldio div:nth-child(5) { transform: rotate(120deg); animation-delay: -0.5833s; }
      .ldio div:nth-child(6) { transform: rotate(150deg); animation-delay: -0.5s; }
      .ldio div:nth-child(7) { transform: rotate(180deg); animation-delay: -0.4167s; }
      .ldio div:nth-child(8) { transform: rotate(210deg); animation-delay: -0.3333s; }
      .ldio div:nth-child(9) { transform: rotate(240deg); animation-delay: -0.25s; }
      .ldio div:nth-child(10) { transform: rotate(270deg); animation-delay: -0.1667s; }
      .ldio div:nth-child(11) { transform: rotate(300deg); animation-delay: -0.0833s; }
      .ldio div:nth-child(12) { transform: rotate(330deg); animation-delay: 0s; }

      .loadingio-spinner-spinner {
        width: ${size}px;
        height: ${size}px;
        display: inline-block;
        overflow: hidden;
        background: transparent;
      }

      .ldio {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0;
        margin:0px;
        padding:0px;
      }

      .ldio div { box-sizing: content-box; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color, size]); // Re-run when color or size changes

  return (
    <div className="loadingio-spinner-spinner">
      <div className="ldio">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner1;
