import screenfull from "screenfull";
import { message } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const Fullscreen = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) setFullScreen(true);
      else setFullScreen(false);
      return () => screenfull.off("change", () => {});
    });
  }, []);

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
    screenfull.toggle();
  };
  return (
    <>
      {React.createElement(fullScreen ? FullscreenExitOutlined : FullscreenOutlined, {
        className: "icon-style",
        onClick: () => handleFullScreen()
      })}
    </>
  );
};
export default Fullscreen;
