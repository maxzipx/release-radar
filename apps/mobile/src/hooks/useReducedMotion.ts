import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

export const useReducedMotion = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

  useEffect(() => {
    let isActive = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (isActive) {
          setReduceMotionEnabled(enabled);
        }
      })
      .catch(() => {
        if (isActive) {
          setReduceMotionEnabled(false);
        }
      });

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => {
        setReduceMotionEnabled(enabled);
      },
    );

    return () => {
      isActive = false;
      subscription.remove();
    };
  }, []);

  return reduceMotionEnabled;
};
