import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useReducedMotion, useThemeTokens } from "@/hooks";

interface BottomSheetProps extends PropsWithChildren {
  visible: boolean;
  onDismiss: () => void;
  expandable?: boolean;
  initialSnapPercent?: number;
  expandedSnapPercent?: number;
}

export function BottomSheet({
  visible,
  onDismiss,
  expandable = true,
  initialSnapPercent = 0.65,
  expandedSnapPercent = 0.95,
  children,
}: BottomSheetProps) {
  const { colors, tokens } = useThemeTokens();
  const reduceMotion = useReducedMotion();
  const { height: windowHeight } = useWindowDimensions();

  const [isMounted, setIsMounted] = useState(visible);

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const topPosition = useRef(new Animated.Value(windowHeight)).current;
  const currentTop = useRef(windowHeight);
  const panStartTop = useRef(windowHeight);

  const initialTop = useMemo(
    () => Math.max(windowHeight * (1 - initialSnapPercent), 0),
    [initialSnapPercent, windowHeight],
  );
  const expandedTop = useMemo(
    () => Math.max(windowHeight * (1 - expandedSnapPercent), 0),
    [expandedSnapPercent, windowHeight],
  );

  useEffect(() => {
    const subscription = topPosition.addListener(({ value }) => {
      currentTop.current = value;
    });

    return () => {
      topPosition.removeListener(subscription);
    };
  }, [topPosition]);

  const animateTo = useCallback(
    (targetTop: number, animated = true) => {
      if (!animated || reduceMotion) {
        topPosition.setValue(targetTop);
        return;
      }

      Animated.spring(topPosition, {
        toValue: targetTop,
        damping: 28,
        stiffness: 260,
        mass: 0.9,
        useNativeDriver: false,
      }).start();
    },
    [reduceMotion, topPosition],
  );

  const animateBackdrop = useCallback(
    (toValue: number, animated = true, onEnd?: () => void) => {
      if (!animated || reduceMotion) {
        backdropOpacity.setValue(toValue);
        onEnd?.();
        return;
      }

      Animated.timing(backdropOpacity, {
        toValue,
        duration: tokens.motion.fast,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onEnd?.();
        }
      });
    },
    [backdropOpacity, reduceMotion, tokens.motion.fast],
  );

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      topPosition.setValue(windowHeight);
      animateBackdrop(1, true);
      animateTo(initialTop, true);
      return;
    }

    if (!isMounted) {
      return;
    }

    animateBackdrop(0, true);
    animateTo(windowHeight, true);

    const timer = setTimeout(
      () => setIsMounted(false),
      reduceMotion ? 0 : tokens.motion.fast,
    );

    return () => clearTimeout(timer);
  }, [
    animateBackdrop,
    animateTo,
    initialTop,
    isMounted,
    reduceMotion,
    tokens.motion.fast,
    topPosition,
    visible,
    windowHeight,
  ]);

  const dismissSheet = useCallback(() => {
    animateBackdrop(0, true);
    animateTo(windowHeight, true);

    setTimeout(
      () => {
        setIsMounted(false);
        onDismiss();
      },
      reduceMotion ? 0 : tokens.motion.fast,
    );
  }, [
    animateBackdrop,
    animateTo,
    onDismiss,
    reduceMotion,
    tokens.motion.fast,
    windowHeight,
  ]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 4,
        onPanResponderGrant: () => {
          panStartTop.current = currentTop.current;
        },
        onPanResponderMove: (_, gestureState) => {
          const minTop = expandable ? expandedTop : initialTop;
          const nextTop = Math.min(
            windowHeight,
            Math.max(minTop, panStartTop.current + gestureState.dy),
          );
          topPosition.setValue(nextTop);

          // Keep backdrop opacity in sync with sheet position during drag.
          const progress = 1 - (nextTop - initialTop) / (windowHeight - initialTop);
          backdropOpacity.setValue(Math.max(0, Math.min(1, progress)));
        },
        onPanResponderRelease: (_, gestureState) => {
          const nextTop = currentTop.current;

          if (gestureState.vy > 1 || nextTop > initialTop + 120) {
            dismissSheet();
            return;
          }

          // Non-dismiss paths: restore backdrop to fully opaque as sheet snaps back.
          if (expandable && nextTop < (initialTop + expandedTop) / 2) {
            animateTo(expandedTop, true);
            animateBackdrop(1, true);
            return;
          }

          animateTo(initialTop, true);
          animateBackdrop(1, true);
        },
      }),
    [
      animateBackdrop,
      animateTo,
      backdropOpacity,
      dismissSheet,
      expandable,
      expandedTop,
      initialTop,
      topPosition,
      windowHeight,
    ],
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Modal transparent visible onRequestClose={dismissSheet}>
      <View style={StyleSheet.absoluteFill}>
        <Pressable style={StyleSheet.absoluteFill} onPress={dismissSheet}>
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.sheetBackdrop,
                opacity: backdropOpacity,
              },
            ]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              top: topPosition,
              borderTopLeftRadius: tokens.radii.lg,
              borderTopRightRadius: tokens.radii.lg,
            },
          ]}
        >
          {/* Pan handlers scoped to handle bar only — keeps inner ScrollViews from conflicting. */}
          <View style={styles.handleContainer} {...panResponder.panHandlers}>
            <View style={[styles.handle, { backgroundColor: colors.fillTertiary }]} />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  handle: {
    height: 4,
    width: 36,
    borderRadius: 2,
  },
});
